import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPathsContext } from 'next'
import React from 'react'
import { server_url } from '../../config'
import qs from 'qs'
interface Props {
    charities: any[]
}

export default function fundraisers({ charities }: Props) {
    return (
        <div>
            <section className="text-gray-600 body-font ">
                <div className="container px-3 py-24 mx-auto">
                    <div className="container px-3 pt-20 mx-auto">
                        <div className="flex flex-wrap w-full mb-20">
                            <div className="lg:w-[80%] mx-auto w-full mb-4 lg:mb-0">
                                <h1 className="text-3xl lg:text-4xl font-medium title-font mb-2 text-gray-800">
                                    Browse charities
                                </h1>
                                <div className="h-1 w-20 bg-primary rounded " />
                                <h2 className='mt-5 mb-2 text-gray-600 text-xl'>
                                    People around the world are raising money for what they are passionate about.
                                </h2>
                                <a href="/create/charity/details"
                                    className="block px-8 md:w-fit text-center text-[1.1rem] drop-shadow-xl py-3 space-x-10 rounded text-white mt-8  bg-[#32a95c] sm:w-full">
                                    Start a charity
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' bg-primary bg-opacity-5 flex flex-col mx-auto py-5 items-center' style={{ minHeight: "60vh" }}>
                    {charities && charities.length > 0 &&
                        <h1 className=" text-3xl font-medium  my-8 title-font text-gray-700">
                            Charities listed
                        </h1>
                    }
                    <div className=' w-[80%] flex justify-center'>
                        <div className="flex flex-wrap w-full ">
                            {charities && charities.length > 0 &&
                                charities.map((item, index) => {
                                    return (
                                        <a key={index} href={`/charities/${item.attributes.slug}`} className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer" >
                                            <div className="bg-gray-50 drop-shadow-md p-6 rounded-lg min-h-[20rem] hover:shadow-lg">

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
                                                        {item.attributes.title}
                                                    </h2>
                                                    {item.attributes.description &&
                                                        <p className="leading-relaxed text-base break-words">
                                                            {(item.attributes.description as string).slice(0, 60) + "..."}
                                                        </p>
                                                    }
                                                    {!item.attributes.description &&
                                                        <p className="leading-relaxed text-base">No description  </p>
                                                    }
                                                    <div className='text-gray-900 font-medium mt-4 flex items-center gap-2'>
                                                        <strong className='font-medium text-gray-800 text-xl'>{item.attributes.direct_funds?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                                                        <p className='text-gray-600 '>direct funds raised</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })
                            }
                            {(!charities ||
                                charities.length <= 0) &&
                                <div className='mx-auto flex flex-col items-center'>
                                    <h2 className='sm:text-3xl text-2xl font-medium title-font mt-7  text-gray-900'>
                                        No charities found.
                                    </h2>
                                    <p className='font-light text-xl text-gray-600 mt-2'>
                                        Be the first one to start a charity.
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
         populate: ["image", "user"], pagination: {
            pageSize: 10,
        },
        sort: ['direct_funds:desc'],
        encodeValuesOnly: true,
    })
    let res = await (await fetch(server_url + "/api/charities?" + query)).json()

    if (res['data']) {
        return {
            props: {
                charities: res['data']
            }
        }
    }
    return {
        props: {
            charities: null
        }
    }
}