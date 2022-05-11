import { GetStaticPathsContext } from 'next'
import React from 'react'
import { server_url } from '../../config'
import qs from 'qs'
interface Props {
    fundraisers: any[]
}

export default function fundraisers({ fundraisers }: Props) {
    console.log(fundraisers);

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-20">
                        <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                                Top fundraisers
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
                    <div className="flex flex-wrap -m-4">
                        {
                            fundraisers.map((item, index) => {
                                return (
                                    <div key={index} className="xl:w-1/4 md:w-1/2 p-4">
                                        <div className="bg-gray-50 drop-shadow-md p-6 rounded-lg">
                                            <img
                                                className="h-40 rounded w-full object-cover object-center mb-6"
                                                src={server_url + item.attributes.images.data[0].attributes.formats.small.url}
                                                alt="content"
                                            />
                                            <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                                                {item.attributes.tag}
                                            </h3>
                                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                                                {item.attributes.title}
                                            </h2>
                                            <p className="leading-relaxed text-base">
                                                {(item.attributes.description as string).slice(0, 60) + "..."}
                                            </p>
                                            {/* {(item.attributes.description as string).split(`\n`).map((txt, index) => {
                                                return (<>
                                                    <p className="leading-relaxed text-base">
                                                        {txt}
                                                    </p>
                                                    <div>&nbsp;</div>
                                                </>)
                                            })} */}
                                            <div className='text-gray-900 font-medium mt-4'>
                                                <strong>{item.attributes.fund_raised.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} raised</strong> out of {item.attributes.fund_target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </section >
        </div >
    )
}

export async function getStaticProps(context: GetStaticPathsContext) {
    const query = qs.stringify({
        filters: [

        ], populate: ["images", "author"]
    })
    let res = await (await fetch(server_url + "/api/fund-raises?" + query)).json()
    return {
        props: {
            fundraisers: res['data']
        }
    }
}