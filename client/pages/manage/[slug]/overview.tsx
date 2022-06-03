import React, { useEffect, useState } from 'react';
import Header from 'next/head';
import { jwt_aut_token, server_url } from '../../../config';
import qs from 'qs';
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next/types';
import { isMobile } from '../../../utils'
interface Props {
  fundraiser: any; donations: any[]; donations_meta: any; slug: String
}

export default function ({ fundraiser, donations, donations_meta, slug }: Props) {
  const [_donations, setDonations] = useState(donations);
  const [open_share, setOpenShare] = useState(false);
  const [url, setUrl] = useState('');
  const [show_embedded, setShowEmbedded] = useState(false);

  useEffect(() => {
    setUrl(window.location.origin);

  }, [])

  const shareOnWhatsapp = () => {
    if (!window) return;
    if (isMobile()) {
      window.open(`whatsapp://send?text=${url}/f/${slug}`, '_blank')
    } else {
      window.open(`https://web.whatsapp.com/send?text=${url}/f/${slug}`, "_blank")
    }
  }
  const copyLink = () => {
    navigator.clipboard.writeText(`${url}/f/${slug}`).then(() => { }).catch(() => { });
  }
  const shareOnTwitter = () => {
    if (!window) return;
    if (isMobile()) {
      window.open(`tg://msg?text=${url}/f/${slug}`, '_blank')
    } else {
      window.open(`https://telegram.me/share/url?url=${url}/f/${slug}`, "_blank")
    }
  }
  return (
    <>
      <Header>
      </Header>

      <section className="text-gray-600 body-font bg-[#f6f6f9] ">
        <div className="container px-3 py-16 mx-auto ">
          <div className='mb-5'>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Overview
            </h1>
            <div className="h-1 w-20 bg-primary rounded " />
          </div>
          <div className='flex-col'>
            <div className='flex justify-between flex-wrap'>
              <div >
                {fundraiser.attributes.image && fundraiser.attributes.image.data &&
                  <img
                    className="lg:w-[30rem] h-[25rem] object-cover object-center rounded-lg"
                    src={server_url + fundraiser.attributes.image.data.attributes.url}
                    alt="content"
                  />
                }{!fundraiser.attributes.image || !fundraiser.attributes.image.data &&
                  <img
                    className="lg:w-[30rem] h-[25rem] object-cover object-center rounded-lg"
                    src={"/assets/image-placeholder.jpg"}
                    alt="content"
                  />
                }
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-800 mt-10">
                  {fundraiser.attributes.title}
                </h1>
              </div>
              <div className='flex items-end p-4 gap-5'>
                <div className='flex-col items-center '>
                  <button onClick={() => {
                    setOpenShare(true);
                    document.querySelector('body')!.style.overflow = 'hidden';
                    document.documentElement.scrollTop = 0
                  }} className='rounded-full bg-primary p-3 text-white'>
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-6 h-6"
                      viewBox="0 0 30 30"
                    >
                      <path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z" />
                    </svg>
                  </button>
                  <p className='mt-1 text-center'>share</p>
                </div>
                <div className='flex-col items-center '>
                  <a href={`/manage/${fundraiser.attributes.slug}/edit/details`} >
                    <div className='rounded-full bg-primary p-3 text-white'>
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-6 h-6"
                        viewBox="0 0 512.019 512.019"

                      >
                        <g>
                          <g>
                            <polygon points="350.316,80.852 0,431.166 0,512.009 80.841,512.009 431.157,161.693 		" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <rect
                              x="406.542"
                              y="10.214"
                              transform="matrix(0.7071 -0.7071 0.7071 0.7071 82.5924 334.1501)"
                              width="76.218"
                              height="114.327"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </a>
                  <p className='mt-1 text-center'>Edit</p>
                </div>
              </div>
            </div>
            <hr />
            <div className='my-10 '>
              <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4 ">
                <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-2">
                      <span className="text-gray-500">Total donations</span>
                      <span className="text-2xl text-primary font-semibold">{fundraiser.attributes.donations_count}</span>
                    </div>
                    <div className="bg-gray-200 p-2 rounded-full">
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
                  <div className='mt-5'>
                    {/* <span className="inline-block px-2 font-medium text-white bg-green-500 rounded mr-1">14 donations</span>
                    <span>Today</span> */}
                  </div>
                </div>
                <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-2">
                      <span className="text-gray-500">Total funds</span>
                      <span className="text-2xl text-primary font-semibold">{fundraiser.attributes.fund_raised}</span>
                    </div>
                    <div className="bg-gray-200 p-2 rounded-full">
                      <svg
                        width={45}
                        height={45}
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width={48} height={48} fill="white" fillOpacity="0.01" />
                        <ellipse
                          cx={14}
                          cy={10}
                          rx={10}
                          ry={5}
                          stroke="black"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 10C4 10 4 14.2386 4 17C4 19.7614 8.47715 22 14 22C19.5228 22 24 19.7614 24 17C24 15.3644 24 10 24 10"
                          stroke="black"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 17C4 17 4 21.2386 4 24C4 26.7614 8.47715 29 14 29C19.5228 29 24 26.7614 24 24C24 22.3644 24 17 24 17"
                          stroke="black"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 24C4 24 4 28.2386 4 31C4 33.7614 8.47715 36 14 36C19.5228 36 24 33.7614 24 31C24 29.3644 24 24 24 24"
                          stroke="black"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 31C4 31 4 35.2386 4 38C4 40.7614 8.47715 43 14 43C19.5228 43 24 40.7614 24 38C24 36.3644 24 31 24 31"
                          stroke="black"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <ellipse
                          cx={34}
                          cy={24}
                          rx={10}
                          ry={5}
                          stroke="black"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M24 24C24 24 24 28.2386 24 31C24 33.7614 28.4772 36 34 36C39.5228 36 44 33.7614 44 31C44 29.3644 44 24 44 24"
                          stroke="black"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M24 31C24 31 24 35.2386 24 38C24 40.7614 28.4772 43 34 43C39.5228 43 44 40.7614 44 38C44 36.3644 44 31 44 31"
                          stroke="black"
                          strokeWidth={4}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className='text-gray-900 font-medium mt-4'>
                    <strong>{fundraiser.attributes.fund_raised.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} raised</strong> out of {fundraiser.attributes.fund_target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <div className="w-full bg-green-400 bg-opacity-20 h-1 mt-1 mb-3" >
                    <div className="bg-green-500 h-1" style={{ width: `${Math.floor((fundraiser.attributes.fund_raised / fundraiser.attributes.fund_target) * 100)}%` }}></div>
                  </div>
                </div>

              </div>
            </div>
            <hr />
            <h2 className='subtitle-font font-medium text-xl sm:text-2xl my-3 text-gray-900' > Donations</h2>
            <div className="flex flex-col mt-6">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                    {_donations.length > 0 &&
                      <table className="min-w-full overflow-x-scroll divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                            >
                              Donar
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
                          {_donations.map((donation, index) => {
                            return (
                              <tr key={index} className="transition-all hover:bg-gray-100 hover:shadow-lg">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                      <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{donation.attributes.user.data.attributes.username}</div>
                                      <div className="text-sm text-gray-500">{donation.attributes.user.data.attributes.email}</div>
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
                    {_donations.length <= 0 &&
                      <div className=' bg-white py-7'>
                        <h3 className='mt-15 font-medium text-xl text-gray-900 my-3 text-center'>Your fundraiser has no donations yet :(</h3>
                        <h5 className='mt-15  text-gray-700 my-3 text-center' >Your donations will show up here. Start by sharing your fundriaiser with friends and family </h5>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        open_share &&
        <>
          {/* component */}
          {/* CONTAINER MODAL*/}
          <div className="absolute top-0 left-0 z-0   h-screen w-screen  flex items-center justify-center bg-gray-800 bg-opacity-70"
          // onClick={() => { setOpenShare(false); document.querySelector('body')!.style.overflow = 'scroll' }}
          >
            <div className="bg-gray-100 w-full z-50 mx-4 p-4 rounded-xl md:w-1/2 lg:w-1/3 " >
              {/*MODAL HEADER*/}
              <div className="flex justify-between items center border-b border-gray-200 py-3">
                <div className="flex items-center justify-center">
                  <p className="text-xl font-bold text-gray-800">Share </p>
                </div>
                <div onClick={() => { setOpenShare(false); document.querySelector('body')!.style.overflow = 'scroll' }} className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full">
                  x
                </div>
              </div>
              <div className="my-4">
                <p className="text-sm">Share this link via</p>
                <div className="flex justify-around my-4">
                  <div className="border hover:bg-orange-400 w-12 h-12 fill-[#1d9bf0] hover:fill-white border-blue-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-orange-400/50 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#4caf50"
                        d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
                      />
                      <path
                        fill="#1e88e5"
                        d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
                      />
                      <polygon
                        fill="#e53935"
                        points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
                      />
                      <path
                        fill="#c62828"
                        d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
                      />
                      <path
                        fill="#fbc02d"
                        d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
                      />
                    </svg>
                  </div>
                  <div onClick={shareOnWhatsapp} className="border hover:bg-[#25D366] w-12 h-12 fill-[#25D366] hover:fill-white border-green-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-green-500/50 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
                      />
                    </svg>
                  </div>
                  {/* EMBEDDED */}
                  <div
                    onClick={() => { setShowEmbedded(!show_embedded) }}
                    className="border hover:bg-[#44475a] w-12 h-12 fill-gray-800 hover:fill-white border-gray-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-gray-500/50 cursor-pointer">
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.708 5.578L2.061 8.224l2.647 2.646-.708.708-3-3V7.87l3-3 .708.708zm7-.708L11 5.578l2.647 2.646L11 10.87l.708.708 3-3V7.87l-3-3zM4.908 13l.894.448 5-10L9.908 3l-5 10z" />
                    </svg>

                  </div>
                  {/*TELEGRAM ICON*/}
                  <div onClick={shareOnTwitter} className="border hover:bg-[#229ED9] w-12 h-12 fill-[#229ED9] hover:fill-white border-sky-200 rounded-full flex items-center justify-center shadow-xl hover:shadow-sky-500/50 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                    </svg>
                  </div>
                </div>
                {show_embedded &&
                  <span>
                    <p className="mb-4 leading-8 text-gray-600 mt-10">
                      Use the code below to embed this fundraiser on any website.

                    </p>
                    <div className='w-full bg-[#44475a] rounded-md p-3 mb-3 text-white'>
                      {`
                           <iframe 
                               width="620" 
                               height="650" 
                               src="${url}/embed/f/${slug}"
                               frameborder="0" allowfullscreen>
                           </iframe>
                      `
                      }

                    </div>
                  </span>
                }
                <p className="text-sm">Or copy link</p>
                <div className=" flex-col justify-between items-center mt-4">
                  <div className="flex justify-between items-center border-2 border-gray-200 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      className="fill-gray-500 ml-2"
                    >
                      <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z" />
                      <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z" />
                    </svg>
                    <input
                      className="w-full outline-none bg-transparent"
                      type="text"
                      placeholder="link"
                      defaultValue={`${url}/f/${slug}`}
                    />
                  </div>
                  <button onClick={copyLink} className="bg-indigo-500 text-white rounded text-sm py-2 px-5 mr-2 hover:bg-indigo-600 mt-3">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/*MODAL ITEM*/}
        </>
      }
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  const slug = context.params ? context.params['slug']?.toString().toLocaleLowerCase() : [];
  const token = context.req.cookies[jwt_aut_token];
  const redirect_obj: Redirect = {
    destination: "/register",
    statusCode: 307,
    basePath: false
  }
  if (!slug) {
    return {
      props: {
        fundraiser: undefined
      }
    }
  }
  if (!token) { return { redirect: redirect_obj } }
  const fundraiser_query = qs.stringify({
    filters: {
      slug: {
        $eq: slug
      }
    },
    populate: ["image", "user"]
  });

  const fundraiser = await (await fetch(server_url + "/api/fund-raises?" + fundraiser_query, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })).json();
  if (!fundraiser['data'][0]['attributes']['user']) { return { redirect: redirect_obj } };

  const donations_query = qs.stringify({
    filters: {
      fund_raise: {
        id: { $eq: fundraiser['data'][0]['id'] }
      }
    }, pagination: {
      page: 1,
      pageSize: 25,
    },
    populate: "*"
  })

  const donations = await (await fetch(server_url + "/api/donations?" + donations_query, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })).json();
  return {
    props: {
      fundraiser: fundraiser['data'][0],
      slug,
      donations: donations['data'],
      donations_meta: donations['meta']['pagination']
    }
  }
}