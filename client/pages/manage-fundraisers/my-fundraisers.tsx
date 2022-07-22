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
                        <div className='w-[80%] my-5 px-4 flex-row flex justify-between items-center flex-wrap'>
                            <div >
                                <h1 className="sm:text-3xl  text-left  text-2xl font-medium title-font mb-2  text-gray-900">
                                    Your fundraisers
                                </h1>
                                <div className="h-1 w-20 bg-primary rounded " />
                            </div>
                            <a href='/create/fundraiser/details' className=" px-4  ml-2 py-3 rounded text-white mt-4 lg:mt-0 bg-[#32a95c] items-center flex-row flex gap-2">
                                <svg
                                    viewBox="0 0 490 490"
                                    className='w-5 h-5'
                                    fill='white'
                                >
                                    <polygon
                                        points="222.031,490 267.969,490 267.969,267.969 490,267.969 490,222.031 267.969,222.031 267.969,0 222.031,0  222.031,222.031 0,222.031 0,267.969 222.031,267.969 "
                                    />
                                </svg>
                                <p className='font-medium'> Start a new fundraiser</p>
                            </a>
                        </div>
                    }
                    <div className=' w-[80%] flex justify-center'>
                        <div className="flex flex-wrap w-full ">
                            {fundraisers && fundraisers.length > 0 &&
                                fundraisers.map((fundraiser, index) => {
                                    return (
                                        <a key={index} href={`/manage-fundraisers/${fundraiser.attributes.slug}/overview`} className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer " >
                                            <div className="bg-gray-50 drop-shadow-md rounded-lg p-0  min-h-[26rem]  hover:shadow-lg">
                                                {fundraiser.attributes.image && fundraiser.attributes.image.data &&
                                                    <img
                                                        className="h-40 rounded w-full object-cover object-center mb-6"
                                                        src={server_url + fundraiser.attributes.image.data[0].attributes.url}
                                                        alt={fundraiser.attributes.image.data[0].attributes.name}
                                                    />
                                                }{(!fundraiser.attributes.image.data || !fundraiser.attributes.image) &&
                                                    <img
                                                        className="h-40 rounded w-full object-cover object-center mb-6"
                                                        src={"/assets/image-placeholder.jpg"}
                                                        alt={fundraiser.attributes.name}
                                                    />
                                                }
                                                <div className='p-6'>
                                                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                                                        {fundraiser.attributes.tag}
                                                    </h3>
                                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                                                        {fundraiser.attributes.title}
                                                    </h2>
                                                    {fundraiser.attributes.description &&
                                                        <p className="leading-relaxed text-base">
                                                            {(fundraiser.attributes.description as string).slice(0, 60) + "..."}
                                                        </p>
                                                    }
                                                    {!fundraiser.attributes.description &&
                                                        <p className="leading-relaxed text-base">No story.  </p>
                                                    }
                                                    <div className='text-gray-900 font-medium mt-4'>
                                                        <strong>{fundraiser.attributes.fund_raised.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} raised</strong> out of {fundraiser.attributes.fund_target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </div>
                                                    <div className="w-full bg-green-400 bg-opacity-20 h-1 mt-1 mb-3" >
                                                        <div className="bg-green-500 h-1 w-max-[100%]" style={{ width: `${Math.floor((fundraiser.attributes.fund_raised / fundraiser.attributes.fund_target) * 100)}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })
                            }
                            {
                                fundraisers.length <= 0 &&
                                <div className='w-[80%] mx-auto my-5 px-4 flex-col  items-center'>
                                    <h1 className='lg:text-4xl text-2xl text-center w-[100%] font-medium  my-7  text-gray-600'>
                                        No fundraisers found
                                    </h1>
                                    <hr />
                                    <div className='mt-5 flex-col items-center '>
                                        <h4 className='text-center my-3 text-xl'>Start your fundraising journey by creating a new fundraiser now.</h4>
                                        <a href='/create/fundraiser/details' className="px-4 mx-auto py-3 w-fit rounded text-white mt-4 lg:mt-8 bg-[#32a95c] items-center flex-row flex gap-2">
                                            <svg
                                                viewBox="0 0 490 490"
                                                className='w-5 h-5'
                                                fill='white'
                                            >
                                                <polygon
                                                    points="222.031,490 267.969,490 267.969,267.969 490,267.969 490,222.031 267.969,222.031 267.969,0 222.031,0  222.031,222.031 0,222.031 0,267.969 222.031,267.969 "
                                                />
                                            </svg>
                                            <p className='font-medium'> Start a new fundraiser</p>
                                        </a>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section >
        </div >
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
        return { props: { is_auth: false, user: null, fundraisers: null } }
    }
    let user = await usr_res.json();

    const query = qs.stringify({
        filters: {
            user: {
                id: {
                    $eq: user.id
                }
            }
        }, populate: ["image", "user"]
    });

    let res = await (await fetch(server_url + "/api/fund-raises?" + query)).json()


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