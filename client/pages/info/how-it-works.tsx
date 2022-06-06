import React from 'react'

type Props = {}

export default function how_it_works({ }: Props) {
    return (
        <section className='flex flex-col items-center'>
            <div className='px-7 py-5 my-8'>
                <h1 className='font-medium text-center my-5 text-4xl text-gray-700'>How compassion works</h1>
                <h2 className='w-[100%] lg:w-[65%] mx-auto  text-[1.1rem] text-gray-700 text-center '> While other fundraising platforms are limited to a country due to government restraints, Compassion allows you to collect crypto donations from around the world, whether you are an individual, group, or organization.</h2>
            </div>
            <img src="/assets/we-accept-crypto.png" className='lg:w-[40%] w-[95%] rounded-xl' loading='lazy' alt="crypto-donation" />
            <div className="flex flex-wrap mx-auto items-center  mt-24 lg:w-[70%]  pb-20">
                <div className="xl:w-1/4 lg:w-1/2 md:w-full w-[80%] px-8 pt-3 pb-6 border-l-2 border-gray-200 border-opacity-60 mx-auto">
                    <svg
                        className='w-9 h-9 mb-5'
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.7894 9.78947C8.04535 9.78947 6.63151 8.37563 6.63151 6.63157C6.63151 4.88752 8.04535 3.47368 9.7894 3.47368C11.5335 3.47368 12.9473 4.88752 12.9473 6.63157C12.9473 8.37563 11.5335 9.78947 9.7894 9.78947ZM9.78925 8.52631C10.8357 8.52631 11.684 7.67801 11.684 6.63158C11.684 5.58514 10.8357 4.73684 9.78925 4.73684C8.74282 4.73684 7.89452 5.58514 7.89452 6.63158C7.89452 7.67801 8.74282 8.52631 9.78925 8.52631ZM17.3684 13.5789C15.6243 13.5789 14.2105 12.1651 14.2105 10.421C14.2105 8.67699 15.6243 7.26315 17.3684 7.26315C19.1125 7.26315 20.5263 8.67699 20.5263 10.421C20.5263 12.1651 19.1125 13.5789 17.3684 13.5789ZM17.3682 12.3158C18.4147 12.3158 19.263 11.4675 19.263 10.421C19.263 9.37461 18.4147 8.52631 17.3682 8.52631C16.3218 8.52631 15.4735 9.37461 15.4735 10.421C15.4735 11.4675 16.3218 12.3158 17.3682 12.3158ZM12.3964 16.421C13.1466 16.421 13.5271 15.6056 12.8062 15.398C12.672 15.3594 12.5353 15.3383 12.3998 15.3383H9.9577C9.75118 15.3383 9.55771 15.2374 9.4396 15.068V15.068C8.85302 14.2266 7.49438 13.5789 6.29454 13.5789V13.5789C6.13186 13.5789 5.99998 13.7108 5.99998 13.8735V17.4529C5.99998 17.8287 6.21067 18.1728 6.54539 18.3436L10.4011 20.3114C10.9187 20.5715 11.5218 20.5966 12.0557 20.3818L18.74 17.6538C19.3462 17.4064 19.3366 16.7368 18.6819 16.7368V16.7368H15.7691C15.6014 16.7368 15.4735 16.8849 15.4735 17.0526V17.0526V17.0526C15.4735 17.4014 15.1907 17.6842 14.8419 17.6842H9.97875C9.62994 17.6842 9.34717 17.4014 9.34717 17.0526V17.0526C9.34717 16.7038 9.62994 16.421 9.97875 16.421H12.3964ZM6.29454 12.3158V12.3158C6.13186 12.3158 5.99998 12.1839 5.99998 12.0212V11.6842C5.99998 11.3354 5.71722 11.0526 5.36841 11.0526H3.21051C2.65823 11.0526 2.21051 11.5003 2.21051 12.0526V19.2331C2.21051 19.7854 2.65823 20.2331 3.21051 20.2331H5.71527C5.87251 20.2331 5.99998 20.1056 5.99998 19.9484V19.9484C5.99998 19.7357 6.22469 19.5981 6.41413 19.6948L9.83043 21.4383C10.6755 21.8629 11.6569 21.9038 12.5301 21.5525L21.3964 17.934V17.934C21.6739 17.8207 21.8335 17.528 21.7786 17.2334V17.2334C21.7614 17.1412 21.723 17.0194 21.6542 16.8782C21.5495 16.6634 21.3967 16.4534 21.1885 16.2621C20.6418 15.7599 19.814 15.4737 18.6819 15.4737H15.4589C15.1338 15.4737 14.8359 15.3087 14.6101 15.0748C14.0301 14.4741 13.2237 14.0752 12.3998 14.0752H10.7283C10.4354 14.0752 10.1616 13.942 9.94745 13.7422C9.02186 12.8789 7.60631 12.3158 6.29454 12.3158ZM4.10509 18.9699C3.75628 18.9699 3.47351 18.6872 3.47351 18.3383V12.9474C3.47351 12.5986 3.75628 12.3158 4.10509 12.3158V12.3158C4.4539 12.3158 4.73667 12.5986 4.73667 12.9474V18.3383C4.73667 18.6872 4.4539 18.9699 4.10509 18.9699V18.9699Z"
                            fill="#333333"
                        />
                    </svg>

                    <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                        Start your fundraiser
                    </h2>
                    <div className="flex flex-col items-start  text-center mb-1 space-y-2.5">
                        <a>
                            <span className=" text-green-600 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </span>
                            Set your fundraiser goal
                        </a>
                        <a>
                            <span className=" text-green-600 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </span>
                            Tell your story
                        </a>
                        <a>
                            <span className=" text-green-600 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </span>
                            Add a picture or video
                        </a>
                    </div>
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-full w-[80%] px-8 pt-3 pb-6 border-l-2 border-gray-200 border-opacity-60 mx-auto">
                    <svg
                        className='w-9 h-9 mb-5'
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.0001 13.579C9.21405 13.579 6.94751 11.3832 6.94751 8.66448V7.44079C6.94751 4.72204 9.21405 2.52632 12.0001 2.52632C14.7862 2.52632 17.0528 4.72204 17.0528 7.44079V8.66448C17.0528 11.3832 14.7862 13.579 12.0001 13.579ZM12 12.3158C14.0973 12.3158 15.7895 10.6765 15.7895 8.66448V7.44079C15.7895 5.42879 14.0973 3.78948 12 3.78948C9.9027 3.78948 8.21051 5.42879 8.21051 7.44079V8.66448C8.21051 10.6765 9.9027 12.3158 12 12.3158ZM21.7895 21.4737C21.7895 21.1249 21.5067 20.8421 21.1579 20.8421H3.72351C3.61401 20.8421 3.52943 20.7453 3.54911 20.6376C3.95373 18.4222 5.93783 16.7368 8.33029 16.7368H13.2087C13.5575 16.7368 13.8403 16.4541 13.8403 16.1053C13.8403 15.7565 13.5575 15.4737 13.2087 15.4737H8.33029C4.95324 15.4737 2.21051 18.1566 2.21051 21.4737V21.9114C2.21051 22.0185 2.2973 22.1053 2.40436 22.1053H21.1579C21.5067 22.1053 21.7895 21.8225 21.7895 21.4737ZM18.316 13.8947C18.316 13.5459 18.5988 13.2632 18.9476 13.2632C19.2964 13.2632 19.5792 13.5459 19.5792 13.8947V15.4737H21.1576C21.5065 15.4737 21.7892 15.7565 21.7892 16.1053C21.7892 16.4541 21.5065 16.7368 21.1576 16.7368H19.5792V18.3158C19.5792 18.6646 19.2964 18.9474 18.9476 18.9474C18.5988 18.9474 18.316 18.6646 18.316 18.3158V16.7368H16.7366C16.3878 16.7368 16.105 16.4541 16.105 16.1053C16.105 15.7565 16.3878 15.4737 16.7366 15.4737H18.316V13.8947Z"
                            fill="#333333"
                        />
                    </svg>

                    <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                        Share with friends
                    </h2>
                    <div className="flex flex-col items-start  text-center mb-1 space-y-2.5">
                        <a>
                            <span className=" text-green-600 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </span>
                            Send emails
                        </a>
                        <a>
                            <span className=" text-green-600 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </span>
                            Send text messages
                        </a>
                        <a>
                            <span className=" text-green-600 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </span>
                            Share on social media
                        </a>
                    </div>
                </div>

                <div className="xl:w-1/4 lg:w-1/2 md:w-full w-[80%] px-8 pt-3 pb-6 border-l-2 border-gray-200 border-opacity-60 mx-auto">
                    <svg
                        className='w-9 h-9 mb-5'
                        viewBox="0 0 475.037 475.037"
                        xmlSpace="preserve"
                    >
                        <g transform="translate(0 -540.36)">
                            <g>
                                <g>
                                    <path
                                        d="M475.018,775.088c-0.4-62.9-25.5-122.1-70.8-166.5c-45.6-44.8-105.8-69-169.5-68.2c-131,1.6-236.3,109.4-234.7,240.3
				c0.8,63.5,26.2,122.9,71.5,167.2c44.7,43.6,103.4,67.5,165.8,67.5c1,0,2,0,3,0c63.1-0.4,122.3-25.5,166.6-70.6
				C451.618,899.288,475.818,838.988,475.018,775.088z M396.218,934.188c-41.5,42.3-96.9,65.7-156.1,66.1
				c-59.4,0.7-115.6-21.7-158.1-63.2c-42.5-41.4-66.3-97.1-67-156.6c-1.5-122.6,97.1-223.6,219.9-225.1c0.9,0,1.9,0,2.8,0
				c58.6,0,114,22.6,156,63.9c42.4,41.6,65.9,97,66.3,155.9C460.718,835.088,438.118,891.588,396.218,934.188z"
                                    />
                                    <path
                                        d="M342.518,610.388c-31.5-19.8-67.9-30.3-105.1-30.3s-73.5,10.5-105.1,30.3c-31.6,19.8-56.9,48.1-73.1,81.7
				c-1.8,3.7-0.2,8.2,3.5,10c3.7,1.8,8.2,0.2,10-3.5c30.4-62.9,95-103.6,164.7-103.6c69.7,0,134.4,40.7,164.7,103.6
				c1.3,2.6,4,4.2,6.8,4.2h0c1.1,0,2.2-0.2,3.2-0.7c3.7-1.8,5.3-6.3,3.5-10C399.318,658.488,374.118,630.288,342.518,610.388z"
                                    />
                                    <path
                                        d="M312.118,691.888l-77.6,77.6c-2.9,2.9-2.9,7.7,0,10.6c1.5,1.5,3.4,2.2,5.3,2.2c2,0,3.9-0.7,5.3-2.2l77.6-77.6
				c2.9-2.9,2.9-7.7,0-10.6C319.818,688.988,315.018,688.988,312.118,691.888z"
                                    />
                                    <path
                                        d="M277.018,770.388c-4.1,0-7.5,3.4-7.5,7.5c0,17.3-14.1,31.4-32.2,32.1c-17.6-0.1-31.9-14.1-31.9-31.3c0-0.1,0-0.2,0-0.3
				c-0.3-8.6,2.9-17.1,8.9-23.3c5.8-6,13.4-9.3,21.6-9.3c4.1,0,7.5-3.4,7.5-7.5s-3.4-7.5-7.5-7.5c-12.3,0-23.8,5-32.4,13.9
				c-8.7,9.1-13.5,21.5-13.1,34.1c0.1,25.5,21.2,46.2,47.1,46.2l0,0c0.1,0,0.2,0,0.2,0c26.2-1,46.8-21.7,46.8-47.1
				C284.518,773.788,281.118,770.388,277.018,770.388z"
                                    />
                                </g>
                            </g>
                        </g>
                    </svg>

                    <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
                        Manage donations
                    </h2>
                    <div className="flex flex-col items-start  text-center mb-1 space-y-2.5">
                        <a>
                            <span className=" text-green-600 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </span>
                            Accept donations
                        </a>
                        <a>
                            <span className=" text-green-600 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </span>
                            Thank donors
                        </a>
                        <a>
                            <span className=" text-green-600 w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </span>
                            Withdraw funds
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap mx-auto items-center  mt-24 pb-20 py-5 bg-[#fbf8f6] w-full">

                <h1 className='font-medium text-center my-5 text-3xl mx-auto text-[#32a95c]'>
                    The #1 Crypto Crowdfunding Platform In The World For
                    Individuals And Charities
                </h1>
                <h4 className='text-gray-600 text-[1.1rem] text-light mx-auto w-[95%] lg:w-[50%]'>
                    Compassion is a leading web3.0 fundraising platform in the world that
                    accepts crypto donations. That’s why more and more people are using
                    Compassion to start global fundraisers.
                </h4>
            </div>
        </section>
    )
}