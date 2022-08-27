import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import qs from 'qs';
import React, { useEffect, useState } from 'react'
import { jwt_aut_token, server_url } from '../../../../config';
import { loadStripe, } from '@stripe/stripe-js';
import axios, { AxiosError } from 'axios';
import { generate } from 'generate-password'
import Cookies from 'js-cookie';

interface Props {
    fundraiser: any;
    user: any;
    slug: string;
    stripe_publishable_key: string;
}

// export default function Wrapper(props: any) {
//     const stripePromise = loadStripe(props.strapi_publisable_key);
//     return <Elements stripe={stripePromise}>
//         <MyComponent {...props} />
//     </Elements>
// };

export default function donate({ fundraiser, slug, user, stripe_publishable_key }: Props) {
    const [donation_amount, setDonationAmount] = useState(0);
    const [comment, setComment] = useState('');
    const [show_alert, setShowAlert] = useState(false);
    const [alert_text, setAlertText] = useState('');
    const [open_popup, setOpenPopup] = useState(false);
    const [loading, setLoading] = useState(false);


    const startCheckOut = async () => {
        if (loading) return;
        if (donation_amount <= 0) {
            setAlertText('Donation amount should be at-least 50 cents ($0.5)'); setShowAlert(true);
            return;
        }
        const stripe = await loadStripe(stripe_publishable_key);
        if (!stripe) {
            alert("Our payment system is broken! Try again after some time.");
            return;
        };
        try {
            setLoading(true);
            var item: any = {
                currency: (fundraiser.attributes.fund_type as string).toUpperCase(),
                name: fundraiser.attributes.title,
                image: fundraiser.attributes.image.data ? server_url + fundraiser.attributes.image.data[0]['attributes']['url'] : window.location.origin + "/assets/image-placeholder.jpg",
                price: donation_amount,
                description: fundraiser.attributes.description,
                charity: fundraiser.attributes['charity']['data'] ? fundraiser.attributes['charity']['data']['id'] : null,
                user: user ? user['id'] : null,
                comment: comment,
                fund_raise: fundraiser.id,
                fundraiser_details: fundraiser,
            }
            if (!user) {
                let first_name = document.getElementById('first_name') as HTMLInputElement
                let last_name = document.getElementById('last_name') as HTMLInputElement
                let email = document.getElementById('email') as HTMLInputElement
                let password = generate({ length: 12, numbers: true, uppercase: false, symbols: false });
                item['new_user'] = {
                    username: first_name.value + ' ' + last_name.value,
                    email: email.value,
                    password
                }
            }
            const checkoutSession = await axios.post(server_url + '/api/donations/create-stripe-session', {
                item: item
            });
            if (item.new_user) {
                fetch(server_url + '/api/auth/local', {
                    mode: "cors",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        identifier: item.new_user.email,
                        password: item.new_user.password,
                    })
                }).then((res) => {
                    res.json().then(res_json => {
                        if (!res_json.error && res_json.jwt) {
                            localStorage.setItem(jwt_aut_token, res_json.jwt);
                            Cookies.set(jwt_aut_token, res_json.jwt);
                        } else {
                            setShowAlert(true);
                            setAlertText(res_json.error.message)
                        }
                    })
                })
            }
            if (checkoutSession.data.error) {
                setAlertText(checkoutSession.data.error);
                setShowAlert(true);
                console.error(checkoutSession.data.error); return;
            }
            const { error } = await stripe.redirectToCheckout({
                sessionId: checkoutSession.data.id,
            })
            if (error) {
                alert("Our payment system is broken! Try again after some time.");
                setLoading(false);
                return;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setShowAlert(true);
                setAlertText((error.response as any).data.error);
            }
            setLoading(false);
            return;
        }

    }

    const startCoinBaseCharge = async () => {
        if (loading) return;
        if (donation_amount <= 0) {
            setAlertText('Donation amount should be at-least 50 cents ($0.5)'); setShowAlert(true);
            return
        }
        try {
            setLoading(true);
            var item: any = {
                currency: (fundraiser.attributes.fund_type as string).toUpperCase(),
                name: fundraiser.attributes.title,
                image: fundraiser.attributes.image.data ? server_url + fundraiser.attributes.image.data[0]['attributes']['url'] : window.location.origin + "/assets/image-placeholder.jpg",
                price: donation_amount,
                description: (fundraiser.attributes.description) ? (fundraiser.attributes.description as string).slice(0, 198) : 'No description',
                charity: fundraiser.attributes['charity']['data'] ? fundraiser.attributes['charity']['data']['id'] : null,
                user: user ? user['id'] : null,
                comment: comment,
                fund_raise: fundraiser.id,
                fundraiser_details: fundraiser
            }
            if (!user) {
                let first_name = document.getElementById('first_name') as HTMLInputElement
                let last_name = document.getElementById('last_name') as HTMLInputElement
                let email = document.getElementById('email') as HTMLInputElement
                let password = generate({ length: 12, numbers: true, uppercase: false, symbols: false });
                item['new_user'] = {
                    username: first_name.value + ' ' + last_name.value,
                    email: email.value,
                    password: password
                }
            }
            const charge = await axios.post(server_url + '/api/donations/create-charge', {
                item: item
            });
            if (item.new_user) {
                fetch(server_url + '/api/auth/local', {
                    mode: "cors",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        identifier: item.new_user.email,
                        password: item.new_user.password,
                    })
                }).then((res) => {
                    res.json().then(res_json => {
                        if (!res_json.error && res_json.jwt) {
                            localStorage.setItem(jwt_aut_token, res_json.jwt);
                            Cookies.set(jwt_aut_token, res_json.jwt);
                        } else {
                            setShowAlert(true);
                            setAlertText(res_json.error.message)
                        }
                    })
                })
            }
            if (charge.data.error) {
                console.error(charge.data.error);
                alert("Our payment system is borken! Try again after some time.");
                setLoading(false);
                return;
            }
            window.open(charge.data.hosted_url, '_blank');
            setLoading(false);
            return;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setShowAlert(true);
                setAlertText((error.response as any).data.error);
            }
            setLoading(false);
            return;
        }
    }

    return (
        <>
            <style>
                {`.loader {
                	border-top-color: #3498db;
                	-webkit-animation: spinner 1.5s linear infinite;
                	animation: spinner 1.5s linear infinite;
                }
                
                @-webkit-keyframes spinner {
                	0% {
                		-webkit-transform: rotate(0deg);
                	}
                	100% {
                		-webkit-transform: rotate(360deg);
                	}
                }
                
                @keyframes spinner {
                	0% {
                		transform: rotate(0deg);
                	}
                	100% {
                		transform: rotate(360deg);
                	}
                }
            `}
            </style>
            {loading &&
                <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                    <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
                    <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
                </div>
            }
            <style>@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')</style>

            <div className=" min-w-screen bg-slate-200 py-6 flex flex-col justify-center overflow-hidden sm:py-12">
                {/* {!user && <div
                    className="p-4 mb-4 self-center lg:w-[45%] text-sm text-green-700 bg-green-100 rounded-lg"
                    role="alert"
                >
                    <span className="font-medium"> You are not registered.</span> Your donation will be anonymous in Compassion.

                </div>
                } */}
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
                            <h3 className='text-gray-600'>You're supporting <strong className='font-medium text-gray-800'>{fundraiser.attributes.title}</strong></h3>
                            {fundraiser.attributes.charity.data &&
                                <h3 className='text-gray-600'>You're supporting <a href={`/charities/${slug}/`} className='font-medium text-gray-800'>{fundraiser.attributes.charity.data.attributes.name}</a></h3>
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
                            className={`appearance-none text-gray-800 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-2xl   border-gray-800 rounded-md`}
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
                            className="block mb-2 text-md font-medium text-gray-800 "
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
                    {!user &&
                        <div className="w-full mx-auto mt-5">
                            <label
                                htmlFor="message"
                                className="block mb-2 text-md font-medium text-gray-800 "
                            >
                                Donar Details
                            </label>
                            <div className="flex -mx-3">
                                <div className="w-1/2 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        First name
                                    </label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                                        </div>
                                        <input
                                            type="text"
                                            id='first_name'
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                            placeholder="John"
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Last name
                                    </label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <i className="mdi mdi-account-outline text-gray-400 text-lg" />
                                        </div>
                                        <input
                                            id='last_name'
                                            type="text"
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                            placeholder="Smith"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">
                                        Email
                                    </label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                            <i className="mdi mdi-email-outline text-gray-400 text-lg" />
                                        </div>
                                        <input
                                            id='email'
                                            type="email"
                                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                            placeholder="johnsmith@example.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    <li className='mb-3 text-gray-700 font-light mt-2'>We protect your donation with the Compassion Giving Guarantee</li>
                    <div className='flex flex-wrap gap-3 lg:gap-8' >
                        <div onClick={startCheckOut} className='flex mx-auto  w-[80%] lg:w-[13rem] flex-col items-center bg-white text-gray-600 px-4 py-4 rounded-lg my-5 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer'   >
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> */}
                            <img src="/assets/credit-card.png" className='w-16 h-16' alt="credit-card" />
                            <h4 className='font-medium mt-2'>Credit/Debit card</h4>
                            <h5 className='text-sm'>(Processed via Stripe) </h5>
                        </div>
                        <a href={`/f/${slug}/donate/upi-payment`} className='flex mx-auto  flex-col w-[80%] lg:w-[13rem] items-center bg-white text-gray-600 px-4 py-4 rounded-lg my-5 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer'   >
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> */}
                            <img src="/assets/upi-payment.png" className='w-16 h-16' alt="upi-payment" />
                            <h4 className='font-medium mt-2'>UPI</h4>
                            <h5 className='text-sm'>(via QRcode) </h5>
                        </a>
                        {/* {
                            paymentRequest &&
                            <div className='flex mx-auto -col w-[80%] lg:w-[13rem] items-center justify-center px-4 py-4  my-5'   >
                                <PaymentRequestButtonElement className='w-[100%]' options={{ paymentRequest }} />
                                <h4 className='font-medium mt-2 text-center'>Via Gpay</h4>
                            </div>
                        } */}
                        <div onClick={startCoinBaseCharge} className='flex mx-auto  w-[80%] lg:w-[13rem] flex-col items-center bg-white text-gray-600 px-4 py-4 rounded-lg my-5 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer' >
                            <img src="/assets/coinbase-icon.svg" className='w-16 h-16' alt="coinbase-wallet" />
                            <h4 className='font-medium mt-2'>Coinbase</h4>
                            <h5 className='text-sm'>(via CoinBase) </h5>
                        </div>
                        <div
                            onClick={() => {
                                setOpenPopup(true);
                                document.documentElement.scrollTop = 0;
                                document.documentElement.style.overflow = 'hidden'
                            }}
                            className='flex mx-auto  w-[80%] lg:w-[13rem] flex-col items-center bg-white text-gray-600 px-4 py-4 rounded-lg my-5 shadow-2xl hover:scale-[1.02] transition-all cursor-pointer' >
                            <img src="/assets/crypto-wallet.png" className='w-16 h-16' alt="coinbase-wallet" />
                            <h4 className='font-medium mt-2'>Crypto</h4>
                            <h5 className='text-sm'>(via ) </h5>
                        </div>
                    </div>

                    {open_popup &&
                        <div
                            className="w-screen top-0 left-0 right-0 bottom-0 h-screen bg-gray-500 bg-opacity-80 py-6 flex flex-col justify-center sm:py-12 absolute">
                            <div className="py-3 sm:w-1/2 w-full sm:mx-auto relative" >
                                <div onClick={() => {
                                    setOpenPopup(false);
                                    document.documentElement.style.overflow = 'auto'
                                }} className='rounded-full w-[1.5rem]  absolute top-[-2px] right-[15px] lg:top-[-2rem] lg:right-[-2rem] h-[1.5rem]  cursor-pointer bg-gray-200 text-gray-800  flex justify-center items-center '>
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-5 h-5"
                                    >
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>

                                </div>
                                <div className="bg-white mx-auto min-w-1xl flex w-[80%] lg:w-auto flex-col lg:max-h-[50rem] max-h-[30rem] overflow-y-scroll rounded-xl shadow-lg">
                                    <a href={`/f/${slug}/donate/btc`} className="lg:px-12 cursor-pointer px-5 py-5 flex flex-row items-center gap-3">
                                        <img src="/assets/btc.png" alt="bitcoin" className='w-10 h-10' />
                                        <div className='flex-col items-start'>
                                            <p className='font-medium text-xl text-gray-600'>BTC</p>
                                            <p className=' text-gray-600'>Bitcoin</p>
                                        </div>
                                    </a>
                                    <hr className='w-[95%] mx-auto' />
                                    <a href={`/f/${slug}/donate/btc-bep-20`} className="lg:px-12 cursor-pointer px-5 py-5 flex flex-row items-center gap-3">
                                        <img src="/assets/btc.png" alt="bitcoin" className='w-10 h-10' />
                                        <div className='flex-col items-start'>
                                            <p className='font-medium text-xl text-gray-600'>BTC(BEP-20)</p>
                                            <p className=' text-gray-600'>Bitcoin (BEP-20)</p>
                                        </div>
                                    </a>
                                    {/* <a href={`/f/${slug}/donate/tron`} className="lg:px-12 cursor-pointer px-5 py-5 flex flex-row items-center gap-3">
                                        <img src="/assets/trx.png" alt="troncoin" className='w-10 h-10' />
                                        <div className='flex-col items-start'>
                                            <p className='font-medium text-xl text-gray-600'>TRX</p>
                                            <p className=' text-gray-600'>TronCoin</p>
                                        </div>
                                    </a> */}
                                    <hr className='w-[95%] mx-auto' />
                                    <a href={`/f/${slug}/donate/bnb`} className="lg:px-12 cursor-pointer px-5 py-5 flex flex-row items-center gap-3">
                                        <img src="/assets/bnb.png" alt="binance" className='w-10 h-10' />
                                        <div className='flex-col items-start'>
                                            <p className='font-medium text-xl text-gray-600'>BNB</p>
                                            <p className=' text-gray-600'>Binance</p>
                                        </div>
                                    </a>
                                    <hr className='w-[95%] mx-auto' />
                                    <a href={`/f/${slug}/donate/ada`} className="lg:px-12 cursor-pointer px-5 py-5 flex flex-row items-center gap-3">
                                        <img src="/assets/ada.png" alt="binance" className='w-10 h-10' />
                                        <div className='flex-col items-start'>
                                            <p className='font-medium text-xl text-gray-600'>ADA</p>
                                            <p className=' text-gray-600'>Cardano(ADA)</p>
                                        </div>
                                    </a>
                                    <hr className='w-[95%] mx-auto' />
                                    <a href={`/f/${slug}/donate/avax`} className="lg:px-12 cursor-pointer px-5 py-5 flex flex-row items-center gap-3">
                                        <img src="/assets/avax.png" alt="binance" className='w-10 h-10' />
                                        <div className='flex-col items-start'>
                                            <p className='font-medium text-xl text-gray-600'>AVAX</p>
                                            <p className=' text-gray-600'>Avalanche(AVAX)</p>
                                        </div>
                                    </a>
                                    <hr className='w-[95%] mx-auto' />
                                    <a href={`/f/${slug}/donate/eth`} className="lg:px-12 cursor-pointer px-5 py-5 flex flex-row items-center gap-3">
                                        <img src="/assets/eth.png" alt="binance" className='w-10 h-10' />
                                        <div className='flex-col items-start'>
                                            <p className='font-medium text-xl text-gray-600'>ETH</p>
                                            <p className=' text-gray-600'>Ethereum</p>
                                        </div>
                                    </a>
                                    <hr className='w-[95%] mx-auto' />
                                    <a href={`/f/${slug}/donate/ftm`} className="lg:px-12 cursor-pointer px-5 py-5 flex flex-row items-center gap-3">
                                        <img src="/assets/ftm.png" alt="binance" className='w-10 h-10' />
                                        <div className='flex-col items-start'>
                                            <p className='font-medium text-xl text-gray-600'>FTM</p>
                                            <p className=' text-gray-600'>Fantom</p>
                                        </div>
                                    </a>
                                    <hr className='w-[95%] mx-auto' />
                                    <a href={`/f/${slug}/donate/polygon-matic`} className="lg:px-12 cursor-pointer px-5 py-5 flex flex-row items-center gap-3">
                                        <img src="/assets/matic.png" alt="binance" className='w-10 h-10' />
                                        <div className='flex-col items-start'>
                                            <p className='font-medium text-xl text-gray-600'>MATIC</p>
                                            <p className=' text-gray-600'>Polygon Matic</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div >
        </>

    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
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
                stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY ? process.env.STRIPE_PUBLISHABLE_KEY : ''
            }
        }
    }
    const user = await user_res.json();
    return {
        props: {
            fundraiser: fundraiser['data'][0],
            user,
            slug,
            stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY ? process.env.STRIPE_PUBLISHABLE_KEY : ''
        }
    }
}