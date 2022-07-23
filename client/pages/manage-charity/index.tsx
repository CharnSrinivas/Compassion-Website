import axios from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next'
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { useState } from 'react'
import { jwt_aut_token, server_url, user_documents_ref } from '../../config';

interface Props {
  fundraisers: any[];
  charity: any;

}

export default function index({ charity, fundraisers, }: Props) {
  const [open_withdraw, setOpenWithDraw] = useState(false);
  const [open_share, setOpenShare] = useState(false);
  const [upload_docs_text, setUploadingDocsText] = useState('');
  const [documents, setDocuments] = useState<any>();
  const [with_draw_loading, setWithDrawLoading] = useState(true);
  const [uploading_docs, setUploadingDocs] = useState(false);
  const router = useRouter()
  const onWithDrawClick = async () => {
    setOpenWithDraw(true);
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.scrollTop = 0
    const token = localStorage.getItem(jwt_aut_token);

    let documents_res = await fetch(server_url + '/api/user-documents?' + qs.stringify({
      filters: {
        user: {
          id: {
            $eq: charity.attributes.user.data.id
          }
        }
      },
      populate: ['selfie', 'driving_license', 'passport']
    }), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    // if (user_res.status > 201) {
    //   localStorage.removeItem(jwt_aut_token);
    //   Cookies.remove(jwt_aut_token);
    //   router.push('/register')
    // }
    let documents = (await documents_res.json()).data[0];
    console.log(documents.attributes);
    if (!documents) return;
    setDocuments(documents.attributes)
    setWithDrawLoading(false);

  }
  const uploadDocuments = async () => {
    setWithDrawLoading(true);
    const driving_license = document.getElementById('driving_license') as HTMLInputElement;
    const passport = document.getElementById('passport') as HTMLInputElement;
    const selfie = document.getElementById('selfie') as HTMLInputElement;
    const token = localStorage.getItem(jwt_aut_token)
    if (!driving_license || !selfie || !passport || !driving_license.files![0] || !selfie.files![0] || !passport.files![0]) {
      alert("Oops! Something went wrong, Try again.");
      setWithDrawLoading(false);
      return;
    }
    setUploadingDocs(true);
    let user_doc_res = await fetch(server_url + "/api/user-documents?" + qs.stringify({
      filters: {
        user: {
          id: {
            $eq: charity.attributes.user.data.id
          }
        }
      },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    let user_doc = await user_doc_res.json();
    if (user_doc.data.length <= 0) {
      user_doc_res = await fetch(server_url + "/api/user-documents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, body: JSON.stringify({
          data: {
            user: charity.attributes.user.data.id
          }
        })
      })
      user_doc = await user_doc_res.json();
    }
    const drivingLicenseData = new FormData();
    drivingLicenseData.append('files', driving_license?.files[0])
    drivingLicenseData.append('refId', user_doc.data[0].id)
    drivingLicenseData.append('ref', user_documents_ref)
    drivingLicenseData.append('field', 'driving_license');
    await axios.post(server_url + "/api/upload", drivingLicenseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        let progress = (progressEvent.loaded / progressEvent.total) * 100;
        setUploadingDocsText('Uploading Driving License ' + Math.floor(progress) + "%")
      },
    });

    const passportImageData = new FormData();
    passportImageData.append('files', passport.files[0])
    passportImageData.append('refId', user_doc.data[0].id)
    passportImageData.append('ref', user_documents_ref)
    passportImageData.append('field', 'passport');
    await axios.post(server_url + "/api/upload", passportImageData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        let progress = (progressEvent.loaded / progressEvent.total) * 100;
        setUploadingDocsText('Uploading Passport ' + Math.floor(progress) + "%")
      },
    });
    const selfieData = new FormData();
    selfieData.append('files', selfie?.files[0])
    selfieData.append('refId', user_doc.data[0].id)
    selfieData.append('ref', user_documents_ref)
    selfieData.append('field', 'selfie');
    await axios.post(server_url + "/api/upload", selfieData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        let progress = (progressEvent.loaded / progressEvent.total) * 100;
        setUploadingDocsText('Uploading Selfie ' + Math.floor(progress) + "%")
      },
    });

  }
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
            <div onClick={onWithDrawClick} className='flex-col items-center'>
              <div className='rounded-full text-[#32a95c] mx-auto p-3  border-[#32a95c] border-2 w-fit cursor-pointer'>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1={12} y1={15} x2={12} y2={3} />
                </svg>
              </div>
              <p className='mt-1 text-center text-gray-600'>Withdraw</p>
            </div>
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
                      {item.attributes.image && item.attributes.image.data[0] &&
                        <img
                          className="h-40 rounded w-full object-cover object-center mb-6"
                          src={server_url + item.attributes.image.data[0].attributes.url}
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
      {open_withdraw &&
        <div
          className="w-screen top-0 left-0 right-0 bottom-0 h-screen bg-gray-500 bg-opacity-80 py-6 flex flex-col justify-center sm:py-12 absolute">
          <div className="py-3 sm:w-1/2 w-full sm:mx-auto " >
            <div onClick={() => {
              setOpenWithDraw(false);
              document.documentElement.style.overflow = 'auto'
            }} className='rounded-full w-[1.5rem]  h-[1.5rem] my-3 cursor-pointer bg-gray-200 text-gray-800 ml-auto mr-2 flex justify-center items-center '>
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>

            </div>
            <div className="bg-white mx-auto min-w-1xl flex w-[80%] lg:w-auto flex-col lg:max-h-[50rem] max-h-[30rem] overflow-y-scroll rounded-xl shadow-lg">
              <div className="lg:px-12 px-5 py-5 flex flex-col ">
                {with_draw_loading &&
                  <svg
                    role="status"
                    className="inline h-12 w-12 animate-spin mx-auto text-gray-200 dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                }
                {with_draw_loading && uploading_docs &&
                  <p className='text-center font-semibold text-gray-600'>{upload_docs_text}</p>
                }
                {!with_draw_loading && !uploading_docs &&
                  documents && documents.driving_license.data && documents.selfie.data && documents.passport.data && !charity.attributes.user.data.approved &&
                  <div className='flex-col items-center w-[100%]'>
                    <h1 className='mx-auto text-2xl font-medium text-center text-gray-600'>We received your documents</h1>
                    <h1 className='mx-auto text-xxl text-center  text-gray-600'>Wait for admin approval</h1>
                  </div>
                }

                {!with_draw_loading && !uploading_docs &&
                  (!documents || !documents.driving_license.data || !documents.selfie.data || !documents.passport.data) && !charity.attributes.user.data.approved &&
                  <div className='flex flex-col mt-5 items-start gap-4' >
                    <h1 className=''>Your account has'nt verified yet.Upload the following documents for verification</h1>
                    <div>
                      <h3 className='lg:text-xl font-medium text-gray-600'>Upload your Driving License</h3>
                      <label >
                        <input type="file"
                          //  onChange={(e) => { changeImage(e) }}
                          id='driving_license' accept='image/*' className="text-sm cursor-pointer w-36 hidden" />
                        <div className="flex flex-row gap-2 justify-between items-center mt-3 bg-transparent border-green-500 border-2 cursor-pointer hover:border-green-600 active:bg-green-500 active:text-white text-green-500  text-[1rem] font-medium px-4 py-2 rounded w-fit text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-upload-cloud"
                          >
                            <polyline points="16 16 12 12 8 16" />
                            <line x1={12} y1={12} x2={12} y2={21} />
                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                            <polyline points="16 16 12 12 8 16" />
                          </svg>
                          <p>
                            Upload
                          </p>
                        </div>
                      </label>
                    </div>
                    <hr className='w-[100%]' />
                    <div >
                      <h3 className='lg:text-xl font-medium text-gray-600'>Upload your Passport</h3>
                      <label >
                        <input type="file"
                          //  onChange={(e) => { changeImage(e) }}
                          id='passport' accept='image/*' className="text-sm cursor-pointer w-36 hidden" />
                        <div className="flex flex-row gap-2 justify-between items-center mt-3 bg-transparent border-green-500 border-2 cursor-pointer hover:border-green-600 active:bg-green-500 active:text-white text-green-500  text-[1rem] font-medium px-4 py-2 rounded w-fit text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-upload-cloud"
                          >
                            <polyline points="16 16 12 12 8 16" />
                            <line x1={12} y1={12} x2={12} y2={21} />
                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                            <polyline points="16 16 12 12 8 16" />
                          </svg>
                          <p>
                            Upload
                          </p>
                        </div>
                      </label>
                    </div>
                    <hr className='w-[100%]' />
                    <div >
                      <h3 className='lg:text-xl font-medium text-gray-600'>Upload your Selfie</h3>
                      <h4 className='text-sm'>Example</h4>
                      <img className='w-[12rem]' src="/assets/selfie-example.png" alt="example" />
                      <p>Hold a paper in hand with name compassion written on it, And take a selfie with then upload.</p>
                      <label >
                        <input type="file"
                          //  onChange={(e) => { changeImage(e) }}
                          id='selfie' accept='image/*' className="text-sm cursor-pointer w-36 hidden" />
                        <div className="flex flex-row gap-2 justify-between items-center mt-3 bg-transparent border-green-500 border-2 cursor-pointer hover:border-green-600 active:bg-green-500 active:text-white text-green-500  text-[1rem] font-medium px-4 py-2 rounded w-fit text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-upload-cloud"
                          >
                            <polyline points="16 16 12 12 8 16" />
                            <line x1={12} y1={12} x2={12} y2={21} />
                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                            <polyline points="16 16 12 12 8 16" />
                          </svg>
                          <p>
                            Upload
                          </p>
                        </div>
                      </label>
                    </div>
                    <button onClick={uploadDocuments} className="mt-7 bg-green-500 hover:bg-green-600 shadow-xl text-white uppercase text-sm font-semibold px-14 py-3 rounded w-full">
                      Submit
                    </button>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </section >
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  const server_url = 'http://127.0.0.1:1337';
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
    }, populate: ['image', 'documents', 'user']
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