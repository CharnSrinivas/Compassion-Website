import React from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPropsContext } from 'next';
import qs from 'qs';
import { fundraiser_ref, fundraiser_tags, server_url } from '../../config';

interface Props {
    fundraisers: any[]; tag: string
}

export default function Tag({ fundraisers, tag }: Props) {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="container px-3 pt-20 mx-auto">
                        <div className="flex flex-wrap w-full mb-20">
                            <div className="lg:w-[80%] mx-auto w-full mb-4 lg:mb-0">
                                <h1 className="text-3xl lg:text-4xl font-medium title-font mb-2 text-gray-800">
                                    Browse fundraisers
                                </h1>
                                <div className="h-1 w-20 bg-primary rounded " />
                                <h2 className='mt-5 mb-2 text-gray-600 text-xl'>
                                    People around the world are raising money for what they are passionate about.
                                </h2>
                                <a href="/create/fundraiser/details"
                                    className="block px-8 md:w-fit text-center text-[1.1rem] drop-shadow-xl py-3 space-x-10 rounded text-white mt-8  bg-[#32a95c] sm:w-full">
                                    Start a Fundraiser
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        {fundraisers && fundraisers.length > 0 &&
                            fundraisers.map((item, index) => {
                                return (
                                    <a href={`/f/${item.attributes.slug}`} key={index} className=" xl:w-1/4 md:w-1/2 p-4 cursor-pointer ">
                                        <div className="bg-gray-50 drop-shadow-md p-6 rounded-lg min-h-[28rem] hover:shadow-lg">
                                            {item.attributes.image && item.attributes.image.data &&
                                                <img
                                                    className="h-40 rounded w-full object-cover object-center mb-6"
                                                    src={server_url + item.attributes.image.data[0].attributes.url}
                                                    alt={item.attributes.image.data[0].attributes.name}
                                                />
                                            }{(!item.attributes.image || !item.attributes.image.data) &&
                                                <img
                                                    className="h-40 rounded w-full object-cover object-center mb-6"
                                                    src={"/assets/image-placeholder.jpg"}
                                                    alt={item.attributes.name}
                                                />
                                            }
                                            <>
                                                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                                                    {item.attributes.tag}
                                                </h3>
                                                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                                                    {item.attributes.title}
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
                                            </>
                                        </div>
                                    </a>
                                )
                            })
                        } {(!fundraisers ||
                            fundraisers.length <= 0) &&
                            <h2 className='sm:text-3xl text-2xl font-medium title-font my-7  text-gray-900'>
                                No  {tag} fundraisers found
                            </h2>
                        }

                    </div>
                </div>
            </section >
        </div >
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const tag = context.params ? context.params['tag']?.toString().toLocaleLowerCase() : '';
    if (!tag) {
        return {
            props: {
                fundraisers: []
            }
        }
    }
    console.log(fundraiser_tags.indexOf(tag));

    if (fundraiser_tags.indexOf(tag) < 0) {
        return {
            notFound: true
        }
    }
    const query = qs.stringify({
        filters: {
            $and: [
                {
                    approved: { $eq: true }
                },
                {
                    tag: {
                        $eq: tag
                    }
                }
            ]
        },
        sort: ['donations_count:desc'],
        populate: ["image", "user"]
    })
    // const res_json
    try {
        const res = await (await fetch(server_url + "/api/fund-raises?" + query, {
            method: "GET",
        })).json()
        if (res['data']) {
            return {
                props: {
                    fundraisers: res['data'], tag
                }
            }
        }
        return {
            props: {
                fundraisers: [], tag
            }
        }
    } catch (err) {
        console.error(err);
        return {
            props: { fundraisers: [], tag },
        }
    }

}