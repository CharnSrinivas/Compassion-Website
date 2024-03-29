import axios from 'axios';
import { useFormik } from 'formik';
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import { useRouter } from 'next/router';
import qs from 'qs';
import * as Yup from 'yup'

import React, { useState } from 'react'
import { jwt_aut_token, server_url } from '../../config';
import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface Props {
    charity: any | null;
    token: string
}

export default function edit({ charity, token }: Props) {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    console.log(charity);
    
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
    const formik = useFormik({
        initialValues: {
            name: charity['attributes']['name'] ? charity['attributes']['name'] : '',
            targetFunds: charity['attributes']['target_funds'] ? charity['attributes']['target_funds'] : 0,
            address: charity['attributes']['address'] ? charity['attributes']['address'] : '',
            category: charity['attributes']['category'] ? charity['attributes']['category'] : null,
            registerNumber: charity['attributes']['register_no'] ? charity['attributes']['register_no'] : '',
            description: charity['attributes']['description'] ? charity['attributes']['description'] : '',
        },
        validationSchema: Yup.object({
            name:
                Yup
                    .string()
                    .min(8)
                    .max(70, "Title should be less than 70 characters")
                    .required(),
            address:
                Yup
                    .string()
                    .min(3, "Invalid zip code")
                    .required('Zip Code is required'),
            registerNumber:
                Yup.number().required(),
            description:
                Yup.string().required("Description is required"),

        }),
        onSubmit: async (e) => {
            if(submitting)return;
            setSubmitting(true);
            // const name = (e.name).replaceAll(' ', '-');
                let res = await fetch(server_url + "/api/charities/" + charity.id,
    
                    {
                        method: "PUT",
    
                        body: JSON.stringify({
                            data: {
                                name: e.name,
                                address: e.address,
                                register_no: (e.registerNumber && !isNaN(e.registerNumber)) ? e.registerNumber : null,
                                description: e.description,
                                id: charity.id
                            }
                        }),
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': "application/json"
                        }
                    },
                );
                if (res.status <= 201) {
                    res.json().then(res_json => {
                        router.reload()
                    })
                }else{
                    setSubmitting(false);
                    router.reload()
                }
        }
    });
    return (
        <section id='edit-charity'>
            <div className='px-[5%] lg:px-[10%] mx-auto flex  flex-col items-start py-10 shadow'>
                <button className='flex items-center text-gray-600 px-3  border-2 border-gray-300 rounded-sm my-4'
                    onClick={() => { router.back() }}
                >
                    <svg
                        className='w-5 h-5 '
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width={48} height={48} fill="white" fillOpacity="0.01" />
                        <path
                            d="M31 36L19 24L31 12"
                            stroke="black"
                            strokeWidth={4}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <p>Back</p>
                </button>
                <div className='flex flex-wrap items-center gap-3 '>
                    {charity.attributes.image && charity.attributes.image.data &&
                        <img
                            className="lg:w-[5rem] object-cover object-center rounded-lg"
                            src={server_url + charity.attributes.image.data.attributes.url}
                            alt="content"
                        />
                    }{!charity.attributes.image || !charity.attributes.image.data &&
                        <img
                            className="lg:w-[5rem] object-cover object-center rounded-lg"
                            src={"/assets/image-placeholder.jpg"}
                            alt="content"
                        />
                    }
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-semibold text-3xl text-gray-700'>Edit & Settings</h1>
                        <h2 className='text-gray-600'>{charity['attributes']['name']}</h2>
                    </div>
                </div>
            </div>
            <div className='w[90%] lg:w-[70%] mx-auto flex flex-col px-8 items-start py-10'>

                <ul className='flex gap-10 '>
                    <div>
                        <a href='/manage-charity/edit' className='text-gray-700'>
                            Overview
                        </a>
                        <div className='h-[3.5px]   rounded-full w-full bg-green-600'></div>
                    </div>

                </ul>
                <div className='w-full h-[2px] bg-gray-200'></div>
                <form onSubmit={formik.handleSubmit} className='flex flex-wrap  py-8'>
                    <label htmlFor="" className="block font-medium">
                        Title
                    </label>
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        type="text"
                        name='name'
                        className="border w-full h-10 px-3 mb-5 rounded-md"
                        placeholder="Title..."
                    />
                    {
                        formik.errors.name &&
                        <p className="text-xs italic text-red-500">
                            {formik.errors.name}
                        </p>
                    }
                    <label htmlFor="" className="block font-medium">
                        Address
                    </label>
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        type="text"
                        name='address'
                        className="border w-full h-10 px-3 mb-5 rounded-md"
                        placeholder="Aaron Larson
              Zippy Diagnostics
              123 Center Ln.
              Plymouth, MN 55441"
                    />
                    {
                        formik.errors.address &&
                        <p className="text-xs italic text-red-500">
                            {formik.errors.address}
                        </p>
                    }

                    <label htmlFor="" className="block font-medium">
                        Register number
                    </label>
                    <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.registerNumber}
                        type="number"
                        name='registerNumber'
                        className="border w-full h-10 px-3 mb-5 rounded-md"
                        placeholder="0234234234"
                    />
                    {
                        formik.errors.registerNumber &&
                        <p className="text-xs italic text-red-500">
                            {formik.errors.registerNumber}
                        </p>
                    }

                    <ReactQuill className='mb-8 p-0 mt-2 bg-indigo-50' theme="snow" value={formik.values.description} modules={modules} formats={formats} onChange={formik.handleChange} />
                    {
                        formik.errors.description &&
                        <p className="text-xs italic text-red-500">
                            {formik.errors.description}
                        </p>
                    }
                    <button type='submit' className="mt-7 bg-green-500 hover:bg-green-600 shadow-xl text-white uppercase text-sm font-semibold px-14 py-3 rounded ">
                        save
                    </button>
                </form>
            </div>
        </section>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const token = context.req.cookies[jwt_aut_token];
    const redirect: Redirect = {
        destination: "/register",
        statusCode: 307,
        basePath: false
    }

    if (!token) {
        return { redirect }
    }

    let usr_res = (await fetch(server_url + "/api/users/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    );

    if (usr_res.status > 201) {
        return { props: { is_auth: false, user: null, fundraisers: null } }
    }
    let user = await usr_res.json();
    const charity_query = qs.stringify({
        filters: {
            user: {
                id: {
                    $eq: user.id
                }
            }
        }, populate: ['image', 'documents']
    })
    let charity = await (await fetch(server_url + "/api/charities?" + charity_query)).json()

    if (!charity['data'][0]) {
        return {
            props: {
                charity: null, token
            }
        }
    }

    return {
        props: {
            charity: charity['data'][0],
            token
        }
    }

}