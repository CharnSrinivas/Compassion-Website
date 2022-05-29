import Cookies from 'js-cookie'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { jwt_aut_token, server_url } from '../config'

export default function Navbar() {

    const [is_auth, setIsAuth] = useState(false);
    const [open_menu, setOpenMenu] = useState(false);
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
        // <div>
        //     <header className="text-gray-600 body-font shadow-sm">
        //         <div className="container mx-auto flex flex-wrap py-3 md:flex-row justify-evenly items-center ">
        //             <a href='/' className="flex flex-col title-font  items-center justify-center text-gray-900 mb-4 md:mb-0" >
        //                 <img src="/assets/logo.png" alt="logo" width={40} />
        //                 <span className="ml-3 text-xl text-primary">Compassion</span>
        //             </a>
        //             <nav className=" list-none  flex flex-wrap items-center gap-7 text-base justify-center">
        //                 <div className='relative mx-auto'>
        //                     <input
        //                         type="search"
        //                         style={{transition:" all ease 0.4s"}}
        //                         className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-blue-300 focus:pl-16 focus:pr-4"
        //                         placeholder='search by name'
        //                     />
        //                     <svg
        //                         xmlns="http://www.w3.org/2000/svg"
        //                         className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-blue-300 peer-focus:stroke-blue-500"
        //                         fill="none"
        //                         viewBox="0 0 24 24"
        //                         stroke="currentColor"
        //                         strokeWidth={2}
        //                     >
        //                         <path
        //                             strokeLinecap="round"
        //                             strokeLinejoin="round"
        //                             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        //                         />
        //                     </svg>
        //                 </div>

        //                 <li className="mx-3 group relative dropdown hover:text-gray-900 cursor-pointer tracking-wide">
        //                     <a>Fundraise for</a>
        //                     <div className="group-hover:block dropdown-menu absolute hidden h-auto z-30">
        //                         <ul className="top-0 w-48 bg-white shadow px-6 py-8">
        //                             <h2 className=' my-2'>Fundraise for </h2>
        //                             <li className="py-1">
        //                                 <Link href={'/discover'}><a className="mr-5 hover:text-gray-900"> Individuals</a></Link>
        //                             </li>
        //                             <li className="py-1">
        //                                 <Link href={'/discover/charities'}><a className="mr-5 hover:text-gray-900"> Charities</a></Link>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 </li>

        //                 {is_auth &&
        //                     <Link href={'/manage/my-fundraisers'}><a className="mr-5 hover:text-gray-900">Manage</a>
        //                     </Link>
        //                 }
        //                 <Link href={'/manage/my-fundraisers'}><a className="mr-5 hover:text-gray-900">How it works</a></Link>
        //                 {!is_auth &&
        //                     <Link href={'/login'}><a className="mr-5 hover:text-gray-900">Login</a></Link>
        //                 }
        //                 {!is_auth &&
        //                     <Link href={'/register'}>
        //                         <button
        //                             className="inline-flex items-center bg-primary border-0 py-1 text-[#ffffff] px-3 focus:outline-none hover:bg-gray rounded mt-4 md:mt-0">
        //                             Register
        //                             <svg
        //                                 fill="none"
        //                                 stroke="currentColor"
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth={2}
        //                                 className="w-4 h-4 ml-1"
        //                                 viewBox="0 0 24 24"
        //                             >
        //                                 <path d="M5 12h14M12 5l7 7-7 7" />
        //                             </svg>
        //                         </button>
        //                     </Link>
        //                 }
        //             </nav>
        //         </div>
        //     </header>
        // </div >
        <nav className="flex items-center justify-between flex-wrap bg-white  lg:px-12 shadow border-solid border-t-2 border-blue-700 h-fit">
            <div className="flex justify-between lg:w-auto w-full lg:border-b-0 py-3 pl-3 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
                <div className="flex items-center flex-shrink-0 text-gray-800 h-fit">
                    <a href='/' className="flex flex-col title-font  items-center justify-center text-gray-900 " >
                        <img src="/assets/logo.png" alt="logo" width={30} />
                        <span className="ml-3 text-[1.2rem] text-primary font-medium">Compassion</span>
                    </a>
                </div>
                <div className="flex items-center lg:hidden ">
                    <button
                        onClick={() => {
                            setOpenMenu(!open_menu)
                        }}
                        id="nav"
                        className="flex items-center px-3 py-2 border-2 rounded text-grey-700 border-grey-700 hover:text-grey-800 "
                    >
                        {!open_menu &&
                            <svg
                                className="fill-current h-3 w-3"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        }
                        {open_menu &&
                            <svg
                                width={24}
                                height={24}
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                            >
                                <path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
                            </svg>
                        }
                    </button>
                </div>
            </div>
            <div className={`menu w-full ${open_menu ? 'flex-grow' : 'hidden'} lg:flex lg:items-center lg:w-auto px-2 lg:px-3 `} style={{ transition: 'all 0.5s ease ' }}>
                <div className="text-md  text-grey-700 lg:flex lg:items-baseline">
                    <a className="block mt-4 lg:inline-block lg:mt-0 group relative dropdown hover:text-gray-900 cursor-pointer tracking-wide mr-3">
                        <a className='px-4 py-2  ml-2  hover:text-blue-500 mt-4 lg:mt-0'>Fundraise for</a>
                        <div className="group-hover:block dropdown-menu absolute hidden h-auto z-30">
                            <ul className="top-0 w-48 bg-white shadow px-6 py-8">
                                <h2 className=' my-2'>Fundraise for </h2>
                                <li className="py-1">
                                    <Link href={'/discover'}><a className="block px-4 py-2  ml-2  hover:text-blue-500 mt-4 lg:mt-0"> Individuals</a></Link>
                                </li>
                                <li className="py-1">
                                    <Link href={'/discover/charities'}><a className="block px-4 py-2  ml-2  hover:text-blue-500 mt-4 lg:mt-0"> Charities</a></Link>
                                </li>
                            </ul>
                        </div>
                    </a>
                    <a href="/how-it-works" className='block  lg:inline-block px-4 py-2  ml-2 font-medium hover:text-blue-500 mt-4 lg:mt-0'>
                        How it works
                    </a>
                    {is_auth &&
                        <Link href={'/manage/my-fundraisers'}>
                            <a className="block px-4 py-2  ml-2 font-medium hover:text-blue-500 mt-4 lg:mt-0">Manage</a>
                        </Link>
                    }

                </div>
                {/* This is an example component */}
                <div className="relative mx-auto text-gray-600 lg:block hidden">
                    <input
                        className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                        type="search"
                        name="search"
                        placeholder="Search"
                    />
                    <button type="submit" className="absolute right-0 top-0 mt-3 mr-2">
                        <svg
                            className="text-gray-600 h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            id="Capa_1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 56.966 56.966"
                            xmlSpace="preserve"
                            width="512px"
                            height="512px"
                        >
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                    </button>
                </div>
                <div className="flex my-3   border-t-2 border-solid justify-evenly">
                    {!is_auth &&
                        <Link href={'/register'}>
                            <a
                                className="block px-4 py-2  ml-2  hover:text-blue-500 mt-4 lg:mt-0"
                            >
                                Register
                            </a>

                        </Link>
                    }
                    <a href="#"
                        className="block px-4  ml-2 py-2 rounded text-white mt-4 lg:mt-0 bg-[#32a95c] ">
                        Start a Fundraiser!
                    </a>

                </div>
            </div>
        </nav>
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