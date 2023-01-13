import Layout from "../../components/layout";
import {getAllPostsIds, getPostData} from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilsStyle from '../../components/utils.module.css';
import {GetStaticPaths, GetStaticProps} from "next";

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostsIds();
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const postData = await getPostData(params?.id as string);
    return {
        props: {
            postData,
        },
    };
}

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilsStyle.headingXl}>{postData.title}</h1>
                <div className={utilsStyle.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            </article>
        </Layout>
    );
}