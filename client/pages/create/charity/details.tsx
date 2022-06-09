import { useFormik } from 'formik';

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React, { useState } from 'react'
import * as Yup from 'yup'
import { fundraiser_tags, fund_types, jwt_aut_token, server_url } from '../../../config';
import { stringToSlug } from '../../../utils';
import { useRouter } from 'next/router';
import axios from 'axios';

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
      name: '',
      targetFunds: 0,
      address: '',
      category: '',
      registerNumber: 0,
      description: '',
      recvDetails: '',
      fundType: '',
    },
    validationSchema: Yup.object({
      name:
        Yup
          .string()
          .min(8)
          .max(70, "Title should be less than 70 characters")
          .required(),
      address:
        Yup
          .string()
          .min(3, "Invalid zip code")
          .required('Zip Code is required'),
      registerNumber:
        Yup.number()
          .optional(),
      description:
        Yup.string().required("Description is required"),
      recvDetails: Yup
        .string()
        .min(3, "Invalid 'fund receive details'")
        .required('Fund receive details is required.'),
      fundType:
        Yup
          .string().min(3).required("Fund type is required.")
          .equals(fund_types, 'Invalid category'),
    }),
    onSubmit: async (e) => {
      setSubmitting(true);
      // const name = (e.name).replaceAll(' ', '-');
      let res = await axios.post(server_url + "/api/charities",
        {
          data: {
            name: e.name,
            address: e.address,
            user: user.id,
            register_no: e.registerNumber,
            description: e.description,
            recv_details: e.recvDetails,
            slug: stringToSlug(e.name),
            fund_type: e.fundType,

          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (res.status <= 201) {
        router.push(`/create/charity/${e.name}/add-image`)
      }
    }
  });

  return (
    <div className="h-screen min-w-screen bg-slate-200 py-6 flex flex-col justify-center overflow-hidden sm:py-12 relative">
      {!submitting &&
        <div className="border p-8 px-10 lg:w-[45%] w-[95%] bg-white shadow-xl md:min-w-1/2  mx-auto rounded-xl">
          <div className="w-full py-3">
            <div className="flex">
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
            Enter your charity details
          </div>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="" className="block">
              Title
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              type="text"
              name='name'
              className="border w-full h-10 px-3 mb-5 rounded-md"
              placeholder="Title..."
            />
            {
              formik.errors.name &&
              <p className="text-xs italic text-red-500">
                {formik.errors.name}
              </p>
            }
            <label htmlFor="" className="block">
              Address
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.address}
              type="text"
              name='address'
              className="border w-full h-10 px-3 mb-5 rounded-md"
              placeholder="Aaron Larson
              Zippy Diagnostics
              123 Center Ln.
              Plymouth, MN 55441"
            />
            {
              formik.errors.address &&
              <p className="text-xs italic text-red-500">
                {formik.errors.address}
              </p>
            }
            <label htmlFor="" className="block">
              Fund Type
            </label>
            <select
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fundType}
              name='fundType'
              id='fundType'
              className="border w-full h-10 px-3 mb-5 rounded-md bg-white"
              // className="form-select appearance-none block w-full px-3  text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example">
              <option selected>Choose a fund type</option>
              {fund_types.map((tag, index) => {
                return (
                  <option key={index} value={tag}>{tag[0].toUpperCase() + tag.slice(1)}</option>
                )
              })}
            </select>
            {
              formik.errors.fundType &&
              <p className="text-xs italic text-red-500">
                {
                  formik.errors.fundType
                }
              </p>
            }
            <label htmlFor="" className="block">
              Fund receive details
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.recvDetails}
              type="text"
              name='recvDetails'
              className="border w-full h-10 px-3 mb-5 rounded-md"
              placeholder="bank details (or) wallet ID"
            />
            {
              formik.errors.recvDetails &&
              <p className="text-xs italic text-red-500">
                {formik.errors.recvDetails}
              </p>
            }
            <label htmlFor="" className="block">
              Register number (optional)
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.registerNumber}
              type="number"
              name='registerNumber'
              className="border w-full h-10 px-3 mb-5 rounded-md"
              placeholder="0234234234"
            />
            {
              formik.errors.registerNumber &&
              <p className="text-xs italic text-red-500">
                {formik.errors.registerNumber}
              </p>
            }
            <textarea
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              id="description"
              name='description'
              cols={30}
              rows={10}
              placeholder="Tell about your charity...."
              className="w-full  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md my-5"></textarea>
            {
              formik.errors.description &&
              <p className="text-xs italic text-red-500">
                {formik.errors.description}
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
        <div className="w-12 h-12 rounded-full animate-spin border-x-2 border-solid border-blue-500 border-t-transparent absolute" style={{ position: "absolute", top: "50%", left: "50%" }}></div>
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