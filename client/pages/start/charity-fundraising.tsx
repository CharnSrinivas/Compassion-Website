import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import qs from 'qs';
import React, { useState } from 'react'
import { server_url } from '../../config';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
interface Props {
    fundraisers: any[];
    top_charities: any[] | null;
}
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        paritialVisibilityGutter: 60
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        paritialVisibilityGutter: 50
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        paritialVisibilityGutter: 30
    }
};
export default function medical({ fundraisers, top_charities }: Props) {

    const [open_popup, setOpenPopUp] = useState(false);
    const [searching_charities, setIsSearching] = useState(false);
    const [search_charities, setSearchCharities] = useState(top_charities);
    const [selected_charity, setSelectedCharity] = useState<number | null>(null);

    const searchCharities = (search: string) => {
        if (searching_charities) { return }
        const query = qs.stringify({
            filters: {
                $or: [
                    {
                        name: {
                            $containsi: search
                        }
                    },
                    {
                        user: {
                            username: {
                                $containsi: search
                            }
                        }
                    }
                ]
            }, populate: ['image', 'user'], pagination: {
                pageSize: 20
            }
        });

        fetch(server_url + "/api/charities?" + query, {
            method: "GET"
        })
            .then(
                res => {
                    res.json().then(res_json => {
                        setIsSearching(false);
                        if (res_json['data']) {
                            setSearchCharities(res_json['data']);
                        }
                    })
                })
            .catch(
                err => {
                    setIsSearching(false);
                }
            );
    }
    return (
        <section>

            <div className='px-8 py-12 lg:w-[60%] w-[90%] mx-auto mt pt-[5rem] flex flex-col '>
                <h1 className='font-semibold text-4xl text-gray-600'>
                    Raise Funds For A Charity Through Compassion Charity Fundraising
                </h1>
                <h3 className='font  text-gray-600 my-5'>Our charity fundraising is the fastest way to spread the word about the
                    charities you care about. Get crypto donations from global citizens and
                    support a charity in helping people in these difficult times.</h3>
                <h3 className='capitalize text-gray-500 '>START FUNDRAISING FOR YOUR FAVORITE NONPROFIT</h3>
                <div className='my-3'>
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            onFocus={() => {
                                setOpenPopUp(true);
                                document.querySelector('body')!.style.overflow = 'hidden';
                                document.documentElement.scrollTop = 0
                            }}
                            type="search"
                            id="default-search"
                            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Find nonprofits by name"
                        />
                    </div>

                    {search_charities && search_charities.length > 0 &&
                        <Carousel
                            partialVisbile responsive={responsive}
                            swipeable
                            showDots
                            infinite
                            className='justify-center  my-4'
                        >
                            <div className='flex flex-row items-center gap-5 my-5'>
                                {search_charities.map((charity) => {
                                    if (charity['attributes']['image']['data']) {
                                        return (
                                            <a href={`/create/fundraiser/details?charity_id=${charity.id}`} className='w-fit flex flex-col items-center'>
                                                <img className='h-[80px]' src={server_url + charity['attributes']['image']['data']['attributes']['url']} />
                                            </a>
                                        )
                                    } return (<></>)
                                })}
                            </div>
                        </Carousel>
                    }
                </div>
                {open_popup &&
                    <div
                        className="h-screen w-screen top-0 left-0 right-0 bottom-0 z-20 bg-gray-500 bg-opacity-80 py-6  flex flex-col justify-center sm:py-12 absolute">
                        <div className="py-3 sm:w-1/2 w-full sm:mx-auto">
                            <div onClick={() => {
                                setOpenPopUp(false);
                                document.querySelector('body')!.style.overflow = 'scroll';
                            }} className='rounded-full w-[1.5rem] h-[1.5rem] my-3 cursor-pointer bg-gray-200 text-gray-800 ml-auto flex justify-center items-center '>x</div>
                            <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg ">
                                <div className="px-12 py-5 flex flex-col">
                                    <div className='flex flex-col'>
                                        <h3>Search for a charity</h3>
                                        <div className="relative">
                                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                                <svg
                                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                onFocus={() => {
                                                    setOpenPopUp(true);
                                                    document.querySelector('body')!.style.overflow = 'hidden';
                                                }}
                                                id="charity-search"
                                                onChange={(e) => { searchCharities(e.target.value) }}
                                                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Find nonprofits by name"
                                            />
                                        </div>

                                        <div className='flex flex-col py-5 gap-3'>
                                            {
                                                search_charities && search_charities.length > 0 &&
                                                search_charities.map((charity: any, key) => {
                                                    return (
                                                        <a
                                                            key={key}
                                                            href={`/create/fundraiser/details?charity_id=${charity.id}`}
                                                            className=' cursor-pointer p-2 py-4  flex flex-row gap-3 items-center'
                                                        >
                                                            {charity['attributes']['image']['data'] &&
                                                                <img className='w-[5rem] h-[4rem] object-cover' src={server_url + charity['attributes']['image']['data']['attributes']['url']} alt={charity['attributes']['name']} />
                                                            }{!charity['attributes']['image']['data'] &&
                                                                <img className='w-[5rem] h-[4rem] object-cover' src={'/assets/image-placeholder.jpg'} />
                                                            }
                                                            <div className='flex flex-col items-start gap-1'>
                                                                <h4 className='font-light text-gray-600 text-xl'>{charity['attributes']['name']}</h4>
                                                                <h4 className='text-gray-500 text-sm'>{charity['attributes']['address']}</h4>

                                                            </div>
                                                        </a>

                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <hr />
            <section className='w-[95%] lg:w-[60%] py-8 flex flex-col mx-auto my-8' >
                <h1 style={{ lineHeight: "3rem" }} className=' font-semibold text-gray-700 text-3xl  '>
                    Raise Funds For A Charity Through Compassion Charity Fundraising
                </h1>
                <div className="container px-0 py-10 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-600 text-white mb-4">
                                    <p className='font-medium'>1</p>
                                </div>
                                <h2 className="text-lg text-gray-600  font-semibold title-font mb-2">Choose a charity</h2>
                                <p className="leading-relaxed text-base">
                                    Select a charity from our list of registered charities.
                                </p>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-600 text-white mb-4">
                                    <p className='font-medium'>2</p>
                                </div>
                                <h2 className="text-lg text-gray-600  font-semibold title-font mb-2">
                                    Launch your fundraiser
                                </h2>
                                <p className="leading-relaxed text-base">
                                    Share your fundraiser easily with family and friends to raise donations.
                                </p>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-green-600 text-white mb-4">
                                    <p className='font-medium'>3</p>
                                </div>
                                <h2 className="text-lg text-gray-600  font-semibold title-font mb-2">
                                    Make a difference
                                </h2>
                                <p className="leading-relaxed text-base">
                                    All funds you raise are delivered
                                    directly to the charity. In case they
                                    don’t have a crypto wallet, we ensure
                                    that the donations are deposited
                                    through PayPal.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <div className=' w-full bg-[#fbf8f6] py-5'>
                <div className='px-8 mx-auto w-90% lg:w-[60%] pt-[5rem]'>
                    {fundraisers && fundraisers.length > 0 &&
                        <div className='mb-5'>
                            <h1 className='font-semibold mb-1 text-3xl text-gray-700'>Trending charity fundraiser</h1>
                            <div className="h-1 w-24 bg-primary rounded " />
                        </div>
                    }
                    <div className="flex flex-wrap ">
                        {fundraisers && fundraisers.length > 0 &&
                            fundraisers.map((item, index) => {
                                return (
                                    <a href={`/f/${item.attributes.slug}`} key={index} className=" xl:w-1/3 md:w-1/2 w-full p-4 cursor-pointer ">
                                        <div className="bg-gray-50 drop-shadow-md p-6 rounded-lg min-h-[28rem]">
                                            {item.attributes.image && item.attributes.image.data &&
                                                <img
                                                    className="h-40 rounded w-full object-cover object-center mb-6"
                                                    src={server_url + item.attributes.image.data[0].attributes.url}
                                                    alt="content"
                                                />
                                            }{(!item.attributes.image || !item.attributes.image.data) &&
                                                <img
                                                    className="h-40 rounded w-full object-cover object-center mb-6"
                                                    src={"/assets/image-placeholder.jpg"}
                                                    alt="content"
                                                />
                                            }
                                            <>
                                                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                                                    {item.attributes.tag}
                                                </h3>
                                                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                                                    {item.attributes.title}
                                                </h2>
                                                {item.attributes.description &&
                                                    <p className="leading-relaxed text-base">
                                                        {(item.attributes.description as string).slice(0, 60) + "..."}
                                                    </p>
                                                }
                                                {!item.attributes.description &&
                                                    <p className="leading-relaxed text-base">No story.  </p>
                                                }
                                                <div className='text-gray-900 font-medium mt-4'>
                                                    <strong>{item.attributes.fund_raised.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} raised</strong> out of {item.attributes.fund_target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                </div>
                                                <div className="w-full bg-green-400 bg-opacity-20 h-1 mt-1 mb-3" >
                                                    <div className="bg-green-500 h-1" style={{ width: `${Math.floor((item.attributes.fund_raised / item.attributes.fund_target) * 100)}%` }}></div>
                                                </div>
                                            </>
                                        </div>
                                    </a>
                                )
                            })
                        } {
                            (!fundraisers || fundraisers.length <= 0) &&
                            <div className='flex flex-col items-center mx-auto'>
                                <h2 className='sm:text-4xl text-3xl font-medium align-middle mx-auto title-font my-2  text-gray-700'>
                                    No charity fundraisers found
                                </h2>
                                <p className='font-light text-xl text-gray-600'>
                                    Be the first one to start a charity fundraiser
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const query = qs.stringify(
        {
            filters: {
                charity: {
                    id: {
                        $notNull: true
                    }
                }
            },
            sort: ['donations_count:desc'],
            populate: ["image", "user", "charity"],
            pagination: {
                pageSize: 6
            }
        }
    );

    let res = await (await fetch(server_url + "/api/fund-raises?" + query)).json();
    let charities = await (await fetch(server_url + "/api/charities?" + qs.stringify({
        pagination: {
            pageSize: 10
        }, sort: ['createdAt:desc', 'direct_funds_count:desc'], populate: ['image']
    }
    ), { method: "GET" }
    )).json();

    console.log(charities);
    if (res['data'] && res['data'].length > 0) {
        return {
            props: {
                fundraisers: res['data'],
                top_charities: charities['data']
            }
        }
    }

    return {
        props: {
            fundraisers: null,
            top_charities: null
        }
    }
}