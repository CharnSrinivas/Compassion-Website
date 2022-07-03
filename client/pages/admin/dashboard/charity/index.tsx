import axios from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import Head from 'next/head';
import qs from 'qs';
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../../components/DashboardLayout';

import { jwt_admin_auth_token, server_url } from '../../../../config';

interface Props {

    charities_meta: any;
    charities: any[];
    charity_donations_meta: any;
    pending_charity_approval: any;
    page_no: number;
    page_size: number;
}



export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const admin_token = context.req.cookies[jwt_admin_auth_token];
    var _page_no = context.query['page'];
    var _page_size = context.query['pageSize'];
    let page_no = parseInt(_page_no ? _page_no.toString() : '1');
    let page_size = parseInt(_page_size ? _page_size.toString() : '10');
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
    const charity_query = qs.stringify({
        page: page_no,
        pageSize: page_size,
        sort: ['createdAt:desc'],
        encodeValuesOnly: true,
        populate: "*"
    })


    var charities_meta;
    var charities;
    var charity_donations_meta;
    var pending_charity_approval;


    await axios.get(server_url + "/content-manager/collection-types/api::charity.charity?" + charity_query, {
        headers: {
            "Authorization": `Bearer ${admin_token}`
        }
    }).then(res => {
        charities_meta = res.data['pagination']
        charities = res.data['results']
    });
    await axios.get(server_url + "/api/charity-donations?" + qs.stringify({
        pagination: {
            pageSize: 0
        }, encodeValuesOnly: true,
    })).then(res => {
        charity_donations_meta = res.data['meta']['pagination'];
        if (charity_donations_meta.pageSize > charity_donations_meta.total) {
            charity_donations_meta.pageSize = charity_donations_meta.total;
        }
    });


    await axios.get(server_url + "/api/charities?" + qs.stringify({
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
        pending_charity_approval = res.data['meta']['pagination']
    })

    return {
        props: {
            charities_meta,
            charities,
            charity_donations_meta,
            pending_charity_approval,
            page_no,
            page_size
        }
    }

}


export default function index({ charity_donations_meta, pending_charity_approval, charities, charities_meta, page_no, page_size }: Props) {
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
                            Charities
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
                                        aria-hidden="true"
                                        fill="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={10}
                                        viewBox="0 0 318.486 318.486"
                                        stroke="currentColor"
                                        xmlSpace="preserve"
                                    >
                                        <g>
                                            <path
                                                d="M111.104,114.167h40.639v22.743c0,4.142,3.357,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-22.743h40.639c4.143,0,7.5-3.358,7.5-7.5
		V59.455c0-4.142-3.357-7.5-7.5-7.5h-96.277c-4.143,0-7.5,3.358-7.5,7.5v47.211C103.604,110.809,106.962,114.167,111.104,114.167z
		 M118.604,66.955h81.277v32.211h-81.277V66.955z"
                                            />
                                            <path
                                                d="M103.776,204.32H7.5c-4.143,0-7.5,3.358-7.5,7.5v47.211c0,4.142,3.357,7.5,7.5,7.5h96.276c4.143,0,7.5-3.358,7.5-7.5
		V211.82C111.276,207.678,107.919,204.32,103.776,204.32z M96.276,251.531H15V219.32h81.276V251.531z"
                                            />
                                            <path
                                                d="M310.986,227.925c-4.143,0-7.5,3.358-7.5,7.5v16.106H222.21V219.32h88.776c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5
		h-40.855c-2.47-29.993-27.652-53.649-58.272-53.649H106.627c-22.51,0-43.274,13.154-52.9,33.511
		c-1.771,3.745-0.17,8.216,3.574,9.986c3.746,1.77,8.215,0.17,9.986-3.574c7.159-15.14,22.601-24.923,39.34-24.923h105.232
		c22.343,0,40.797,16.94,43.212,38.649H214.71c-4.143,0-7.5,3.358-7.5,7.5v47.211c0,4.142,3.357,7.5,7.5,7.5h96.276
		c4.143,0,7.5-3.358,7.5-7.5v-23.606C318.486,231.283,315.129,227.925,310.986,227.925z"
                                            />
                                        </g>
                                    </svg>

                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Charties
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                        {charities_meta.total}
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
                                        Total direct donations
                                    </p>
                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                        {charity_donations_meta.total}
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
                                        {pending_charity_approval.total}
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
                                            <th className="px-4 py-3">Charity</th>
                                            <th className="px-4 py-3">Directfunds raised</th>
                                            <th className="px-4 py-3">Approval</th>
                                            <th className="px-4 py-3">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                                        {charities && charities.length > 0 &&
                                            charities.map((charity, index) => {
                                                return (
                                                    <tr className="text-gray-700 dark:text-gray-400">
                                                        <td className="pl-4 py-3 text-sm">{(charities_meta.pageSize * charities_meta.page) - (charities_meta.pageSize - index - 1)}</td>
                                                        <td className="px-4 py-3">
                                                            <a href={`/admin/dashboard/charity/${charity['slug']}`} className="flex items-center text-sm">
                                                                {/* Avatar with inset shadow */}
                                                                <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                                                    {charity['image'] &&
                                                                        <img
                                                                            className="object-cover w-full h-full rounded-full"
                                                                            src={`${server_url}${charity['image']['formats'] != null ? charity['image']['formats']['thumbnail']['url'] : charity['image']['url']}`}
                                                                            alt=""
                                                                            loading="lazy"
                                                                        />
                                                                    }
                                                                    {!charity['image'] &&
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
                                                                    <p className="font-semibold">{charity['name']}</p>
                                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                                        {/* {charity['user']['username']} */}
                                                                    </p>
                                                                </div>
                                                            </a>
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">{charity['direct_funds']}</td>
                                                        <td className="px-4 py-3 text-xs">
                                                            {charity.approved &&
                                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                                                    Approved
                                                                </span>
                                                            }
                                                            {!charity.approved &&
                                                                <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                                                                    Pending
                                                                </span>}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm">{new Date(charity.createdAt).toDateString()}</td>
                                                    </tr>)
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
                                                    window.location.href = `${pathname}?dp=${charity_donations_meta.page}&ds=${e.target.value}`
                                                }}
                                                className="form-select appearance-none block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                aria-label="Default select example"
                                            >
                                                {[10, 20, 50, 100].map((num) => {
                                                    return (
                                                        <option selected={page_size === num} value={num}>{num}</option>
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
                                            {charity_donations_meta.page > 1 &&
                                                <li>
                                                    <a
                                                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                                        aria-label="Previous"
                                                        href={`${pathname}?dp=${charity_donations_meta.page - 1}`}
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
                                                    {charity_donations_meta.page}
                                                </button>
                                            </li>
                                            {!(charity_donations_meta.page * charity_donations_meta.pageSize >= charity_donations_meta.total) &&
                                                <li >
                                                    <a
                                                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                                        aria-label="Next"
                                                        href={`${pathname}?dp=${charity_donations_meta.page + 1}`}
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