import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useRouter } from 'next/router';
import { jwt_aut_token, server_url } from '../config';
import Cookies from 'js-cookie'
export default function login() {
    const router = useRouter();
    const [loggingIn, setLoggingIn] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            password: Yup
                .string()
                .max(255)
                .required('Password is required'),
        }),
        onSubmit: (e) => {
            setLoggingIn(true)
            fetch(server_url + '/api/auth/local', {
                mode: "cors",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    identifier: e.email,
                    password: e.password,
                })
            }).then((res) => {
                res.json().then(res_json => {
                    if (!res_json.error && res_json.jwt) {
                        localStorage.setItem(jwt_aut_token, res_json.jwt);
                        Cookies.set(jwt_aut_token, res_json.jwt);
                        router.push('/')
                    }
                })
            })
        }
    });
    useEffect(() => {
        if (localStorage.getItem(jwt_aut_token)) {
            Cookies.set(jwt_aut_token, localStorage.getItem(jwt_aut_token)!)
            router.push('/')
        }
    }, [])

    return (
        <div className='w-screen h-screen bg-gray-200 flex justify-center align-middle'>
            {!loggingIn &&
                <div className="container m-auto drop-shadow-lg">
                    <div className="flex justify-center px-4 h-[35rem]">
                        {/* Row */}
                        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                            <div
                                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                                style={{
                                    backgroundImage:
                                        'url("https://source.unsplash.com/K4mSJ7kc0As/600x800")'
                                }}
                            />
                            {/* Col */}
                            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                                <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={formik.handleSubmit}>
                                    <div className="mb-4">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                            htmlFor="username"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="email"
                                            name='email'
                                            type="email"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.email}
                                            placeholder="example@example.com"
                                        />
                                        {
                                            formik.errors.email &&
                                            <p className="text-xs italic text-red-500">
                                                Please check the email again.
                                            </p>
                                        }
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            className="block mb-2 text-sm font-bold text-gray-700"
                                            htmlFor="password"
                                        >
                                            Password
                                        </label>
                                        <input

                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="password"
                                            type="password"
                                            placeholder="******************"
                                            name='password'
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        />
                                        {
                                            formik.errors.password &&
                                            <p className="text-xs italic text-red-500">
                                                Please check the password again.
                                            </p>
                                        }
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button
                                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline "
                                            type="submit"
                                        >
                                            Login In
                                        </button>
                                    </div>
                                    <hr className="mb-6 border-t" />
                                    <div className="text-center">
                                        <a
                                            className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                            href="/register"
                                        >
                                            Create an Account!
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            }
            {
                loggingIn &&
                <div className="w-12 h-12 rounded-full animate-spin
                border-x-2 border-solid border-blue-500 border-t-transparent absolute" style={{position:"absolute",top:"50%"}}></div>
            }
        </div>

    )
}