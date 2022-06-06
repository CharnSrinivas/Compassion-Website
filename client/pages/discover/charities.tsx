import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPathsContext } from 'next'
import React from 'react'
import { jwt_aut_token, server_url } from '../../config'
import qs from 'qs'
interface Props {
    fundraisers: any[]
}
export default function charities({  fundraisers }: Props) {
    return (
        <div>
            <section className="text-gray-600 body-font ">
                <div className="container px-3 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-20">
                        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                                Browse charity fundraisers
                            </h1>
                            <div className="h-1 w-20 bg-primary rounded " />
                            <h2 className='mt-5 mb-2 text-gray-600'>
                                People around the world are raising money f or what they are passionate about.
                            </h2>
                        </div>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
                            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                            gentrify, subway tile poke farm-to-table. Franzen you probably haven't
                            heard of them man bun deep jianbing selfies heirloom prism food truck
                            ugh squid celiac humblebrag.
                        </p>
                    </div>
                </div>
                <div className=' bg-primary bg-opacity-5 flex flex-col mx-auto py-5 items-center' style={{ minHeight: "60vh" }}>
                    {fundraisers && fundraisers.length > 0 &&
                        <h1 className="sm:text-3xl  text-2xl font-medium title-font mb-2  text-gray-900">
                            Trending charity fundraisers
                        </h1>
                    }
                    <div className=' w-[80%] flex justify-center'>
                        <div className="flex flex-wrap w-full justify-evenly">
                            {fundraisers && fundraisers.length > 0 &&
                                fundraisers.map((item, index) => {
                                    return (
                                        <a key={index} href={`/f/${item.attributes.slug}`} className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer" >
                                            <div className="bg-gray-50 drop-shadow-md p-6 rounded-lg min-h-[28rem] hover:shadow-lg">
                                                {item.attributes.image && item.attributes.image.data &&
                                                    <img
                                                        className="h-40 rounded w-full object-cover object-center mb-6"
                                                        src={server_url + item.attributes.image.data.attributes.url}
                                                        alt="content"
                                                    />
                                                }{(!item.attributes.image || !item.attributes.image.data) &&
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
                                                        {item.attributes.name}
                                                    </h2>
                                                    {item.attributes.description &&
                                                        <p className="leading-relaxed text-base">
                                                            {(item.attributes.description as string).slice(0, 60) + "..."}
                                                        </p>
                                                    }
                                                    {!item.attributes.description &&
                                                        <p className="leading-relaxed text-base">No story.  </p>
                                                    }
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
                                (!fundraisers ||  fundraisers.length <= 0) &&
                                <h2 className='sm:text-3xl text-2xl font-medium title-font my-7  text-gray-900'>
                                    No charity fundraisers found
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
    const query = qs.stringify(
        {
            filters: {
                charity: {
                    id:{
                        $notNull: true
                    }
                }
            }
            , populate: ["image", "user","charity"],
            sort: ['donations_count:desc'],
        })
    let res = await (await fetch(server_url + "/api/fund-raises?" + query)).json()
    const token = context.req.cookies[jwt_aut_token];
    if (res['data'] && res['data'].length > 0) {
        return {
            props: {
                fundraisers: res['data']
            }
        }
    }
    return {
        props: {
            fundraisers: null
        }
    }
}