import {message, Table, Tooltip, Upload} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {ResultBodyContainer, ResultTableContainer} from "@/styles/Result/ResultPage";
import {QuestionerResultTable} from "@/components/Questioner/Result/QuestionerResultTable";
import {TableColumnGenerator, TableDataGenerator} from "@/components/Questioner/Result/TableConfigGenerator";
import {SkeletonTable} from "@/components/ResultPage/ResultBody";
const regex = /(<([^>]+)>)/gi;
export const QuestionerResultBody = ({ ResultQuery , SetCurrentPage , SelectedTypeFilter , QuestionnaireQuery , setSelectedRows , SelectedRows }) => {
    let [ TableColumns , setTableColumns ] = useState(null);
    let [ ResultData , setResultData ] = useState(null);
    const [ resultMessage , contextHolder] = message.useMessage();
    let [ TableData , setTableData ] = useState(null);
    const [ deleteRowState , setDeleteRowState ] = useState(false);
    // const [ selectedRows , setSelectedRows ] = useState([]);

    useEffect(() => {
        // if(ResultQuery.isFetching || QuestionnaireQuery.isFetching)
        //     setLoadingTable(true)

        // else if(ResultQuery.isFetched && QuestionnaireQuery.isFetched)
        //     setLoadingTable(false)
        setResultData(ResultQuery?.data?.data.results)

        // setRowDeleted(false)

    },[ResultQuery ])
    // console.log(TableData)
    useEffect(() => {
        // if(ResultQuery.isFetching || QuestionnaireQuery.isFetching)
        //     setLoadingTable(true)
        //
        // else if(ResultQuery.isFetched && QuestionnaireQuery.isFetched)
        //     setLoadingTable(false)
        // console.log(ResultData)
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
                <ResultBodyContainer>
                    <ResultTableContainer>
                        <QuestionerResultTable TableColumns={TableColumns}
                           SelectedRows={SelectedRows}
                           deleteRowState={deleteRowState}
                           SetCurrentPage={SetCurrentPage}
                           setSelectedRows={setSelectedRows}
                           QuestionsArray={QuestionnaireQuery?.data?.data?.questions.filter(item => item.question != null)}
                           ResultQuery={ResultQuery}
                           TableData={TableData} />
                    </ResultTableContainer>
                </ResultBodyContainer>
        }
    </div>
}