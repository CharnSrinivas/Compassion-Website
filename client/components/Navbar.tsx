import axios from 'axios'
import Cookies from 'js-cookie'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Link from 'next/link'
import qs from 'qs'
import React, { useEffect, useState } from 'react'
import { jwt_aut_token, server_url } from '../config'

type Props = {}

export default function Navbar() {
    const [is_auth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem(jwt_aut_token)
        if (!token) {
            setIsAuth(false)
        }
        console.log('hit');
        axios(server_url + "/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            if (res.status <= 201) {
                setIsAuth(true)
                Cookies.set(jwt_aut_token, token!)
            } else {
                setIsAuth(false);
                localStorage.removeItem(jwt_aut_token);
            }
        })
    }, [])
    return (
        <div>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap px-5 py-3 flex-col md:flex-row items-center h-fit">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href='/'>
                        <img src="/assets/logo.png" alt="logo" width={40} />
                        <span className="ml-3 text-xl">Compassion</span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link href={'/discover'}><a className="mr-5 hover:text-gray-900">Discover</a></Link>
                        {is_auth &&
                            <Link href={'/manage'}><a className="mr-5 hover:text-gray-900">Manage</a></Link>
                        }
                        <Link href={'/'}><a className="mr-5 hover:text-gray-900">Third Link</a></Link>
                        {!is_auth && <Link href={'/login'}><a className="mr-5 hover:text-gray-900">Login</a></Link>}
                    </nav>
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
                </div>
            </header >
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