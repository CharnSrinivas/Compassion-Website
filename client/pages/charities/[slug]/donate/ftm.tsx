import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import qs from 'qs';
import React, { ChangeEvent, useState } from 'react'
import { jwt_aut_token, server_url, donations_ref, charity_donation_ref } from '../../../../config';
import { useRouter } from 'next/router';
import { generate } from 'generate-password'
import axios from 'axios';
import CoinGeckoApi from 'coingecko-api'
interface Props {
    charity: any;
    user: any;
    slug: string;
    strapi_publisable_key: string;
    token: string;
    crypto_data: any
    currency_data: any
}

export default function donate({charity, slug, user, strapi_publisable_key, token, crypto_data, currency_data }: Props) {

    const [donation_amount, setDonationAmount] = useState(0);
    const [comment, setComment] = useState('');
    const [show_alert, setShowAlert] = useState(false);
    const [alert_text, setAlertText] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [donation_in_usd, setDonationInUSD] = useState(0);
    const [donation_in_coin, setDonationInCoin] = useState(0);
    const ftm_address = '0x8859d7c74Ba80764A4c0c336471A41D2aA7cB870'
    const router = useRouter();
    const coin_price = (crypto_data.data.market_data.current_price.usd);
    const currency_rate = parseFloat(currency_data.rates[(charity.attributes.fund_type as string).toUpperCase()] ? currency_data.rates[(charity.attributes.fund_type as string).toUpperCase()] : '-1');
    console.log(crypto_data);

    const onDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseFloat(e.target.value)
        if (isNaN(value)) {
            setDonationAmount(0)
            setDonationInCoin(0)
            setDonationInUSD(0)
            return;
        }
        setDonationAmount(value);
        console.log(e.target.value);

        let in_usd = (value / currency_rate)
        setDonationInUSD(in_usd);
        setDonationInCoin(in_usd / coin_price)
    }

    const uploadImage = async () => {
        try {
            const img = (document.getElementById('img-upload') as HTMLInputElement).files;
            if (!img || (img.length <= 0)) {
                setShowAlert(true);
                setAlertText("Upload payment screenshot");
                return;
            };
            if (donation_amount <= 0) {
                setShowAlert(true);
                setAlertText("Donation amount should be at least of 50cents ($0.5).");
                return;
            }
            setUploading(true);
            let new_user
            if (!user) {
                let first_name = document.getElementById('first_name') as HTMLInputElement
                let last_name = document.getElementById('last_name') as HTMLInputElement
                let email = document.getElementById('email') as HTMLInputElement
                let password = generate({ length: 12, numbers: true, uppercase: false, symbols: false });

                let register_res = await fetch(server_url + '/api/auth/local/register', {
                    mode: "cors",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: first_name.value + " " + last_name.value,
                        email: email.value,
                        password: password
                    })
                })
                let register_json = await register_res.json()
                console.log(register_json);
                if (register_json.error) {
                    setAlertText(register_json.error.message);
                    setShowAlert(true);
                    return
                }
                if (!register_json.error && register_json.jwt) {
                    new_user = register_json.user
                    localStorage.setItem(jwt_aut_token, register_json.jwt);
                }
            }
            let donation = await axios.post(server_url + "/api/charity-donations", {
                data: {
                    comment,
                    amount: donation_amount,
                    charity: charity['id'],
                    type: 'ftm',
                    user: user ? user : new_user
                }
            });
            const formData = new FormData();
            formData.append('files', img[0]);
            formData.append('refId', donation.data.data.id);
            formData.append('ref', charity_donation_ref);
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
                    router.push(`/my-donations/charity-donations`); return;
                } else {
                    window.location.href = '/charities/' + charity.attributes.slug
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
            <style>@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')</style>

            <div className=" min-w-screen bg-slate-200 py-6 flex flex-col justify-center overflow-hidden sm:py-12">

                <div className="flex flex-col border p-8 px-10 lg:w-[45%] bg-white shadow-xl w-[95%]  mx-auto rounded-xl">
                    <div
                        style={{ transition: 'all 0.6s ease' }}
                        className={`relative ${show_alert ? 'block translate-x-[0px] opacity-[100%]' : 'translate-x-[200px] opacity-0'}   p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800`}
                        role="alert"
                    >
                        <button onClick={() => { setShowAlert(false) }} className='absolute cursor-pointer top-[15px] right-[15px] font-semibold '>X</button>
                        <p>{alert_text}</p>
                    </div>

                    <a href={`/charities/${slug}`} className='text-gray-800 flex items-center border-2 border-gray-400 rounded-md w-fit px-2 py-1' >
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
                        <p>Back to charity</p>
                    </a>
                    <div className='flex my-5 flex-wrap gap-5 items-center'>
                        {charity.attributes.image && charity.attributes.image.data &&
                            <div className='w-fit'>
                                <img
                                    className=" lg:w-[12rem] w-[8rem] object-cover object-center rounded-sm"
                                    src={server_url + charity.attributes.image.data['attributes']['url']} />
                            </div>
                        }{!charity.attributes.image &&
                            <img
                                className=" lg:w-[12rem] w-[8rem] object-cover object-center rounded-sm"
                                src={"/assets/image-placeholder.jpg"}
                                alt={charity.attributes.name}
                            />
                        }
                        <div>
                            <h3 className='text-gray-600'>You're supporting <strong className='font-medium text-gray-800'>{charity.attributes.name}</strong></h3>
                            {/* {charity.attributes.user.data &&
                                <h3 className='text-gray-600'>You're supporting <a href={`/charities/${slug}/`} className='font-medium text-gray-800'>{charity.attributes.user.data.attributes.name}</a></h3>
                            } */}
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                        <div className='flex items-baseline gap-1'>
                            <p className='text-gray-900 text-2xl title-font font-medium'>{charity.attributes.direct_funds}</p>
                            <p className='text-gray-600 font-medium ' >{(charity.attributes.fund_type as string).toUpperCase()}</p>
                        </div>
                        <p>direct funds received</p>
                        <p className='font-light text-sm text-gray-500'>&nbsp;of&nbsp; {charity.attributes.fund_target}</p>
                    </div>
    <hr />
                    <label htmlFor="price" className="block text-xl  text-gray-600 mt-4">
                        Enter donation amount
                    </label>
                    <div className="mt-1 relative rounded-md flex flex-row items-center shadow-sm">
                        <input
                            type="number"
                            name="price"
                            id="price"
                            autoFocus
                            value={donation_amount}
                            className="appearance-none text-gray-800 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 text-2xl  border-gray-800 rounded-md"
                            onChange={onDonationChange}
                            placeholder={'0.0'}
                        />
                        <div className="absolute inset-y-0 right-0  flex justify-center items-center px-5">
                            <p className="text-gray-600 font-medium">{(charity.attributes.fund_type as string)?.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="w-full mx-auto mt-5 bg-[#eaf3f9] border-2 border-[#579cce]  flex-row flex justify-between flex-wrap items-center items-start p-4">
                        <h2 className='lg:text-xl'>Total</h2>
                        <div className='flex flex-col items-end '>
                            <div className='flex flex-row items-center gap-2'>
                                <img className='w-8 h-8' src="/assets/ftm.png" alt="fantom coin" />
                                <p className='font-medium text-xl lg:text-2xl'>{donation_in_coin.toFixed(4)}</p>
                            </div>
                            <p className='font-normal text-gray-600'>(US$ <b>{donation_in_usd.toFixed(3)}</b>)</p>
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
                    <p className='mb-8 text-gray-700 font-light mt-5'>We protect your donation with the Compassion Giving Guarantee</p>
                    <img className='lg:w-[22rem] mx-auto' src="/assets/qr-placeholder.png" alt="UPI Qrcode" />
                    <div className='flex flex-col  shadow-md px-5 py-5 items-start'>
                        <div className='flex flex-row justify-between  items-start w-[100%]'>
                            <p className='font-medium text-gray-400'>Fantom deposit Address</p>
                            <svg
                                onClick={() => {
                                    navigator.clipboard.writeText(ftm_address).then(() => {
                                        alert("Wallet address is copied to clipboard")
                                    })
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-5 h-5 text-gray-600 cursor-pointer"
                            >
                                <rect x={9} y={9} width={13} height={13} rx={2} ry={2} />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                        </div>
                        <p className='overflow-scroll lg:overflow-auto w-full font-medium text-gray-600 '>{ftm_address}</p>
                    </div>
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
                            Upload your payment screenshot
                        </p>
                        <input
                            // onChange={(e) => { changeImage(e) }} 
                            accept='image/*'

                            id="img-upload" type="file" className="hidden" />
                    </label>

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
    try {
        const server_url = 'http://127.0.0.1:1337';
        const slug = context.params ? context.params['slug']?.toString().toLocaleLowerCase() : [];
        const token = context.req.cookies[jwt_aut_token];

        if (!slug) {
            return {
                props: {
                    charity: undefined
                }
            }
        }
        const query = qs.stringify({
            filters: {
                slug: {
                    $eq: slug
                }
            },
            populate: ["image", "user", 'user']
        })

        const headers: any = token ? {
            Authorization: `Bearer ${token}`,
        } : {};

        const charity_res = (await fetch(server_url + "/api/charities?" + query, {
            method: "GET",
            headers: headers
        }));
        if (charity_res.status > 201) {
            return { notFound: true };
        }
        const charity = await charity_res.json();
        if (!charity.data || charity.data.length <= 0) {
            return {
                notFound: true
            }
        }

        const user_res = await fetch(server_url + "/api/users/me", {
            method: "GET",
            headers: headers
        })

        let crypto_data = await new CoinGeckoApi().coins.fetch('fantom', {});
        let currency_data = await axios.get('https://api.currencyfreaks.com/latest?apikey=' + process.env.CURRENCYFREAKS_API_KEY)
        if (user_res.status > 201) {
            return {
                props: {
                    charity: charity['data'][0], user: null, slug,
                    strapi_publisable_key: process.env.STRIPE_PUBLISHABLE_KEY ? process.env.STRIPE_PUBLISHABLE_KEY : '',
                    token: token ? token : null,
                    crypto_data: crypto_data,
                    currency_data: currency_data.data
                }
            }
        }
        const user = await user_res.json();
        return {
            props: {
                charity: charity['data'][0],
                user,
                slug,
                strapi_publisable_key: process.env.STRIPE_PUBLISHABLE_KEY ? process.env.STRIPE_PUBLISHABLE_KEY : '',
                token: token ? token : null,
                crypto_data: crypto_data,
                currency_data: currency_data.data
            }
        }
    } catch (error) {
        console.log(error);
        return {
            notFound: true
        }
    }
}