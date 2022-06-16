import axios from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { useEffect, useState } from 'react'
import { jwt_aut_token, server_url } from '../../../config';
import { isMobile } from '../../../utils';

interface Props {
    fundraiser: any; slug: string
}

export default function fundraiser({ fundraiser, slug }: Props) {

    const [url, setUrl] = useState('');
    console.log(fundraiser);
    
    useEffect(() => {
        setUrl(window.location.origin);
        let navbar =
            document.getElementById('navbar');
        if (navbar) {
            navbar.style.display = 'none'
        }
        let footer = document.querySelector('footer');
        footer ? footer.style.display = 'none' : "";
        document.querySelector('body') ? document.querySelector('body')!.style.width = 'fit-content' : null
    }, [])


    return (
        <>
            <Head>
                <title>{"Compassion| " + fundraiser.attributes.title}</title>
                <meta property="og:url" content={url} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={"Compassion| " + fundraiser.attributes.title} />
                <meta property="og:description" content={fundraiser.attributes.description} />
                {fundraiser.attributes.image && fundraiser.attributes.image.data &&
                    <meta property="og:image" content={server_url + fundraiser.attributes.image.data.attributes.url} />}
            </Head>

            <section className="text-gray-600 body-font w-fit">
                <div className="container w-fit gap-5 px-3 py-5 mx-auto">
                    <div className="lg:w-4/5 lg:justify-center mx-auto flex flex-wrap ">
                        <div className='lg:w-full'>
                            {fundraiser.attributes.image && fundraiser.attributes.image.data &&
                                <img
                                    className="w-full h-[20rem] object-cover object-center rounded-lg"
                                    src={server_url + fundraiser.attributes.image.data.attributes.url}
                                    alt="content"
                                />
                            }{!fundraiser.attributes.image &&
                                <img
                                    className="w-full h-[20rem] object-cover object-center rounded-lg"
                                    src={"/assets/image-placeholder.jpg"}
                                    alt="content"
                                />
                            }
                            <div className="flex justify-between align-baseline h-auto w-fit fill-gray-600 mt-2">
                                <svg
                                    className='w-[1.5rem] h-[1.5re] mr-2'
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    enableBackground="new 0 0 512 512"
                                >
                                    <g>
                                        <g>
                                            <path d="m121.5,64.2c-31.7,0-57.3,25.7-57.3,57.3 0,31.7 25.7,57.3 57.3,57.3 31.7,0 57.3-25.7 57.3-57.3 0.1-31.7-25.6-57.3-57.3-57.3zm0,94.3c-20.4,0-37-16.6-37-37s16.6-37 37-37c20.4,0 37,16.6 37,37s-16.5,37-37,37z" />
                                            <path d="m244.5,29.8c-10.4-11.5-25-17.7-40.7-17.7l-107.3-1.1c-22.9,0-44.8,8.3-60.5,25-16.7,15.7-25,37.6-25,60.5l1,107.4c1,14.6 6.3,29.2 17.7,40.7l256.5,256.4 214.8-214.8-256.5-256.4zm40.7,442l-241.9-241.9c-7.3-7.3-11.5-16.7-11.5-27.1l-1-106.3c0-16.7 7.3-33.4 18.8-45.9 12.5-12.5 29.2-19.8 46.9-19.8l106.3,1c10.4,0 19.8,4.2 27.1,11.5l241.9,241.9-186.6,186.6z" />
                                        </g>
                                    </g>
                                </svg>
                                <a className="my-1 text-indigo-500 tracking-widest" target={'_blank'} href={`/discover/${fundraiser.attributes.tag}`}>
                                    {(fundraiser.attributes.tag as string)[0].toUpperCase() + fundraiser.attributes.tag.slice(1)}
                                </a>
                            </div>
                            <h1 className="text-gray-900 text-2xl title-font font-medium ">
                                {fundraiser.attributes.title}
                            </h1>
                            {fundraiser.attributes['charity']['data'] && fundraiser.attributes['charity']['data']['attributes']['name'] &&
                                <h2 className='text-gray-700 my-1 text-sm'> <b className='font-medium text-[1.2rem]'> {fundraiser.attributes['charity']['data']['attributes']['name']}</b> is organizing this fundraiser.</h2>
                            }
                            {(!fundraiser.attributes['charity']['data'] || fundraiser.attributes['charity']['data']['attributes']) &&
                                <h2 className='text-gray-700 my-1 text-sm'>Individual fundraiser.  </h2>
                            }
                            <a href={`${url}/f/${slug}`} target={'_blank'} className='text-blue-600 mb-2'>more details...</a>
                            <div className="flex items-baseline gap-1">
                    <div className='flex items-baseline gap-0'>
                      <p className='text-gray-900 text-2xl title-font font-medium'>{fundraiser.attributes.fund_raised}</p>
                      <p className='text-gray-600 font-medium ' >{fundraiser.attributes.fund_type}</p>
                    </div>
                    <p>raised</p>
                    <p className='font-light text-sm text-gray-500'>&nbsp;of&nbsp; {fundraiser.attributes.fund_target}</p>
                  </div>

                            <div className="w-full bg-green-400 bg-opacity-20 h-1 mt-1 mb-3" >
                                <div className="bg-green-500 h-1" style={{ width: `${Math.floor((fundraiser.attributes.fund_raised / fundraiser.attributes.fund_target) * 100)}%` }}></div>
                            </div>
                            <a href={`${url}/f/${slug}`} target={'_blank'} className="flex w-full mt-10 font-medium text-white items-center gap-2 bg-[#32a95c] justify-center border-0 py-2 px-4 focus:outline-none active:bg-green-700 rounded">
                                <svg
                                    fill="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                </svg>
                                <p>Donate </p>
                            </a>
                        </div>

                    </div>
                </div>
            </section >
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const slug = context.params ? context.params['slug']?.toString().toLocaleLowerCase() : [];
    if (!slug) {
        return {
            props: {
                fundraiser: undefined
            }
        }
    }
    const query = qs.stringify({
        filters: {
            slug: {
                $eq: slug
            }
        },
        populate: ["image", "user", 'charity']
    })


    const fundraiser = await (await fetch(server_url + "/api/fund-raises?" + query, {
        method: "GET",

    })).json();
    if(!fundraiser['data'][0] || !fundraiser['data'][0]['attributes']['approved']){
        return{
            notFound:true
        }
    }
    
    return {
        props: {
            fundraiser: fundraiser['data'][0],
            slug
        }
    }
}