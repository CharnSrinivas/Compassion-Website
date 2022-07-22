import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import React, { useEffect, useState } from 'react'


export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
  const server_url = 'http://127.0.0.1:1337';
return{
  redirect:{
    destination:"/admin/dashboard/fundraiser",
    permanent:true,
     basePath:false
  }
}

}


export default function index() {
  return (<></>);
}