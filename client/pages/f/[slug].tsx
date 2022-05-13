import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import qs from 'qs';
import React from 'react'
import { server_url } from '../../config';

interface Props {
  fundraiser: any
}

export default function fundraiser({ fundraiser }: Props) {

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container w-auto gap-5 px-3 py-20 mx-auto">

          <div className="lg:w-4/5 lg:justify-center mx-auto flex flex-wrap ">

            <div className='lg:w-1/2'>
              {fundraiser.attributes.image &&
                <img
                className="lg:w-full w-full lg:h-[32rem] h-[28rem] object-cover object-center rounded-lg"
                  src={server_url + fundraiser.attributes.image.data.attributes.formats.small.url}
                  alt="content"
                />
              }{!fundraiser.attributes.image &&
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={"/assets/image-placeholder.jpg"}
                  alt="content"
                />
              }
              <div className="flex justify-between align-baseline h-auto w-fit fill-gray-600 mt-5">
                <svg
                  className='w-[1.5rem] h-[1.5re] mr-2'
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  enableBackground="new 0 0 512 512"
                >
                  <g>
                    <g>
                      <path d="m121.5,64.2c-31.7,0-57.3,25.7-57.3,57.3 0,31.7 25.7,57.3 57.3,57.3 31.7,0 57.3-25.7 57.3-57.3 0.1-31.7-25.6-57.3-57.3-57.3zm0,94.3c-20.4,0-37-16.6-37-37s16.6-37 37-37c20.4,0 37,16.6 37,37s-16.5,37-37,37z" />
                      <path d="m244.5,29.8c-10.4-11.5-25-17.7-40.7-17.7l-107.3-1.1c-22.9,0-44.8,8.3-60.5,25-16.7,15.7-25,37.6-25,60.5l1,107.4c1,14.6 6.3,29.2 17.7,40.7l256.5,256.4 214.8-214.8-256.5-256.4zm40.7,442l-241.9-241.9c-7.3-7.3-11.5-16.7-11.5-27.1l-1-106.3c0-16.7 7.3-33.4 18.8-45.9 12.5-12.5 29.2-19.8 46.9-19.8l106.3,1c10.4,0 19.8,4.2 27.1,11.5l241.9,241.9-186.6,186.6z" />
                    </g>
                  </g>
                </svg>
                <a className="my-3 title-font text-indigo-500 tracking-widest" href={`/discover/${fundraiser.attributes.tag}`}>
                  {(fundraiser.attributes.tag as string)[0].toUpperCase() + fundraiser.attributes.tag.slice(1)}
                </a>
              </div>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {fundraiser.attributes.title}
              </h1>
              <hr className='my-3' />
              <p className="leading-relaxed">
                {(fundraiser.attributes.description as string).split(`\n`).map((txt, index) => {
                  if (!txt) { return null }
                  return (<>

                    <p key={index} className="leading-relaxed text-base">
                      {txt}
                    </p>
                    <div key={index}>&nbsp;</div>
                  </>)

                })}
              </p>
              <hr className='my-3' />
            </div>
            <div className="lg:w-1/3 w-1/2   lg:pl-10 m-auto sm:mt-5   lg:mt-0 relative">
              <div className='rounded-lg drop-shadow-xl bg-white max-w-sm flex-col p-5 justify-start relative'>
                <div className="flex items-baseline">
                  <p className='text-gray-900 text-2xl title-font font-medium'>{fundraiser.attributes.fund_raised}&nbsp;</p>
                  <p>raised</p>
                  <p className='font-light text-sm text-gray-500'>&nbsp;of&nbsp; {fundraiser.attributes.fund_target}</p>
                </div>
                <div className="w-full bg-green-400 bg-opacity-20 h-1 mt-1 mb-3" >
                  <div className="bg-green-500 h-1" style={{ width: `${Math.floor((fundraiser.attributes.fund_raised / fundraiser.attributes.fund_target) * 100)}%` }}></div>
                </div>
                <p className='font-normal my-3 text-sm text-gray-500'>{fundraiser.attributes.donations_count}&nbsp;donations</p>
                <button className="flex w-full mt-10 text-white items-center gap-2 bg-primary justify-center border-0 py-2 px-4 focus:outline-none active:bg-secondary rounded">
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
                </button>
                <button className="flex w-full mt-3 text-primary items-center gap-2 bg-transparent border-2 border-primary justify-center py-2 px-4 focus:outline-none active:bg-primary active:text-white rounded">
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
                  <p>Share </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section >

    </div >
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  const slug = context.params ? context.params['slug']?.toString().toLocaleLowerCase() : [];
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
    populate: ["image", "author", "transactions"]
  })

  try {

    const res = await (await fetch(server_url + "/api/fund-raises?" + query, {
      method: "GET",
    })).json()
    return {
      props: { fundraiser: res['data'][0] }
    }
  } catch (err) {
    console.error(err);
    return {
      props: { fundraiser: undefined },
    }
  }

}