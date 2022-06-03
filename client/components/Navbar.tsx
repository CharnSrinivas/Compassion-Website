import Cookies from 'js-cookie'

import Link from 'next/link'
import { useRouter } from 'next/router';
import QueryString from 'qs';
import React, { useEffect, useState } from 'react'
import { jwt_aut_token, server_url } from '../config'

export default function Navbar() {

    const [is_auth, setIsAuth] = useState(false);
    const [open_menu, setOpenMenu] = useState(false);
    const [search, setSearch] = useState('');
    const [has_charity, setHasCharity] = useState(false);
    const router = useRouter();
    useEffect(() => {
        init();
        window.onbeforeunload = init
    }, []);
    const init = () => {
        if (!window) return;
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
                Cookies.set(jwt_aut_token, token!)
                res.json().then(res_json => {
                    const query = QueryString.stringify({
                        filters: {
                            user: {
                                id: { $eq: res_json.id }
                            }
                        },
                    })
                    fetch(server_url + `/api/charities?` + query, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }).then(charity_res => {
                        charity_res.json().then(charity_data => {
                            if (charity_data.data && charity_data.data.length === 1) {
                                setHasCharity(true)
                            }
                        })
                    })
                })
                setIsAuth(true)
            } else {
                localStorage.removeItem(jwt_aut_token);
                Cookies.remove(jwt_aut_token)
                setIsAuth(false);
            }
        })
    }
    return (

        <nav id='navbar' className="flex items-center justify-between flex-wrap bg-white  lg:px-12 shadow border-solid border-t-2 border-blue-700 h-fit">
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
            <div className={`menu flex flex-wrap w-full ${open_menu ? 'flex-grow' : 'hidden'} lg:flex lg:items-center lg:w-auto px-2 lg:px-3 `} style={{ transition: 'all 0.5s ease ' }}>
                <div className="text-md  text-grey-700 lg:flex lg:items-baseline">
                    <a className="block mt-4 lg:inline-block lg:mt-0 group relative dropdown hover:text-gray-900 cursor-pointer tracking-wide mr-3">
                        <a className='px-4 py-2  ml-2  hover:text-blue-500 mt-4 lg:mt-0'>For Individuals</a>
                        <div className="group-hover:flex dropdown-menu absolute hidden h-auto z-20  lg:flex-row px-12    flex-col " >
                            <ul className="top-0 w-48  bg-white px-1 py-4 ">
                                <h2 className='text-center font-medium text-gray-700 my-2'>Discover </h2>
                                <hr />
                                <li className="">
                                    <Link href={'/discover'}><a className="text-center block px-0 py-1  ml-2  hover:text-blue-500 mt-4 lg:mt-0">Fundraisers</a></Link>
                                </li>
                            </ul>
                            <ul className="top-0 w-48 bg-white px-1  py-4">
                                <h2 className='font-medium  text-center text-gray-700 my-2'>Fundraise for </h2>
                                <hr />
                                <li className="">
                                    <Link href={'/start/medical'}><a className="text-center block 0x-1 py-2  ml-2  hover:text-blue-500 mt-4 lg:mt-0"> Medical</a></Link>
                                </li>
                                <li className="text-center ">
                                    <Link href={'/start/memorial'}><a className="text-center block 0x-1 py-2  ml-2  hover:text-blue-500 mt-4 lg:mt-0"> Memorial</a></Link>
                                </li>
                                <li className="text-center ">
                                    <Link href={'/start/emergency'}><a className="text-center block 0x-1 py-2  ml-2  hover:text-blue-500 mt-4 lg:mt-0">Emergency</a></Link>
                                </li>
                                <li className="text-center ">
                                    <Link href={'/start/charity-fundraising'}><a className="text-center block 0x-1 py-2  ml-2  hover:text-blue-500 mt-4 lg:mt-0"> Charity</a></Link>
                                </li>
                                <li className="text-center ">
                                    <Link href={'/start/education'}><a className="text-center block 0x-1 py-2  ml-2  hover:text-blue-500 mt-4 lg:mt-0">Education</a></Link>
                                </li>
                                <li className="text-center ">
                                    <Link href={'/start'}><a className="text-center block px-0 py-1  ml-2  text-blue-600 mt-4 lg:mt-0">See all</a></Link>
                                </li>
                            </ul>
                            <ul className="top-0 w-48 bg-white px-1 py-4">
                                <h2 className='text-center font-medium text-gray-700 my-2'>How it works</h2>
                                <hr />
                                <li className="">
                                    <Link href={'/how-it-works'}><a className="text-center block px-0 py-1  ml-2  hover:text-blue-500 mt-4 lg:mt-0">How compassion works</a></Link>
                                </li>
                                <li className="">
                                    <Link href={'/info/hat is crowdfunding'}><a className="text-center block px-0 py-1  ml-2  hover:text-blue-500 mt-4 lg:mt-0">What is crowdfunding</a></Link>
                                </li>
                                <li className="">
                                    <Link href={'/info/team-fundraising'}><a className="text-center block px-0 py-1  ml-2  hover:text-blue-500 mt-4 lg:mt-0">Team fundraising</a></Link>
                                </li>
                                <li className="">
                                    <Link href={'/info/donate-button'}><a className="text-center block px-0 py-1  ml-2  hover:text-blue-500 mt-4 lg:mt-0">The Donate button</a></Link>
                                </li>
                            </ul>
                        </div>
                    </a>
                    
                    <a href="/info/how-it-works" className='block  lg:inline-block px-4 py-2  ml-2 hover:text-blue-500 mt-4 lg:mt-0'>
                        How it works
                    </a>
                    {is_auth &&
                        <Link href={'/manage/my-fundraisers'}>
                            <a className="block px-4 py-2  ml-2 font-medium hover:text-blue-500 mt-4 lg:mt-0">Manage</a>
                        </Link>
                    }
                    {!is_auth &&
                        <Link href={'/register'}>
                            <a
                                className=" px-4 py-2  ml-2  hover:text-blue-500 mt-4 lg:mt-0"
                            >
                                Register
                            </a>
                        </Link>
                    }
                </div>
                {/* This is an example component */}
                <div className="relative my-3 ml-4 lg:my-0 lg:mx-auto text-gray-600 lg:block ">
                    <input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setSearch('')
                                router.push(`/s?q=${search}`)
                            }
                        }}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        value={search}
                        className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                        type="search"
                        name="search"
                        placeholder="Search fundraisers"
                    />
                    <button type="submit" className="absolute right-0 top-0 mt-3 mr-2" onClick={() => {
                        setSearch('')
                        router.push(`/s?q=${search}`)
                    }}>
                        <svg
                            className="text-gray-600 h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
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
                <hr />
                <div className="flex my-3   justify-evenly">
                    <a href="/create/fundraiser/details"
                        className="block px-4  ml-2 py-2 rounded text-white mt-4 lg:mt-0 bg-[#32a95c] ">
                        Start a Fundraiser
                    </a>
                    {!has_charity &&
                        <a href="/create/charity/details"
                            className="block px-4  ml-2 py-2 rounded text-white mt-4 lg:mt-0 text-[#32a95c] ">
                            Create  a Charity
                        </a>
                    }
                </div>
            </div>
        </nav>
    )
}