import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';

export default function index() {
    return (
        <></>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Record<string, unknown>>> {
    const server_url = 'http://127.0.0.1:1337';
    const redirect: Redirect = {
        destination: `/manage-fundraisers/my-fundraisers`,
        permanent:true,
        basePath: false
    }
    return {
        redirect
    }
}