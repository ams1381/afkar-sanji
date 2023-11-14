import {Space, Tag, Divider, Button} from 'antd'
import {convertDate, convertToRegularTime} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {Icon} from "@/styles/icons";
import { useState } from 'react'
import {TableBlockButton, UserTag} from "@/styles/Admin/adminPanel";
import {axiosInstance} from "@/utilities/axios";

export const TableColumns = (SetActivePopupUser,TableBlockLoading,setTableBlockLoading,tableRefetch) => {
    return [
        {
            title: 'نام کاربر',
            dataIndex: 'name',
            key: 'name',
            sorter : (a , b) => a.name?.localeCompare(b.name) ,
            // render: (text) => <p>{text}</p>,
        },
        {
            title: 'تاریخ ثبت نام',
            dataIndex: 'joinDate',
            key: 'joinDate',
            sorter : (a , b) => Date.parse(a.rowData.date_joined) - Date.parse(b.rowData.date_joined),
        },
        {
            title: 'تاریخ درخواست',
            dataIndex: 'reqDate',
            sorter : true ,
            key: 'reqDate',
        },
        {
            title: 'نقش',
            key: 'resumeKeywords',
            dataIndex: 'resumeKeywords',
            width : 311 ,
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        // console.log(tag)
                        let color;
                        let IconToRender;
                        if(tag === 'کاربر') {
                            color = 'geekblue';
                            IconToRender = <Icon name={'UserTagIcon'} />
                        }
                        if(tag === 'ادمین') {
                            color = 'geekblue';
                            IconToRender = <Icon name={'UserTagAdmin'} />
                        }
                        if(tag === 'afir a') {
                            color = 'geekblue';
                            IconToRender = <Icon name={'AcceptedInterviewRole'} />
                        }
                        if(tag === 'afir p') {
                            color = 'warning';
                            IconToRender = <Icon name={'PendingInterviewRole'} />
                        }if(tag === 'afir r') {
                            color = 'error';
                            IconToRender = <Icon name={'RejectedInterviewRole'} />
                        }

                        // let color = tag.length > 5 ? 'geekblue' : 'green';
                        // if (tag === 'loser') {
                        //     color = 'volcano';
                        // }
                        return (
                            <UserTag  color={color} key={tag}>
                                { tag?.includes('afir') ? 'درخواست پرسشگری'
                                    : tag.toUpperCase()}
                                { IconToRender && IconToRender }
                            </UserTag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'دکمه‌ها',
            key: 'actionButtons',
            width: 311,
            render: (_, record) => {
                const blockUser = async  () => {
                    try
                    {
                        await axiosInstance.post(`/admin-api/users/${record.key}/block-user/`)
                        tableRefetch()
                        setTableBlockLoading(null)
                    }
                    catch (err)
                    {
                        setTableBlockLoading(null)
                        console.log(err)
                    }
                }
                const unBlockUser = async  () => {

                    try {
                        await axiosInstance.post(`/admin-api/users/${record.key}/unblock-user/`)
                        tableRefetch()
                        setTableBlockLoading(null)
                    }
                    catch (err) {
                        setTableBlockLoading(null)
                        console.log(err)
                    }
                }
              return <Space size="large" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span onClick={() => SetActivePopupUser({ id : record.key })}
                          style={{color: 'var(--primary-color)', cursor: 'pointer'}}>مشاهده کاریر</span>
                    <Divider type={'vertical'}/>
                  {
                      !record.isBlocked ? <TableBlockButton loading={TableBlockLoading === record.key}
                            danger onClick={() => {
                                blockUser()
                                setTableBlockLoading(record.key)
                            }} style={{color: 'var(--Error-color)', cursor: 'pointer'}}>
                          مسدود سازی
                      </TableBlockButton> : <TableBlockButton
                          loading={TableBlockLoading === record.key} danger onClick={() => {
                              unBlockUser()
                              setTableBlockLoading(record.key)
                          }} style={{color: 'var(--Error-color)', cursor: 'pointer'}}>
                           رفع مسدودیت
                      </TableBlockButton>

                  }

                </Space>
        },
        },
    ];
}
export const TableDataSet = (UsersListData) => {

    // let UserTags = [];

    // if(User)

   return  UsersListData.results.map(UserItem => {
        let UsersTag = [];


        if(UserItem.ask_for_interview_role) {
            if(UserItem.is_interview_role_accepted)
                UsersTag.push('afir a');
            else if(!UserItem.is_interview_role_accepted)
                UsersTag.push('afir r');
            else
                UsersTag.push('afir p')
            // UsersTag.push('afir');
        }
        if(UserItem.is_staff)
            UsersTag.push('ادمین')
       else
            UsersTag.push('کاربر')

       return ({
           key : UserItem.id ,
           name : UserItem.first_name ,
           rowData :  UserItem,
           joinDate : digitsEnToFa(convertDate(convertToRegularTime(UserItem.date_joined),'jalali')),
           tags : UsersTag ,
           isBlocked : !UserItem.is_active

       })
    })

}