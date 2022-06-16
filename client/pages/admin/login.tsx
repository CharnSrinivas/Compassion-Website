import axios from 'axios';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react'
import * as Yup from 'yup'
import { jwt_admin_auth_token, server_url } from '../../config';

type Props = {}

export default function login({ }: Props) {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().min(5).max(70, "Email should be less than 70 characters").required("Email is required"),
            password: Yup.string().min(5).max(70, "Title should be less than 70 characters").required("Password is required"),
        }),

        onSubmit: async (e) => {
            let res = await axios.post(server_url + "/admin/login",
                {
                    email: e.email,
                    password: e.password
                }
            );
            
            if (res.status <= 201) {
                let token = res.data.data.token;
                localStorage.setItem(jwt_admin_auth_token,token);
                Cookies.set(jwt_admin_auth_token,token)
                router.push(`/admin`)
            }
        }
    });


    return (
        <div className="bg-white  mb-16">
            <div className="flex justify-center h-screen">
                <div
                    className="hidden bg-cover lg:block lg:w-2/3"
                    style={{
                        backgroundImage:
                            // "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)"
                            "url(/assets/bg-3.jpg)"
                    }}
                >
                    <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                        <div>
                            <h2 className="text-4xl font-bold text-white">Compassion</h2>
                            <p className="max-w-xl mt-3 text-gray-300">
                                Login as admin to manage fundraisers, charities, etc..
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div className="flex-1">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-center text-gray-700 ">
                                Compassion
                            </h2>
                            <p className="mt-3 text-gray-500 ">
                                Login in as admin
                            </p>
                        </div>
                        <div className="mt-8">
                            <form onSubmit={formik.handleSubmit}>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm text-gray-600 "
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="example@example.com"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md    focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    {
                                        formik.errors.email &&
                                        <p className="text-xs italic text-red-500">
                                            {formik.errors.email}
                                        </p>
                                    }
                                </div>
                                <div className="mt-6">
                                    <div className="flex justify-between mb-2">
                                        <label
                                            htmlFor="password"
                                            className="text-sm text-gray-600 "
                                        >
                                            Password
                                        </label>

                                    </div>
                                    <input
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Your Password"
                                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md    focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                    {
                                        formik.errors.password &&
                                        <p className="text-xs italic text-red-500">
                                            {formik.errors.password}
                                        </p>
                                    }
                                </div>
                                <div className="mt-6">
                                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Login in
                                    </button>
                                </div>
                            </form>
                            {/* <p className="mt-6 text-sm text-center text-gray-400">
                                Don't have an account yet?{" "}
                                <a
                                    href="#"
                                    className="text-blue-500 focus:outline-none focus:underline hover:underline"
                                >
                                    Sign up
                                </a>
                                .
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}