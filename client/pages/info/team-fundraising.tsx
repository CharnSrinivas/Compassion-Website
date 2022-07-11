import React from 'react'

export default function teamFundraising() {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-col justify-center">
                    <h1 className='title-font text-5xl text-center font-semibold text-gray-800 '>
                        Introducing GoFundMe Team Fundraising
                    </h1>
                    <h3 className='text-2xl font-light text-gray-600 text-center my-6 '>
                        The power of Compassion, now designed for groups and teams who want to fundraise together.
                    </h3>
                    <div className='flex flex-wrap mt-3 gap-8 lg:justify-center'>
                        <div className='md:w-1/4'>
                            <img src="/assets/family.jpg" alt="family" className='object-cover rounded-lg' />
                            <h3 className='font-medium text-gray-800 text-xl mt-3 text-center'>Family & Friends</h3>
                        </div>
                        <div className='md:w-1/4'>
                            <img src="/assets/sports.jpg" alt="sports" className='object-cover rounded-lg' />
                            <h3 className='font-medium text-gray-800 text-xl mt-3 text-center'>Sports teams</h3>
                        </div>
                        <div className='md:w-1/4'>
                            <img src="/assets/groups.jpg" alt="groups" className='object-cover rounded-lg' />
                            <h3 className='font-medium text-gray-800 text-xl mt-3 text-center'>Family & Friends</h3>
                        </div>
                    </div>
                    <a href="/create/fundraiser/details"
                        className="block px-8 md:w-fit text-center text-[1.1rem] drop-shadow-xl py-3 space-x-10 rounded text-white mt-8  bg-[#32a95c] w-full mx-auto">
                        Start giving
                    </a>
                </div>
            </div>
            <div className='bg-[#fbf8f6]'>
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-col justify-center">
                        <h2 className="text-gray-700 text-3xl  font-medium mb-4 text-center">
                            Why Compassion Team Fundraising?
                        </h2>
                        <p className="mb-4 leading-8 text-gray-600 mt-5 text-center">
                            GoFundMe Team Fundraising is specifically designed to help groups of all sizes raise money together. We give you all the same powerful features of our individual campaigns – including fast set-up and social sharing tools – plus new tools to help you collaborate and fundraise together.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-col justify-center   ">
                    <h2 className="text-gray-700 text-3xl  font-medium mb-4 text-center">
                        How does team fundraising work?
                    </h2>
                    <div className="container px-5 py-8 mx-auto flex flex-wrap">
                        <div className="flex flex-wrap w-full items-center justify-between">
                            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:pt-20">
                                <div className="flex relative pb-20 ">
                                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                        <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                        1
                                    </div>
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                                            STEP 1
                                        </h2>
                                        <p className="leading-relaxed">
                                            VHS cornhole pop-up, try-hard 8-bit iceland helvetica. Kinfolk
                                            bespoke try-hard cliche palo santo offal.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex relative pb-20 ">
                                    <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                        <div className="h-full w-1 bg-gray-200 pointer-events-none" />
                                    </div>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                        2
                                    </div>
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                                            STEP 2
                                        </h2>
                                        <p className="leading-relaxed">
                                            Vice migas literally kitsch +1 pok pok. Truffaut hot chicken
                                            slow-carb health goth, vape typewriter.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex relative pb-20 ">

                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                                        3
                                    </div>
                                    <div className="flex-grow pl-4">
                                        <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                                            STEP 3
                                        </h2>
                                        <p className="leading-relaxed">
                                            Coloring book nar whal glossier master cleanse umami. Salvia +1
                                            master cleanse blog taiyaki.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
                                src="/assets/team-fundraising.jpg"
                                alt="step"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}