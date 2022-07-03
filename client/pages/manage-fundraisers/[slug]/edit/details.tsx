import { useFormik } from 'formik';

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React, { useState } from 'react'
import * as Yup from 'yup'
import { fundraiser_tags, fund_types, jwt_aut_token, server_url } from '../../../../config';
import { stringToSlug } from '../../../../utils';
import { useRouter } from 'next/router';
import qs from 'qs';
import axios from 'axios';

interface Props {
    is_auth: boolean,
    user: any | null;
    token: string;
    fundraiser: any
}

export default function fundraiser({ is_auth, user, token, fundraiser }: Props) {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            title: fundraiser.attributes.title,
            targetFunds: fundraiser.attributes.fund_target,
            address: fundraiser.attributes.address,
            category: fundraiser.attributes.tag,
            fundType: fundraiser.attributes.fund_type,
            recvDetails: fundraiser.attributes.recv_details

        },
        validationSchema: Yup.object({
            title: Yup.string().min(8).max(70, "Title should be less than 70 characters").required(),
            targetFunds: Yup
                .number()
                .min(1, "Invalid target funds")
                .required('Target Funds is required'),
            address: Yup
                .string()
                .min(1, "Invalid address")
                .required('Address is required.'),
            category: Yup
                .string().min(3).required("Category is required.")
                .equals(fundraiser_tags, 'Invalid category'),
            fundType:
                Yup
                    .string().min(3).required("Fund type is required.")
                    .equals(fund_types, 'Invalid category'),
            recvDetails: Yup
                .string()
                .min(3, "Invalid 'fund receive details'")
                .required('Fund receive details is required.'),
        }),
        onSubmit: async (e) => {
            setSubmitting(true);
            const slug = stringToSlug(e.title);
            let res = await axios.put(server_url + "/api/fund-raises/" + fundraiser.id, {
                data: {
                    id: fundraiser.id,
                    title: e.title,
                    fund_target: e.targetFunds,
                    address: e.address,
                    user: user.id,
                    tag: e.category,
                    slug: slug,
                    fund_type: e.fundType
                }
            }, { headers: { 'Authorization': `Bearer ${token}`, } });
            if (res.status <= 201) {
                router.push(`/manage-fundraisers/${slug}/edit/story`)
            }
        }
    });
    return (
        <div>
            <>
                <div className="h-screen min-w-screen bg-slate-200 py-6 flex flex-col justify-center overflow-hidden sm:py-12 relative">
                    {!submitting &&
                        <div className="border p-8 px-10 lg:w-[45%] bg-white shadow-xl md:min-w-1/2  mx-auto rounded-xl">
                            <div className="font-medium m-auto text-4xl text-green-900 my-7 text-center">
                                Edit your fundraiser
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <label htmlFor="" className="block">
                                    Title
                                </label>
                                <input
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.title}
                                    type="text"
                                    name='title'
                                    className="border w-full h-10 px-3 mb-5 rounded-md"
                                    placeholder="Title..."
                                />
                                {
                                    formik.errors.title &&
                                    <p className="text-xs italic text-red-500">
                                        {formik.errors.title}
                                    </p>
                                }
                                <label htmlFor="" className="block">
                                    Address
                                </label>
                                <input
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.address}
                                    type="text"
                                    name='address'
                                    className="border w-full h-10 px-3 mb-5 rounded-md"
                                    placeholder="1000"
                                />
                                {
                                    formik.errors.address &&
                                    <p className="text-xs italic text-red-500">
                                        {formik.errors.address}
                                    </p>
                                }

                                <div className='w-full flex items-center gap-2'>
                                    <div className='w-full'>

                                        <label htmlFor="" className="block">
                                            Target funds
                                        </label>
                                        <input
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.targetFunds}
                                            type="Number"
                                            name='targetFunds'
                                            className="border w-full h-10 px-3 mb-5 rounded-md"
                                            placeholder="1000"
                                        />
                                        {
                                            formik.errors.targetFunds &&
                                            <p className="text-xs italic text-red-500">
                                                {formik.errors.targetFunds}
                                            </p>
                                        }
                                    </div>
                                    <label htmlFor="" className="block">
                                        Target funds
                                    </label>
                                    <input
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.targetFunds}
                                        type="text"
                                        name='targetFunds'
                                        className="border w-full h-10 px-3 mb-5 rounded-md"
                                        placeholder="1000"
                                    />
                                    {
                                        formik.errors.targetFunds &&
                                        <p className="text-xs italic text-red-500">
                                            {formik.errors.targetFunds}
                                        </p>
                                    }
                                    <div>
                                        <label htmlFor="" className="block">
                                            Category
                                        </label>
                                        <select
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.fundType}
                                            name='fundType'
                                            id='fundType'
                                            defaultValue={fundraiser.attributes.fund_type}
                                            className="border w-full h-10 px-3 mb-5 rounded-md bg-white"
                                            // className="form-select appearance-none block w-full px-3  text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                            aria-label="Default select example">
                                            <option selected>Choose a fund type</option>
                                            {fund_types.map((tag, index) => {
                                                return (
                                                    <option key={index} value={tag}>{tag[0].toUpperCase() + tag.slice(1)}</option>
                                                )
                                            })}
                                        </select>
                                        {
                                            formik.errors.fundType &&
                                            <p className="text-xs italic text-red-500">
                                                {
                                                    formik.errors.fundType
                                                }
                                            </p>
                                        }
                                    </div>

                                </div>

                                <label htmlFor="" className="block">
                                    Category
                                </label>
                                <select
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.category}
                                    name='category'
                                    className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                                    <option selected>Choose a category</option>
                                    {fundraiser_tags.map((tag, index) => {
                                        return (
                                            <option value={tag}>{tag[0].toUpperCase() + tag.slice(1)}</option>
                                        )
                                    })}
                                </select>
                                {
                                    formik.errors.category &&
                                    <p className="text-xs italic text-red-500">
                                        {formik.errors.category}
                                    </p>
                                }
                                {!fundraiser['attributes']['individual'] &&

                                    <h2 className=' mt-8 mb-2 font-medium '>Selected Charity</h2>
                                }
                                {
                                    !fundraiser['attributes']['individual'] && fundraiser['attributes']['charity'] && fundraiser['attributes']['charity']['data'] &&
                                    <div className='flex flex-row items-center gap-5 border-2 border-gray-600 border-opacity-40 rounded-lg p-3 m1 '>
                                        <div className=' cursor-pointer p-2 m-2 flex flex-row gap-3 items-center'
                                        >
                                            <img className='w-[5rem] h-[4rem] object-cover' src={server_url + fundraiser['attributes']['charity']['data']['attributes']['image']['data']['attributes']['url']} alt={fundraiser['attributes']['charity']['data']['attributes']['name']} />
                                            <div className='flex flex-col items-start gap-1'>
                                                <h4 className='font-light text-gray-600 text-xl'>{fundraiser['attributes']['charity']['data']['attributes']['name']}</h4>
                                                <h4 className='text-gray-500 text-sm'>{fundraiser['attributes']['charity']['data']['attributes']['address']}</h4>

                                            </div>
                                        </div>
                                    </div>
                                }
                                <button type='submit' className="mt-7 bg-green-500 hover:bg-green-600 shadow-xl text-white  text-sm font-semibold px-14 py-3 rounded w-full">
                                    Save & Next
                                </button>
                            </form>
                        </div>
                    }
                    {
                        submitting &&
                        <div className="w-12 h-12 rounded-full animate-spin
            border-x-2 border-solid border-blue-500 border-t-transparent absolute" style={{ position: "absolute", top: "50%", left: "0%" }}></div>
                    }
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
        })
        )
        if (res.status > 201) {
            return { redirect }
        }
        let user = await res.json();
        let query = qs.stringify({
            filters: {
                slug: { $eq: slug }
            }, populate: ['charity',
                'charity.image']
        })

        let fundraiser = await ((await fetch(server_url + "/api/fund-raises?" + query)).json())
        if (!fundraiser.data || fundraiser.data.length <= 0) { return { notFound: true } }

        return {
            props: {
                is_auth: true, user: user, token: token, fundraiser: fundraiser.data[0]
            }
        }
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