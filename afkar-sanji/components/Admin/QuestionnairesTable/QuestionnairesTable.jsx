import {ResultBodyContainer} from "@/styles/Result/ResultPage";
import {UsersTableContainer} from "@/styles/Admin/adminPanel";
import {Table} from "antd";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {TableColumns, TableDataSet} from "@/components/Admin/UsersTable/TableConfig";
import React from "react";

export const QuestionnairesTable = ({ QuestionnairesListQuery , pageSize , setPageSize }) => {
    return <div style={{ marginTop : 16 }}>
        <ResultBodyContainer>
            { QuestionnairesListQuery.error ? <UsersTableContainer style={{ height : '70vh' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                    <p>{QuestionnairesListQuery.error.response?.status === 404 ? 'یافت نشد | 404' : 'خطای داخلی سرور' }</p>
                </UsersTableContainer> : <UsersTableContainer>
                    {
                        QuestionnairesListQuery?.data?.data ?
                            <Table
                                loading={QuestionnairesListQuery.isRefetching}
                                scroll={{ x : 500 }}
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
                                    total : QuestionnairesListQuery?.data?.data.count,
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
                                        return <p>جمعا {digitsEnToFa(Math.ceil(QuestionnairesListQuery?.data?.data.count / 7))} صفحه </p>
                                    },
                                    onChange : (Page) => SetCurrentPage(Page) ,
                                    locale : {
                                        jump_to: "",
                                        page : 'رفتن به',
                                        items_per_page : 'صفحه' ,
                                    }
                                }}
                                // columns={TableColumns(SetActivePopupUser,TableBlockLoading,setTableBlockLoading,UserListQuery.refetch)}
                                locale={{
                                    emptyText : <p className='no_result_message'>نتیجه‌ای یافت نشد</p>
                                }}
                                direction='ltr'
                                // dataSource={TableDataSet(UserListQuery?.data?.data)}
                            />
                            : 'Loading'
                    }
            </UsersTableContainer>
            }
        </ResultBodyContainer>
    </div>
}