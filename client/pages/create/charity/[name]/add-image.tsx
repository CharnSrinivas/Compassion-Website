import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import { charity_ref, jwt_aut_token, server_url } from '../../../../config';
import qs from 'qs';
import axios from 'axios';

interface Props {
  is_auth: boolean,
  charity: any | null;
  token: string
}

export default function addImage({ is_auth, token, charity }: Props) {
  console.log(charity);

  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const display_img = document.getElementById('img-display') as HTMLImageElement;
    const file = e.target.files;
    const reader = new FileReader();
    if (!display_img || !file || !file[0]) return;
    reader.readAsDataURL(file[0]);
    reader.onload = function (e) {
      display_img.src = e.target!.result as string;
    }
  }

  const uploadDocument = async () => {
    const img = (document.getElementById('img-upload') as HTMLInputElement).files;
    if (!img) return;
    const formData = new FormData();
    formData.append('files', img[0]);
    formData.append('refId', charity.id);
    formData.append('ref', charity_ref);
    formData.append('field', 'image');
    setUploading(true);
    let res = await axios.post(server_url + "/api/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        let progress = (progressEvent.loaded / progressEvent.total) * 100;
        setUploadPercentage(progress)
        if (progress >= 100) {
          setUploading(false)
          setUploadPercentage(100);
        }
      },
    })
    if (res.status <= 201) {
      router.push(`/create/charity/${charity.attributes.name}/add-documents`); return;
    }
  }
  return (
    <>
      <div className='absolute top-[5rem] w-screen px-7 py-5 bg-[#e7f0f7]'>
        <p className='w-fit mx-auto text-center text-gray-900'>
          <strong>Note:ㅤ</strong> Please upload your charity brand image wisely. You can't change image again.
        </p>
      </div>
      <div className="border p-8 px-10 lg:w-[45%] w-[95%] bg-white shadow-xl md:min-w-1/2  mx-auto rounded-xl">
        {!uploading &&
          <>
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
                    <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                      <span className="text-center text-white w-full">
                        <p>2</p>
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-center md:text-base">Image & Document</div>
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
                    <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                      <span className="text-center text-gray-600 w-full">
                        <p>3</p>
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-center md:text-base">Story</div>
                </div>
              </div>
            </div>
            <div className="font-medium m-auto text-4xl text-green-900 my-7 text-center">
              Upload your charity image here
            </div>

            <img
              id='img-display'
              className="lg:w-full w-full lg:h-[32rem] h-[28rem] object-cover object-center rounded-lg"
              defaultValue={'/assets/image-placeholder.jpg'}
              src="/assets/image-placeholder.jpg" alt=""
            />
            <label >
              <input type="file" onChange={(e) => { changeImage(e) }} id='img-upload' accept='*' className="text-sm cursor-pointer w-36 hidden" />
              <div className="mt-7 bg-transparent border-green-500 border-2 cursor-pointer hover:border-green-600 active:bg-green-500 active:text-white text-green-500  text-[1rem] font-medium px-14 py-3 rounded w-full text-center">
                Upload
              </div>
            </label>
            <button onClick={uploadDocument} className="mt-7 bg-green-500 hover:bg-green-600 shadow-xl text-white  text-[1rem] font-medium px-14 py-3 rounded w-full">
              Next
            </button>
          </>
        }
        {uploading &&
          <>
            <p className='font-medium text-green-900 text-xl'>Uploading...</p>
            <div
              className="bg-gray-200 rounded h-6 mt-5"
              role="progressbar"
            >
              <div
                className="bg-green-400 rounded h-6 text-center text-white text-sm transition"
                style={{ width: `${uploadPercentage}%`, transition: "width 2s" }}
                x-text={`${uploadPercentage}%`}
              >
              </div>
            </div>
          </>
        }
      </div>
    </>
  )

}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  const token = context.req.cookies[jwt_aut_token];
  const name = context.params ? context.params['name'] as string : undefined;
  const redirect_obj: Redirect = {
    destination: "/register",
    statusCode: 307,
    basePath: false
  }
  if (!name) {
    return {
      notFound: true
    }
  }
  const query = qs.stringify({
    filters: {
      name: {
        $eq: name
      }
    }
  })
  try {

    if (!token) {
      return {
        redirect: redirect_obj
      }
    };

    let res = (await fetch(server_url + "/api/charities?" + query, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }));

    if (res.status > 201) {
      return { redirect: redirect_obj }
    }

    let charity = await res.json();
    if (!charity.data || charity.data.length <= 0) { return { redirect: redirect_obj } }
    return {
      props: {
        is_auth: true, charity: charity.data[0], token: token
      }
    }
  } catch (err) {
    console.error(err);
    return {
      redirect: redirect_obj
    }
  }
}