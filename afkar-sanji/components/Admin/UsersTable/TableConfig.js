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
                        if(tag === 'پرسشگر')
                            IconToRender = <Icon name={'QuestionerIcon'} />
                        if(tag === 'کارفرما')
                            IconToRender = <Icon name={'EmployerIcon'} />
                        return (
                            <UserTag pending={tag === 'afir p' ? true : null} rejected={tag === 'afir r' ? true : null}  color={color} key={tag}>
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
                          style={{color: 'var(--primary-color)', cursor: 'pointer'}}>مشاهده کاربر</span>
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
            console.log(UserItem)
            if(UserItem.is_interview_role_accepted)
                UsersTag.push('afir a');
            else if(UserItem.is_interview_role_accepted === null)
                UsersTag.push('afir p');
            else
                UsersTag.push('afir r')
            // UsersTag.push('afir');
        }
        if(UserItem.is_staff)
            UsersTag.push('ادمین')
       else {
           if(UserItem.role === 'n')
            UsersTag.push('کاربر')
            else if(UserItem.role === 'i')
                UsersTag.push('پرسشگر')
            else if(UserItem.role === 'e')
                UsersTag.push('کارفرما')
            else if(UserItem.role === 'ie') {
               UsersTag.push('پرسشگر')
               UsersTag.push('کارفرما')
           }
        }


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