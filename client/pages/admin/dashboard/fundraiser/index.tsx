import axios from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import Head from 'next/head';
import qs from 'qs';
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../../components/DashboardLayout';

import { jwt_admin_auth_token, server_url } from '../../../../config';

interface Props {
    fund_raisers_meta: any;
    donations_meta: any;
    pending_approval: any;
    fundraisers: any[];
}



export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const admin_token = context.req.cookies[jwt_admin_auth_token];
    const fundraisers_page_no = context.query['page'];
    const fundraisers_page_size = context.query['pageSize'];
    var page_no = parseInt(fundraisers_page_no ? fundraisers_page_no.toString() : '1');
    var page_size = parseInt(fundraisers_page_size ? fundraisers_page_size.toString() : '4');
    page_no = page_no <= 0 ? 1 : page_no;
    page_size = page_size <= 0 ? 10 : page_size;

    const redirect: Redirect = {
        destination: "/admin/login",
        statusCode: 307,
        basePath: false
    }

    let admin_res = (await fetch(server_url + "/admin/users/me", {
        headers: {
            Authorization: `Bearer ${admin_token}`,
        }
    })
    );

    if (admin_res.status > 201) {
        return { redirect }
    }

    const fundraiser_query = qs.stringify({
        page: page_no,
        pageSize: page_size,
        sort: ['createdAt:desc'],
        populate: ['image', 'charity', 'user']
    })

    var fund_raisers_meta;
    var fundraisers;
    var donations_meta;
    var pending_approval;

    await axios.get(server_url + "/content-manager/collection-types/api::fund-raise.fund-raise?" + fundraiser_query, {
        headers: {
            "Authorization": `Bearer ${admin_token}`
        }
    }).then(res => {
        fund_raisers_meta = res.data['pagination']
        if (fund_raisers_meta.pageSize > fund_raisers_meta.total) {
            fund_raisers_meta.pageSize = fund_raisers_meta.total;
        }
        console.log(fund_raisers_meta);
        fundraisers = res.data['results']
    });

    await axios.get(server_url + "/api/donations?" + qs.stringify({
        pagination: {
            pageSize: 0
        }, encodeValuesOnly: true,
    })).then(res => {
        donations_meta = res.data['meta']['pagination']
    });

    await axios.get(server_url + "/api/fund-raises?" + qs.stringify({
        filters: {
            $or: [
                {
                    approved: {
                        $eq: false
                    }
                }, {
                    approved: {
                        $null: true
                    }
                }
            ]
        }, pagination: {
            pageSize: 0
        }
    })).then(res => {
        pending_approval = res.data['meta']['pagination']
    })

    return {
        props: {
            donations_meta,
            fund_raisers_meta,
            pending_approval,
            fundraisers,

        }
    }

}


export default function index({ donations_meta, fund_raisers_meta, pending_approval, fundraisers, }: Props) {
    const [pathname, setPathName] = useState('')
    useEffect(() => {
        document.getElementById("navbar")!.style!.display = 'none'
        document.getElementById("footer")!.style!.display = 'none'
        setPathName(window.location.pathname);
    });

    return (
        <>
            <DashboardLayout >
                <main className="h-full overflow-y-auto">
                    <div className="container px-6 mx-auto grid">
                        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                            Fundraisers
                        </h2>
                        {/* CTA */}

                        {/* Cards */}
                        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                            {/* Card */}
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                                    {/* <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                    </svg> */}
                                    <svg
                                        className="w-5 h-5"
                                        fill='currentColor'
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M4 21h9.62a3.995 3.995 0 0 0 3.037-1.397l5.102-5.952a1 1 0 0 0-.442-1.6l-1.968-.656a3.043 3.043 0 0 0-2.823.503l-3.185 2.547-.617-1.235A3.98 3.98 0 0 0 9.146 11H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2zm0-8h5.146c.763 0 1.448.423 1.789 1.105l.447.895H7v2h6.014a.996.996 0 0 0 .442-.11l.003-.001.004-.002h.003l.002-.001h.004l.001-.001c.009.003.003-.001.003-.001.01 0 .002-.001.002-.001h.001l.002-.001.003-.001.002-.001.002-.001.003-.001.002-.001c.003 0 .001-.001.002-.001l.003-.002.002-.001.002-.001.003-.001.002-.001h.001l.002-.001h.001l.002-.001.002-.001c.009-.001.003-.001.003-.001l.002-.001a.915.915 0 0 0 .11-.078l4.146-3.317c.262-.208.623-.273.94-.167l.557.186-4.133 4.823a2.029 2.029 0 0 1-1.52.688H4v-6zM16 2h-.017c-.163.002-1.006.039-1.983.705-.951-.648-1.774-.7-1.968-.704L12.002 2h-.004c-.801 0-1.555.313-2.119.878C9.313 3.445 9 4.198 9 5s.313 1.555.861 2.104l3.414 3.586a1.006 1.006 0 0 0 1.45-.001l3.396-3.568C18.688 6.555 19 5.802 19 5s-.313-1.555-.878-2.121A2.978 2.978 0 0 0 16.002 2H16zm1 3c0 .267-.104.518-.311.725L14 8.55l-2.707-2.843C11.104 5.518 11 5.267 11 5s.104-.518.294-.708A.977.977 0 0 1 11.979 4c.025.001.502.032 1.067.485.081.065.163.139.247.222l.707.707.707-.707c.084-.083.166-.157.247-.222.529-.425.976-.478 1.052-.484a.987.987 0 0 1 .701.292c.189.189.293.44.293.707z" />
                                    </svg>

                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total fundraisers
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                        {fund_raisers_meta.total}
                                    </p>
                                </div>
                            </div>
                            {/* Card */}
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total donations
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                        {donations_meta.total}
                                    </p>
                                </div>
                            </div>
                            {/* Card */}
                            {/* <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                  <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      New sales
                    </p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                      376
                    </p>
                  </div>
                </div> */}
                            {/* Card */}
                            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Pending approvals
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                        {pending_approval.total}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* New Table */}
                        <div className="w-full overflow-hidden rounded-lg shadow-xs">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full whitespace-no-wrap">
                                    <thead>
                                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                                            <th className="px-2 py-3">S.No</th>
                                            <th className="px-4 py-3">Fundraiser</th>
                                            <th className="px-4 py-3">Target</th>
                                            <th className="px-4 py-3">Approval</th>
                                            <th className="px-4 py-3">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                        {fundraisers && fundraisers.length > 0 &&
                                            fundraisers.map((fundraiser, index) => {
                                                return (
                                                    <tr className="text-gray-700 dark:text-gray-400">
                                                        <td className="pl-4 py-3 text-sm">{(fund_raisers_meta.pageSize * fund_raisers_meta.page) - (fund_raisers_meta.pageSize - index - 1)}</td>
                                                        <td className="px-2 py-3">
                                                            <a href={`/admin/dashboard/fundraiser/${fundraiser['slug']}`} className="flex items-center text-sm">
                                                                {/* Avatar with inset shadow */}
                                                                <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                                    {fundraiser['image'] &&
                                                                        <img
                                                                            className="object-cover w-full h-full rounded-full"
                                                                            src={`${server_url}${fundraiser['image'][0]['formats'] != null ? fundraiser['image'][0]['formats']['thumbnail']['url'] : fundraiser['image'][0]['url']}`}
                                                                            alt=""
                                                                            loading="lazy"
                                                                        />
                                                                    }
                                                                    {!fundraiser['image'] &&
                                                                        <img
                                                                            className="object-cover w-full h-full rounded-full"
                                                                            src="/assets/image-placeholder.jpg"
                                                                            alt=""
                                                                            loading="lazy"
                                                                        />
                                                                    }
                                                                    <div
                                                                        className="absolute inset-0 rounded-full shadow-inner"
                                                                        aria-hidden="true"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className="font-semibold">{fundraiser['title']}</p>
                                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                        {fundraiser['user']['username']}
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">{fundraiser['fund_target']}</td>
                                                        <td className="px-4 py-3 text-xs">
                                                            {fundraiser.approved &&
                                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                                                    Approved
                                                                </span>
                                                            }
                                                            {!fundraiser.approved &&
                                                                <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                                                                    Pending
                                                                </span>}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">{new Date(fundraiser.createdAt).toDateString()}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex px-4 py-3 text-xs font-semibold justify-between tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                                <span className="flex items-center col-span-3">

                                    <div className="flex justify-center">
                                        <div className="mb-3 xl:w-96">
                                            <select
                                                onChange={(e) => {
                                                    console.log(e.target.value)
                                                    window.location.href = `${pathname}?page=${fund_raisers_meta.page}&pageSize=${e.target.value}`
                                                }}
                                                className="form-select appearance-none block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                aria-label="Default select example"
                                            >
                                                <option selected value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
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
                                            {fund_raisers_meta.page > 1 &&
                                                <li>
                                                    <a
                                                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                                        aria-label="Previous"
                                                        href={`${pathname}?page=${fund_raisers_meta.page - 1}`}
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
                                                    {fund_raisers_meta.page}
                                                </button>
                                            </li>
                                            {!(fund_raisers_meta.page * fund_raisers_meta.pageSize >= fund_raisers_meta.total) &&
                                                <li >
                                                    <a
                                                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                                        aria-label="Next"
                                                        href={`${pathname}?page=${fund_raisers_meta.page + 1}`}
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

                </main>
            </DashboardLayout>
        </>
    )
}