import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React, { useEffect, useState } from 'react'
import { fundraiser_ref, fundraiser_update_ref, jwt_aut_token, server_url } from '../../../config';
import qs from 'qs';
import 'react-quill/dist/quill.snow.css'

import axios from 'axios';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface Props {
    is_auth: boolean,
    user: any | null;
    token: string;
    fundraiser: any
}

export default function fundraiser({ is_auth, user, token, fundraiser }: Props) {
    const [submitting, setSubmitting] = useState(false);
    const [description, setDescription] = useState('');
    const [show_alert, setShowAlert] = useState(false);
    const [alert_text, setAlertText] = useState('');
    const [image, setImage] = useState<File | undefined>(undefined)
    const router = useRouter();
    var formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ],
    }
    const submit = async () => {
        if(submitting)return;
        setSubmitting(true);
        let res = await axios.post(server_url + "/api/fundraiser-updates", {
            data: {
                description,
                fundraiser: fundraiser.id
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.status > 200) {
            setShowAlert(true);
            setAlertText("Oops! Something went wrong.")
            setSubmitting(false)
            return;
        } else {
            // console.log(res.data.data.id);
            if (image) {
                const formData = new FormData();
                formData.append('files', image)
                formData.append('refId', res.data.data.id)
                formData.append('ref', fundraiser_update_ref)
                formData.append('field', 'image');
                let upload_res = await axios.post(server_url + "/api/upload", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            }
            setSubmitting(false);
            router.push("/manage-fundraisers")
        }
    }

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.files![0]);

    }

    return (
        <div>
            <>
                <div className="min-w-screen bg-slate-200 lg:py-14 flex flex-col justify-center overflow-hidden sm:py-12 relative">
                    <div className="border min-h-[15rem] lg:min-h-[18rem] px-8 py-4 lg:w-[45%] bg-white shadow-xl md:min-w-1/2  mx-auto rounded-xl relative" >
                        <div
                            style={{ transition: 'all 0.6s ease' }}
                            className={`relative ${show_alert ? 'block translate-x-[0px] opacity-[100%]' : 'translate-x-[200px] opacity-0'}   p-4 mb-2 text-sm text-yellow-700 bg-yellow-100 rounded-lg  dark:bg-yellow-200 dark:text-yellow-800`}
                            role="alert"
                        >
                            <button onClick={() => { setShowAlert(false) }} className='absolute cursor-pointer top-[15px] right-[15px] font-semibold '>X</button>
                            <p>{alert_text}</p>
                        </div>

                            <>
                                <div className="font-medium m-auto text-xl text-green-900 mb-5 text-center">
                                    Add new Update
                                </div>
                                <ReactQuill className='mb-8 mt-2' theme="snow" value={description} modules={modules} formats={formats} onChange={setDescription} />
                                {/* <ReactQuill className='mb-8' readOnly={true} theme="bubble" value={value} /> */}
                                <div className='flex flex-row items-center'>
                                    <div className="shrink-0">
                                        <img
                                            className="object-cover w-12 h-12 rounded-full"
                                            src="https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png"
                                            alt="profile photo"
                                        />
                                    </div>
                                    <label className="block">
                                        <span className="sr-only">Choose image</span>
                                        <input
                                            type="file" accept='image/*'
                                            onChange={onImageChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 ml-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </label>
                                </div>
                                {image &&
                                    <button type="button" className="py-1 px-4 mt-3  text-xs font-medium ext-red-500 text-center text-red-500 bg-opacity-100 rounded-lg hover:bg-red-100 focus:ring-4  bg-red-50 ">cancel file</button>
                                }
                                <button onClick={submit} type='submit' className={`${submitting ? 'disabled ' : ""} mt-7 ${submitting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}  flex flex-row items-center justify-center  shadow-xl text-white   text-[1rem] font-medium px-14 py-2 rounded w-full `}>
                                    <p>
                                        Save
                                    </p>
                                    {submitting &&
                                        <svg
                                            className="animate-spin  h-4 ml-2 w-4 text-white"
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
                            </>
                    </div>
                </div>
            </>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const token = context.req.cookies[jwt_aut_token];
    const slug = context.params ? context.params['slug']?.toString().toLocaleLowerCase() : [];
    const redirect: any = {
        destination: "/register",
        statusCode: 307,
        basePath: false
    }
    // const res_json
    try {
        if (!token) {
            return {
                redirect
            }
        }
        let res = (await fetch(server_url + "/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }))
        if (res.status > 201) {
            return { redirect }
        }
        let user = await res.json();
        let query = qs.stringify({
            filters: {
                slug: { $eq: slug }
            }
        })

        let fundraiser = await ((await fetch(server_url + "/api/fund-raises?" + query)).json())
        if (!fundraiser.data || fundraiser.data.length <= 0) { return { notFound: true } }
        fundraiser = fundraiser.data[0];
        return {
            props: {
                is_auth: true, user: user, token: token, fundraiser
            }
        };

    } catch (err) {
        console.error(err);
        return {
            redirect: {
                destination: "/register",
                statusCode: 307,
                basePath: false
            }
        }
    }
}