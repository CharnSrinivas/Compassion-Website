import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import qs from 'qs';
import React from 'react'
import { jwt_aut_token, server_url } from '../../../../config';
import { useRouter } from 'next/router'
import axios from 'axios';
interface Props {
    is_auth: boolean,
    fundraiser: any | null;
    token: string
}

export default function story({ fundraiser, is_auth, token }: Props) {
    const router = useRouter()
    const submit = async () => {
        const description_ele = (document.getElementById('description') as (HTMLTextAreaElement | undefined));
        if (!description_ele) return;
        let res = await axios.put(server_url + `/api/fund-raises/${fundraiser.id}`, {
            data: {
                "description": description_ele.value,
                "id": fundraiser.id
            }

        }, { headers: { Authorization: `Bearer ${token}`, } })
        if (res.status <= 201) {
            router.push(`/manage/my-fundraisers`)
        }
    }
    return (
        <div className="border p-8 px-10 w-[45%] bg-white shadow-xl md:min-w-1/2  mx-auto rounded-xl">
            <div className="font-medium m-auto text-4xl text-green-900 mt-7 text-center">Edit your story
            </div>
            <p className=" text-gray-500 text-center mt-3"> Explain who you are and why you're fundraising.</p>
            <textarea id="description" cols={30} rows={10} placeholder="your story goes here..." className="w-full  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md my-5"></textarea>
            <button onClick={submit} className="mt-7 bg-green-500 hover:bg-green-600 shadow-xl text-white  text-[1rem] font-medium px-14 py-3 rounded w-full">
                Save
            </button>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const token = context.req.cookies[jwt_aut_token];
    const slug = context.params ? context.params['slug'] : undefined;
    const redirect_obj: Redirect = {
        destination: "/register",
        statusCode: 307,
        basePath: false
    }
    if (!slug) {
        return {
            notFound: true
        }
    }
    if (!token) {
        return {
            redirect: redirect_obj
        }
    }
    const query = qs.stringify({
        filters: {
            slug: {
                $eq: slug
            }
        }
    })

    try {
        let res = (await fetch(server_url + "/api/fund-raises?" + query, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        )
        if (res.status > 201) {
            return { redirect: redirect_obj }
        }
        let fundraiser = await res.json();

        if (!fundraiser.data || fundraiser.data.length <= 0) { return { redirect: redirect_obj } }
        return {
            props: {
                is_auth: true, fundraiser: fundraiser.data[0], token: token
            }
        }
    } catch (err) {
        console.error(err);
        return {
            redirect: redirect_obj
        }
    }
}