import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import React from 'react'
export default function index() {
  return (
    <div>index</div>
  )
}


export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const id = context.params ? context.params['id']?.toString().toLocaleLowerCase() : [];
    if(!id){
        return{
            notFound:true
        }
    }
    const redirect: Redirect = {
        destination: `/admin/dashboard/donation/${id}/details`,
        permanent:true,
        basePath: false
    }
    return{
        redirect
    }
}