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
        }));
    }
    Promise.all(uploads).then((res) => {
      setUploading(false);
      router.push(`/manage-fundraisers/my-fundraisers`); return;
    }).catch((err) => {
      console.error(err);
    })

  }
  return (
    <div className='py-20'>
    <div className="border  py-8 px-10 lg:w-[45%] w-[95%] bg-white shadow-xl md:min-w-1/2  mx-auto rounded-xl">
      {!uploading &&
        <>
          <div className="font-medium m-auto text-4xl text-green-900 my-7 text-center">
            Upload charity related documents here
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
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  const server_url = 'http://127.0.0.1:1337';
  const token = context.req.cookies[jwt_aut_token];
  const slug = context.params ? context.params['slug'] as string : undefined;
  const redirect_obj: Redirect = {
    destination: "/register",
    statusCode: 307,
    basePath: false
  }
  if (!slug) {
    return {
      notFound: true
    }
  }
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug
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