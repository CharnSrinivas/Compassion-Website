import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useRouter } from 'next/router';
import { jwt_aut_token, server_url } from '../config';
import Cookies from 'js-cookie';
import axios from 'axios';
export default function register() {
  const router = useRouter();
  const [show_alert, setShowAlert] = useState(false);
  const [alert_text, setAlertText] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      retypePassword: '',
      address: '',
      mobileNo: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required('First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required(
          'Last name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      retypePassword: Yup
        .string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required('Confirm Password is required'),
      address: Yup
        .string()
        .max(120)
        .required("Address is required"),
      mobileNo: Yup.string()
        .max(15)
        .required("Mobile no is required")
    }),

    onSubmit: (e) => {
      try {
        setLoading(true);
        fetch(server_url + '/api/auth/local/register', {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: e.firstName + " " + e.lastName,
            email: e.email,
            password: e.password,
            address: e.address,
            mobile_no: e.mobileNo
          })
        }).then((res) => {
          res.json().then(res_json => {
            if(res_json.error)
            {
              setAlertText(res_json.error.message);
              setShowAlert(true);
              setLoading(false);
            }
            if (!res_json.error && res_json.jwt) {
              localStorage.setItem(jwt_aut_token, res_json.jwt);
              router.push('/')
            }
          })
        })
      } catch (error) {
        setLoading(false);
        console.error(error);
      }

    }
  });
  useEffect(() => {
    const token = localStorage.getItem(jwt_aut_token);
    axios(server_url + "/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((res) => {
      if (res.status <= 201) {
        Cookies.set(jwt_aut_token, localStorage.getItem(jwt_aut_token)!)
        router.push('/')
      } else {
        localStorage.removeItem(jwt_aut_token);
        Cookies.remove(jwt_aut_token)
      }
    })
  }, [])
  const dangerAlert = (text: string) => {
    return (
      <div
        className="bg-red-100 rounded-lg py-2 px-3 mb-3 text-base text-red-500 inline-flex w-screen items-center"
        role="alert"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="times-circle"
          className="w-4 h-4 mr-2 fill-current"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
          />
        </svg>
        {text}
        <button type="button" className="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>

    )
  }

  return (
    <>
      <style>
        {`.loader {
                	border-top-color: #3498db;
                	-webkit-animation: spinner 1.5s linear infinite;
                	animation: spinner 1.5s linear infinite;
                }
                
                @-webkit-keyframes spinner {
                	0% {
                		-webkit-transform: rotate(0deg);
                	}
                	100% {
                		-webkit-transform: rotate(360deg);
                	}
                }
                
                @keyframes spinner {
                	0% {
                		transform: rotate(0deg);
                	}
                	100% {
                		transform: rotate(360deg);
                	}
                }
            `}
      </style>
      {loading &&
        <div className="fixed top-0 left-0 right-0 bottom-0  h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
          <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
        </div>
      }

      <section className="w-screen h-screen  text-gray-600 body-font  relative">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-col text-center w-full mb-12 ">
            <div
              style={{ transition: 'all 0.6s ease' }}
              className={`relative ${show_alert ? 'block translate-x-[0px] opacity-[100%]' : 'translate-x-[200px] opacity-0'} lg:w-[50%] w-[100%] mx-auto  p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg `}
              role="alert"
            >
              <button onClick={() => { setShowAlert(false) }} className='absolute cursor-pointer top-[15px] right-[15px] font-semibold '>X</button>
              <p>{alert_text}</p>
            </div>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Register to Compassion
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Make Their Wishes Come True through compassion
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <form className="flex flex-wrap -m-2" onSubmit={formik.handleSubmit}>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="firstName" className="leading-7 text-sm text-gray-600">
                    First Name
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {formik.errors.firstName &&
                    dangerAlert("Invalid First Name")
                  }

                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="lastName" className="leading-7 text-sm text-gray-600">
                    Last Name
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {formik.errors.lastName &&
                    dangerAlert("Invalid Last Name!")
                  }
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    id="email"
                    name="email"
                    type={'email'}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                  {formik.errors.email &&
                    dangerAlert("Invalid Email name")
                  }
                  {/* <ErrorMessage name='email'/> */}
                </div>
              </div>
              <div className="p-2 w-1/2">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  id="password"
                  name="password"
                  type={'password'}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {formik.errors.password &&
                  dangerAlert("Invalid password")
                }
                {/* <ErrorMessage name='password'/> */}
              </div>
              <div className="p-2 w-1/2">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Retype-Password
                </label>
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.retypePassword}
                  id="retypePassword"
                  name="retypePassword"
                  type={'password'}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {/* <ErrorMessage name='retypePassword'/> */}
                {formik.errors.retypePassword &&
                  dangerAlert("Invalid Confirm Password")
                }
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="address"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Address
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    id="address"
                    name="address"
                    type={'text'}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                  {/* <ErrorMessage name='address'/> */}
                  {formik.errors.address &&
                    dangerAlert("Invalid Address")
                  }
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="mobileNo"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Mobile No
                  </label>
                  <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.mobileNo}
                    id="mobileNo"
                    name="mobileNo"
                    type={'tel'}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                  {/* <ErrorMessage name='mobileNo'/> */}
                  {formik.errors.mobileNo &&
                    dangerAlert("Invalid Mobile.No")
                  }
                </div>
              </div>
              <div className="p-0 w-full">
                <button type='submit' className="flex my-7 text-white bg-primary border-0 py-1 px-6 focus:outline-none hover:bg-primary-600 rounded text-[1.1rem]">
                  Register
                </button>
              </div>
            </form>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              already have an account?
              <Link href={'/login'}><a className="text-indigo-500">Login</a></Link>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}