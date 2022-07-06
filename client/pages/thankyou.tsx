import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import React from 'react'
import { jwt_aut_token, server_url } from '../config';

interface Props {
    user: any
}

export default function thankyou({ user }: Props) {

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden  sm:py-12 bg-white">
            <div className=" px-5 ">
                <h2 className="mb-2 text-4xl font-medium text-gray-700">
                    Hi, <span className='font-semibold'>{user.username}</span>
                </h2>
                <h3 className='text-3xl font-medium mb-5 text-gray-600'>
                    ThankYou for registering with us.
                </h3>
                <p className="mb-2 text-lg text-zinc-500">
                    We are glad, that you’re with us. Soon your account get verified by us.
                </p>
                <span className="font-medium ">Thankyou </span> -Compassion.
            </div>
        </div>

    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const token = context.req.cookies[jwt_aut_token];

    const redirect: Redirect = {
        destination: "/register",
        statusCode: 307,
        basePath: false
    }

    if (!token) {
        return { redirect }
    }

    let usr_res = (await fetch(server_url + "/api/users/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    )
    if (usr_res.status > 201) {
        return { redirect: redirect }
    }

    let user = await usr_res.json();
    if (user.approved) {
        return {
            redirect: {
                destination: '/',
                statusCode: 307,
                basePath: false
            }
        }
    }
    return {
        props: {
            user
        }
    }
}