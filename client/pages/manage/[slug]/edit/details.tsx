import { useFormik } from 'formik';

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React, { useState } from 'react'
import * as Yup from 'yup'
import { fundraiser_tags, jwt_aut_token, server_url } from '../../../../config';
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
            zipCode: fundraiser.attributes.zip_code,
            category: fundraiser.attributes.tag
        },
        validationSchema: Yup.object({
            title: Yup.string().min(8).max(70, "Title should be less than 70 characters").required(),
            targetFunds: Yup
                .number()
                .min(1, "Invalid target funds")
                .required('Target Funds is required'),
            zipCode: Yup
                .number()
                .min(1, "Invalid zip code")
                .required('Invalid Zip Code.'),
            category: Yup
                .string().min(3).required("Category is required.")
                .equals(fundraiser_tags, 'Invalid category')
        }),
        onSubmit: async (e) => {
            setSubmitting(true);
            const slug = stringToSlug(e.title);
            let res = await axios.put(server_url + "/api/fund-raises/"+fundraiser.id, {
                data: {
                    id:fundraiser.id,
                    title: e.title,
                    fund_target: e.targetFunds,
                    zip_code: e.zipCode,
                    user: user.id,
                    tag: e.category,
                    slug: slug
                }
            }, { headers: { 'Authorization': `Bearer ${token}`, } });
            if (res.status <= 201) {
                router.push(`/manage/${slug}/edit/story`)
            }
        }
    });
    return (
        <div>
            <>
                <div className="h-screen min-w-screen bg-slate-200 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12 relative">
                    {!submitting &&
                        <div className="border p-8 px-10 w-[45%] bg-white shadow-xl md:min-w-1/2  mx-auto rounded-xl">
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
                                <label htmlFor="" className="block">
                                    Zip Code
                                </label>
                                <input
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.zipCode}
                                    type="number"
                                    name='zipCode'
                                    className="border w-full h-10 px-3 mb-5 rounded-md"
                                    placeholder="0234234234"
                                />
                                {
                                    formik.errors.zipCode &&
                                    <p className="text-xs italic text-red-500">
                                        {formik.errors.zipCode}
                                    </p>
                                }
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
            }
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