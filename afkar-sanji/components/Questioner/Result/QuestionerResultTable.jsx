import {Checkbox, Table} from "antd";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {Icon} from "@/styles/icons";
import React, {Suspense, useEffect, useRef, useState} from "react";
import {ScrollByDrag} from "@/components/ResultPage/ResultBody";
import { lazy } from 'react';
import {MovableModal} from "@/components/Questioner/Result/MovableModal";
import {Provider} from "react-redux";
import AnswerStore from "@/utilities/stores/AnswerStore";
// import ReactModal from 'react-modal-resizable-draggable';

export const QuestionerResultTable = ({ ResultQuery , QuestionnaireQuery , QuestionsArray , SetCurrentPage ,
          setSelectedRows ,TableColumns , SelectedRows , TableData  }) => {
    const [ openResultModal , setOpenResultModal ] = useState(false);
    const [ ModalAnswerSet , setModalAnswerSet ] = useState([]);
    const MarkdownPreview = lazy(() => import('react-modal-resizable-draggable'));

    const [modalStyle, setModalStyle] = useState({});
    const modalRef = useRef(null);
    // const [ selectedRows , setSelectedRows ] = useState([6870]);
    const tableRef = useRef(null);

    useEffect(() => {
        if(tableRef.current)
            ScrollByDrag();
    }, [document?.querySelector("thead.ant-table-thead tr")]);


    return  <>
        { openResultModal ?
           <Provider store={AnswerStore}>
               <MovableModal QuestionnaireUUID={QuestionnaireQuery.data?.data?.uuid}
                 ResultQuery={ResultQuery}  ModalAnswerSet={ModalAnswerSet} openResultModal={openResultModal}
          setOpenResultModal={setOpenResultModal} />
           </Provider>  : '' }
        <Table
            columns={TableColumns}
            dataSource={TableData}
            ref={tableRef}
            sticky
            loading={ResultQuery.isFetching}
            bordered
            locale={{
                emptyText : <p className='no_result_message'>نتیجه‌ای یافت نشد</p>
            }}
            direction='ltr'
            pagination={{
                hideOnSinglePage : true,
                total : ResultQuery?.data?.data.count,
                pageSize : 7,
                position : 'center' ,
                alignment : 'center' ,
                defaultPageSize : 4,
                itemRender : (page,ItemName,ItemNode) => {
                    if(ItemName != 'page')
                        return ItemNode
                    return  digitsEnToFa(page)
                },
                showQuickJumper : true ,
                showSizeChanger  : false,
                showTotal : (total , range) => {
                    return <p>جمعا {digitsEnToFa(Math.ceil(ResultQuery?.data?.data.count / 7))} صفحه </p>
                },
                onChange : (Page) => SetCurrentPage(Page) ,
                locale : {
                    jump_to: "",
                    page : 'رفتن به',
                }
            }}
            rowSelection={{
                selectedRowKeys : SelectedRows,
                onChange : (_,SelectedList) => {
                    setSelectedRows(SelectedList?.map(item => item?.id))
                },
                // hideSelectAll : true,
                columnWidth : 112,
                fixed : true,
                renderCell :
                    (checked, record, index, originNode) => {
                       return <div className='order_cell' style={{ gap : 0 }}>
                            <div className='order_cell_number'>
                                <p>{digitsEnToFa(index + 1)}</p>
                            </div>
                            <div className='order_cell_number'
                                 onClick={() => {
                                     setOpenResultModal(true)
                                     setModalAnswerSet({
                                         questions : QuestionsArray ,
                                         answerSet : ResultQuery?.data?.data?.results.find(item => item.id == record.key)
                                     })
                                 }}
                                 style={{ width : 58 }}>
                            <span className={'edit_result_button'}>
                              <Icon name={'ResultEye'} />
                            </span>
                            </div>
                            <div className='order_checkbox' style={{ justifyContent : 'center' }}>
                                {originNode}
                            </div>

                        </div>},
                columnTitle: () => (
                        <p>ردیف</p>
                ),
            }}
            size="middle"
            scroll={{  x: 2500, y: "50vh" , draggable : true}}
            scrollableTarget="table-wrapper"
        />
    </>
}