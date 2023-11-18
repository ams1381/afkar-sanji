import Link from 'next/link'
import React, {useContext, useState} from 'react'
import Head from "next/head";
import {PageBox, QuestionerPageContainer , QuestionerContentBox } from "@/styles/common";
import {CommonDrawer} from "@/components/common/CommonDrawer";
import QuestionerHeader from "@/components/common/QuestionerHeader";
import {axiosInstance} from "@/utilities/axios";
import {Button} from "antd";
import {AddResultFooter, QuestionContainer, QuestionsContainer} from "@/styles/Result/AddResult";
import {SubComponentGenerator} from "@/components/Questioner/AddResult/QuestionSubCompGenerator";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import AnswerStore from "@/utilities/stores/AnswerStore";
import {Provider} from "react-redux";
import {PageContent} from "@/components/Questioner/AddResult/PageContent";
import {useQueries} from "@tanstack/react-query";
import {useRouter} from "next/router";
import {AuthContext} from "@/utilities/AuthContext";

const AddResultPage = ({ questionnaire , meData }) => {
    const router = useRouter();
    const Auth = useContext(AuthContext);
    const [ MeQuery , QuestionnaireQuery ] = useQueries({
        queries: [
            {
                queryKey: ['MeQuery'],
                queryFn: async () => await axiosInstance.get(`/user-api/users/me/`),
                refetchOnWindowFocus : false
            },
            {
                queryKey: ['QuestionnaireQuery'],
                queryFn: async () =>
                    await axiosInstance.get(`/interview-api/interviews/${router.query.QuestionnaireUUID}`) ,
                refetchOnWindowFocus : false,
                retry : false
            },
        ],
    });
    const [ RightDrawerOpen , setRightDrawerOpen ] = useState(false);

    return <>
        <Head>
            <title>Afkar Sanji | Add Result</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <PageBox>
            <Provider store={AnswerStore}>
                <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen} />
                <main style={{ width : RightDrawerOpen ? '84%' : '100%', transition : '0.3s' }}>
                    <QuestionerHeader pageName='add-result' meData={MeQuery?.data?.data} />
                    { !QuestionnaireQuery.error ? <PageContent questionnaire={QuestionnaireQuery?.data?.data}/> :
                        <QuestionerPageContainer>
                            <QuestionerContentBox style={{ justifyContent : 'center' , alignItems : 'center' , height : '90vh' }}>
                                {
                                    QuestionnaireQuery.error.response?.status === 500 ? 'خطای داخلی سرور' : 'یافت  نشد | ۴۰۴ '
                                }
                            </QuestionerContentBox>
                        </QuestionerPageContainer>

                    }
                </main>
            </Provider>
        </PageBox>
    </>
}
export default AddResultPage;

export async function getServerSideProps(context) {
    const { req } = context;
    const cookies = req.headers.cookie;
    let QuestionnaireData , MeData;

    if (cookies) {
        // Parse the cookies
        const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
        try
        {
            let QuestionnaireResponse  =  await
                fetch('https://mah-api.ariomotion.com/question-api/questionnaires/' + context.query.QuestionnaireUUID.replace('}',''),
                    {
                        headers: {
                            Authorization: `Bearer ${parsedCookies.access_token}`,
                        },
                    })
             QuestionnaireData = await QuestionnaireResponse.json();
            let MeResponse = await fetch('https://mah-api.ariomotion.com/user-api/users/me/',{
                headers : {
                    Authorization: `Bearer ${parsedCookies.access_token}`,
                }
            })
            MeData = await  MeResponse.json();
        }
        catch (err) {

        }

        return {
            props: {
                cookies: parsedCookies,
                questionnaire : QuestionnaireData ? QuestionnaireData : null,
                meData : MeData ? MeData : null
            },
        };
    }

    return {
        redirect: {
            permanent: false,
            destination: "/auth"
        }
    };
}