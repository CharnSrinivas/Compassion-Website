import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next'
import qs from 'qs';
import React from 'react'
import { jwt_aut_token, server_url } from '../../config';

interface Props {
  fundraisers: any[];
  charity: any;

}

export default function index({ charity, fundraisers, }: Props) {
  return (
    <section className="text-gray-600 body-font ">
      <div className='lg:w-[80%] w-[90%] mt-20 mx-auto flex flex-col mb-8'>
        <div className='mb-5'>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-700">
            Your Charity
          </h1>
          <div className="h-1 w-20 bg-primary rounded " />
        </div>
        <div className='flex w-full justify-between flex-wrap mx-auto'>
          <div >
            {charity.attributes.image && charity.attributes.image.data &&
              <img
                className="lg:w-[25rem] object-cover object-center rounded-lg"
                src={server_url + charity.attributes.image.data.attributes.url}
                alt="content"
              />
            }{!charity.attributes.image || !charity.attributes.image.data &&
              <img
                className="lg:w-[25rem] object-cover object-center rounded-lg"
                src={"/assets/image-placeholder.jpg"}
                alt="content"
              />
            }
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-700 mt-10">
              {charity.attributes.name}
            </h1>
          </div>

          <div className='flex items-end p-4 gap-5'>
            <div className='flex-col items-center '>
              <a href={`/manage-charity/edit`} >
                <div className='rounded-full stroke-[#32a95c]  p-3  border-[#32a95c]   border-2 '>
                  <svg
                    fill="none"

                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={25}
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

            <div className='flex-col items-center '>
              <a href={`/charities/${charity.attributes.slug}`} target={'_blank'} >
                <div className='rounded-full stroke-[#32a95c]  p-3  border-[#32a95c]   border-2 '>
                  <svg
                    fill="none"
                    className="w-6 h-6"
                    strokeWidth={2}
                    viewBox="0 0 48 48"
                  >
                    <path d="M24,40C12.33,40,2.8,28.13.16,24.49a0.83,0.83,0,0,1,0-1C2.8,19.87,12.33,8,24,8S45.19,19.86,47.84,23.5a0.84,0.84,0,0,1,0,1h0C45.19,28.14,35.66,40,24,40ZM1,24c2.67,3.65,11.87,15,23,15S44.3,27.64,47,24C44.31,20.36,35.1,9,24,9S3.71,20.35,1,24Z" />
                    <path d="M24,31a7,7,0,1,1,7-7A7,7,0,0,1,24,31Zm0-13a6,6,0,1,0,6,6A6,6,0,0,0,24,18Z" />
                  </svg>

                </div>
              </a>
              <p className='mt-1 text-center'>View</p>
            </div>

          </div>
        </div>
      </div>
      <hr />

      <div className=' flex flex-col mx-auto py-5 items-center bg-[#fbf8f6]' style={{ minHeight: "60vh" }}>
        {fundraisers.length > 0 &&
          <div className='w-[80%] my-5 px-4 flex-row flex justify-between items-center flex-wrap'>
            <div >
              <h1 className="sm:text-3xl  text-left  text-2xl font-medium title-font mb-2  text-gray-900">
                Fundraisers register for your charity
              </h1>
              <div className="h-1 w-20 bg-primary rounded " />
            </div>

          </div>
        }
        <div className=' w-[80%] flex justify-center'>
          <div className="flex flex-wrap w-full ">
            {fundraisers &&
              fundraisers.map((item, index) => {
                return (
                  <a key={index} href={`/manage-charity/${item.attributes.slug}/overview`} className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer " >
                    <div className="bg-gray-50 drop-shadow-md rounded-lg p-0  min-h-[26rem]  hover:shadow-lg">
                      {item.attributes.image && item.attributes.image.data &&
                        <img
                          className="h-40 rounded w-full object-cover object-center mb-6"
                          src={server_url + item.attributes.image.data.attributes.url}
                          alt="content"
                        />
                      }{(!item.attributes.image.data || !item.attributes.image) &&
                        <img
                          className="h-40 rounded w-full object-cover object-center mb-6"
                          src={"/assets/image-placeholder.jpg"}
                          alt="content"
                        />
                      }
                      <div className='p-6'>
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
                          <div className="bg-green-500 h-1 w-max-[100%]" style={{ width: `${Math.floor((item.attributes.fund_raised / item.attributes.fund_target) * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </a>
                )
              })
            }
            {
              fundraisers.length <= 0 &&
              <h2 className='sm:text-3xl text-2xl font-medium title-font my-7  text-gray-900'>
                No fundraisers found
              </h2>
            }
          </div>
        </div>
      </div>
    </section >
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  const token = context.req.cookies[jwt_aut_token];
  const fundraisers_page = context.query['fp'];
  const redirect: Redirect = {
    destination: "/register",
    statusCode: 307,
    basePath: false
  }

  if (!token) {
    return { redirect }
  }

  let usr_res = (await fetch(server_url + "/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  );

  if (usr_res.status > 201) {
    return { props: { is_auth: false, user: null, fundraisers: null } }
  }
  let user = await usr_res.json();
  const charity_query = qs.stringify({
    filters: {
      user: {
        id: {
          $eq: user.id
        }
      }
    }, populate: ['image', 'documents']
  })
  let charity = await (await fetch(server_url + "/api/charities?" + charity_query)).json()
  // console.log(charity['data'][0]);

  if (!charity['data'][0]) {
    return {
      props: {
        fundraisers: []
      }
    }
  }
  const fp = parseInt(fundraisers_page ? fundraisers_page.toString() : '1');
  const fundraiser_query = qs.stringify({
    filters: {
      charity: {
        id: {
          $eq: charity['data'][0].id
        }
      }
    }, populate: ["image", "user"],
    pagination: {
      pageSize: 8,
      page: !isNaN(fp) ? fp : 1
    }
  });

  let fundraisers = await (await fetch(server_url + "/api/fund-raises?" + fundraiser_query)).json()
  if (fundraisers['data']) {
    return {
      props: {
        fundraisers: fundraisers['data'],
        charity: charity['data'][0]
      }
    }
  }
  return {
    props: {
      fundraisers: []
    }
  }
}