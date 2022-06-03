import React from 'react'


export default function crowdfunding() {
    return (

        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            Compassion
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                            What Is Crowdfunding?
                        </h1>

                        <p className="mb-4 leading-8 text-gray-600">
                            <a href='/info/crowdfunding' className='text-green-600'>Crowdfunding</a> harnesses the power of social networks and the internet to give people the means to raise funds, help others overcome hardship and meet aspirational goals. With crowdfunding, you can help a friend or an entire community. You can do anything from paying for your own operation to fulfilling a student’s dream of going to university – and so much more.
                        </p>
                        <p className="mb-4 leading-8 text-gray-600 mt-10">
                            If you’ve ever found yourself wondering, “What exactly is crowdfunding?” or “What are the benefits of crowdfunding?”, then read on! We’ll answer your questions about crowdfunding and give you tips on how to bring in donations.
                        </p>
                        <a href="/create/fundraiser/details"
                            className="block px-8 md:w-fit text-center text-[1.1rem] drop-shadow-xl py-3 space-x-10 rounded text-white mt-8  bg-[#32a95c] w-full">
                            Start crowdfunding
                        </a>
                    </div>
                    <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        src="/assets/crowdfunding.jpg"
                    />
                </div>
            </div>
            <div className='bg-[#fbf8f6]'>
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <h2 className="text-gray-700 text-2xl  font-medium mb-4">
                            The raise of crowdfunding</h2>
                        <p className="mb-4 leading-8 text-gray-600 mt-10">
                            In recent years, crowdfunding has transformed the traditional fundraising landscape, breaking down barriers between those in need and those available to help them.
                            Crowdfunding has made it possible for people to offer direct support to those who need
                            <a href='#' className='text-green-600'> emergency financial assistance </a>,
                            contributing to the larger trend of individual giving. In 2019,
                            <a href='#' className='text-green-600'> charitable giving by individuals grew </a>
                            by 4.7% for a total of £309.66 billion, outpacing giving by both corporations and foundations.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <h2 className="text-gray-700 text-2xl  font-medium mb-4">
                    What are the advantages of crowdfunding?
                    </h2>
                    <p className="mb-4 leading-8 text-gray-600 mt-10">
                        When funding from the government and charities falls short, many people turn to crowdfunding, meaning that they will rely on the kindness of their community. Online fundraising removes the traditional barriers that typically exist when asking for support, making it simple to overcome financial obstacles quickly or raise money for a worthy cause. For those looking for crowdfunding basics, here are some of the main advantages of crowdfunding:
                    </p>
                    <ul className='list-disc ml-5'>
                        <li className='my-3'>
                            There is no application process.
                        </li>
                        <li className='my-3'>
                            There are no long wait periods to receive your funds.
                        </li>
                        <li className='my-3'>
                            Crowdfunding takes the fear out of asking for financial help. It’s simple to share your fundraiser with your network of friends and family members on social media.
                        </li>
                        <li className='my-3'>
                            Crowdfunding makes it easy to reach people outside of your network.
                        </li>
                    </ul>
                    <p className="mb-4 leading-8 text-gray-600 mt-10">
                        Below, we answer the questions people most often have about crowdfunding when they’re trying to decide if they want to start an online fundraiser.
                    </p>
                </div>
            </div>
        </section>

    )
}