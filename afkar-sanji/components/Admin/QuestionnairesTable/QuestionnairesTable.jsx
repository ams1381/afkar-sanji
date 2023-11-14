import {ResultBodyContainer} from "@/styles/Result/ResultPage";
import {UsersTableContainer} from "@/styles/Admin/adminPanel";
import {Table} from "antd";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {TableColumns, TableDataSet} from "@/components/Admin/UsersTable/TableConfig";
import React, {useEffect, useRef} from "react";
import {
    QuestionnaireTableColumns,
    QuestionnaireTableData
} from "@/components/Admin/QuestionnairesTable/QuestionnaireTableConfig";
import {ScrollByDrag, SkeletonTable} from "@/components/ResultPage/ResultBody";

export const QuestionnairesTable = ({
        QuestionnairesListQuery ,
        setFilteredIDQuestionnaires,
        pageSize ,
        setActivePricePopup,
        filteredIDQuestionnaires ,
        setSelectedRows ,
        SetCurrentPage ,
        setPageSize ,
        setActiveQuestionnairePopup}) => {
    const tableRef = useRef(null);
    useEffect(() => {
        if(tableRef.current)
            ScrollByDrag(QuestionnairesListQuery?.data?.data?.results?.length ? true : false);
    }, [document.querySelector("thead.ant-table-thead tr") , document.querySelector(".ant-table-tbody .ant-table-body")]);
    return <div style={{ marginTop : 16 }}>
        <ResultBodyContainer>
            { QuestionnairesListQuery.error ? <UsersTableContainer style={{ height : '70vh' , display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
                    <p>{QuestionnairesListQuery.error.response?.status === 404 ? 'یافت نشد | 404' : 'خطای داخلی سرور' }</p>
                </UsersTableContainer> : <UsersTableContainer>
                    {
                       !filteredIDQuestionnaires.length && QuestionnairesListQuery?.data?.data ?
                            <Table
                                ref={tableRef}
                                loading={QuestionnairesListQuery.isRefetching}
                                scroll={{ x : 1000 , y : 400 }}
                                rowSelection={{
                                    onChange: (selectedRowKeys, selectedRows) => {
                                        console.log(selectedRowKeys)
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
                                columns={QuestionnaireTableColumns(setActiveQuestionnairePopup,setActivePricePopup)}
                                locale={{
                                    emptyText : <p className='no_result_message'>نتیجه‌ای یافت نشد</p> ,
                                    triggerDesc: 'مرتب سازی نزولی',
                                    triggerAsc: 'مرتب سازی صعودی',
                                    cancelSort: 'لغو مرتب سازی'
                                }}
                                direction='ltr'
                                dataSource={QuestionnaireTableData(QuestionnairesListQuery.data?.data?.results)}
                            />
                            : filteredIDQuestionnaires.length ?
                               <Table
                                   ref={tableRef}
                                   loading={QuestionnairesListQuery.isRefetching}
                                   scroll={{ x : 1000 , y : 400 }}
                                   rowSelection={{
                                       onChange: (selectedRowKeys, selectedRows) => {
                                           console.log(selectedRowKeys)
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
                                       onChange : (Page) => {
                                           setFilteredIDQuestionnaires([])
                                           SetCurrentPage(Page)
                                       },
                                       locale : {
                                           jump_to: "",
                                           page : 'رفتن به',
                                           items_per_page : 'صفحه' ,

                                       }
                                   }}
                                   columns={QuestionnaireTableColumns(setActiveQuestionnairePopup,setActivePricePopup)}
                                   locale={{
                                       emptyText : <p className='no_result_message'>نتیجه‌ای یافت نشد</p> ,
                                       triggerDesc: 'مرتب سازی نزولی',
                                       triggerAsc: 'مرتب سازی صعودی',
                                       cancelSort: 'لغو مرتب سازی'
                                   }}
                                   direction='ltr'
                                   dataSource={QuestionnaireTableData(filteredIDQuestionnaires)}
                               /> :
                               <SkeletonTable columns={5} rowCount={10}/>
                    }
            </UsersTableContainer>
            }
        </ResultBodyContainer>
    </div>
}