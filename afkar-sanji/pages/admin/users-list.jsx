import {useQuery , useQueries} from "@tanstack/react-query";
import {axiosInstance} from "@/utilities/axios";
import Head from "next/head";
import React, {useState , useEffect} from "react";
import {PageBox} from "@/styles/common";
import {CommonDrawer} from "@/components/common/CommonDrawer";
import QuestionerHeader from "@/components/common/QuestionerHeader";
import {ContentBox} from "@/styles/folders/Questionnaire";
import {
    AdminPanelContainer, FilterButton, FiltersDropdownContainer,
    HeaderDeleteButton,
    HeaderResetFilters, HeaderSearchContainer,
    HeaderSearchInput,
    HeadersRefreshButton, HeadersTreeSelect,
    ResetFiltersContainer, UsersListBottomPartContainer,
    UsersListFiltersContainer,
    UsersListHeader,
    UsersListTopPartContainer
} from "@/styles/Admin/adminPanel";
import {Button, Input, Popover, Select, TreeSelect} from "antd";
import {Icon} from "@/styles/icons";
import {UsersHeader} from "@/components/Admin/UsersList/UsersListHeader";
import {UsersTable} from "@/components/Admin/UsersTable/UsersTable";
import {UserInfoPopup} from "@/components/Admin/UsersTable/UserInfoPopup";
import {ResumeInfo} from "@/components/Admin/UsersTable/ResumeInfo";
import {digitsFaToEn} from "@persian-tools/persian-tools";

const UsersListPage = () => {
    const [ RightDrawerOpen , setRightDrawerOpen ] = useState(false);
    const [ UserListPage , setUserListPage ] = useState(0);
    const [ ActivePopupUser , SetActivePopupUser  ] = useState(null);
    const [ CurrentPage , SetCurrentPage ] = useState(1);
    const [ userSearchValue , setUserSearchValue ] = useState(null);
    const [ pageSize , setPageSize ] = useState(7);
    const [ roleFilterValue , setRoleFilterValue ] = useState('');
    const [ interviewRequestFilter , setInterviewRequestFilter ] = useState(null);
    const [ selectedRows , setSelectedRows ] = useState([]);
    const [ InterviewSearch , setInterviewSearch ] = useState(null);
    const [ PopupType , setPopupType ] = useState('user-info')
    // await axiosInstance.get(`/admin-api/users/${userSearchValue ? 'search-users/' : ''}?role=${roleFilterValue}${interviewRequestFilter ? interviewRequestFilter : ''}&interview_name=${InterviewSearch ? InterviewSearch : ''}&page_size=${!userSearchValue ? pageSize : ''}&page=${(!userSearchValue && CurrentPage) ? CurrentPage : ''}&search=${userSearchValue ? userSearchValue : ''}`),
    const [ UserListQuery , MeQuery, RegionsQuery ] = useQueries({
        queries : [
            { queryKey : ['UsersListQuery'] ,
                queryFn : async () =>
                    await axiosInstance.get(`/admin-api/users/${userSearchValue ? 'search-users/' : ''}?role=${roleFilterValue}${interviewRequestFilter ? interviewRequestFilter : ''}&interview_name=${InterviewSearch ? InterviewSearch : ''}${!userSearchValue ? `&page_size=${pageSize}` : ''}${(!userSearchValue && !interviewRequestFilter) ? `&page=${CurrentPage}` : ''}&search=${userSearchValue ? digitsFaToEn(userSearchValue) : ''}`),
                refetchOnWindowFocus : false,
                retry : false
            } ,
            { queryKey : ['MeQuery'] ,
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
        UserListQuery.refetch()
    }, [CurrentPage , roleFilterValue , interviewRequestFilter , userSearchValue , pageSize , InterviewSearch]);


    return <>
        <Head>
            <title>Afkar Sanji | Admin Panel | Users List</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <PageBox>
            <CommonDrawer isAdmin={true} RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen} />

                <QuestionerHeader pageName='users-list' meData={MeQuery?.data?.data}  />
            <main style={{ width : RightDrawerOpen ? '80%' : '100%', transition : '0.3s' }}>
                <ContentBox>
                    <AdminPanelContainer>
                        <UsersHeader setInterviewRequestFilter={setInterviewRequestFilter}
                                     setUserSearchValue={setUserSearchValue}
                                     userSearchValue={userSearchValue}
                                     HeaderMode={'users'}
                                     InterviewSearch={InterviewSearch}
                                     setInterviewSearch={setInterviewSearch}
                                     refetchList={UserListQuery.refetch}
                                 setRoleFilterValue={setRoleFilterValue}
                                 selectedRows={selectedRows} />
                        <UsersTable ActivePopupUser={ActivePopupUser}
                            SetCurrentPage={SetCurrentPage}
                            setSelectedRows={setSelectedRows}
                            pageSize={pageSize}

                            setPageSize={setPageSize}
                            SetActivePopupUser={SetActivePopupUser}  UserListQuery={UserListQuery} />
                    </AdminPanelContainer>
                </ContentBox>
            </main>
            {(ActivePopupUser && UserListQuery?.data?.data && RegionsQuery?.data?.data ) ? PopupType === 'user-info' ?
                <UserInfoPopup SetActivePopupUser={SetActivePopupUser}
                 usersLists={UserListQuery.data.data.results}
                    UserListQuery={UserListQuery}
                 RegoionsData={RegionsQuery.data.data}
                  setPopupType={setPopupType}
                 ActivePopupUser={ActivePopupUser} /> :
                <ResumeInfo
                    usersLists={UserListQuery.data.data.results}
                    SetActivePopupUser={SetActivePopupUser}
                    ActivePopupUser={ActivePopupUser}
                    setPopupType={setPopupType} /> : ''}
        </PageBox>
    </>


}
export default  UsersListPage;

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