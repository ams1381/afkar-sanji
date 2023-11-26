import Head from "next/head";
import React, {useEffect, useState} from "react";
import {PageBox} from "@/styles/common";
import { useQueries } from "@tanstack/react-query";
import {CommonDrawer} from "@/components/common/CommonDrawer";
import QuestionerHeader from "@/components/common/QuestionerHeader";
import {axiosInstance} from "@/utilities/axios";
import {ContentBox} from "@/styles/folders/Questionnaire";
import {AdminPanelContainer} from "@/styles/Admin/adminPanel";
import {UsersHeader} from "@/components/Admin/UsersList/UsersListHeader";
import {QuestionnairesTable} from "@/components/Admin/QuestionnairesTable/QuestionnairesTable";
import {UserInfoPopup} from "@/components/Admin/UsersTable/UserInfoPopup";
import {QuestionnaireDataPopup} from "@/components/Admin/QuestionnairesTable/QuestionnaireDataPopup";
import {PricePopup} from "@/components/Admin/QuestionnairesTable/PricePopup";
import {AddPricePack} from "@/components/Admin/QuestionnairesTable/AddPricePack";
import {DeletePricePackPopup} from "@/components/Admin/QuestionnairesTable/DeletePricePack";

const QuestionnairesList = () => {
    const [ RightDrawerOpen , setRightDrawerOpen ] = useState(false);
    const [ interviewSearch , setInterviewSearch ] = useState(null);
    const [ CurrentPage , SetCurrentPage ] = useState(1);
    const [ pageSize , setPageSize ] = useState(7);
    const [ selectedRows , setSelectedRows ] = useState([]);
    const [ ActiveQuestionnairePopup , setActiveQuestionnairePopup ] = useState(null);
    const [ activePricePopup , setActivePricePopup ] = useState(null);
    const [ levelFilter , setLevelFilter ] = useState('');
    const [ priceFilter , setPriceFilter ] = useState('');
    const [ filteredIDQuestionnaires , setFilteredIDQuestionnaires ] = useState([]);
    const [ hasQuestionerFilter , setHasQuestionerFilter ] = useState('');
    const [ packPopupType , setPackPopupType ] = useState('view');
    const [ pricePackRemovable , setPricePackRemovable ] = useState(false);
    const [ EditPricePack , setEditPricePack ] = useState(false);
    const [ selectedPricePack , setSelectedPricePack ] = useState(null);
    const [ deletePricePackStatus , setDeletePricePackStatus ] = useState(null);
    const [ pricePackFilter , setPricePackFilter ] = useState(null);
    const [ pricePacksList , setPricePacksList ] = useState([]);
    const [ QuestionnairesListQuery , MeQuery , RegionsQuery ] = useQueries({
        queries : [
            {
                queryKey : ['QuestionnairesListQuery'],
                queryFn : async () => await axiosInstance.get(`/admin-api/interviews/${interviewSearch ? 'search-questions/' : ''}?${(!interviewSearch && !pricePackFilter) ? `page_size=${pageSize}&page=${CurrentPage}` : ''}${levelFilter}${priceFilter}${pricePackFilter ? pricePackFilter : ''}${(!pricePackFilter && interviewSearch) ?`&search=${interviewSearch}` : ''}`),
                refetchOnWindowFocus : false,
                retry : false
            }
            ,{ queryKey : ['MeQuery'] ,
                queryFn : async () => await axiosInstance.get(`/user-api/users/me/`) ,
                refetchOnWindowFocus : false,
                retry : false
            } ,
            {
                queryKey: ['RegionsQuery'],
                queryFn: async () =>
                    await axiosInstance.get(`/user-api/nested-countries/`) ,
                refetchOnWindowFocus : false
            },
        ]
    })

    useEffect(() => {
        QuestionnairesListQuery.refetch()
    }, [CurrentPage ,
        levelFilter ,
        interviewSearch ,
        priceFilter ,
        pricePackFilter,
        pageSize ,
        hasQuestionerFilter]);
    return <>
        <Head>
            <title>Afkar Sanji | Admin Panel | Questonnaires List</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <PageBox>
            <CommonDrawer isAdmin={true} RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen} />

            <QuestionerHeader pageName='questionnaires-list' meData={MeQuery?.data?.data}  />
            <main style={{ width : RightDrawerOpen ? '80%' : '100%', transition : '0.3s' }}>
                <ContentBox>
                    <AdminPanelContainer>
                        <UsersHeader selectedRows={selectedRows}
                         HeaderMode={'interviews'}
                         refetchList={QuestionnairesListQuery.refetch}
                         setInterviewSearch={setInterviewSearch}
                         InterviewSearch={interviewSearch}
                         setSelectedRows={setSelectedRows}
                         setPricePackFilter={setPricePackFilter}
                         setFilteredIDQuestionnaires={setFilteredIDQuestionnaires}
                         filteredIDQuestionnaires={filteredIDQuestionnaires}
                         setLevelFilter={setLevelFilter}
                         QuestionnairesListQuery={QuestionnairesListQuery}
                         setPriceFilter={setPriceFilter}
                         setHasQuestionerFilter={setHasQuestionerFilter}
                        />
                        <QuestionnairesTable pageSize={pageSize}
                             setPackPopupType={setPackPopupType}
                             setPageSize={setPageSize}
                             setSelectedRows={setSelectedRows}
                             filteredIDQuestionnaires={filteredIDQuestionnaires}
                             setFilteredIDQuestionnaires={setFilteredIDQuestionnaires}
                             SetCurrentPage={SetCurrentPage}
                             setActivePricePopup={setActivePricePopup}
                             setActiveQuestionnairePopup={setActiveQuestionnairePopup}
                             QuestionnairesListQuery={QuestionnairesListQuery} />
                    </AdminPanelContainer>
                </ContentBox>
            </main>
            {(ActiveQuestionnairePopup && QuestionnairesListQuery?.data?.data && RegionsQuery?.data?.data ) &&
                <QuestionnaireDataPopup
                                QuestionnaireList={QuestionnairesListQuery.data.data.results}
                               RegoionsData={RegionsQuery.data.data}
                                setActivePricePopup={setActivePricePopup}
                               ActiveQuestionnairePopup={ActiveQuestionnairePopup}
                                setActiveQuestionnairePopup={setActiveQuestionnairePopup}
                />}
            {(activePricePopup && QuestionnairesListQuery?.data?.data && RegionsQuery?.data?.data ) ?
                packPopupType === 'view' ?
                <PricePopup
                    refetch={QuestionnairesListQuery.refetch}
                    setPackPopupType={setPackPopupType}
                    setActivePricePopup={setActivePricePopup}
                    QuestionnaireList={QuestionnairesListQuery.data.data.results}
                    activePricePopup={activePricePopup}
                    setDeletePricePackStatus={setDeletePricePackStatus}
                    setPricePacksList={setPricePacksList}
                    selectedPricePack={selectedPricePack}
                    setEditPricePack={setEditPricePack}
                    setSelectedPricePack={setSelectedPricePack}
                /> : packPopupType === 'delete' ?
                        <DeletePricePackPopup
                            packPopupType={packPopupType}
                            selectedPricePack={selectedPricePack}
                            pricePacksList={pricePacksList}
                            setPricePackFilter={setPricePackFilter}
                            deletePricePackStatus={deletePricePackStatus}
                            setPackPopupType={setPackPopupType}
                            setSelectedPricePack={setSelectedPricePack}
                            pricePackRemovable={pricePackRemovable} />  :
                        packPopupType === 'add-pack' && <AddPricePack activePricePopup={activePricePopup}
                         EditMode={EditPricePack}
                          pricePacksList={pricePacksList}
                        setEditPricePack={setEditPricePack}
                         setPackPopupType={setPackPopupType}
                          selectedPricePack={selectedPricePack}
                        QuestionnaireList={QuestionnairesListQuery.data.data.results}
                        setActivePricePopup={setActivePricePopup} /> : ''}
        </PageBox>
    </>
}
export default  QuestionnairesList;
export async function getServerSideProps(context) {
    const { req } = context;
    const cookies = req.headers.cookie;
    const urlDest = req.url;

    if (cookies) {
        // Parse the cookies
        const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});

        return {
            props: {
                cookies: parsedCookies,
            },
        };
    }
    return {
        redirect: {
            permanent: false,
            destination: "/auth?returnUrl=" + urlDest
        }
    };
}