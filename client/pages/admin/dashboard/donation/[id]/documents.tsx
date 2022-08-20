import axios from 'axios';
import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import { useRouter } from 'next/router';
import qs from 'qs';
import React, { useEffect, useState } from 'react'
import { jwt_admin_auth_token, jwt_aut_token, server_url } from '../../../../../config';
import DashboardLayout from '../../../../../components/DashboardLayout';


export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const id = context.params ? context.params['id']?.toString().toLocaleLowerCase() : [];
    const admin_token = context.req.cookies[jwt_admin_auth_token];

    const redirect: Redirect = {
        destination: "/admin/login",
        statusCode: 307,
        basePath: false
    }
    if (!admin_token) {
        return { redirect }
    }
    let admin_res = (await fetch(server_url + "/admin/users/me", {
        headers: {
            Authorization: `Bearer ${admin_token}`,
        }
    })
    );
    if (admin_res.status > 201) {
        return { redirect }
    }
    // let admin = await admin_res.json();
    const query = qs.stringify({
        filters: {
            id: {
                $eq: id
            }
        }, populate: "*"
    });

    let donation = await (await fetch(server_url + "/content-manager/collection-types/api::donation.donation?" + query, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${admin_token}`,
        }
    })).json();

    if (!donation['results'][0]) {
        return {
            props: {
                donation: null, admin_token
            }
        }
    }

    return {
        props: {
            donation: donation['results'][0],
            admin_token, slug: id
        }
    }

}

interface Props {
    donation: any | null;
    admin_token: string;
    slug: string
}

export default function edit({ donation, admin_token, slug }: Props) {
    const router = useRouter();
    const [approving, setApprving] = useState(false);
    const toggleApproval = async () => {
        setApprving(true);
        let res = await axios.put(server_url + '/content-manager/collection-types/api::charity-donation.charity-donation/' + donation.id, {
            approved: !donation.approved
        }, {
            headers: {
                Authorization: `Bearer ${admin_token}`,
            }
        });
        setApprving(false);
        router.reload();

    }
    return (
        <DashboardLayout>

            <section className="text-gray-600 body-font ">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-full mx-auto justify-evenly flex gap-2 flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                BRAND NAME
                            </h2> */}
                            <a href='/admin/dashboard' className='flex w-fit items-center text-gray-600 px-3 justify-evenly  border-2 border-gray-300 rounded-md my-4'

                            >
                                <svg
                                    className='w-5 h-5 '
                                    viewBox="0 0 48 48"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect width={48} height={48} fill="white" fillOpacity="0.01" />
                                    <path
                                        d="M31 36L19 24L31 12"
                                        stroke="black"
                                        strokeWidth={4}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <p>Back</p>
                            </a>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                                {donation.title}
                            </h1>
                            <div className="flex mb-4">
                                <a href={`/admin/dashboard/donation/${slug}/details`} className="flex-grow border-b-2  py-2 text-lg px-1  border-gray-300">
                                    Details
                                </a>
                                <a href={`/admin/dashboard/donation/${slug}/documents`} className="flex-grow text-indigo-500 border-indigo-500  border-b-2 py-2 text-lg px-1">
                                    Documents
                                </a>
                            </div>

                            <div>
                                {(donation.images && donation.images.length > 0)&&
                                    <div className='flex flex-wrap gap-4 py-5  border-b-2 mb-8 border-b-gray-300'>
                                        {(donation.images as any[]).map((image) => {
                                            return (
                                                <a href={server_url + image.url} target={'_blank'} className='flex flex-col bg-white rounded-md shadow-lg h-auto w-[14rem]'>
                                                    {image.formats &&
                                                        <img className='h-28 w-full object-cover rounded-md' src={server_url + image.formats.thumbnail.url} alt={image.name} />
                                                    }
                                                    {!image.formats &&
                                                        <img className='h-28 w-full object-cover rounded-md' src={'/assets/document-placeholder.png'} alt={image.name} />
                                                    }
                                                    <div className='p-2'>
                                                        <p className='text-sm ' style={{ lineBreak: "anywhere" }}>{image.name}</p>
                                                        <p className='bg-gray-100 w-fit px-1 rounded-md text-sm'>{(image.ext as string)?.replace('.', '')?.toUpperCase()}</p>
                                                    </div>
                                                </a>
                                            )
                                        })}
                                    </div>
                                }
                                {!donation.images || donation.images.length <= 0 &&
                                    <h3 className='text-3xl text-center my-8'>
                                        No documents uploaded
                                    </h3>}
                            </div>
                            {!donation.approved &&
                                <button onClick={toggleApproval} disabled={donation.approved} className={`flex gap-1  items-center text-white  bg-green-500 hover:bg-green-600   border-0 py-2 px-4 focus:outline-none rounded`}>
                                    Approve
                                    {approving &&
                                        <svg
                                            className="animate-spin ml-1  h-5 w-5 text-white"
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
                                    }
                                    {!approving &&

                                        <svg
                                            width="16px"
                                            height="16px"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                        >
                                            <polyline points="2.75 8.75,6.25 12.25,13.25 4.75" />
                                        </svg>
                                    }

                                </button>
                            }

                            {donation.approved &&
                                <button onClick={toggleApproval} className={`flex gap-1  items-center text-white  bg-red-400 hover:bg-red-500' : 'bg-green-500 hover:bg-red-600 border-0 py-2 px-4 focus:outline-none rounded`}>
                                    Disapprove
                                    {approving &&
                                        <svg
                                            className="animate-spin ml-1  h-5 w-5 text-white"
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
                                    }
                                    {!approving &&

                                        <svg
                                            width="16px"
                                            height="16px"
                                            fill="white"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="5"
                                            viewBox="0 0 490 490"
                                        >
                                            <polygon
                                                points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "
                                            />
                                        </svg>

                                    }

                                </button>
                            }

                        </div>

                        {donation.image &&
                            <img
                                className="lg:w-1/3 w-full lg:h-[40rem] h-52 object-cover object-center rounded"
                                src={server_url + donation.image[0].url}
                                alt={donation.title}
                            />
                        }{!donation.image &&
                            <img
                                className="lg:w-1/3 w-full lg:h-[40rem] h-52 object-cover object-center rounded"
                                src={"/assets/image-placeholder.jpg"}
                                alt={donation.title}
                            />
                        }



                    </div>
                </div>
            </section>

        </DashboardLayout>
    )
}