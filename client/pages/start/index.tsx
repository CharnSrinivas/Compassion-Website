import React from 'react'

type Props = {}

export default function start(props: Props) {
    return (
        <section>

            <div className='px-8 py-12 lg:w-[60%] w-[90%] mx-auto mt pt-[5rem]  drop-shadow-md '>
                <h1 className='font-semibold my-4 text-4xl text-gray-700'>Start a Fundraiser
                </h1>
                <h3 className='text-gray-600 my-1 font-poppins  text-[1.1rem]'>People around the world are raising money for what they are passionate about.
                </h3>
                <a href="/create/fundraiser/details"
           className="block px-8 md:w-fit text-center text-[1.1rem] drop-shadow-xl py-3 space-x-10 rounded text-white mt-8  bg-[#32a95c] sm:w-full">
                    Start a Fundraiser
                </a>
            </div>
            <hr />
            <div className=' w-full bg-[#fbf8f6] py-5'>
                <div className='px-8 mx-auto w-90% lg:w-[60%] pt-[5rem]'>
                    <div className='mb-5'>
                        <h1 className='font-semibold mb-1 text-3xl text-gray-700'>Fundraising categories</h1>
                        <div className="h-1 w-24 bg-primary rounded " />
                    </div>
                    <div className="flex flex-wrap justify-between w-full mx-auto">
                        <a href={`/start/medical`} className="xl:w-1/4 md:w-1/2  bg-white  cursor-pointer m-3  drop-shadow-md first-letter:p-0   " >
                            <div className="bg-gray-50">
                                <img className='h-[17rem] object-cover' src="https://d25oniaj7o2jcw.cloudfront.net/photo-category-medical-uk@2x.jpg" alt="medical" />
                            </div>
                            <h3 className='font-medium text-gray-700 ml-2 my-5'>Medical</h3>
                        </a>
                        <a href={`/start/funeral`} className="xl:w-1/4 md:w-1/2  bg-white  cursor-pointer m-3  drop-shadow-md first-letter:p-0   " >
                            <div className="bg-gray-50">
                                <img className='h-[17rem] object-cover' src="https://d25oniaj7o2jcw.cloudfront.net/photo-category-memorials@2x.jpg" alt="funeral" />
                            </div>
                            <h3 className='font-medium text-gray-700 ml-2 my-5'>Funeral</h3>
                        </a>
                        <a href={`/start/emergency`} className="xl:w-1/4 md:w-1/2  bg-white  cursor-pointer m-3  drop-shadow-md first-letter:p-0   " >
                            <div className="bg-gray-50">
                                <img className='h-[17rem] object-cover' src="https://d25oniaj7o2jcw.cloudfront.net/photo-category-emergencies-uk@2x.jpg" alt="Emergency" />
                            </div>
                            <h3 className='font-medium text-gray-700 ml-2 my-5'>Emergency</h3>
                        </a>
                        <a href={`/start/charity-fundraising`} className="xl:w-1/4 md:w-1/2  bg-white  cursor-pointer m-3  drop-shadow-md first-letter:p-0   " >
                            <div className="bg-gray-50">
                                <img className='h-[17rem] object-cover' src="https://d25oniaj7o2jcw.cloudfront.net/photo-category-charity-uk@2x.jpg" alt="Charity" />
                            </div>
                            <h3 className='font-medium text-gray-700 ml-2 my-5'>Charity</h3>
                        </a>
                        <a href={`/start/Education`} className="xl:w-1/4 md:w-1/2  bg-white  cursor-pointer m-3  drop-shadow-md first-letter:p-0   " >
                            <div className="bg-gray-50">
                                <img className='h-[17rem] object-cover' src="https://d25oniaj7o2jcw.cloudfront.net/photo-category-education-uk@2x.jpg" alt="Education" />
                            </div>
                            <h3 className='font-medium text-gray-700 ml-2 my-5'>Education</h3>
                        </a>
                        <a href={`/start/animals`} className="xl:w-1/4 md:w-1/2  bg-white  cursor-pointer m-3  drop-shadow-md first-letter:p-0   " >
                            <div className="bg-gray-50">
                                <img className='h-[17rem] object-cover' src="https://d25oniaj7o2jcw.cloudfront.net/photo-category-animals@2x.jpg" alt="Animals" />
                            </div>
                            <h3 className='font-medium text-gray-700 ml-2 my-5'>Animals</h3>
                        </a>

                    </div>
                </div>
            </div>
        </section>
    )
}