import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import React from 'react'

type Props = {}

export default function index({}: Props) {
  return (
    <div>index</div>
  )
}


export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const slug = context.params ? context.params['slug']?.toString().toLocaleLowerCase() : [];
    if(!slug){
        return{
            notFound:true
        }
    }
    const redirect: Redirect = {
        destination: `/admin/dashboard/fundraiser/${slug}/details`,
        statusCode: 307,
        basePath: false
    }
    return{
        redirect
    }
}