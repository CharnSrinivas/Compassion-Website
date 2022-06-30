import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import qs from 'qs';
import React, { useEffect, useState } from 'react'
import { jwt_aut_token, server_url } from '../../../../config';
import { PaymentRequestButtonElement, useStripe, Elements } from '@stripe/react-stripe-js'
import { loadStripe, } from '@stripe/stripe-js';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

interface Props {
    fundraiser: any;
    user: any;
    slug: string;
    strapi_publisable_key: string;
}

export default function Wrapper(props: any) {
    const stripePromise = loadStripe(props.strapi_publisable_key);
    return <Elements stripe={stripePromise}>
        <MyComponent {...props} />
    </Elements>
};

export function MyComponent({ fundraiser, slug, user, strapi_publisable_key }: Props) {
    const [donation_amount, setDonationAmount] = useState(0);
    const [comment, setComment] = useState('');
    const [show_alert, setShowAlert] = useState(false);
    const [alert_text, setAlertText] = useState('');
    const [paymentRequest, setPaymentRequest] = useState<any>(null);
    const router = useRouter()
    const stripe = useStripe();
    useEffect(() => {
        
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Demo total',
                    amount: 1350,
                },
                requestPayerName: true,
                requestPayerEmail: true,
                // requestShipping: true,
                // shippingOptions: [
                //     {
                //         id: 'standard-global',
                //         label: 'Global shipping',
                //         detail: 'Arrives in 5 to 7 days',
                //         amount: 350,
                //     },
                // ],
            });
            pr.canMakePayment().then((result) => {
                console.log('------------------------------------------------------------------');
                console.log(result);
                console.log('------------------------------------------------------------------');
                if (result) {
                    pr.on('paymentmethod', handlePaymentMethodReceived);
                    setPaymentRequest(pr);
                } else {

                }
            });
        }
    }, [stripe])
    const startCheckOut = async () => {
        if (donation_amount <= 0) {
            setAlertText('Donation amount should be atleast 50 cents ($0.5)'); setShowAlert(true);
            return;
        }
        if (!stripe) {
            alert("Our payment system is borken! Try again after some time.");
            return;
        };
        const item = {
            currency: (fundraiser.attributes.fund_type as string).toUpperCase(),
            name: fundraiser.attributes.title,
            image: fundraiser.attributes.image.data ? server_url + fundraiser.attributes.image.data[0]['attributes']['url'] : window.location.origin + "/assets/image-placeholder.jpg",
            price: donation_amount,
            description: fundraiser.attributes.description,
            charity: fundraiser.attributes['charity']['data'] ? fundraiser.attributes['charity']['data']['id'] : null,
            user: user ? user['id'] : null,
            comment: comment,
            fund_raise: fundraiser.id,
            fundraiser_details: fundraiser
        }
        try {

            const checkoutSession = await axios.post(server_url + '/api/donations/create-stripe-session', {
                item: item
            });
            if (checkoutSession.data.error) {
                setAlertText(checkoutSession.data.error);
                setShowAlert(true);
                console.error(checkoutSession.data.error); return;
            }
            const { error } = await stripe.redirectToCheckout({
                sessionId: checkoutSession.data.id,
            })
            if (error) {
                alert("Our payment system is borken! Try again after some time.");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setShowAlert(true);
                setAlertText((error.response as any).data.error);
            } return;
        }

    }

    const handlePaymentMethodReceived = async (event: any) => {
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=');
        console.log(event);
        console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=');

        if (!stripe) return;

        // Send the payment details to our function.
        const paymentDetails = {
            payment_method: event.paymentMethod.id,
            shipping: {
                name: event.shippingAddress.recipient,
                phone: event.shippingAddress.phone,
                address: {
                    line1: event.shippingAddress.addressLine[0],
                    city: event.shippingAddress.city,
                    postal_code: event.shippingAddress.postalCode,
                    state: event.shippingAddress.region,
                    country: event.shippingAddress.country,
                },
            },
        };
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentDetails }),
        }).then((res) => {
            return res.json();
        });
        if (response.error) {
            // Report to the browser that the payment failed.
            console.log(response.error);
            event.complete('fail');
        } else {
            // Report to the browser that the confirmation was successful, prompting
            // it to close the browser payment method collection interface.
            event.complete('success');
            // Let Stripe.js handle the rest of the payment flow, including 3D Secure if needed.
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                response.paymentIntent.client_secret
            );
            if (error) {
                console.log(error);
                return;
            }
            if (paymentIntent.status === 'succeeded') {
                router.push('/');
            } else {
                console.warn(
                    `Unexpected status: ${paymentIntent.status} for ${paymentIntent}`
                );
            }
        }
    };
    // if (paymentRequest) {
    //     return <PaymentRequestButtonElement options={{ paymentRequest }} />;
    // }

    return (
        <>
            <div className="m-h-screen min-w-screen bg-slate-200 py-6 flex flex-col justify-center overflow-hidden sm:py-12">
                {!user && <div
                    className="p-4 mb-4 self-center lg:w-[45%] text-sm text-green-700 bg-green-100 rounded-lg"
                    role="alert"
                >
                    <span className="font-medium"> You are not registerd.</span> Your donation will be anonymous in Compassion.

                </div>
                }
                <div className="flex h-auto flex-col border p-8 px-10 lg:w-[45%] bg-white shadow-xl w-[95%]  mx-auto rounded-xl">
                    <div
                        style={{ transition: 'all 0.6s ease' }}
                        className={`relative ${show_alert ? 'block translate-x-[0px] opacity-[100%]' : 'translate-x-[200px] opacity-0'}   p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg `}
                        role="alert"
                    >
                        <button onClick={() => { setShowAlert(false) }} className='absolute cursor-pointer top-[15px] right-[15px] font-semibold '>X</button>
                        <p>{alert_text}</p>
                    </div>

                    <a href={`/f/${slug}`} className='text-gray-800 flex items-center border-2 border-gray-400 rounded-md w-fit px-2 py-1' >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-chevron-left"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <p>Back to fundraiser</p>
                    </a>
                    <div className='flex my-5 flex-wrap gap-5 items-center'>
                        {fundraiser.attributes.image && fundraiser.attributes.image.data &&
                            <div className='w-fit'>
                                <img
                                    className=" lg:w-[12rem] w-[8rem] object-cover object-center rounded-sm"
                                    src={server_url + fundraiser.attributes.image.data[0]['attributes']['url']} />
                            </div>
                        }{!fundraiser.attributes.image &&
                            <img
                                className=" lg:w-[12rem] w-[8rem] object-cover object-center rounded-sm"
                                src={"/assets/image-placeholder.jpg"}
                                alt={fundraiser.attributes.name}
                            />
                        }
                        <div>
                            <h3 className='text-gray-600'>You're supporing <strong className='font-medium text-gray-800'>{fundraiser.attributes.title}</strong></h3>
                            {fundraiser.attributes.charity.data &&
                                <h3 className='text-gray-600'>You're supporing <a href={`/charities/${slug}/`} className='font-medium text-gray-800'>{fundraiser.attributes.charity.data.attributes.name}</a></h3>
                            }
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <div className='flex items-baseline gap-1'>
                            <p className='text-gray-900 text-2xl title-font font-medium'>{fundraiser.attributes.fund_raised}</p>
                            <p className='text-gray-600 font-medium ' >{(fundraiser.attributes.fund_type as string).toUpperCase()}</p>
                        </div>
                        <p>raised</p>
                        <p className='font-light text-sm text-gray-500'>&nbsp;of&nbsp; {fundraiser.attributes.fund_target}</p>
                    </div>
                    <div className="w-full bg-green-400 bg-opacity-20 h-1 mt-1 mb-3" >
                        <div className="bg-green-500 h-1 w-max-[100%]" style={{ width: `${Math.floor((fundraiser.attributes.fund_raised / fundraiser.attributes.fund_target) * 100)}%` }}></div>
                    </div>
                    <label htmlFor="price" className="block text-xl font-medium text-gray-700">
                        Enter your donation
                    </label>
                    <div className="mt-1 relative rounded-md flex flex-row items-center shadow-sm">
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={donation_amount}
                            className="appearance-none text-gray-800 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-2xl  border-gray-800 rounded-md"
                            onChange={e => {
                                setDonationAmount(parseInt(e.target.value));
                            }}
                            placeholder={'0.0'}
                        />
                        <div className="absolute inset-y-0 right-0  flex justify-center items-center px-5">
                            <p className="text-gray-600 font-medium">{(fundraiser.attributes.fund_type as string)?.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="w-full mx-auto mt-5">
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Word of support
                        </label>
                        <textarea
                            id="message"
                            rows={2}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                            value={comment}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 s"
                            placeholder="Your message..."
                        />
                    </div>
                    <p className='mb-8 text-gray-700 font-light mt-5'>We protect your donation with the Compassion Giving Guarantee</p>
                    <div className='flex flex-wrap gap-8' >
                        <div onClick={startCheckOut} className='flex w-[13rem] flex-col items-center bg-white text-gray-600 px-4 py-4 rounded-lg my-5 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer'   >
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> */}
                            <img src="/assets/credit-card.png" className='w-16 h-16' alt="" />
                            <h4 className='font-medium mt-2'>Credit/Debit card</h4>
                            <h5 className='text-sm'>(Processed via Stripe) </h5>
                        </div>
                        <a href={`/f/${slug}/donate/upi-payment`} className='flex flex-col w-[13rem] items-center bg-white text-gray-600 px-4 py-4 rounded-lg my-5 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer'   >
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> */}
                            <img src="/assets/upi-payment.png" className='w-16 h-16' alt="" />
                            <h4 className='font-medium mt-2'>UPI</h4>
                            <h5 className='text-sm'>(via QRcode) </h5>
                        </a>
                        <div className='flex-col w-[13rem] items-center justify-center px-4 py-4  my-5'   >

                            {
                                paymentRequest &&
                                <PaymentRequestButtonElement className='w-[100%]' options={{ paymentRequest }} />
                            }
                            <h4 className='font-medium mt-2 text-center'>Via Gpay</h4>
                        </div>
                    </div>
                    {/* <button  className="px-4 w-fit py-2 rounded text-white mt-8 lg:mt-0 bg-[#32a95c]">
                        Continue
                    </button> */}
                </div>
            </div >
        </>

    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const slug = context.params ? context.params['slug']?.toString().toLocaleLowerCase() : [];
    const token = context.req.cookies[jwt_aut_token];

    if (!slug) {
        return {
            props: {
                fundraiser: undefined
            }
        }
    }
    const query = qs.stringify({
        filters: {
            slug: {
                $eq: slug
            }
        },
        populate: ["image", "user", 'charity']
    })

    const headers: any = token ? {
        Authorization: `Bearer ${token}`,
    } : {};

    const fundraiser_res = (await fetch(server_url + "/api/fund-raises?" + query, {
        method: "GET",
        headers: headers
    }));
    if (fundraiser_res.status > 201) {
        return { notFound: true };
    }
    const fundraiser = await fundraiser_res.json();
    if (!fundraiser.data || fundraiser.data.length <= 0) {
        return {
            notFound: true
        }
    }

    const user_res = await fetch(server_url + "/api/users/me", {
        method: "GET",
        headers: headers
    })

    if (user_res.status > 201) {
        return {
            props: {
                fundraiser: fundraiser['data'][0], user: null, slug,
                strapi_publisable_key: process.env.STRIPE_PUBLISHABLE_KEY ? process.env.STRIPE_PUBLISHABLE_KEY : ''
            }
        }
    }
    const user = await user_res.json();
    return {
        props: {
            fundraiser: fundraiser['data'][0],
            user,
            slug,
            strapi_publisable_key: process.env.STRIPE_PUBLISHABLE_KEY ? process.env.STRIPE_PUBLISHABLE_KEY : ''
        }
    }
}