import {message, Table, Tooltip, Upload} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {
    EmptyButtonPage,
    EmptyResultContainer,
    ResultBodyContainer,
    ResultTableContainer
} from "@/styles/Result/ResultPage";
import {QuestionerResultTable} from "@/components/Questioner/Result/QuestionerResultTable";
import {TableColumnGenerator, TableDataGenerator} from "@/components/Questioner/Result/TableConfigGenerator";
import {SkeletonTable} from "@/components/ResultPage/ResultBody";
import EmptyImage from "@/public/Images/empty-image.png";
import Link from "next/link";
import {Icon} from "@/styles/icons";
import {QuestionTypeIcon} from "@/utilities/QuestionTypes";
const regex = /(<([^>]+)>)/gi;
export const QuestionerResultBody = ({ ResultQuery , SetCurrentPage , SelectedTypeFilter , QuestionnaireQuery , setSelectedRows , SelectedRows }) => {
    let [ TableColumns , setTableColumns ] = useState(null);
    let [ ResultData , setResultData ] = useState(null);
    const [ resultMessage , contextHolder] = message.useMessage();
    let [ TableData , setTableData ] = useState(null);
    const [ deleteRowState , setDeleteRowState ] = useState(false);
    // const [ selectedRows , setSelectedRows ] = useState([]);

    useEffect(() => {
        setResultData(ResultQuery?.data?.data.results)

    },[ResultQuery ])
    // console.log(TableData)
    useEffect(() => {
        if(ResultData && ResultData.length)
        {
            let columns = []
            let rows = [];
            let QuestionsArray = QuestionnaireQuery?.data?.data?.questions.filter(item => item.question != null)
            if(QuestionsArray)
                columns = TableColumnGenerator(QuestionsArray , ResultData , resultMessage , regex , SelectedTypeFilter)
            rows = TableDataGenerator(ResultData , QuestionnaireQuery)

            setTableColumns(columns);
            setTableData(rows);
        }

        else
        {
            setTableColumns([]);
            setTableData([]);
        }
    },[ResultData , QuestionnaireQuery])

    return <div style={{ width : '86%' , margin : '0 auto' }}>
        {contextHolder}
        {
            ResultQuery.isLoading ? <SkeletonTable columns={5} rowCount={11} /> :
                (TableColumns?.length && TableData?.length) ?
                 <ResultBodyContainer>
                    <ResultTableContainer>
                        <QuestionerResultTable TableColumns={TableColumns}
                           SelectedRows={SelectedRows}
                           deleteRowState={deleteRowState}
                           SetCurrentPage={SetCurrentPage}
                           QuestionnaireQuery={QuestionnaireQuery}
                           setSelectedRows={setSelectedRows}
                           QuestionsArray={QuestionnaireQuery?.data?.data?.questions.filter(item => item.question != null)}
                           ResultQuery={ResultQuery}
                           TableData={TableData} />
                    </ResultTableContainer>
                 </ResultBodyContainer> : !QuestionnaireQuery.data?.data?.questions?.length ?
                        <EmptyResultContainer>
                            <img src={EmptyImage.src} />
                            <p>هنوز هیچ سوالی نساختید</p>
                            <Link onClick={() => setItem('tabType','question_design')}
                                  href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/`}>
                                <EmptyButtonPage type='primary'>الان بسازید</EmptyButtonPage>
                            </Link>
                        </EmptyResultContainer> : <EmptyResultContainer>
                            <div className='no_data_table' style={{
                                width : '100%' , height : '100%' , marginTop : 10
                            }}>
                                <Table
                                    columns={QuestionnaireQuery?.data?.data?.questions.map(item => ({
                                        title : <Tooltip
                                            title={<div className='tooltip_container' onClick={() => navigator.clipboard.writeText(item.question?.title)}>
                                                {item.question?.title} <Icon name='WDuplicate' />
                                            </div>}>
                                            <div className='question_title_cell'>
                                                <p>{item.question?.title ? item.question?.title?.replace(regex,"") : ' '}</p>
                                                { QuestionTypeIcon(item.question?.question_type) }
                                            </div>
                                        </Tooltip>,
                                        render : (Answer) => (Answer && typeof Answer == 'string' && Answer.includes('/media/'))
                                            ?
                                            <Upload isImageUrl={() => true} disabled
                                                    iconRender={() => <Icon name='File' />}
                                                    defaultFileList={[{
                                                        name: Answer.split('/')[6],
                                                        status: 'done',
                                                        url: 'https://mah-api.ariomotion.com' + Answer,
                                                        thumbUrl : 'https://mah-api.ariomotion.com' + Answer
                                                    }]} />:
                                            <div ><p></p></div>,
                                        dataIndex : item.question?.title  ,
                                        key : item.question?.id ,
                                        align : 'center' ,
                                        children : item?.question?.options?.map(option => ({
                                            title : <Tooltip title={<div className='tooltip_container'
                                                                         onClick={() => navigator.clipboard.writeText(option?.text)}>
                                                {option?.text ? option.text?.replace(regex,"") : ' '} <Icon name='WDuplicate' />
                                            </div>}>
                                                <p>{option.text != 'null' ? option?.text?.replace(regex,"") : ' '}</p>
                                            </Tooltip> ,
                                            align : 'center' ,
                                            key : option.text,
                                            dataIndex : option.text
                                        }))
                                    }))}
                                    locale={{
                                        emptyText : <p className='no_result_message'>نتیجه‌ای یافت نشد</p>
                                    }}
                                    // loading={LoadingTable}
                                />
                            </div>
                        </EmptyResultContainer>
        }
    </div>
}