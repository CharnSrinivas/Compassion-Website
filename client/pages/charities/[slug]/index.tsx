import axios from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { useEffect, useState } from 'react'
import { jwt_aut_token, server_url } from '../../../config';
import { isMobile } from '../../../utils';

interface Props {
  charity: any; user: any | null;
  donations: any[], donations_meta: any; slug: string;
  dp: number;
  ds: number;
}

export default function fundraiser({ charity, user, slug, donations, donations_meta, dp, ds }: Props) {
  const [url, setUrl] = useState('');
  const [open_share, setOpenShare] = useState(false);
  const [read_more, setReadMore] = useState(false);
  const router = useRouter();
  const [show_embedded, setShowEmbedded] = useState(false);
  const [pathname, setPathName] = useState('');

  useEffect(() => {
    setUrl(window.location.origin);
    setPathName(window.location.pathname);

  }, [])
  const shareOnWhatsapp = () => {
    if (!window) return;
    if (isMobile()) {
      window.open(`whatsapp://send?text=${url}/charities/${slug}`, '_blank')
    } else {
      window.open(`https://web.whatsapp.com/send?text=${url}/charities/${slug}`, "_blank")
    }
  }
  const copyLink = () => {
    navigator.clipboard.writeText(`${url}/charities/${slug}`).then(() => { }).catch(() => { });
  }
  const shareOnTwitter = () => {
    if (!window) return;
    if (isMobile()) {
      window.open(`tg://msg?text=${url}/f/${slug}`, '_blank');
    } else {
      window.open(`https://telegram.me/share/url?url=${url}/charities/${slug}`, "_blank");
    }
  };

  const donate = () => {
    if (!user) {
      router.push("/register");
    }
    let _amount = window.prompt("enter the amount to donate ");
    if (!_amount) return;
    let amount = parseInt(_amount);
    if (isNaN(amount)) return;
    const token = localStorage.getItem(jwt_aut_token);
    axios.post(server_url + "/api/charity-donations", {
      data: {
        amount,
        user: user.id,
        charity: charity.id, comment: "test comment"
      },
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  };

  return (
    <>
      <Head>
        <title>{"Compassion charity | " + charity.attributes.name}</title>
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={"Compassion charity| " + charity.attributes.name} />
        <meta property="og:description" content={charity.attributes.description} />
        {charity.attributes.image && charity.attributes.image.data &&
          <meta property="og:image" content={server_url + charity.attributes.image.data.attributes.url} />}
      </Head>
      <div>
        <section className="text-gray-600 body-font">
          <div className="container w-auto gap-5 px-3 py-20 mx-auto">
            <div className="lg:w-4/5 lg:justify-center mx-auto flex flex-wrap ">
              <div className='lg:w-1/2'>
                {charity.attributes.image && charity.attributes.image.data &&
                  <img
                    className="lg:w-full w-full lg:h-[32rem] h-[28rem] object-cover object-center rounded-lg"
                    src={server_url + charity.attributes.image.data.attributes.url}
                    alt="content"
                  />
                }{!charity.attributes.image &&
                  <img
                    className="lg:w-full w-full lg:h-[32rem] h-[28rem] object-cover object-center rounded-lg"
                    src={"/assets/image-placeholder.jpg"}
                    alt="content"
                  />
                }

                <h1 className="text-gray-700 text-3xl my-8 title-font font-medium ">
                  {charity.attributes.name}
                </h1>
                <hr className='my-3' />
                <div className="leading-relaxed " style={{ transition: 'ease-in 0.6s all' }} >
                  {charity.attributes.description && charity.attributes.description.length > 500 &&
                    <>
                      {!read_more && ((charity.attributes.description as string).slice(0, 500) + "...").split(`\n`).map((txt, index) => {
                        if (!txt) { return null }
                        return (<>
                          <p key={index + Math.random()} className="leading-relaxed text-base">
                            {txt}
                          </p>
                          <div key={index + Math.random()}>&nbsp;</div>
                        </>)
                      })}
                      {read_more &&
                        (charity.attributes.description as string).split(`\n`).map((txt, index) => {
                          if (!txt) { return null }
                          return (<>
                            <p key={index + Math.random()} className="leading-relaxed text-base">
                              {txt}
                            </p>
                            <div key={index + Math.random()}>&nbsp;</div>
                          </>)
                        })
                      }
                    </>
                  }
                  {charity.attributes.description && charity.attributes.description.length <= 500 &&
                    (<>
                      <p className="leading-relaxed text-base">
                        {charity.attributes.description}
                      </p>
                      <div >&nbsp;</div>
                    </>)
                  }
                  {charity.attributes.description && <>

                    {!read_more &&
                      <p onClick={() => { setReadMore(true) }} className=' text-blue-900 underline cursor-pointer'>Read more</p>
                    }
                    {read_more &&
                      <p onClick={() => { setReadMore(false) }} className=' text-blue-900 underline cursor-pointer' >Read less</p>
                    }
                  </>
                  }
                </div>
                <hr className='my-3' />
              </div>
              <div className="lg:w-1/3 w-1/2   lg:pl-10 m-auto sm:mt-5   lg:mt-0 relative">
                <div className='rounded-lg drop-shadow-xl bg-white max-w-sm flex-col p-5 justify-start relative'>
                  <div className="flex  flex-wrap items-baseline gap-2">
                    <div className='flex items-baseline gap-1'>
                      <p className='text-gray-800 text-2xl title-font font-medium'>{charity.attributes.direct_funds}</p>
                      <p className='text-gray-600 font-medium ' >{(charity.attributes.fund_type as string).toUpperCase()}</p>
                    </div>
                    <p>direct funds raised</p>
                  </div>

                  <p className='font-normal my-3 text-sm text-gray-500'>{charity.attributes.direct_funds_count}&nbsp;donations</p>
                  <a href={`/charities/${slug}/donate`} className="flex w-full mt-10 text-white items-center gap-2 bg-primary justify-center border-0 py-2 px-4 focus:outline-none active:bg-secondary rounded">
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
                  <button
                    onClick={() => {
                      setOpenShare(true);
                      document.querySelector('body')!.style.overflow = 'hidden';
                      document.documentElement.scrollTop = 0
                    }}
                    className="flex w-full mt-3 text-primary items-center gap-2 bg-transparent border-2 border-primary justify-center py-2 px-4 focus:outline-none active:bg-primary active:text-white rounded">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                    >
                      <path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z" />
                    </svg>

                    <p>Share </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='w-[90%] lg:w-[80%] mx-auto '>
            <h2 className='subtitle-font font-medium text-xl sm:text-2xl my-8 text-gray-700' > Donations</h2>
            <div className="flex flex-col mt-6">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                          {donations.map((donation, index) => {
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
                                    {donation.attributes.user.data &&
                                      <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{donation.attributes.user.data.attributes.username}</div>
                                        <div className="text-sm text-gray-500">{donation.attributes.user.data.attributes.email}</div>
                                      </div>
                                    }{!donation.attributes.user.data &&
                                      <div className="text-sm font-medium text-gray-900">Anonymous</div>
                                    }
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
                      </table>
                    }
                    {donations.length <= 0 &&
                      <div className=' bg-white py-7'>
                        <h3 className='mt-15 font-medium text-xl text-gray-900 my-3 text-center'>Your fundraiser has no donations yet :(</h3>
                        <h5 className='mt-15  text-gray-700 my-3 text-center' >Your donations will show up here. Start by sharing your fundriaiser with friends and family </h5>
                      </div>
                    }

                  </div>

                  <div className="flex px-4 py-3 text-xs font-semibold justify-between tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
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
            </div>
          </div>
        </section >

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
                        defaultValue={`${url}/charities/${slug}`}
                      />
                    </div>
                    <button onClick={copyLink} className="bg-indigo-500 text-white rounded text-sm py-2 px-5 mr-2 hover:bg-indigo-600 mt-3">
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
      </div >
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  const server_url = 'http://127.0.0.1:1337';
  const slug = context.params ? context.params['slug']?.toString().toLocaleLowerCase() : [];
  const token = context.req.cookies[jwt_aut_token];
  const donations_page = context.query['dp'];
  const donations_size = context.query['ds'];
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

  const headers: any = token ? {
    Authorization: `Bearer ${token}`,
  } : {};

  const charity = await (await fetch(server_url + "/api/charities?" + query, {
    method: "GET",
    headers: headers
  })).json();


  const dp = parseInt(donations_page ? donations_page.toString() : '1');
  const ds = parseInt(donations_size ? donations_size.toString() : '10');

  const donations_query = qs.stringify({
    filters: {
      charity: {
        id: {
          $eq: charity['data'][0]['id']
        }
      }
    },
    populate: ["user", 'charity'],
    sort: ['createdAt:desc'],
    pagination: {
      pageSize: !isNaN(ds) ? ds : 10,
      page: !isNaN(dp) ? dp : 1
    }
  }, { encodeValuesOnly: true });

  var donations = await (await fetch(server_url + '/api/charity-donations?' + donations_query, {
    method: "GET",
    headers: headers
  })).json();

  const user_res = await fetch(server_url + "/api/users/me", {
    method: "GET",
    headers: headers
  })

  if (user_res.status > 201) {
    return {
      props: {
        charity: charity['data'][0],
        user: null,
        donations: donations['data'] ? donations['data'] : [],
        donations_meta: donations['meta']['pagination'],
        slug, ds, dp
      }
    }
  }
  const user = await user_res.json();
  return {
    props: {
      charity: charity['data'][0],
      user,
      donations: donations['data'] ? donations['data'] : [],
      donations_meta: donations['meta']['pagination'],
      slug, ds, dp
    }
  }
}