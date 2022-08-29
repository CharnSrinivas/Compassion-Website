import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import React from 'react'
import { jwt_aut_token, server_url } from '../config';

interface Props {
    user: any
}

export default function contact_us() {
    return (
        <>
            {/* component */}
            <div className="bg-white">
                <div className="flex justify-center h-screen">
                    <div
                        className="hidden bg-cover lg:block lg:w-2/3"
                        style={{
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)"
                        }}
                    >
                        <div className="flex items-center h-full px-20 bg-opacity-40 " style={{ background: " linear-gradient(90deg, rgb(0, 0 ,0 , 45%) 50%, rgb(0, 0,0,45%) 50%)" }}>
                            <div>
                                <h2 className="text-4xl font-bold text-white">Compassion Crypto Pty LTd</h2>
                                {/* <p className="max-w-xl mt-3 text-gray-300">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem
                                    ipsa, nulla laboriosam dolores, repellendus perferendis libero
                                    suscipit nam temporibus molestiae
                                </p> */}
                                <div className=" hidden lg:block  sm:rounded-lg">
                                    <div className="flex items-center mt-8 text-white">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                            className="w-6 h-6 text-white-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <div className="ml-4 text-md tracking-wide">
                                            Acme Inc, Street, State, Postal Code
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-4 text-white ">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                            className="w-6 h-6 text-white-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        <div className="ml-4 text-md tracking-wide">
                                            +44 1234567890
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-2 text-white">
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                            className="w-6 h-6 text-white-500"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <div className="ml-4 text-md tracking-wide">
                                            info@acme.org
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6 "
                    >
                        <div className="flex-1">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-center text-gray-700 ">
                                    Compassion Crypto Pty LTd
                                </h2>
                                <p className="mt-3 text-gray-500 ">
                                    Chat with us.
                                </p>
                            </div>
                            <div className="mt-8">
                                <form>
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm text-gray "
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="name"
                                            name="name"
                                            id="name"
                                            placeholder="enter your name"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm text-gray "
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="example@example.com"
                                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label
                                            htmlFor="message"
                                            className="block mb-2 text-sm text-gray "
                                        >
                                            Email Address
                                        </label>
                                        <textarea
                                            className="appearance-none resize-y block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-200 h-48 text-sm"
                                            id="message"
                                            placeholder="what's in your mind?...."
                                            defaultValue={""}
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className=" flex lg:hidden  flex-col  justify-between sm:rounded-lg">
                                <div className="flex items-center  mt-8 text-gray-600">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6 text-white-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide">
                                        Acme Inc, Street, State, Postal Code
                                    </div>
                                </div>
                                <div className="flex items-center mt-4 text-gray-600 ">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6 text-white-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide">
                                        +44 1234567890
                                    </div>
                                </div>
                                <div className="flex items-center mt-2 text-gray-600 ">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-6 h-6 text-white-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide">
                                        info@acme.org
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}