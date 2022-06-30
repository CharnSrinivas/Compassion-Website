import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import qs from 'qs';
import React, { ChangeEvent, useState } from 'react'
import { jwt_aut_token, server_url, donations_ref } from '../../../../config';
import { loadStripe } from '@stripe/stripe-js'
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

interface Props {
    fundraiser: any;
    user: any;
    slug: string;
    strapi_publisable_key: string;
    token: string
}

export default function donate({ fundraiser, slug, user, strapi_publisable_key, token }: Props) {
    const [donation_amount, setDonationAmount] = useState(0);
    const [comment, setComment] = useState('');
    const [show_alert, setShowAlert] = useState(false);
    const [alert_text, setAlertText] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const router = useRouter();

    const startCheckOut = async () => {
        if (donation_amount <= 0) {
            setAlertText('Donation amount should be atleast 50 cents ($0.5)');
            setShowAlert(true);
            return;
        }
        const stripe = await loadStripe(strapi_publisable_key);
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

    const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const display_img = document.getElementById('img-display') as HTMLImageElement;
        const file = e.target.files;
        if (!display_img || !file) return;
        var reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = function (e) {
            display_img.src = e.target!.result as string;
        }
    }

    const uploadImage = async () => {
        try {
            const img = (document.getElementById('img-upload') as HTMLInputElement).files;
            if (!img || (img.length <= 0) ) {
                setShowAlert(true);
                setAlertText("Upload payment screenshot");
                return;
            };
            if(donation_amount <=0 ){
                setShowAlert(true);
                setAlertText("Donation amount should be at least of 50cents ($0.5).");
                return;
            }
            setUploading(true);
            let donation = await axios.post(server_url + "/api/donations", {
                data: {
                    comment,
                    amount: donation_amount,
                    fund_raise: fundraiser['id'],
                    type: 'upi',
                    user: user ? user : null
                }
            });
            const formData = new FormData();
            formData.append('files', img[0]);
            formData.append('refId', donation.data.data.id);
            formData.append('ref', donations_ref);
            formData.append('field', 'images');
            setUploading(true);
            let res = await axios.post(server_url + "/api/upload", formData, {
                headers: {
                    // Authorization: `Bearer ${token}`,
                },
                onUploadProgress: (progressEvent) => {
                    let progress = (progressEvent.loaded / progressEvent.total) * 100;
                    setUploadPercentage(progress)
                    if (progress >= 100) {
                        setUploading(false);
                        setUploadPercentage(100);
                    }
                },
            })
            setUploading(false);
            if (res.status <= 201) {
                if (user) {
                    router.push(`/my-donations`); return;
                } else {
                    router.push("/")
                }
            }
        } catch (error) {
            console.error(error);
            setUploading(false);
            setUploadPercentage(0);
        }
    }
    return (
        <>
            <div className=" min-w-screen bg-slate-200 py-6 flex flex-col justify-center overflow-hidden sm:py-12">
                {!user && <div
                    className="p-4 mb-4 self-center lg:w-[45%] text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                    role="alert"
                >
                    <span className="font-medium"> You are not registerd.</span> Your donation will be anonymous in Compassion.

                </div>
                }
                <div className="flex flex-col border p-8 px-10 lg:w-[45%] bg-white shadow-xl w-[95%]  mx-auto rounded-xl">
                    <div
                        style={{ transition: 'all 0.6s ease' }}
                        className={`relative ${show_alert ? 'block translate-x-[0px] opacity-[100%]' : 'translate-x-[200px] opacity-0'}   p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800`}
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
                        Enter donation amount
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
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
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
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your message..."
                        />
                    </div>
                    <p className='mb-8 text-gray-700 font-light mt-5'>We protect your donation with the Compassion Giving Guarantee</p>
                    <img className='lg:w-[22rem] mx-auto' src="/assets/qr-placeholder.png" alt="UPI Qrcode" />

                    <label
                        htmlFor="img-upload"
                        className="mx-auto my-5 cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-green-400 bg-white p-6 text-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                            Payment screenshot
                        </h2>
                        <p className="mt-2 text-gray-500 tracking-wide">
                            Upload your payment screenhot
                        </p>
                        <input onChange={(e) => { changeImage(e) }} id="img-upload" type="file" className="hidden" />
                    </label>
                    <img
                        id='img-display'
                        className="lg:w-fit mx-auto w-full lg:h-[32rem] h-[28rem] object-cover object-center rounded-lg"
                        defaultValue={'/assets/image-placeholder.jpg'}
                        src="/assets/image-placeholder.jpg" alt=""
                    />
                    <p className='mb-8 text-gray-700 font-light mt-5'>Your payment will be approved by admin.</p>

                    <button onClick={uploadImage} className="px-4 w-full py-2 rounded flex items-center justify-center text-white mt-12 lg:mt-0 bg-[#32a95c]">
                        <p>Continue</p>
                        {uploading &&
                            <svg
                                className="animate-spin ml-1  h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx={12}
                                    cy={12}
                                    r={10}
                                    stroke="currentColor"
                                    strokeWidth={4}
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        }
                    </button>
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
                strapi_publisable_key: process.env.STRIPE_PUBLISHABLE_KEY ? process.env.STRIPE_PUBLISHABLE_KEY : '',
                token: token ? token : null
            }
        }
    }
    const user = await user_res.json();
    return {
        props: {
            fundraiser: fundraiser['data'][0],
            user,
            slug,
            strapi_publisable_key: process.env.STRIPE_PUBLISHABLE_KEY ? process.env.STRIPE_PUBLISHABLE_KEY : '',
            token: token ? token : null
        }
    }
}