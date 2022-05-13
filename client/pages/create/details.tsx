import { useFormik } from 'formik';

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React, { useState } from 'react'
import * as Yup from 'yup'
import { fundraiser_tags, jwt_aut_token, server_url } from '../../config';
import { stringToSlug } from '../../utils';
import {useRouter} from 'next/router';

interface Props {
  is_auth: boolean,
  user: any | null;
  token: string
}

export default function fundraiser({ is_auth, user, token }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: '',
      targetFunds: 0,
      zipCode: 0,
      category: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().min(8).max(50, "Title should be less than 50 characters").required(),
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
    onSubmit: (e) => {
      setSubmitting(true);
      const slug = stringToSlug(e.title);
      fetch(server_url + "/api/fund-raises", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, body: JSON.stringify({
          data:{
            title: e.title,
            fund_target: e.targetFunds,
            zip_code: e.zipCode,
            author: user.id,
            tag:e.category,
            slug:slug
          }
        })
      }).then(() => {
        router.push(`/create/${slug}/add-image`)
      })
    }
  });
  return (
    <div>
      <>
        <div className="h-screen min-w-screen bg-slate-200 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12 relative">
          {!submitting &&
            <div className="border p-8 px-10 w-[45%] bg-white shadow-xl md:min-w-1/2  mx-auto rounded-xl">
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
                    {/* Green line */}

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
                    {formik.errors.category}
                  </p>
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
            border-x-2 border-solid border-blue-500 border-t-transparent absolute" style={{ position: "absolute", top: "50%", left: "0%" }}></div>
          }
        </div>
      </>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  const token = context.req.cookies[jwt_aut_token];
  // const res_json
  console.log(token);
  try {
    if (token) {

      let res = (await fetch(server_url + "/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      )
      if (res.status > 201) {
        return { props: { is_auth: false, user: null } }
      }
      let user = await res.json();
      return {
        props: {
          is_auth: true, user: user, token: token
        }
      }
    }
    return {
      redirect: {
        destination: "/register",
        statusCode: 307,
        basePath: false
      }
    }
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination: "/register",
        statusCode: 307,
        basePath: false
      }
    }
  }
}