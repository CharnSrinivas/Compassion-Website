export default function Footer() {
    return (
        <footer id="footer" className="text-gray-600 body-font bg-gray-100">
            <div className="container px-5 py-10 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        <img src="/assets/logo.png" alt="logo" className="w-10 h-10 text-white " />
                        <span className="ml-3 text-xl">Compassion</span>
                    </a>
                </div>
                <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                            Discover
                        </h2>
                        <nav className="list-none mb-10">
                            <li title='start a  Charity' className='my-2'>
                                <a href='/discover' className="text-gray-600 hover:text-gray-800" >Fundraiser</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                            Fundraiser for
                        </h2>
                        <nav className="list-none mb-10">
                            <li title='start a  Charity' className='my-2'>
                                <a href='/create/charity/details' className="text-gray-600 hover:text-gray-800" >Charity</a>
                            </li>
                            <li title='fundraiser for Medical' className='my-2'>
                                <a href='/discover/medical' className="text-gray-600 hover:text-gray-800">Medical</a>
                            </li>
                            <li title='fundraiser for Emergency' className='my-2'>
                                <a href='/discover/emergency' className="text-gray-600 hover:text-gray-800">Emergency</a>
                            </li>
                            <li title='fundraiser for Memorial' className='my-2'>
                                <a href='/discover/memorial' className="text-gray-600 hover:text-gray-800">Memorial</a>
                            </li>
                            <li title='fundraiser for Education' className='my-2'>
                                <a href='/discover/education' className="text-gray-600 hover:text-gray-800">Education</a>
                            </li>
                            <li title='fundraiser for Education' className='my-2'>
                                <a href='/discover/education' className="text-gray-600 hover:text-gray-800">Show all</a>
                            </li>
                        </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                            How it works
                        </h2>
                        <nav className="list-none mb-10">
                            <li title='How compassion works' className='my-2'>
                                <a href='/info/how-it-works' className="text-gray-600 hover:text-gray-800" >How compassion works</a>
                            </li>
                            <li title='what is crowdfunding' className='my-2'>
                                <a href='/info/crowdfunding' className="text-gray-600 hover:text-gray-800">What is crowdfunding?</a>
                            </li>
                            <li title='Team funding' className='my-2'>
                                <a href='/info/charity-fundraising' className="text-gray-600 hover:text-gray-800">Fundraisers For Charity</a>
                            </li>
                            <li title='Team funding' className='my-2'>
                                <a href='/info/team-funding' className="text-gray-600 hover:text-gray-800">Team funding</a>
                            </li>
                            
                            <li title='The donate button' className='my-2'>
                                <a href='/info/donate-button' className="text-gray-600 hover:text-gray-800">The donate button</a>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">
                        © 2020 Compassion
                        {/* <a
                href="https://twitter.com/knyttneve"
                rel="noopener noreferrer"
                className="text-gray-600 ml-1"
                target="_blank"
              >
                @knyttneve
              </a> */}
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                        <a className="text-gray-500">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <svg
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={0}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="none"
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                                />
                                <circle cx={4} cy={4} r={2} stroke="none" />
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    )
}