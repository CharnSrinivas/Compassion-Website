import React, { ChangeEvent,  useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import { charity_ref, jwt_aut_token, server_url } from '../../../../config';
import qs from 'qs';
import axios from 'axios';

interface Props {
  is_auth: boolean,
  fundraiser: any | null;
  token: string
}

export default function addImage({ is_auth, token, fundraiser }: Props) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploading_docs, setDocs] = useState<{ name: string, percentage: number }[]>([]);

  const changeDoc = (e: ChangeEvent<HTMLInputElement>) => {
    const _docs = e.target.files as FileList;
    let _uploading_docs: { name: string, percentage: number }[] = []
  }

  const uploadDocs = async () => {
    const docs = (document.getElementById('doc-upload') as HTMLInputElement).files;
    if (!docs) return;
    let uploads = []
    setUploading(true);
    for (let i = 0; i < docs.length; i++) {
      const doc = docs[i];
      const formData = new FormData();
      formData.append('files', doc);
      formData.append('refId', fundraiser.id);
      formData.append('ref', charity_ref);
      formData.append('field', 'documents');
      uploads.push(
        axios.post(server_url + "/api/upload", formData, {
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
        }))
    }
    Promise.all(uploads).then((res) => {
      setUploading(false);
      router.push(`/manage-fundraisers/my-fundraisers`); return;
    }).catch((err) => {
      console.error(err);
    })

  }
  return (
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
            Upload related documents here
          </div>

          <label >
            <input type="file" multiple onChange={(e) => { changeDoc(e) }} id='doc-upload' accept='*' className="text-sm cursor-pointer w-36 hidden" />
            <div className="mt-7 bg-transparent border-green-500 border-2 cursor-pointer hover:border-green-600 active:bg-green-500 active:text-white text-green-500  text-[1rem] font-medium px-14 py-3 rounded w-full text-center">
              Upload
            </div>
          </label>
          <button onClick={uploadDocs} className="mt-7 bg-green-500 hover:bg-green-600 shadow-xl text-white  text-[1rem] font-medium px-14 py-3 rounded w-full">
            Next
          </button>
        </>
      }
      {uploading &&
        <div className="flex h-screen w-screen items-center justify-center">
          <button
            type="button"
            className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white"
            disabled
          >
            <svg
              className="mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                stroke="currentColor"
                strokeWidth={4}
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="font-medium"> Uploading... </span>
          </button>
        </div>

      }
    </div>
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
        $eq: name.replaceAll('-', ' ')
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

    let fundraiser = await res.json();
    if (!fundraiser.data || fundraiser.data.length <= 0) { return { redirect: redirect_obj } }
    return {
      props: {
        is_auth: true, fundraiser: fundraiser.data[0], token: token
      }
    }
  } catch (err) {
    console.error(err);
    return {
      redirect: redirect_obj
    }
  }
}