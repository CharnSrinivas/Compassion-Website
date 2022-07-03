import axios from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { useEffect, useState } from 'react'
import { server_url } from '../../../config';
interface Props {
    fundraiser: any; slug: string
}

export default function fundraiser({ fundraiser, slug }: Props) {
    const [url, setUrl] = useState('');
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
                <title>{"Compassion| " + fundraiser.attributes.name}</title>
                <meta property="og:url" content={url} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={"Compassion| " + fundraiser.attributes.name} />
                <meta property="og:description" content={fundraiser.attributes.description} />
                {fundraiser.attributes.image && fundraiser.attributes.image.data &&
                    <meta property="og:image" content={server_url + fundraiser.attributes.image.data[0].attributes.url} />}
            </Head>

            <section className="text-gray-600 body-font w-fit">
                <div className="container w-fit gap-5 px-3 py-5 mx-auto">
                    <div className="lg:w-4/5 lg:justify-center mx-auto flex flex-wrap ">
                        <div className='lg:w-full'>
                            {fundraiser.attributes.image && fundraiser.attributes.image.data &&
                                <img
                                    className="w-full h-[20rem] object-cover object-center rounded-lg"
                                    src={server_url + fundraiser.attributes.image.data[0].attributes.url}
                                    alt={fundraiser.attributes.image.data[0].attributes}
                                />
                            }{!fundraiser.attributes.image &&
                                <img
                                    className="w-full h-[20rem] object-cover object-center rounded-lg"
                                    src={"/assets/image-placeholder.jpg"}
                                    alt={fundraiser.attributes.name}
                                />
                            }

                            <h1 className="text-gray-900 text-2xl title-font font-medium ">
                                {fundraiser.attributes.title}
                            </h1>

                            <a href={`${url}/charities/${slug}`} target={'_blank'} className='mt-4 text-blue-600 '>more details...</a>
                            <div className="flex items-baseline my-2">
                                <p className='text-gray-900 text-2xl title-font font-medium'>{fundraiser.attributes.direct_funds}&nbsp;</p>
                                <p>{fundraiser.attributes.direct_funds}</p>
                                <p>direct funds raised</p>
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
    const server_url = 'http://127.0.0.1:1337';
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


    const charity = await (await fetch(server_url + "/api/charities?" + query, {
        method: "GET",

    })).json();

    if(!charity['data'][0] || !charity['data'][0]['attributes']['approved']){
        return{
            notFound:true
        }
    }
    return {
        props: {
            fundraiser: charity['data'][0],
            slug
        }
    }
}