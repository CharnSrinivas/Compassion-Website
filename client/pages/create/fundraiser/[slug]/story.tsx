import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import qs from 'qs';
import React from 'react'
import { jwt_aut_token, server_url } from '../../../../config';
import { useRouter } from 'next/router'
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
        let res = await fetch(server_url + `/api/fund-raises/${fundraiser.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    "description": description_ele.value,
                    "id": fundraiser.id
                }
            }
            ),
        })
        if (res.ok) {
            router.push(`/manage-fundraisers/my-fundraisers`)
        }
    }
    return (
        <div className="border p-8 px-10 w-[45%] bg-white shadow-xl md:min-w-1/2 my-12  mx-auto rounded-xl">
            {/* Steps */}
            <div className="w-full py-3">
                <div className="flex">
                    {/* step 1 */}
                    <div className="w-1/3">
                        <div className="relative mb-2">
                            <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                                <span className="text-center text-white w-full">
                                    <p>1</p>
                                </span>
                            </div>
                        </div>
                        <div className="text-xs text-center md:text-base">Details</div>
                    </div>
                    <div className="w-1/3">
                        {/* Green line */}
                        <div className="relative mb-2">
                            <div
                                className="absolute flex align-center items-center align-middle content-center"
                                style={{
                                    width: "calc(100% - 2.5rem - 1rem)",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)"
                                }}
                            >
                                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                    <div
                                        className="w-0 bg-green-300 py-1 rounded"
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </div>
                            <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                                <span className="text-center text-white w-full">
                                    <p>2</p>
                                </span>
                            </div>
                        </div>

                        <div className="text-xs text-center md:text-base">Image</div>
                    </div>

                    <div className="w-1/3">
                        <div className="relative mb-2">
                            <div
                                className="absolute flex align-center items-center align-middle content-center"
                                style={{
                                    width: "calc(100% - 2.5rem - 1rem)",
                                    top: "50%",
                                    transform: "translate(-50%, -50%)"
                                }}
                            >
                                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                    <div
                                        className="w-0 bg-green-300 py-1 rounded"
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </div>
                            <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                                <span className="text-center text-white w-full">
                                    <p>3</p>
                                </span>
                            </div>
                        </div>
                        <div className="text-xs text-center md:text-base">Story</div>
                    </div>

                </div>
            </div>
            <div className="font-medium m-auto text-4xl text-green-900 mt-7 text-center">Tell your story
            </div>
            <p className=" text-gray-500 text-center mt-3"> Explain who you are and why you're fundraising.</p>
            <textarea id="description" cols={30} rows={10} placeholder="your story goes here..." className="w-full  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md my-5"></textarea>
            <button onClick={submit} className="mt-7 bg-green-500 hover:bg-green-600 shadow-xl text-white  text-[1rem] font-medium px-14 py-3 rounded w-full">
                Next
            </button>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
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
//Toptechonly@123