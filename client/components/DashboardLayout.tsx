import Head from 'next/head';
import React, { useEffect, useState } from 'react'

interface Props {
    children: React.ReactNode,

}
const DashboardLayout: React.FunctionComponent<Props> = (props: Props) => {
    const [open_side_bar, setOpenSideBar] = useState(false);
    const [pathname, setPathName] = useState('');
    useEffect(() => {
        document.getElementById("navbar")!.style!.display = 'none';
        document.getElementById("footer")!.style!.display = 'none';
        setPathName(window.location.pathname);
    });
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Compassion Dashboard</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />

                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css"
                />
                <style
                    type="text/css"
                    dangerouslySetInnerHTML={{
                        __html:
                            "/* Chart.js */\n@keyframes chartjs-render-animation{from{opacity:.99}to{opacity:1}}.chartjs-render-monitor{animation:chartjs-render-animation 1ms}.chartjs-size-monitor,.chartjs-size-monitor-expand,.chartjs-size-monitor-shrink{position:absolute;direction:ltr;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1}.chartjs-size-monitor-expand>div{position:absolute;width:1000000px;height:1000000px;left:0;top:0}.chartjs-size-monitor-shrink>div{position:absolute;width:200%;height:200%;left:0;top:0}"
                    }}
                />
                <style
                    type="text/css"
                    dangerouslySetInnerHTML={{
                        __html:
                            '@font-face { font-family: Roboto; src: url("chrome-extension://mcgbeeipkmelnpldkobichboakdfaeon/css/Roboto-Regular.ttf"); }'
                    }}
                />
            </Head>
            <div className={`flex h-screen  ${open_side_bar ? "overflow-hidden" : ''} relative bg-gray-50 dark:bg-gray-900`}  >
                <aside className={`z-20 ${!open_side_bar ? "hidden " : ""} w-64 overflow-y-auto h-screen bg-white dark:bg-gray-800 md:block flex-shrink-0`}>
                    <div className="py-4 text-gray-500 dark:text-gray-400">
                        <a href='/'
                            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                        >
                            Compassion
                        </a>
                        <ul className="mt-6">
                            <li className="relative px-6 py-3">
                                {pathname .startsWith( '/admin/dashboard/fundraiser')&&
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    />
                                }
                                <a
                                    className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                                    href="/admin/dashboard/fundraiser"
                                >
                                    {/* <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="none"

                                        strokeWidth={2}
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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

                                    <span className="ml-4">Fundraisers</span>
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <li className="relative px-6 py-3">
                                {pathname === '/admin/dashboard/charity' &&
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    />
                                }
                                <a
                                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    href="/admin/dashboard/charity"
                                >
                                    {/* <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
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

                                    <span className="ml-4">Charities</span>
                                </a>
                            </li>
                            <li className="relative px-6 py-3">
                                {pathname .startsWith( '/admin/dashboard/user' )&&
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    />
                                }
                                <a
                                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    href="/admin/dashboard/user"
                                >
                                    {/* <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg> */}
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx={9} cy={7} r={4} />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>

                                    <span className="ml-4">Users</span>
                                </a>
                            </li>
                            <li className="relative px-6 py-3">
                                {pathname .startsWith( '/admin/dashboard/donation' )&&
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    />
                                }
                                <a
                                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    href="/admin/dashboard/donation"
                                >
                                    {/* <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        <path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                    </svg> */}
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-5 h-5"
                                    >
                                        <polyline points="21 8 21 21 3 21 3 8" />
                                        <rect x={1} y={3} width={22} height={5} />
                                        <line x1={10} y1={12} x2={14} y2={12} />
                                    </svg>

                                    <span className="ml-4">Donations</span>
                                </a>
                            </li>
                            <li className="relative px-6 py-3">
                                {pathname.startsWith ('/admin/dashboard/charity-donation') &&
                                    <span
                                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                        aria-hidden="true"
                                    />
                                }
                                <a
                                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    href="/admin/dashboard/charity-donation"
                                >
                                    <svg
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-6 h-6"
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

                                    <span className="ml-4">Charity Donations</span>
                                </a>
                            </li>
                            {/* <li className="relative px-6 py-3">
                                <a
                                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    href="modals.html"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span className="ml-4">Modals</span>
                                </a>
                            </li>
                            <li className="relative px-6 py-3">
                                <a
                                    className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    href="tables.html"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                    <span className="ml-4">Tables</span>
                                </a>
                            </li>
                            <li className="relative px-6 py-3">
                                <button className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                    <span className="inline-flex items-center">
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                        </svg>
                                        <span className="ml-4">Pages</span>
                                    </span>
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <template x-if="isPagesMenuOpen" />
                            </li> */}
                        </ul>
                        {/* <div className="px-6 my-6">
                            <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                Create account
                                <span className="ml-2" aria-hidden="true">
                                    +
                                </span>
                            </button>
                        </div> */}
                    </div>
                </aside>
                <div
                    className={`fixed  ${!open_side_bar ? "hidden" : ""} inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center`}
                />
                <div className="flex flex-col flex-1 w-full">
                    <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
                        <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
                            <button
                                className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
                                aria-label="Menu"
                                onClick={() => {
                                    setOpenSideBar(!open_side_bar)
                                }}
                            >
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {/* <div className="flex justify-center flex-1 lg:mr-32">
                                <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
                                    <div className="absolute inset-y-0 flex items-center pl-2">
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        className="w-full py-3 pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md dark:placeholder-gray-500 dark:focus:shadow-outline-gray dark:focus:placeholder-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:placeholder-gray-500 focus:bg-white focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input"
                                        type="text"
                                        placeholder="Search for projects"
                                        aria-label="Search"
                                    />
                                </div>
                            </div>
                            <ul className="flex items-center flex-shrink-0 space-x-6">
                                
                                <li className="flex">
                                    <button
                                        className="rounded-md focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Toggle color mode"
                                    >
                                        <template x-if="!dark" />
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                        </svg>
                                        <template x-if="dark" />
                                    </button>
                                </li>
                                <li className="relative">
                                    <button
                                        className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Notifications"
                                        aria-haspopup="true"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                        </svg>
                                        
                                        <span
                                            aria-hidden="true"
                                            className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                                        />
                                    </button>
                                    <template x-if="isNotificationsMenuOpen" />
                                </li>
                                
                                <li className="relative">
                                    <button
                                        className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                                        aria-label="Account"
                                        aria-haspopup="true"
                                    >
                                        <img
                                            className="object-cover w-8 h-8 rounded-full"
                                            src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                                            alt=""
                                            aria-hidden="true"
                                        />
                                    </button>
                                    <template x-if="isProfileMenuOpen" />
                                </li>
                            </ul> */}
                        </div>
                    </header>
                    {props.children}
                </div>
            </div>
        </>
    )
}
export default DashboardLayout;