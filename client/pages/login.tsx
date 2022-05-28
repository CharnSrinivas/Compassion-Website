import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useRouter } from 'next/router';
import { jwt_aut_token, server_url } from '../config';
import Cookies from 'js-cookie'
export default function login() {
    const router = useRouter();
    const [loggingIn, setLoggingIn] = useState(false);
    const [show_alert, setShowAlert] = useState(false);
    const [alert_txt, setAlertTxt] = useState('');
    const [alert_title, setAlertTitle] = useState('');

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
                    } else {
                        setShowAlert(true);setAlertTitle(res_json.error.name);setAlertTxt(res_json.error.message);
                        setLoggingIn(false)
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
            <div className="container m-auto drop-shadow-lg">
                <div className="flex justify-center px-4 h-[35rem]">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div
                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                            style={{
                                backgroundImage:
                                    'url("https://source.unsplash.com/K4mSJ7kc0As/600x800")'
                            }}
                        />
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none relative">
                            {!loggingIn && <>
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
                            </>}
                            {
                                loggingIn &&
                                <div className="w-12 h-12 rounded-full animate-spin border-x-2 border-solid border-blue-500 border-t-transparent absolute" style={{ position: "absolute", top: "50%", left: "50%" }}></div>
                            }
                            {show_alert &&
                                <div
                                    className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
                                    role="alert"
                                >
                                    <svg
                                        className="w-5 h-5 inline mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <div>
                                        <span className="font-medium mx-2">{alert_title}</span>{alert_txt.replace('identifier','email')}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}