import {TableColumns, TableDataSet} from "@/components/Admin/UsersTable/TableConfig";
import { Table } from 'antd'
import React, {useState} from "react";
import {ResultBodyContainer} from "@/styles/Result/ResultPage";
import {UsersTableContainer} from "@/styles/Admin/adminPanel";
import {UserInfoPopup} from "@/components/Admin/UsersTable/UserInfoPopup";
import {digitsEnToFa} from "@persian-tools/persian-tools";

export const UsersTable = ({  ActivePopupUser , pageSize , setPageSize , setSelectedRows , SetCurrentPage , SetActivePopupUser , UserListQuery }) => {
    const [ TableBlockLoading , setTableBlockLoading ] = useState(null)


    return <div style={{ marginTop : 16 }}>
        <ResultBodyContainer>
            {
                UserListQuery.error ? <UsersTableContainer style={{ height : '70vh' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                    <p>{UserListQuery.error.response?.status === 404 ? 'یافت نشد | 404' : 'خطای داخلی سرور' }</p>
                </UsersTableContainer> : <UsersTableContainer>
                    {
                        UserListQuery?.data?.data ?
                            <Table
                                loading={UserListQuery.isRefetching}
                                scroll={{ x : 500 , y : 500 }}
                                rowSelection={{
                                    onChange: (selectedRowKeys, selectedRows) => {
                                        setSelectedRows(selectedRows)
                                        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                                    },
                                    getCheckboxProps: (record) => ({
                                        disabled: record.name === 'Disabled User',
                                        // Column configuration not to be checked
                                        name: record.name,
                                    }),
                                }}
                                pagination={{
                                    hideOnSinglePage : true,
                                    total : UserListQuery?.data?.data.count,
                                    pageSize : pageSize,
                                    onShowSizeChange : (a,b) => {
                                        setPageSize(b)
                                        SetCurrentPage(null)
                                    },
                                    position : 'center' ,
                                    alignment : 'center' ,
                                    // defaultPageSize : 4,
                                    itemRender : (page,ItemName,ItemNode) => {
                                        if(ItemName != 'page')
                                            return ItemNode
                                        return  digitsEnToFa(page)
                                    },
                                    showQuickJumper : true ,
                                    showSizeChanger  : true,
                                    showTotal : (total , range) => {
                                        return <p>جمعا {digitsEnToFa(Math.ceil(UserListQuery?.data?.data.count / 7))} صفحه </p>
                                    },
                                    onChange : (Page) => SetCurrentPage(Page) ,
                                    locale : {
                                        jump_to: "",
                                        page : 'رفتن به',
                                        items_per_page : 'صفحه' ,
                                    }
                                }}
                                columns={TableColumns(SetActivePopupUser,TableBlockLoading,setTableBlockLoading,UserListQuery.refetch)}
                                locale={{
                                    emptyText : <p className='no_result_message'>نتیجه‌ای یافت نشد</p>
                                }}
                                direction='ltr'
                                dataSource={TableDataSet(UserListQuery?.data?.data)} />  : 'Loading'
                    }

                </UsersTableContainer>

            }


        </ResultBodyContainer>
    </div>
}