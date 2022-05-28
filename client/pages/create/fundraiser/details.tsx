import { useFormik } from 'formik';

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { fundraiser_tags, jwt_aut_token, server_url } from '../../../config';
import { stringToSlug } from '../../../utils';
import { useRouter } from 'next/router';
import axios from 'axios';
import qs from 'qs';

interface Props {
  is_auth: boolean,
  user: any | null;
  token: string
}

export default function fundraiser({ is_auth, user, token: auth_token }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [is_individual, setIsIndividual] = useState(true);
  const [searching_charities, setIsSearching] = useState(false);
  const [charities, setCharities] = useState([]);
  const [selected_charity, setSelectedCharity] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    let body = document.querySelector('body');
    if (!is_individual) {
      if (!body) return;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      body.style.overflow = 'hidden'
    } else {
      if (!body) return;
      body.style.overflow = 'auto'
    }
  }, [is_individual]);

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
        ]
      }, populate: ['image', 'user'], pagination: {
        pageSize: 20
      }
    });

    fetch(server_url + "/api/charities?" + query, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth_token}`,
      }
    })
      .then(
        res => {
          res.json().then(res_json => {
            setIsSearching(false);
            if (res_json['data']) {
              setCharities(res_json['data'])
            }
          })
        })
      .catch(
        err => {
          setIsSearching(false);
        }
      );
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      targetFunds: 0,
      zipCode: 0,
      category: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().min(8).max(70, "Title should be less than 70 characters").required(),
      targetFunds: Yup
        .number()
        .min(1, "Invalid target funds")
        .required('Target Funds is required'),
      zipCode: Yup
        .number()
        .min(1, "Invalid zip code")
        .required('Invalid Zip Code.'),
      category: Yup
        .string().min(3).required("Category is required.")
        .equals(fundraiser_tags, 'Invalid category')
    }),
    onSubmit: async (e) => {
      setSubmitting(true);
      const slug = stringToSlug(e.title);
      let res = await axios.post(server_url + "/api/fund-raises",
        {
          data: {
            title: e.title,
            fund_target: e.targetFunds,
            zip_code: e.zipCode,
            user: user.id,
            tag: e.category,
            slug: slug,
            charity: selected_charity,
            individual:selected_charity == null
          }
        }, {
        headers: {
          'Authorization': `Bearer ${auth_token}`,
        }
      }
      )
      if (res.status <= 201) {
        router.push(`/create/fundraiser/${slug}/add-image`)
      }
    }
  });

  return (
    <div className=" bg-slate-200 py-6 flex flex-col justify-center  overflow-hidden sm:py-12 ">
      {!submitting &&
        <div className="border p-8 px-10 lg:w-[45%] bg-white shadow-xl md:min-w-1/2  mx-auto rounded-xl">
          {/* Steps */}
          <div className="w-full py-3">
            <div className="flex">
              {/* step 1 */}
              <div className="w-1/3">
                <div className="relative mb-2">
                  <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                    <span className="text-center text-white w-full">
                      <p>1</p>
                    </span>
                  </div>
                </div>
                <div className="text-xs text-center md:text-base">Details</div>
              </div>

              <div className="w-1/3">
                <div className="relative mb-2">
                  <div
                    className="absolute flex align-center items-center align-middle content-center"
                    style={{
                      width: "calc(100% - 2.5rem - 1rem)",
                      top: "50%",
                      transform: "translate(-50%, -50%)"
                    }}
                  >

                    <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                      <div
                        className="w-0 bg-green-300 py-1 rounded"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="w-10 h-10 mx-auto bg-white border-2 rounded-full text-lg text-white flex items-center">
                    <span className="text-center text-gray-600 w-full">
                      <p>2</p>
                    </span>
                  </div>
                </div>

                <div className="text-xs text-center md:text-base">Add User</div>
              </div>

              <div className="w-1/3">
                <div className="relative mb-2">
                  <div
                    className="absolute flex align-center items-center align-middle content-center"
                    style={{
                      width: "calc(100% - 2.5rem - 1rem)",
                      top: "50%",
                      transform: "translate(-50%, -50%)"
                    }}
                  >
                    <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                      <div
                        className="w-0 bg-green-300 py-1 rounded"
                        style={{ width: "0%" }}
                      />
                    </div>
                  </div>
                  <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                    <span className="text-center text-gray-600 w-full">
                      <p>3</p>
                    </span>
                  </div>
                </div>
                <div className="text-xs text-center md:text-base">Setting</div>
              </div>

            </div>
          </div>
          <div className="font-medium m-auto text-4xl text-green-900 my-7 text-center">
            Enter your goal here
          </div>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="" className="block">
              Title
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
              type="text"
              name='title'
              className="border w-full h-10 px-3 mb-5 rounded-md"
              placeholder="Title..."
            />
            {
              formik.errors.title &&
              <p className="text-xs italic text-red-500">
                {formik.errors.title}
              </p>
            }
            <label htmlFor="" className="block">
              Target funds
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.targetFunds}
              type="Number"
              name='targetFunds'
              className="border w-full h-10 px-3 mb-5 rounded-md"
              placeholder="1000"
            />
            {
              formik.errors.targetFunds &&
              <p className="text-xs italic text-red-500">
                {formik.errors.targetFunds}
              </p>
            }
            <label htmlFor="" className="block">
              Zip Code
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.zipCode}
              type="number"
              name='zipCode'
              className="border w-full h-10 px-3 mb-5 rounded-md"
              placeholder="0234234234"
            />
            {
              formik.errors.zipCode &&
              <p className="text-xs italic text-red-500">
                {formik.errors.zipCode}
              </p>
            }
            <label htmlFor="" className="block">
              Category
            </label>
            <select
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.category}
              name='category'
              className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
              <option selected>Choose a category</option>
              {fundraiser_tags.map((tag, index) => {
                return (
                  <option value={tag}>{tag[0].toUpperCase() + tag.slice(1)}</option>
                )
              })}
            </select>
            {
              formik.errors.category &&
              <p className="text-xs italic text-red-500">
                {
                  formik.errors.category
                }
              </p>
            }
            <h2 className='font-medium my-2 mt-5 text-xl'>Fundraise as: </h2>
            <fieldset onChange={() => { setIsIndividual(!is_individual) }} className='w-full flex  gap-5 flex-row items-center'>
              <>
                <label className='border-2 border-gray-600 border-opacity-40 p-3 rounded-lg flex flex-col w-full md:w-1/2' htmlFor="an-individual">
                  <input type="radio" id='an-individual' checked={is_individual} />
                  <h3 className='my-1 text-gray-700 font-medium '>An Individual</h3>
                  <p className='my-1 text-gray-600 text-sm'>I am solo organizer</p>
                </label>
                <label className='border-2 border-gray-600 border-opacity-40 p-3 rounded-lg flex flex-col w-full md:w-1/2' htmlFor="an-charity">
                  <input type="radio" id='an-charity' checked={!is_individual} />
                  <h3 className='my-1 text-gray-700 font-medium '>An Charity</h3>
                  <p className='my-1 text-gray-600 text-sm'>Fundraiser for a charity</p>
                </label>
              </>
            </fieldset>
            {selected_charity != null &&
              <h2 className='font-medium mt-5 text-xl '>Charity</h2>
            }
            {
              selected_charity != null &&
              <div className='flex flex-row items-center gap-5 border-2 border-gray-600 border-opacity-40 rounded-lg p-3 my-1 '>
                {
                  charities.map(
                    (charity: any, key) => {
                      if (charity.id === selected_charity) {
                        return (
                          <>
                            <img className='w-5 h-5' src={server_url + charity['attributes']['image']['data']['attributes']['url']} alt={charity['attributes']['name']} />
                            <h4>{charity['attributes']['name']}</h4>
                          </>
                        )
                      }
                    }
                  )
                }
              </div>
            }
            <button type='submit' className="mt-7 bg-green-500 hover:bg-green-600 shadow-xl text-white uppercase text-sm font-semibold px-14 py-3 rounded w-full">
              Next
            </button>
          </form>
        </div>
      }
      {
        submitting &&
        <div className="w-12 h-12 rounded-full animate-spin
            border-x-2 border-solid border-blue-500 border-t-transparent absolute" style={{ position: "absolute", top: "50%", left: "0%" }}>
        </div>
      }
      {
        !is_individual &&
        <div
          className="h-screen w-screen top-0 left-0 right-0 bottom-0 bg-gray-500 bg-opacity-80 py-6 flex flex-col justify-center sm:py-12 absolute">
          <div className="py-3 sm:w-1/2 w-full sm:mx-auto">
            <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
              <div className="px-12 py-5 flex flex-col">
                <div className='flex flex-col'>
                  <h3>Search for a charity</h3>
                  <div className="relative mt-1 w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="charity-search"
                      onChange={(e) => { searchCharities(e.target.value) }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gree-500 focus:border-green-500 block pl-10 w-full p-2.5 "
                      placeholder="Search for name"
                    />
                  </div>
                  <div className='flex flex-col py-5 gap-3'>
                    {charities && charities.length > 0 &&
                      charities.map((charity: any, key) => {
                        return (
                          <div
                            key={key}
                            className=' cursor-pointer p-2 border-2 border-gray-500 border-opacity-50 rounded-xl flex flex-row gap-3 items-center'
                            onClick={() => {
                              setSelectedCharity(charity.id);
                              setIsIndividual(true);
                            }}>
                            <img className='w-5 h-5' src={server_url + charity['attributes']['image']['data']['attributes']['url']} alt={charity['attributes']['name']} />
                            <h4>{charity['attributes']['name']}</h4>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  const token = context.req.cookies[jwt_aut_token];
  const redirect: any = {
    destination: "/register",
    statusCode: 307,
    basePath: false
  }
  if (!token) {
    return {
      redirect
    }
  }

  let res = (await fetch(server_url + "/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  )
  if (res.status > 201) {
    return { redirect }
  }
  let user = await res.json();

  return {
    props: {
      is_auth: true, user: user, token: token
    }
  }
}