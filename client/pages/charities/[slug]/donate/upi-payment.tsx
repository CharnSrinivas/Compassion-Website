import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import qs from 'qs';
import React, { ChangeEvent, useState } from 'react'
import { jwt_aut_token, server_url, donations_ref } from '../../../../config';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const slug = context.params ? context.params['slug']?.toString().toLocaleLowerCase() : [];
    const token = context.req.cookies[jwt_aut_token];

    if (!slug) {
        return {
            notFound: true
        }
    }
    const query = qs.stringify({
        filters: {
            slug: {
                $eq: slug
            }
        },
        populate: ["image", "user"]
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

    if (user_res.status > 201) {
        return {
            props: {
                charity: charity['data'][0], user: null, slug,
                strapi_publisable_key: process.env.STRIPE_PUBLISHABLE_KEY ? process.env.STRIPE_PUBLISHABLE_KEY : '',
                token: token ? token : null
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
            token: token ? token : null
        }
    }
}

interface Props {
    charity: any;
    user: any;
    slug: string;
    strapi_publisable_key: string;
    token: string
}

export default function UpiPayment({ charity, slug, user, strapi_publisable_key, token }: Props) {
    const [donation_amount, setDonationAmount] = useState(0);
    const [comment, setComment] = useState('');
    const [show_alert, setShowAlert] = useState(false);
    const [alert_text, setAlertText] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const router = useRouter();

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

    const checkOut = async () => {
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
            let donation = await axios.post(server_url + "/api/charity-donations", {
                data: {
                    comment,
                    amount: donation_amount,
                    type: 'upi',
                    user: user ? user : null,
                    charity:charity.id
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
                            <h3 className='text-gray-600'>You're supporing <strong className='font-medium text-gray-800'>{charity.attributes.name}</strong></h3>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2   ">
                        <div className='flex items-baseline gap-1'>
                            <p className='text-gray-900 text-2xl title-font font-medium'>{charity.attributes.direct_funds}</p>
                            <p className='text-gray-600 font-medium uppercase' >{(charity.attributes.fund_type as string)}</p>
                        </div>
                        <p>direct funds raised</p>
                    </div>
                    <label htmlFor="price" className="block mt-8 text-xl font-medium text-gray-700">
                        Enter donation amount
                    </label>
                    <div className="mt-1 relative rounded-md flex flex-row items-center shadow-sm">
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={donation_amount}
                            className="appearance-none border-2 text-gray-800 py-2 block w-full pl-7 pr-12 text-2xl   border-gray-800 rounded-md"
                            onChange={e => {
                                setDonationAmount(parseFloat(e.target.value));
                            }}
                            placeholder={'0.0'}
                        />
                        <div className="absolute inset-y-0 right-0  flex justify-center items-center px-5">
                            <p className="text-gray-600 font-medium">{(charity.attributes.fund_type as string)?.toUpperCase()}</p>
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
                    <ol className='mb-8 list-decimal text-gray-700 font-light mt-5 ml-5'>
                        <li>Scan the QRcode below and complete the payment.</li>
                        <li>Upload the screenhot of your payment</li>
                    </ol>
                    <p>We protect your donation with the Compassion Giving Guarantee</p>

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

                    <button onClick={checkOut} className="px-4 w-full py-2 rounded flex items-center justify-center text-white mt-12 lg:mt-0 bg-[#32a95c]">
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

