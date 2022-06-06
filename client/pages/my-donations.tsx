import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import qs from 'qs';
import React, { useEffect, useState } from 'react'
import { jwt_aut_token, server_url } from '../config';
import fundraiser from './f/[slug]';

interface Props {
    donations: any[];
    donations_meta: any
}

export default function myDonations({ donations, donations_meta }: Props) {

    const [url, setUrl] = useState('');
    console.log(donations);
    useEffect(() => {
        setUrl(window.location.pathname);
    }, []);
    
    return (
        <section>
            <div className="flex flex-col mt-6">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                        {donations.length > 0 &&
                            <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            To
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Amount
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Word of support
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                                        >
                                            Date
                                        </th>
                                        {/* <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th> */}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {donations.map((donation, index) => {
                                        return (
                                            <tr key={index} className="transition-all hover:bg-gray-100 hover:shadow-lg">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            <img
                                                                className="w-10 h-10 rounded-full object-cover"
                                                                // src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                                                                src={`${server_url}${donation.attributes.fund_raise.data.attributes.image.data.attributes.formats.thumbnail.url}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <a href={`/f/${donation.attributes.fund_raise.data.attributes.slug}`} className="text-sm font-medium text-blue-800">{donation.attributes.fund_raise.data.attributes.title}</a>
                                                            <div className="text-sm text-gray-500">{donation.attributes.fund_raise.data.attributes.tag}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-lg text-gray-900">{donation.attributes.amount}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-xs text-gray-900">{donation.attributes.comment}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    {new Date(donation.attributes.createdAt).toLocaleDateString().replaceAll("/", '-')}
                                                </td>
                                                {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                          </td> */}
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>}
                        {donations.length <= 0 &&
                            <div className=' bg-white py-7'>
                                <h3 className='mt-15 font-medium text-xl text-gray-900 my-3 text-center'>Your fundraiser has no donations yet :(</h3>
                                <h5 className='mt-15  text-gray-700 my-3 text-center' >Your donations will show up here. Start by sharing your fundriaiser with friends and family </h5>
                            </div>
                        }

                        {donations_meta['']}
                    </div>
                    <div className="flex my-5 mx-auto justify-center">
                        {donations_meta['page'] !== 1 &&
                            <a href={`${url}?dp=${donations_meta['page'] - 1}`} className="border border-teal-500 text-teal-500 block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-teal-500 hover:text-white">
                                <svg
                                    className="h-5 w-5 mr-2 fill-current"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="-49 141 512 512"
                                    xmlSpace="preserve"
                                >
                                    <path
                                        id="XMLID_10_"
                                        d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"
                                    />
                                </svg>
                                Previous
                            </a>
                        }
                        {donations_meta['page'] < donations_meta['pageCount'] &&
                            <a href={`${url}?dp=    ${donations_meta['page'] + 1}`} className="border border-teal-500 bg-teal-500 text-white block rounded-sm font-bold py-4 px-6 ml-2 flex items-center">
                                Next
                                <svg
                                    className="h-5 w-5 ml-2 fill-current"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="-49 141 512 512"
                                    xmlSpace="preserve"
                                >
                                    <path
                                        id="XMLID_11_"
                                        d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0 l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0 c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z" />
                                </svg>
                            </a>
                        }
                    </div>
                </div>
            </div>
        </section>

    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const token = context.req.cookies[jwt_aut_token];
    const donations_page = context.query['dp'];
    const donations_size = context.query['ds'];
    const redirect_obj: Redirect = {
        destination: "/register",
        statusCode: 307,
        basePath: false
    }

    const dp = parseInt(donations_page ? donations_page.toString() : '1');
    const ds = parseInt(donations_size ? donations_size.toString() : '10');
    let res = (await fetch(server_url + "/api/users/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    )
    if (res.status > 201) {
        return { redirect: redirect_obj }
    }
    let user = await res.json();

    const donations_query = qs.stringify({
        filters: {
            user: {
                id: { $eq: user.id }
            }
        },
        populate: ["image", "user", 'charity', 'fund_raise', 'fund_raise.image'],
        sort: ['createdAt:desc'],
        pagination: {
            pageSize: !isNaN(ds) ? ds : 10,
            page: !isNaN(dp) ? dp : 1
        }
    })

    const donations = await (await fetch(server_url + "/api/donations?" + donations_query, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })).json();
    return {
        props: {
            donations: donations['data'],
            donations_meta: donations['meta']['pagination']
        }
    }
}