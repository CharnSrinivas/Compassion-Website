import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import React, { useEffect, useState } from 'react'


export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  const server_url = 'http://127.0.0.1:1337';
return{
  redirect:{
    destination:"/admin/dashboard/fundraiser",
    permanent:true,
     basePath:false
  }
}

}


export default function index() {
  return (<></>);
}
      // <DashboardLayout >
      //   <main className="h-full overflow-y-auto">
      //     <div className="container px-6 mx-auto grid">
      //       <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      //         Fundraisers
      //       </h2>
      //       {/* CTA */}

      //       {/* Cards */}
      //       <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      //         {/* Card */}
      //         <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      //           <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
      //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      //               <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      //             </svg>
      //           </div>
      //           <div>
      //             <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
      //               Total fundraisers
      //             </p>
      //             <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
      //               {fund_raisers_meta.total}
      //             </p>
      //           </div>
      //         </div>
      //         {/* Card */}
      //         <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      //           <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
      //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      //               <path
      //                 fillRule="evenodd"
      //                 d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
      //                 clipRule="evenodd"
      //               />
      //             </svg>
      //           </div>
      //           <div>
      //             <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
      //               Total donations
      //             </p>
      //             <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
      //               {donations_meta.total}
      //             </p>
      //           </div>
      //         </div>
      //         {/* Card */}
      //         {/* <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      //             <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
      //               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      //                 <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      //               </svg>
      //             </div>
      //             <div>
      //               <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
      //                 New sales
      //               </p>
      //               <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
      //                 376
      //               </p>
      //             </div>
      //           </div> */}
      //         {/* Card */}
      //         <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      //           <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
      //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      //               <path
      //                 fillRule="evenodd"
      //                 d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
      //                 clipRule="evenodd"
      //               />
      //             </svg>
      //           </div>
      //           <div>
      //             <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
      //               Pending approvals
      //             </p>
      //             <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
      //               {pending_approval.total}
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //       {/* New Table */}
      //       <div className="w-full overflow-hidden rounded-lg shadow-xs">
      //         <div className="w-full overflow-x-auto">
      //           <table className="w-full whitespace-no-wrap">
      //             <thead>
      //               <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      //                 <th className="px-4 py-3">Fundraiser</th>
      //                 <th className="px-4 py-3">Target</th>
      //                 <th className="px-4 py-3">Approval</th>
      //                 <th className="px-4 py-3">Date</th>
      //               </tr>
      //             </thead>
      //             <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      //               {fundraisers && fundraisers.length > 0 &&
      //                 fundraisers.map((fundraiser) => {
      //                   return (
      //                     <tr className="text-gray-700 dark:text-gray-400">
      //                       <td className="px-4 py-3">
      //                         <a href={`/admin/dashboard/fundraiser/${fundraiser['slug']}`} className="flex items-center text-sm">
      //                           {/* Avatar with inset shadow */}
      //                           <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
      //                             {fundraiser['image'] &&
      //                               <img
      //                                 className="object-cover w-full h-full rounded-full"
      //                                 src={`${server_url}${fundraiser['image'][0]['formats'] != null ? fundraiser['image'][0]['formats']['thumbnail']['url'] : fundraiser['image'][0]['url']}`}
      //                                 alt=""
      //                                 loading="lazy"
      //                               />
      //                             }
      //                             {!fundraiser['image'] &&
      //                               <img
      //                                 className="object-cover w-full h-full rounded-full"
      //                                 src="/assets/image-placeholder.jpg"
      //                                 alt=""
      //                                 loading="lazy"
      //                               />
      //                             }
      //                             <div
      //                               className="absolute inset-0 rounded-full shadow-inner"
      //                               aria-hidden="true"
      //                             />
      //                           </div>
      //                           <div>
      //                             <p className="font-semibold">{fundraiser['title']}</p>
      //                             <p className="text-xs text-gray-600 dark:text-gray-400">
      //                               {fundraiser['user']['username']}
      //                             </p>
      //                           </div>
      //                         </a>
      //                       </td>
      //                       <td className="px-4 py-3 text-sm">{fundraiser['fund_target']}</td>
      //                       <td className="px-4 py-3 text-xs">
      //                         {fundraiser.approved &&
      //                           <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
      //                             Approved
      //                           </span>
      //                         }
      //                         {!fundraiser.approved &&
      //                           <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
      //                             Pending
      //                           </span>}
      //                       </td>
      //                       <td className="px-4 py-3 text-sm">{new Date(fundraiser.createdAt).toDateString()}</td>
      //                     </tr>
                          
      //                     )
      //                 })
      //               }

      //             </tbody>
      //           </table>
      //         </div>
      //         <div className="flex px-4 py-3 text-xs font-semibold justify-between tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
      //           {/* <span className="flex items-center col-span-3">
      //               Showing {fund_raisers_meta.pageSize}-{fund_raisers_meta.total} of 100
      //             </span> */}
      //           <span className="col-span-2" />
      //           {/* Pagination */}
      //           <span className="flex col-span-4 mt-2 justify-end sm:mt-auto sm:justify-end">
      //             <nav aria-label="Table navigation">
      //               <ul className="inline-flex items-center">
      //                 <li>
      //                   <button
      //                     className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
      //                     aria-label="Previous"
      //                   >
      //                     <svg
      //                       aria-hidden="true"
      //                       className="w-4 h-4 fill-current"
      //                       viewBox="0 0 20 20"
      //                     >
      //                       <path
      //                         d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      //                         clipRule="evenodd"
      //                         fillRule="evenodd"
      //                       />
      //                     </svg>
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     1
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     2
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     3
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     4
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <span className="px-3 py-1">...</span>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     8
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     9
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button
      //                     className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
      //                     aria-label="Next"
      //                   >
      //                     <svg
      //                       className="w-4 h-4 fill-current"
      //                       aria-hidden="true"
      //                       viewBox="0 0 20 20"
      //                     >
      //                       <path
      //                         d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      //                         clipRule="evenodd"
      //                         fillRule="evenodd"
      //                       />
      //                     </svg>
      //                   </button>
      //                 </li>
      //               </ul>
      //             </nav>
      //           </span>
      //         </div>
      //       </div>
      //     </div>

      //     <div className="container px-6 mx-auto grid">
      //       <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
      //         Charities
      //       </h2>
      //       {/* CTA */}

      //       {/* Cards */}
      //       <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      //         {/* Card */}
      //         <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      //           <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
      //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      //               <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      //             </svg>
      //           </div>
      //           <div>
      //             <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
      //               Total Charties
      //             </p>
      //             <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
      //               {charities_meta.total}
      //             </p>
      //           </div>
      //         </div>
      //         {/* Card */}
      //         <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      //           <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
      //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      //               <path
      //                 fillRule="evenodd"
      //                 d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
      //                 clipRule="evenodd"
      //               />
      //             </svg>
      //           </div>
      //           <div>
      //             <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
      //               Total direct donations
      //             </p>
      //             <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
      //               {charity_donations_meta.total}
      //             </p>
      //           </div>
      //         </div>
      //         {/* Card */}
      //         {/* <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      //             <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
      //               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      //                 <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      //               </svg>
      //             </div>
      //             <div>
      //               <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
      //                 New sales
      //               </p>
      //               <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
      //                 376
      //               </p>
      //             </div>
      //           </div> */}
      //         {/* Card */}
      //         <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      //           <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
      //             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      //               <path
      //                 fillRule="evenodd"
      //                 d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
      //                 clipRule="evenodd"
      //               />
      //             </svg>
      //           </div>
      //           <div>
      //             <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
      //               Pending approvals
      //             </p>
      //             <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
      //               {pending_charity_approval.total}
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //       {/* New Table */}
      //       <div className="w-full overflow-hidden rounded-lg shadow-xs">
      //         <div className="w-full overflow-x-auto">
      //           <table className="w-full whitespace-no-wrap">
      //             <thead>
      //               <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      //                 <th className="px-4 py-3">Charity</th>
      //                 <th className="px-4 py-3">Directfunds raised</th>
      //                 <th className="px-4 py-3">Approval</th>
      //                 <th className="px-4 py-3">Date</th>
      //               </tr>
      //             </thead>
      //             <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      //               {charities && charities.length > 0 &&
      //                 charities.map((charity) => {
      //                   return (
      //                     <tr className="text-gray-700 dark:text-gray-400">
      //                       <td className="px-4 py-3">
      //                         <a href={`/admin/dashboard/charity/${charity['slug']}`} className="flex items-center text-sm">
      //                           {/* Avatar with inset shadow */}
      //                           <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
      //                             {charity['image'] &&
      //                               <img
      //                                 className="object-cover w-full h-full rounded-full"
      //                                 src={`${server_url}${charity['image']['formats'] != null ? charity['image']['formats']['thumbnail']['url'] : charity['image']['url']}`}
      //                                 alt=""
      //                                 loading="lazy"
      //                               />
      //                             }
      //                             {!charity['image'] &&
      //                               <img
      //                                 className="object-cover w-full h-full rounded-full"
      //                                 src="/assets/image-placeholder.jpg"
      //                                 alt=""
      //                                 loading="lazy"
      //                               />
      //                             }
      //                             <div
      //                               className="absolute inset-0 rounded-full shadow-inner"
      //                               aria-hidden="true"
      //                             />
      //                           </div>
      //                           <div>
      //                             <p className="font-semibold">{charity['name']}</p>
      //                             <p className="text-xs text-gray-600 dark:text-gray-400">
      //                               {/* {charity['user']['username']} */}
      //                             </p>
      //                           </div>
      //                         </a>
      //                       </td>
      //                       <td className="px-4 py-3 text-sm">{charity['direct_funds']}</td>
      //                       <td className="px-4 py-3 text-xs">
      //                         {charity.approved &&
      //                           <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
      //                             Approved
      //                           </span>
      //                         }
      //                         {!charity.approved &&
      //                           <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
      //                             Pending
      //                           </span>}
      //                       </td>
      //                       <td className="px-4 py-3 text-sm">{new Date(charity.createdAt).toDateString()}</td>
      //                     </tr>)
      //                 })
      //               }

      //             </tbody>
      //           </table>
      //         </div>
      //         <div className="flex px-4 py-3 text-xs font-semibold justify-between tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
      //           {/* <span className="flex items-center col-span-3">
      //               Showing {fund_raisers_meta.pageSize}-{fund_raisers_meta.total} of 100
      //             </span> */}
      //           <span className="col-span-2" />
      //           {/* Pagination */}
      //           <span className="flex col-span-4 mt-2 justify-end sm:mt-auto sm:justify-end">
      //             <nav aria-label="Table navigation">
      //               <ul className="inline-flex items-center">
      //                 <li>
      //                   <button
      //                     className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
      //                     aria-label="Previous"
      //                   >
      //                     <svg
      //                       aria-hidden="true"
      //                       className="w-4 h-4 fill-current"
      //                       viewBox="0 0 20 20"
      //                     >
      //                       <path
      //                         d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
      //                         clipRule="evenodd"
      //                         fillRule="evenodd"
      //                       />
      //                     </svg>
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     1
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     2
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     3
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     4
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <span className="px-3 py-1">...</span>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     8
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
      //                     9
      //                   </button>
      //                 </li>
      //                 <li>
      //                   <button
      //                     className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
      //                     aria-label="Next"
      //                   >
      //                     <svg
      //                       className="w-4 h-4 fill-current"
      //                       aria-hidden="true"
      //                       viewBox="0 0 20 20"
      //                     >
      //                       <path
      //                         d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      //                         clipRule="evenodd"
      //                         fillRule="evenodd"
      //                       />
      //                     </svg>
      //                   </button>
      //                 </li>
      //               </ul>
      //             </nav>
      //           </span>
      //         </div>
      //       </div>
      //     </div>
      //   </main>
      // </DashboardLayout>