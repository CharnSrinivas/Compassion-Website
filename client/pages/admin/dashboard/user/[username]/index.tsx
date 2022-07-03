import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import React from 'react';

export default function index() {
    return (
        <></>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const username = context.params ? context.params['username']?.toString() : '';
    if (!username) {
        return {
            notFound: true
        }
    }
    const redirect: Redirect = {
        destination: `/admin/dashboard/user/${username}/details`,
        permanent:true,
        basePath: false
    }
    return {
        redirect
    }
}