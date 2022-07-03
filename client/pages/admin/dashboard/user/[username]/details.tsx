import axios from 'axios';
import { useFormik } from 'formik';
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import { useRouter } from 'next/router';
import qs from 'qs';
import * as Yup from 'yup'

import React, {  useState } from 'react'
import { jwt_admin_auth_token, server_url } from '../../../../../config';
import DashboardLayout from '../../../../../components/DashboardLayout';

interface Props {
    user: any | null;
    admin_token: string;
    username: string
}

export default function edit({ user, admin_token,  username }: Props) {
    const router = useRouter();
    const [approving, setApprving] = useState(false);
    const toggleApproval = async () => {
        setApprving(true);
        let res = await axios.put(server_url + '/content-manager/collection-types/plugin::users-permissions.user/' + user.id, {
            approved: !user.approved
        }, {
            headers: {
                Authorization: `Bearer ${admin_token}`,
            }
        });
        setApprving(false);
        router.reload();

    }
    return (
        <DashboardLayout>
            <section className="text-gray-600 body-font ">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-full mx-auto justify-evenly flex gap-2 flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                FUNDRAISER
                            </h2>
                            <a href={`/admin/dashboard/`} className='flex w-fit items-center text-gray-600 px-3 justify-evenly  border-2 border-gray-300 rounded-md my-4'
                            >
                                <svg
                                    className='w-5 h-5 '
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect width={48} height={48} fill="white" fillOpacity="0.01" />
                                    <path
                                        d="M31 36L19 24L31 12"
                                        stroke="black"
                                        strokeWidth={4}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <p>Back</p>
                            </a>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                                {user.title}
                            </h1>
                            <div className="flex mb-4">
                                <a href={`/admin/dashboard/user/${username}/details`} className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                                    Details
                                </a>
                                <a href={`/admin/dashboard/user/${username}/documents`} className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                                    Documents
                                </a>
                            </div>

                            <>

                                <div className="flex border-t border-gray-200 py-2">
                                    <span className="text-gray-500">Username</span>
                                    <span className="ml-auto text-gray-900">{user.username}</span>
                                </div>
                                {/* {user.charity &&
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Organised by</span>
                                        <a href='' className="ml-auto text-blue-800">{user.charity.name}</a>
                                    </div>
                                }
                                {!user.charity &&
                                    <div className="flex border-t border-gray-200 py-2">
                                        <span className="text-gray-500">Organised by</span>
                                        <span className=" ml-auto px-3 py-1 font-semibold leading-tight text-gray-700-700 bg-gray-100 rounded-full dark:text-white dark:bg-orange-600">
                                            Individual
                                        </span>
                                    </div>
                                } */}

                                <div className="flex border-t border-gray-200 py-2">
                                    <span className="text-gray-500">Email</span>
                                    <span className="ml-auto text-gray-900" style={{lineBreak:"anywhere"}}>{user.email}</span>
                                </div>
                                <div className="flex border-t border-gray-200 py-2 mb-3">
                                    <span className="text-gray-500">Status</span>
                                    {user.approved &&
                                        <span className=" ml-auto px-3 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                            Approved
                                        </span>
                                    }
                                    {!user.approved &&
                                        <span className=" ml-auto px-3 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                                            Pending
                                        </span>
                                    }
                                </div>
                            </>
                            {!user.approved &&
                                <button onClick={toggleApproval} disabled={user.approved} className={`flex gap-1  items-center text-white  bg-green-500 hover:bg-green-600   border-0 py-2 px-4 focus:outline-none rounded`}>
                                    Approve
                                    {approving &&
                                        <svg
                                            className="animate-spin ml-1  h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx={12}
                                                cy={12}
                                                r={10}
                                                stroke="currentColor"
                                                strokeWidth={4}
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                    }
                                    {!approving &&

                                        <svg
                                            width="16px"
                                            height="16px"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        >
                                            <polyline points="2.75 8.75,6.25 12.25,13.25 4.75" />
                                        </svg>
                                    }

                                </button>
                            }

                            {user.approved &&
                                <button onClick={toggleApproval} className={`flex gap-1  items-center text-white  bg-red-400 hover:bg-red-500' : 'bg-green-500 hover:bg-red-600 border-0 py-2 px-4 focus:outline-none rounded`}>
                                    Disapprove
                                    {approving &&
                                        <svg
                                            className="animate-spin ml-1  h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx={12}
                                                cy={12}
                                                r={10}
                                                stroke="currentColor"
                                                strokeWidth={4}
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                    }
                                    {!approving &&

                                        <svg
                                            width="16px"
                                            height="16px"
                                            fill="white"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="5"
                                            viewBox="0 0 490 490"
                                        >
                                            <polygon
                                                points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "
                                            />
                                        </svg>

                                    }

                                </button>
                            }
                        </div>
                        {user.image &&
                            <img
                                className="lg:w-1/3 w-full lg:h-[40rem] h-52 object-cover object-center rounded"
                                src={server_url + user.image[0].url}
                                alt={user.title}
                            />
                        }{!user.image &&
                            <img
                                className="lg:w-1/3 w-full lg:h-[40rem] h-52 object-cover object-center rounded"
                                src={"/assets/image-placeholder.jpg"}
                                alt={user.title}
                            />
                        }
                    </div>
                </div>
            </section>

        </DashboardLayout >
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const username = context.params ? context.params['username']?.toString() : '';
    const admin_token = context.req.cookies[jwt_admin_auth_token];

    const redirect: Redirect = {
        destination: "/admin/login",
        statusCode: 307,
        basePath: false
    }
    if (!admin_token) {
        return { redirect }
    }
    let admin_res = (await fetch(server_url + "/admin/users/me", {
        headers: {
            Authorization: `Bearer ${admin_token}`,
        }
    })
    );
    if (admin_res.status > 201) {
        return { redirect }
    }
    // let admin = await admin_res.json();
    const user_query = qs.stringify({
        filters: {
            username: {
                $eq: username
            }
        }, populate: "*"
    },{encodeValuesOnly:true});

    let users = await (await fetch(server_url + "/content-manager/collection-types/plugin::users-permissions.user?" + user_query, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${admin_token}`,
        }
    })).json();
    if (!users['results'][0]) {
        return {
            props: {
                fundraiser: null, admin_token
            }
        }
    }

    return {
        props: {
            user: users['results'][0],
            admin_token,
            username
        }
    }

}