import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPathsContext } from 'next'
import React from 'react'
import { server_url } from '../../config'
import qs from 'qs'
interface Props {
    fundraisers: any[]
}

export default function fundraisers({ fundraisers }: Props) {
    return (
        <div>
            <section className="text-gray-600 body-font ">
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
                <div className=' bg-primary bg-opacity-5 flex flex-col mx-auto py-5 items-center' style={{ minHeight: "60vh" }}>
                    {fundraisers && fundraisers.length > 0 &&
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2  text-gray-900">
                            Top individual fundraisers
                        </h1>
                    }
                    <div className=' w-[80%] flex justify-center'>
                        <div className="flex flex-wrap w-full ">
                            {fundraisers && fundraisers.length > 0 &&
                                fundraisers.map((item, index) => {
                                    
                                    return (
                                        <a key={index} href={`/f/${item.attributes.slug}`} className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer" >
                                            <div className="bg-gray-50 drop-shadow-md  rounded-lg min-h-[18rem] hover:shadow-lg">

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
                                                <div className='p-3'>
                                                    <p className='text-xs'>by {item.attributes.user.data.attributes.username}</p>
                                                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                                                        {item.attributes.tag}
                                                    </h3>
                                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                                                        {item.attributes.title}
                                                    </h2>   
                                                    <div className='text-gray-900 font-medium mt-4'>
                                                        <strong>{item.attributes.fund_raised.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} raised</strong> out of {item.attributes.fund_target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </div>
                                                    <div className="w-full bg-green-400 bg-opacity-20 h-1 mt-1 mb-3" >
                                                        <div className="w-max-[100%] bg-green-500 h-1" style={{ width: `${Math.floor((item.attributes.fund_raised / item.attributes.fund_target) * 100)}%` }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })
                            }
                            {
                                (!fundraisers || fundraisers.length <= 0) &&
                               <div className='flex flex-col items-center mx-auto'>
                                <h2 className='sm:text-4xl text-3xl font-medium align-middle mx-auto title-font my-2  text-gray-700'>
                                    No fundraisers found
                                </h2>
                                <p className='font-light text-xl text-gray-600'>
                                    Be the first one to start a new fundraiser.
                                </p>
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
    const query = qs.stringify({
        populate: ["image", "user", 'charity'], pagination: {
            pageSize: 10,
        },
        sort: ['donations_count:desc'],
        encodeValuesOnly: true,
    })
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
            fundraisers: null
        }
    }
}