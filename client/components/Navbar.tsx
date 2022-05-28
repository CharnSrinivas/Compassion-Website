import Cookies from 'js-cookie'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { jwt_aut_token, server_url } from '../config'

export default function Navbar() {

    const [is_auth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(jwt_aut_token)
        if (!token) {
            setIsAuth(false)
        }
        fetch(server_url + "/api/users/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            if (res.status <= 201) {
                console.log('Al good');
                Cookies.set(jwt_aut_token, token!)
                setIsAuth(true)
            } else {
                console.log('removing');
                localStorage.removeItem(jwt_aut_token);
                Cookies.remove(jwt_aut_token)
                setIsAuth(false);
            }
        })
    }, []);

    return (
        <div>
            <header className="text-gray-600 body-font shadow-sm">
                <div className="container mx-auto flex flex-wrap py-3 md:flex-row justify-evenly items-center ">
                    <a href='/' className="flex flex-col title-font font-medium items-center justify-center text-gray-900 mb-4 md:mb-0" >
                        <img src="/assets/logo.png" alt="logo" width={40} />
                        <span className="ml-3 text-xl text-primary">Compassion</span>
                    </a>
                    <nav className=" list-none  flex flex-wrap items-center gap-7 text-base justify-center">
                        <div className='relative mx-auto'>
                            <input
                                type="search"
                                style={{transition:" all ease 0.4s"}}
                                className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-blue-300 focus:pl-16 focus:pr-4"
                                placeholder='search by name'
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-blue-300 peer-focus:stroke-blue-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        <li className="mx-3 group relative dropdown hover:text-gray-900 cursor-pointer tracking-wide">
                            <a>Fundraise for</a>
                            <div className="group-hover:block dropdown-menu absolute hidden h-auto z-30">
                                <ul className="top-0 w-48 bg-white shadow px-6 py-8">
                                    <h2 className='font-medium my-2'>Fundraise for </h2>
                                    <li className="py-1">
                                        <Link href={'/discover'}><a className="mr-5 hover:text-gray-900"> Individuals</a></Link>
                                    </li>
                                    <li className="py-1">
                                        <Link href={'/discover/charities'}><a className="mr-5 hover:text-gray-900"> Charities</a></Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {is_auth &&
                            <Link href={'/manage/my-fundraisers'}><a className="mr-5 hover:text-gray-900">Manage</a>
                            </Link>
                        }
                        <Link href={'/manage/my-fundraisers'}><a className="mr-5 hover:text-gray-900">How it works</a></Link>
                        {!is_auth &&
                            <Link href={'/login'}><a className="mr-5 hover:text-gray-900">Login</a></Link>
                        }
                        {!is_auth &&
                            <Link href={'/register'}>
                                <button
                                    className="inline-flex items-center bg-primary border-0 py-1 text-[#ffffff] px-3 focus:outline-none hover:bg-gray rounded mt-4 md:mt-0">
                                    Register
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        className="w-4 h-4 ml-1"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </Link>
                        }
                    </nav>
                </div>
            </header>
        </div >
    )
}
/* export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const token = context.req.cookies[jwt_aut_token];
    // const res_json
    console.log(token);
    try {

        if (token) {
            let res = await ((await fetch(server_url + "/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            ).json())
            console.log(res);
        }
        return {
            props: {}
        }
    } catch (err) {
        console.error(err);
        return {
            props: { is_auth: false },
        }
    }

} */