import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPathsContext, Redirect } from 'next';
import qs from 'qs';
import React from 'react'
import { jwt_aut_token, server_url } from '../../config';

interface Props {
    fundraisers: any[];
}

export default function manage({ fundraisers }: Props) {

    return (
        <div>
            <section className="text-gray-600 body-font ">

                <div className=' flex flex-col mx-auto mt-10 py-5 items-center' style={{ minHeight: "60vh" }}>
                    {fundraisers.length > 0 &&
                        <div className='w-[80%] my-5 px-4'>
                            <h1 className="sm:text-3xl  text-left  text-2xl font-medium title-font mb-2  text-gray-900">
                                My fundraisers
                            </h1>
                            <div className="h-1 w-20 bg-primary rounded " />
                        </div>
                    }
                    <div className=' w-[80%] flex justify-center'>
                        <div className="flex flex-wrap gap-4 w-full justify-start">
                            {fundraisers &&
                                fundraisers.map((item, index) => {
                                    return (
                                        <a key={index} href={`/manage/${item.attributes.slug}`} className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer " >
                                            <div className="bg-gray-50 drop-shadow-md rounded-lg p-0  min-h-[26rem] ">
                                                {item.attributes.image &&
                                                    <img
                                                        className="h-40 rounded w-full object-cover object-center mb-6"
                                                        src={server_url + item.attributes.image.data.attributes.formats.small.url}
                                                        alt="content"
                                                    />
                                                }{!item.attributes.image &&
                                                    <img
                                                        className="h-40 rounded w-full object-cover object-center mb-6"
                                                        src={"/assets/image-placeholder.jpg"}
                                                        alt="content"
                                                    />
                                                }
                                                <div className='p-6'>
                                                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                                                        {item.attributes.tag}
                                                    </h3>
                                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                                                        {item.attributes.title}
                                                    </h2>
                                                    <p className="leading-relaxed text-base">
                                                        {(item.attributes.description as string).slice(0, 60) + "..."}
                                                    </p>
                                                    <div className='text-gray-900 font-medium mt-4'>
                                                        <strong>{item.attributes.fund_raised.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} raised</strong> out of {item.attributes.fund_target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </div>
                                                    <div className="w-full bg-green-400 bg-opacity-20 h-1 mt-1 mb-3" >
                                                        <div className="bg-green-500 h-1" style={{ width: `${Math.floor((item.attributes.fund_raised / item.attributes.fund_target) * 100)}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })
                            }
                            {
                                fundraisers.length <= 0 &&
                                <h2 className='sm:text-3xl text-2xl font-medium title-font my-7  text-gray-900'>
                                    No fundraisers found
                                </h2>
                            }
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
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
    console.log(usr_res.status);

    if (usr_res.status > 201) {
        return { props: { is_auth: false, user: null, fundraisers: null } }
    }
    let user = await usr_res.json();

    const query = qs.stringify({
        filters: {
            author: {
                id: {
                    $eq: user.id
                }
            }
        }, populate: ["image", "author"]
    });

    let res = await (await fetch(server_url + "/api/fund-raises?" + query)).json()
    console.log(res['data']);

    if (res['data']) {
        return {
            props: {
                fundraisers: res['data']
            }
        }
    }
    return {
        props: {
            fundraisers: []
        }
    }
}