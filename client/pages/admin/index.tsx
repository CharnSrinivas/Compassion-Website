import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import React from 'react'
import { jwt_admin_auth_token, jwt_aut_token, server_url } from '../../config'
type Props = {}

export default function index({ }: Props) {
    return (
        <div>index</div>
    )
}


export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const admin_token = context.req.cookies[jwt_admin_auth_token];    
    const redirect: Redirect = {
        destination: "/admin/login",
        statusCode: 307,
        basePath: false
    }

    let admin_res = (await fetch(server_url + "/admin/users/me", {
        headers: {
            Authorization: `Bearer ${admin_token}`,
        }
    })
    );
    
    if (admin_res.status > 201) {
        return { redirect }
    } else {
        return {
            redirect: {
                destination: "/admin/dashboard",
                statusCode: 307,
                basePath: false
            }
        }
    }
}