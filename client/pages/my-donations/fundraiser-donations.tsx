import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import qs from 'qs';
import React, { useEffect, useState } from 'react'
import { jwt_aut_token, server_url } from '../../config';

interface Props {
    donations: any[];
    donations_meta: any;
    charity_donations_meta: any;
    dp: number;
    ds: number;
}

export default function myDonations({ donations, donations_meta, charity_donations_meta, dp, ds }: Props) {
    const [pathname, setPathName] = useState('');

    const [url, setUrl] = useState('');
    useEffect(() => {
        setUrl(window.location.pathname);
        setPathName(window.location.pathname);

    }, []);

    return (

        <section className='flex flex-col'>
            <div className='w-[90%] lg:w-[80%] mx-auto my-5 flex flex-col'>
                <div></div>
                <h1 className='text-3xl text-gray-700 font-medium'>Your donations</h1>
                <div className="flex flex-wrap gap-12">
                    <div className="flex items-center justify-between p-4 transition-shadow border rounded-lg w-fit my-5 shadow-sm hover:shadow-lg bg-white">
                        <div className="flex flex-col space-y-2">
                            <span className="text-gray-500">Total fundraiser donations</span>
                            <span className="text-2xl text-primary font-semibold">{donations_meta.total}</span>
                        </div>
                        <div className="bg-gray-200 p-2 rounded-full ml-6">
                            <svg
                                width={45}
                                height={45}
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M 16 3 C 10.486 3 6 7.486 6 13 C 6 18.514 10.486 23 16 23 C 21.514 23 26 18.514 26 13 C 26 7.486 21.514 3 16 3 z M 16 5 C 20.411 5 24 8.589 24 13 C 24 17.411 20.411 21 16 21 C 11.589 21 8 17.411 8 13 C 8 8.589 11.589 5 16 5 z M 15 7 L 15 8.1894531 C 14.855 8.2419531 14.714063 8.3061133 14.580078 8.3789062 C 14.446094 8.4516992 14.318203 8.5338281 14.197266 8.625 C 14.076328 8.7161719 13.963281 8.8161914 13.857422 8.9238281 C 13.645703 9.1391016 13.465391 9.3846484 13.326172 9.6542969 C 13.256562 9.7891211 13.196875 9.930625 13.148438 10.076172 C 13.051562 10.367266 13 10.6775 13 11 C 13 11.205 13.022109 11.405469 13.0625 11.599609 C 13.143281 11.987891 13.300547 12.350391 13.517578 12.669922 C 13.626094 12.829688 13.748516 12.978984 13.884766 13.115234 C 14.157266 13.387734 14.481719 13.608594 14.839844 13.761719 C 15.197969 13.914844 15.59 14 16 14 C 16.1425 14 16.276016 14.026953 16.396484 14.076172 C 16.516953 14.125391 16.623516 14.197734 16.712891 14.287109 C 16.802266 14.376484 16.874609 14.483047 16.923828 14.603516 C 16.973047 14.723984 17 14.8575 17 15 C 17 15.4275 16.757891 15.776172 16.396484 15.923828 C 16.276016 15.973047 16.1425 16 16 16 C 15.8575 16 15.723984 15.973047 15.603516 15.923828 C 15.483047 15.874609 15.376484 15.802266 15.287109 15.712891 C 15.108359 15.534141 15 15.285 15 15 L 13 15 C 13 15.16125 13.013828 15.320254 13.039062 15.474609 C 13.064297 15.628965 13.1 15.778281 13.148438 15.923828 C 13.196875 16.069375 13.256562 16.210879 13.326172 16.345703 C 13.395781 16.480527 13.475703 16.608281 13.564453 16.730469 C 13.653203 16.852656 13.751563 16.968535 13.857422 17.076172 C 13.963281 17.183809 14.076328 17.283828 14.197266 17.375 C 14.318203 17.466172 14.446094 17.548301 14.580078 17.621094 C 14.714062 17.693887 14.855 17.758047 15 17.810547 L 15 19 L 17 19 L 17 17.810547 C 18.015 17.443047 18.784297 16.555098 18.960938 15.474609 C 18.986172 15.320254 19 15.16125 19 15 C 19 14.795 18.977891 14.594531 18.9375 14.400391 C 18.897109 14.20625 18.838281 14.018906 18.761719 13.839844 C 18.685156 13.660781 18.590937 13.489844 18.482422 13.330078 C 18.373906 13.170312 18.251484 13.021016 18.115234 12.884766 C 17.978984 12.748516 17.829687 12.626094 17.669922 12.517578 C 17.510156 12.409063 17.339219 12.314844 17.160156 12.238281 C 16.981094 12.161719 16.79375 12.102891 16.599609 12.0625 C 16.405469 12.022109 16.205 12 16 12 C 15.8575 12 15.723984 11.973047 15.603516 11.923828 C 15.483047 11.874609 15.376484 11.802266 15.287109 11.712891 C 15.197734 11.623516 15.125391 11.516953 15.076172 11.396484 C 15.026953 11.276016 15 11.1425 15 11 C 15 10.8575 15.026953 10.723984 15.076172 10.603516 C 15.125391 10.483047 15.197734 10.376484 15.287109 10.287109 C 15.376484 10.197734 15.483047 10.125391 15.603516 10.076172 C 15.723984 10.026953 15.8575 10 16 10 C 16.57 10 17 10.43 17 11 L 19 11 C 19 10.83875 18.986172 10.679746 18.960938 10.525391 C 18.935703 10.371035 18.9 10.221719 18.851562 10.076172 C 18.560938 9.2028906 17.87 8.5044531 17 8.1894531 L 17 7 L 15 7 z M 2 21 L 2 29 L 4 29 L 4 23 L 9.3808594 23 C 8.5298594 22.435 7.7610781 21.758 7.0800781 21 L 2 21 z M 24.919922 21 C 24.238922 21.758 23.470141 22.435 22.619141 23 L 28 23 L 28 29 L 30 29 L 30 21 L 24.919922 21 z M 6 25 L 6 27 L 26 27 L 26 25 L 6 25 z" />
                            </svg>

                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 transition-shadow border rounded-lg w-fit my-5 shadow-sm hover:shadow-lg bg-white">
                        <div className="flex flex-col space-y-2">
                            <span className="text-gray-500">Total charity donations</span>
                            <span className="text-2xl text-primary font-semibold">{charity_donations_meta.total}</span>
                        </div>
                        <div className="bg-gray-200 p-2 rounded-full ml-6">
                            <svg
                                width={45}
                                height={45}
                                viewBox="0 0 344.058 344.058"

                            >
                                <g>
                                    <g>
                                        <g>
                                            <path
                                                d="M336.559,211.482h-108.65c-14.758,0-26.764,12.006-26.764,26.764c0,10.356,5.913,19.358,14.54,23.806l-11.248,7.089
				l-47.06-29.657c-12.483-7.869-29.044-4.11-36.911,8.372c-7.887,12.512-4.145,29.025,8.372,36.913l61.328,38.649
				c8.716,5.494,19.817,5.499,28.54,0l92.682-58.409h25.17c4.143,0,7.5-3.358,7.5-7.5v-38.528
				C344.059,214.841,340.701,211.482,336.559,211.482z M329.059,250.011L329.059,250.011h-19.836c-1.415,0-2.802,0.4-3.999,1.155
				l-94.516,59.565c-3.758,2.37-8.782,2.371-12.542-0.001l-61.329-38.649c-5.501-3.466-7.148-10.722-3.681-16.225
				c3.461-5.491,10.741-7.136,16.225-3.68l51.058,32.177c2.443,1.54,5.555,1.54,7.998,0l30.69-19.342h9.975
				c4.143,0,7.5-3.358,7.5-7.5c0-4.142-3.357-7.5-7.5-7.5c-11.944,0-9.374,0-21.192,0c-6.486,0-11.764-5.277-11.764-11.764
				c0-6.487,5.277-11.764,11.764-11.764h101.149V250.011z"
                                            />
                                            <path
                                                d="M192.784,130.777c-0.027,0-0.056,0-0.083,0c-7.893,0-15.277,3.222-20.672,9.032c-5.404-5.82-12.792-9.032-20.672-9.032
				c-0.027,0-0.056,0-0.083,0c-24.554,0.07-37.231,29.482-20.506,47.395c0.077,0.088,0.156,0.174,0.237,0.259l28.333,29.45
				c6.924,7.197,18.432,7.222,25.382,0l28.332-29.45c0.081-0.085,0.16-0.171,0.237-0.259
				C229.947,160.329,217.479,130.847,192.784,130.777z M202.221,168.046c-0.059,0.062-0.116,0.124-0.173,0.188l-28.137,29.247
				c-1.027,1.066-2.735,1.069-3.763,0l-28.138-29.247c-0.057-0.064-0.114-0.126-0.173-0.188c-7.93-8.294-2.134-22.237,9.479-22.27
				c0.013,0,0.025,0,0.039,0c7.28,0,13.173,5.891,13.173,13.173c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5
				c0-7.281,5.892-13.173,13.174-13.173c0.013,0,0.025,0,0.038,0C204.332,145.809,210.173,159.73,202.221,168.046z"
                                            />
                                            <path
                                                d="M142.913,105.812c0-10.356-5.913-19.358-14.54-23.806l11.248-7.089l47.06,29.657c12.483,7.868,29.044,4.111,36.911-8.372
				c7.887-12.512,4.145-29.025-8.372-36.913L153.892,20.64c-8.716-5.494-19.817-5.499-28.54,0L32.67,79.047H7.5
				c-4.143,0-7.5,3.358-7.5,7.5v38.528c0,4.142,3.357,7.5,7.5,7.5h108.649C130.907,132.576,142.913,120.568,142.913,105.812z
				 M116.149,117.576H15V94.047h19.836c1.415,0,2.802-0.4,3.999-1.155l94.516-59.565c3.758-2.37,8.782-2.371,12.542,0.001
				l61.329,38.649c5.501,3.466,7.148,10.722,3.681,16.225c-3.459,5.487-10.738,7.138-16.225,3.68L143.62,59.706
				c-2.443-1.54-5.555-1.54-7.998,0l-30.69,19.342h-9.975c-4.143,0-7.5,3.358-7.5,7.5c0,4.142,3.357,7.5,7.5,7.5
				c11.944,0,9.374,0,21.192,0c6.486,0,11.764,5.277,11.764,11.764C127.913,112.297,122.636,117.576,116.149,117.576z"
                                            />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[90%] lg:w-[80%] mx-auto flex flex-col px-8 items-start py-10'>

                <ul className='flex gap-10 '>
                    <div>
                        <a href='/my-donations/fundraiser-donations' className='text-gray-700'>
                            Fundraiser donations
                        </a>
                        <div className='h-[3.5px]   rounded-full w-full bg-green-600'></div>
                    </div>
                    <div>
                        <a href='/my-donations/charity-donations' className='text-gray-700'>
                            Charity donations
                        </a>
                        <div className='h-[3.5px]  rounded-full w-full bg-gray-200'></div>
                    </div>
                </ul>
                <div className="w-full mt-12 mx-auto min-h-[80vh] inline-block py-2 align-middle ">
                    <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                        {donations &&
                            donations.length > 0 &&
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
                                            Approved
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
                                                            {donation.attributes.fund_raise.data.attributes.image.data &&
                                                                <img
                                                                    className="w-10 h-10 rounded-full object-cover"
                                                                    // src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                                                                    src={`${server_url}${donation.attributes.fund_raise.data.attributes.image.data[0].attributes.formats.thumbnail.url}`}
                                                                    alt=""
                                                                />
                                                            }{!donation.attributes.fund_raise.data.attributes.image.data &&
                                                                <img
                                                                    className="w-10 h-10 rounded-full object-cover"
                                                                    // src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                                                                    src={`/assets/image-placeholder.jpg`}
                                                                    alt=""
                                                                />
                                                            }
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
                                                    <div className="text-xs text-gray-900">{(donation.attributes.comment as string).length > 60 ? (donation.attributes.comment as string).slice(0, 60) + "..." : (donation.attributes.comment as string)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {donation.attributes.success&&
                                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                                            Approved
                                                        </span>
                                                    }
                                                    {!donation.attributes.success&&
                                                        <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                                                            Pending
                                                        </span>}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                    {new Date(donation.attributes.createdAt).toLocaleDateString().replaceAll("/", '-')}
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        }
                        {(!donations || donations.length <= 0) &&
                            <div className=' bg-white py-7 '>
                                <h3 className='mt-15 font-medium text-xl text-gray-900 my-3 text-center'>You have'nt donated to any fundraiser or charity yet</h3>
                                <h5 className='mt-15  text-gray-700 my-3 text-center' >Your donations will show up here. </h5>
                            </div>
                        }
                    </div>
                    
                    <div className="flex px-4 py-3 text-xs font-semibold justify-between tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9 ">
                        <span className="flex items-center col-span-3">

                            <div className="flex justify-center">
                                <div className="mb-3 xl:w-96">
                                    <select
                                        onChange={(e) => {
                                            window.location.href = `${pathname}?dp=${donations_meta.page}&ds=${e.target.value}`
                                        }}
                                        className="form-select appearance-none block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        aria-label="Default select example"
                                    >
                                        {[10, 20, 50, 100].map((num) => {
                                            let selected;
                                            return (
                                                <option selected={ds === num} value={num}>{num}</option>
                                            )
                                        })}
                                        {/* <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option> */}
                                    </select>
                                </div>
                            </div>
                        </span>
                        <span className="col-span-2" />
                        {/* Pagination */}
                        <span className="flex col-span-4 mt-2 justify-end sm:mt-auto sm:justify-end">
                            <nav aria-label="Table navigation">
                                <ul className="inline-flex items-center">
                                    {/* Left button */}
                                    {donations_meta.page > 1 &&
                                        <li>
                                            <a
                                                className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                                aria-label="Previous"
                                                href={`${pathname}?dp=${donations_meta.page - 1}`}
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-5 h-5 fill-current"

                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                        fillRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    }
                                    <li>
                                        <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
                                            {donations_meta.page}
                                        </button>
                                    </li>
                                    {!(donations_meta.page * donations_meta.pageSize >= donations_meta.total) &&
                                        <li >
                                            <a
                                                className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                                aria-label="Next"
                                                href={`${pathname}?dp=${donations_meta.page + 1}`}
                                            >
                                                <svg
                                                    className="w-5 h-5 fill-current"
                                                    aria-hidden="true"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                        clipRule="evenodd"
                                                        fillRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </li>
                                    }

                                </ul>
                            </nav>
                        </span>
                    </div>
                </div>
            </div>
        </section>

    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
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

    const charity_donations_query = qs.stringify({
        filters: {
            $and: [
                {
                    user: {
                        id: { $eq: user.id }
                    }
                }, {
                    success: {
                        $eq: true
                    }
                }
            ]
        },
        pagination: {
            pageSize: 0,
            page: 1
        }
    })

    const charity_donations = await (await fetch(server_url + "/api/charity-donations?" + charity_donations_query, {
        method: "GET",
    })).json();

    return {
        props: {
            donations: donations['data'],
            donations_meta: donations['meta']['pagination'],
            charity_donations_meta: charity_donations['meta']['pagination'],
            dp, ds
        }
    }
}