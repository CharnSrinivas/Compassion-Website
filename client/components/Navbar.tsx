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
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex flex-col title-font font-medium items-center justify-center text-gray-900 mb-4 md:mb-0" >
                        <img src="/assets/logo.png" alt="logo" width={40} />
                        <span className="ml-3 text-xl text-primary">Compassion</span>
                    </a>
                    <nav className="md:ml-auto md:mr-auto gap-30 flex flex-wrap items-center text-base justify-center">
                        <Link href={'/discover'}><a className="mr-5 hover:text-gray-900">For Individuals</a></Link>
                        <Link href={'/discover/charities'}><a className="mr-5 hover:text-gray-900">For Charities</a></Link>
                        {is_auth &&
                            <Link href={'/manage/my-fundraisers'}><a className="mr-5 hover:text-gray-900">Manage</a>
                            </Link>
                        }
                        <Link href={'/manage/my-fundraisers'}><a className="mr-5 hover:text-gray-900">How it works</a></Link>
                        {!is_auth &&
                            <Link href={'/login'}><a className="mr-5 hover:text-gray-900">Login</a></Link>
                        }
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