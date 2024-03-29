import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import qs from 'qs';
import React from 'react'
import { fundraiser_tags, jwt_aut_token, server_url } from '../../config';

interface Props {
    fundraisers: any[];
}

export default function medical({ fundraisers }: Props) {
    return (
        <section>

            <div className='px-8 py-12 lg:w-[60%] w-[90%] mx-auto mt pt-[5rem] flex lg:flex-row flex-col  gap-8 justify-between'>
                <div>
                    <h1 className='font-semibold my-4 text-4xl text-gray-700'>The New Charity Fundraising Experience Has Arrived on Compassion</h1>
                    
                    <a href="/create/charity/details"
                        className="block px-8 md:w-fit text-center text-[1.1rem] drop-shadow-xl py-3 space-x-10 rounded text-white mt-8  bg-[#32a95c] sm:w-full">
                        Register as a charity
                    </a>
                </div>
                <img className=' w-[100%] lg:w-[45%] h-[13rem] lg:h-[32rem] object-cover lg:ml-11' src="https://d25oniaj7o2jcw.cloudfront.net/photo-category-emergencies-uk@2x.jpg" alt="charity" />
            </div>
            <hr />
            <div className=' w-full bg-[#fbf8f6] py-5'>
                <div className='px-8 mx-auto w-90% lg:w-[60%] pt-[5rem]'>
                    <div className='mb-5'>
                        <h1 className='font-semibold mb-1 text-3xl text-gray-700'>Trending charity fundraiser</h1>
                        <div className="h-1 w-24 bg-primary rounded " />
                    </div>
                    <div className="flex flex-wrap ">
                        {fundraisers.length > 0 &&
                            fundraisers.map((item, index) => {
                                return (
                                    <a href={`/f/${item.attributes.slug}`} key={index} className=" xl:w-1/3 md:w-1/2 w-full p-4 cursor-pointer ">
                                        <div className="bg-gray-50 drop-shadow-md p-6 rounded-lg min-h-[28rem]">
                                            {item.attributes.image && item.attributes.image.data &&
                                                <img
                                                    className="h-40 rounded w-full object-cover object-center mb-6"
                                                    src={server_url + item.attributes.image.data[0].attributes.url}
                                                    alt={item.attributes.image.data[0].attributes}
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
                        } {
                            fundraisers.length <= 0 &&
                            <h2 className='sm:text-3xl text-2xl font-medium title-font my-7  text-gray-900'>
                                No charity fundraisers found
                            </h2>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const query = qs.stringify(
        {
            filters: {
                charity: {
                    id: {
                        $notNull: true
                    }
                }
            },
            sort: ['donations_count:desc'],
            populate: ["image", "user", "charity"],
            pagination: {
                pageSize: 6
            }
        })
    let res = await (await fetch(server_url + "/api/fund-raises?" + query)).json()
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