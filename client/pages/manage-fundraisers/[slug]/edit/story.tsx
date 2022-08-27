import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import qs from 'qs';
import React, { useState } from 'react'
import { jwt_aut_token, server_url } from '../../../../config';
import { useRouter } from 'next/router'
import axios from 'axios';
import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface Props {
    is_auth: boolean,
    fundraiser: any | null;
    token: string
}

export default function story({ fundraiser, is_auth, token }: Props) {
    const router = useRouter()
    const [description, setDescription] = useState(fundraiser.attributes.description);
    const [submitting, setSubmitting] = useState(false);

    const formats = [
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
        if (submitting) return
        setSubmitting(true);
        let res = await axios.put(server_url + `/api/fund-raises/${fundraiser.id}`, {
            data: {
                "description": description,
                "id": fundraiser.id
            }
        }, { headers: { Authorization: `Bearer ${token}`, } });
        if (res.status <= 201) {
            router.push(`/manage-fundraisers/my-fundraisers`);
        }
    }
    return (
        <div className="border p-8 my-8 px-10 w-[45%] bg-white shadow-xl md:min-w-1/2  mx-auto rounded-xl relative">

            <div className="font-medium m-auto text-4xl text-green-900 mt-7 text-center">Edit your story
            </div>
            <p className=" text-gray-500 text-center mt-3"> Explain who you are and why you're fundraising.</p>
            <ReactQuill className='mb-8 mt-2 bg-indigo-50' theme="snow" value={description} modules={modules} formats={formats} onChange={setDescription} />
            <button onClick={submit} className={`${submitting ? 'disabled ' : ""} mt-7 ${submitting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}  flex flex-row items-center justify-center  shadow-xl text-white   text-[1rem] font-medium px-14 py-3 rounded w-full `}>
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
        </div >
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const token = context.req.cookies[jwt_aut_token];
    const slug = context.params ? context.params['slug'] : undefined;
    const redirect_obj: Redirect = {
        destination: "/register",
        statusCode: 307,
        basePath: false
    }
    if (!slug) {
        return {
            notFound: true
        }
    }
    if (!token) {
        return {
            redirect: redirect_obj
        }
    }
    const query = qs.stringify({
        filters: {
            slug: {
                $eq: slug
            }
        }
    })

    try {
        let res = (await fetch(server_url + "/api/fund-raises?" + query, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        )
        if (res.status > 201) {
            return { redirect: redirect_obj }
        }
        let fundraiser = await res.json();

        if (!fundraiser.data || fundraiser.data.length <= 0) { return { redirect: redirect_obj } }
        return {
            props: {
                is_auth: true, fundraiser: fundraiser.data[0], token: token
            }
        }
    } catch (err) {
        console.error(err);
        return {
            redirect: redirect_obj
        }
    }
}