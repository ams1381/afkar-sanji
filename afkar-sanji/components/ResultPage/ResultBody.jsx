import { ResultBodyContainer , ResultButton , DeleteRowButton , EmptyButtonPage ,
      ResultTableContainer , EmptyResultContainer , ResultBodyTopPart , TableOutPut } from '@/styles/Result/ResultPage';
import { Icon } from '@/styles/icons';
import { Skeleton , Table , Upload, message, Tooltip, Button, Modal, Select, Input } from 'antd';
import React, { useEffect } from 'react'
import Link from 'next/link';
import { axiosInstance } from '@/utilities/axios';
import EmptyImage from '../../public/Images/empty-image.png'
import { digitsEnToFa, digitsFaToEn } from '@persian-tools/persian-tools';
import { convertDate, convertStringToDate } from '../QuestionnairePanel/SettingPanel';
import { Excel } from 'antd-table-saveas-excel';
import { useRef } from 'react';
import RemovePopup from '../common/RemovePopup';
import { useState } from 'react';
import { QuestionSearchContainer } from '@/styles/questionnairePanel/QuestionDesignPanel';
import DatePicker from 'react-multi-date-picker';
import { TimePickerContainer } from '@/styles/questionnairePanel/QuestionnaireSetting';
import persian_fa from 'react-date-object/locales/persian_fa';
import persian from 'react-date-object/calendars/persian';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { calculateTextWidth } from '@/utilities/RenameFunctions';
import { QuestionTypeIcon } from '@/utilities/QuestionTypes';
import { useLocalStorage } from '@/utilities/useLocalStorage';
const regex = /(<([^>]+)>)/gi;
export const SkeletonTable = ({ columns, rowCount }) => {
    return (
      <Table
        rowKey="key"
        pagination={false}
        dataSource={[...Array(rowCount)].map((_, index) => ({
          key: `key${index}`,
        }))}
        columns={Array.from({ length : columns }).map((column,index) => {
          return {
            ...column,
            render: function renderPlaceholder() {
              return (
                <Skeleton
                 active
                  key={index}
                  title={true}
                  paragraph={false}
                />
              );
            },
          };
        })}
      />
    );
};
const ExcelExportHandler = (Data,QuestionnaireQuery) => {
  let columns = [];
  let rows = [];
  Data?.forEach((AnswerSet) => {
    if(AnswerSet.answers && AnswerSet.answers.length)
    {
      rows.push({});
      columns = AnswerSet.answers.map(item => ({ 
          title : item.question.toString(),
          key : item.id ,
          align : 'center',
          dataIndex : item.question ,
          children : Array.isArray(item.answer) ? item.answer?.map(optionItem => ({
            title : optionItem.text,
            align : 'center' ,
            key : optionItem.key,
            dataIndex : optionItem.text
          })) : item.answer?.options?.map(optionItem => ({
            title : optionItem.text ,
            align : 'center' ,
            key : optionItem.key,
            dataIndex : optionItem.text
          }))
      }))
      AnswerSet.answers.forEach((item) => {
        if(!item.answer)  
          return
          // console.log(rows,index)
          if(typeof item.answer != 'object')
            rows[rows.length - 1][item.question] = item.answer;
          else
          {
            if(item.answer.options)
              item.answer.options.forEach(optionItem => {
                rows[rows.length - 1][optionItem.text] = optionItem.text;
              })
          }
           
            rows[rows.length - 1]['key'] = item.id;
            rows[rows.length - 1]['ردیف'] = rows.length ;
      })
    }
  })
  const excel = new Excel();
  excel
    .addSheet("test")
    .addColumns(columns)
    .addDataSource(rows, {
      str2Percent: true
    })
    .saveAs(`${QuestionnaireQuery.data?.data?.name}ExcelOutput.xlsx`);
}
export const ResultBody = ({ ResultQuery , setStartDate , setSearchValue , queryStatus
  , QuestionnaireQuery , setEndDate , SetCurrentPage }) => {
  const [ resultMessage , contextHolder] = message.useMessage();
  const [ deleteRowState , setDeleteRowState ] = useState(false);
  const [ selectedRows , setSelectedRows ] = useState([]);
  const { setItem } = useLocalStorage();
  const [ rowDeleted , setRowDeleted ] = useState(false);
  const [ ReplaceDataWithQuery , setReplaceDataWithQuery ] = useState(true);
  const tableRef = useRef(null);
  const [ LoadingTable , setLoadingTable ] = useState(true);
  const ColumnsRef = useRef(null);
  // let ResultData = ResultQuery.data?.data;
  let [ ResultData , setResultData ] = useState(null)
  let searchValue = ''
  let delayTimer;

  

  let [ TableColumns , setTableColumns ] = useState(null);
  let [ TableData , setTableData ] = useState(null);

  useEffect(() => {
    if(ResultQuery.isFetching || QuestionnaireQuery.isFetching)
      setLoadingTable(true)
  
  else if(ResultQuery.isFetched && QuestionnaireQuery.isFetched)
    setLoadingTable(false)
      setResultData(ResultQuery?.data?.data.results)

      setRowDeleted(false)
      
  },[ResultQuery , rowDeleted])
 
  useEffect(() => {
    if(ResultQuery.isFetching || QuestionnaireQuery.isFetching)
      setLoadingTable(true)
  
  else if(ResultQuery.isFetched && QuestionnaireQuery.isFetched)
    setLoadingTable(false)
    // console.log(ResultData)
    if(ResultData && ResultData.length)
    {
      let columns = []
      let rows = [];
      let QuestionsArray = QuestionnaireQuery?.data?.data?.questions.filter(item => item.question != null)
      if(QuestionsArray)
        columns = (QuestionsArray?.map(item => ({
          title : <Tooltip 
            title={<div className='tooltip_container' onClick={() => 
            {
              resultMessage.info({
                content : 'کپی شد' ,
                duration : 3 ,
                style : {
                  display : 'flex',
                  alignItems : 'center',
                  justifyContent : 'center'
                }
              })
              navigator.clipboard.writeText(item.question?.title)
            }}>
              {item.question?.title} <Icon name='WDuplicate' />
              </div>}>
                 <div className='question_title_cell'>
                    <p>{item.question?.title ? item.question?.title?.replace(regex,"") : ' '}</p>
                    { QuestionTypeIcon(item.question?.question_type) }
                 </div> 
              </Tooltip>,
          render : (Answer) => {
            if(!Answer)
              return
           else if((typeof Answer == 'string' && Answer.includes('/media/')))
              return <Upload isImageUrl={() => true} disabled
              iconRender={() => <Icon name='File' />}
                defaultFileList={[{
                name: Answer.split('/')[6],
                status: 'done',
                url: 'https://mah-api.ariomotion.com' + Answer,
                thumbUrl : 'https://mah-api.ariomotion.com' + Answer
              }]} />
           else if(typeof Answer == 'string' || typeof Answer == 'number')
              return <div>
                  <p>{Answer}</p>
                </div>
          }
            ,
             width : 340, 
            dataIndex : item.question?.title, 
            // key : item.question?.id ,
            align : 'center' ,
            ellipsis: true,
            children : item?.question?.question_type == 'group' ? 
            item?.question.child_questions.map(ChildQuestion => ({
              title : <Tooltip 
              title={<div className='tooltip_container' 
              onClick={() => 
                {
                  resultMessage.info({
                    content : 'کپی شد' ,
                    duration : 3 ,
                    style : {
                      display : 'flex',
                      alignItems : 'center',
                      justifyContent : 'center'
                    }
                  })
                  navigator.clipboard.writeText(ChildQuestion.question?.title)
                }}>
                {ChildQuestion.question?.title} <Icon name='WDuplicate' />
                </div>}>
                   <div className='question_title_cell'>
                      <p>{ChildQuestion.question?.title ? ChildQuestion.question?.title?.replace(regex,"") : ' '}</p>
                      { QuestionTypeIcon(ChildQuestion.question?.question_type) }
                   </div> 
                </Tooltip> ,
              align : 'center' ,
              ellipsis: true,
              key : ChildQuestion?.question?.id,
              dataIndex : ChildQuestion?.question?.title,
              width :  226,
              children : ChildQuestion?.question?.options?.map(option => ({
                title : <Tooltip title={<div className='tooltip_container' 
                onClick={() => 
                  {
                    resultMessage.info({
                      content : 'کپی شد' ,
                      duration : 3 ,
                      style : {
                        display : 'flex',
                        alignItems : 'center',
                        justifyContent : 'center'
                      }
                    })
                    navigator.clipboard.writeText(option?.text)
                  }}>
                {option?.text ? option?.text?.replace(regex,"") : ' '} <Icon name='WDuplicate' />
                </div>}>
                    <p>{option?.text != 'null' ? option?.text?.replace(regex,"") : ' '}</p>
                </Tooltip> ,
                align : 'center' ,
                // key : option?.id,
                ellipsis: true,
                width : 53,
                dataIndex : option?.text
              }))
            }))
            : item?.question?.options?.map(option => ({
              title : <Tooltip title={<div className='tooltip_container' 
              onClick={() => 
                {
                  resultMessage.info({
                    content : 'کپی شد' ,
                    duration : 3 ,
                    style : {
                      display : 'flex',
                      alignItems : 'center',
                      justifyContent : 'center'
                    }
                  })
                  navigator.clipboard.writeText(option?.text)
                }}>
              {option?.text ? option.text?.replace(regex,"") : ' '} <Icon name='WDuplicate' />
              </div>}>
                  <p>{option?.text != 'null' ? option?.text?.replace(regex,"") : ' '}</p>
              </Tooltip> ,
              align : 'center' ,
              // key : option.text?.id,
              width : 53,
              ellipsis: true,
              dataIndex : option.text
            }))
        })))
      // console.log()
      ResultData?.forEach((AnswerSet,index) => {

       if(AnswerSet.answers && AnswerSet.answers.length)
      {
        rows.push({});
  
         AnswerSet.answers.forEach((item) => {
          if(!item.answer)  
            return
            // console.log(rows,index)
            if(typeof item.answer != 'object')
            {
               rows[rows.length - 1][item.question] = item.answer ? digitsEnToFa(item.answer) : '';
            }
             
            else
            
            {
              if(item.answer.options)
              {
                item.answer.options.forEach(optionItem => {
                  optionItem?.text == '<span>سایر</span>' ? 
                  rows[rows.length - 1][optionItem.text] = item.answer.other_text
                  :
                  rows[rows.length - 1][optionItem.text] = optionItem.text != 'null' ? optionItem.text?.replace(regex,"") : ' ';
                })
              }
                else if (item.question_type == 'drop_down')
                {
                  item.answer.forEach(optionItem => {
                    rows[rows.length - 1][optionItem.text] = optionItem.text != 'null' ? optionItem.text : ' ';
                  })
                }
                else if(item.question_type == 'sort')
                    item.answer.forEach(optionItem => {
                      rows[rows.length - 1][optionItem.text] = digitsEnToFa(item.answer?.findIndex(item => item.text == optionItem.text) + 1);
                    })
            }
             
              rows[rows.length - 1]['key'] = item.id;
              rows[rows.length - 1]['ردیف'] = rows.length ;
              
        })
        rows[rows.length - 1]['id'] = AnswerSet.id;
      }
      else if(!AnswerSet.answers.length)
      { 
        rows.push({});
        QuestionnaireQuery.data?.data?.questions.forEach(item => {
          if(item.question)
          {
            rows[rows.length - 1][item?.question?.title] = '';
            rows[rows.length - 1]['id'] = AnswerSet.id;
            rows[rows.length - 1]['key'] = AnswerSet.id;
            rows[rows.length - 1]['ردیف'] = rows.length
            // console.log(rows[rows.length - 1][item?.question?.title])
          if(item?.question?.options)
          {
            item.question.options.forEach(optionItem => {
              rows[rows.length - 1][optionItem.text] = ''
            })
          }
        }
        })
      }
    })

    setTableColumns(columns);
    setTableData(rows);
    }
    else 
    {
      setTableColumns([]);
      setTableData([]);
    }
  },[ResultData , QuestionnaireQuery])
  
const ResultSearchHandler = async (e) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(function() {
        // Do the ajax stuff
        if(!e.target.value?.length)
          setSearchValue(null)
        else
          setSearchValue(e.target.value)
    }, 1000);

} 

  useEffect(() => {
    if(tableRef.current)
      ScrollByDrag(); 
  }, [document.querySelector("thead.ant-table-thead tr")]);
  const DeleteRowHandler = async () => {
    try
    {
      if(selectedRows.length)
      {
        selectedRows.forEach(async (row) => {
           await axiosInstance.delete(`/question-api/questionnaires/${QuestionnaireQuery.data?.data?.uuid}/answer-sets/${row}/`)
          //  setRowDeleted(true)
            ResultQuery?.refetch()
            setResultData(ResultQuery?.data?.data.results)
         }) 
         setDeleteRowState(false);
      }
    }
    catch(err)
    {
      resultMessage.error({
        content : err.response?.data,
        style : {
          fontFamily : 'IRANSans',
          display : 'flex',
          alignItems : 'center',
          justifyContent : 'center',
          direction : 'rtl'
        }
      })
      setDeleteRowState(false);
    }
  
  }
  const DateFilterHandler = async (_,filterDate) => {
    // console.log(filterDate.validatedValue)
    if(!filterDate.validatedValue?.length)
    {
      setStartDate('');
      setEndDate('')
      // setResultData(ResultQuery?.data?.data.results)
      return
    }
    try {
      // console.log('check')
      setStartDate(convertDate(digitsFaToEn(filterDate.validatedValue[0]),'gregorian'));
      setEndDate(filterDate.validatedValue[1] ? convertDate(digitsFaToEn(filterDate.validatedValue[1]),'gregorian') : '')
    }
   catch(err)
   {
    console.log(err)
   }
  }

  return (
    (ResultQuery.isLoading && queryStatus != 'Search') ? 
    <ResultTableContainer loading='active'>
        <ResultBodyContainer>
        <ResultBodyTopPart style={{ flexDirection : 'column' }}>
            <QuestionSearchContainer style={{ marginBottom : 0 }}>
                <Skeleton.Input active />
              </QuestionSearchContainer>
              <ResultBodyTopPart style={{ marginTop : 0 }}>
            <TableOutPut>
                <div className='table_control'>
                    <Skeleton.Button active /> 
                    <Skeleton.Button active />
                </div>
            </TableOutPut>
            <div className='date_filter'>         
              <Skeleton.Button active />
              <Skeleton.Button active style={{ width : 120 }}/>
            </div>
        </ResultBodyTopPart>
        </ResultBodyTopPart>
        <ResultTableContainer>
            <SkeletonTable columns={5} rowCount={10}/>
        </ResultTableContainer>
    </ResultBodyContainer>
    </ResultTableContainer>  :
    <ResultBodyContainer>
      <QuestionSearchContainer style={{ marginTop : 10}}>   
            <Input 
            placeholder="براساس عنوان سوال جست‌وجو کنید"
            allowClear
            onChange={ResultSearchHandler}
            />
            <div className='search_icon_box'>
              <Icon name='GraySearch' style={{ width : 15 }}/>
            </div>
          </QuestionSearchContainer>
      {contextHolder}
        <ResultBodyTopPart>
            <TableOutPut>
                <div className='table_control'>
                <RemovePopup DeleteState={deleteRowState} onOkay={DeleteRowHandler}
                setDeleteState={setDeleteRowState} title='نتیجه یا نتایجی که انتخاب کردید حذف شود؟'/>  
                    <DeleteRowButton onClick={() => setDeleteRowState(true)} disabled={!selectedRows.length}>
                        <Icon name='trash' />
                     </DeleteRowButton>     
                    <ResultButton 
                    onClick={() => ExcelExportHandler(ResultData,QuestionnaireQuery)}
                    >دریافت نتایج</ResultButton>    
                </div>
            </TableOutPut>
            <div className='date_filter'>         
            <DatePicker  format="YYYY-MM-DD"
            onChange={DateFilterHandler}
            
              render={(value, openCalendar) => {
                
                return (
                  <TimePickerContainer active={'active'} style={{ width : '100%' }}>
                    <input value={value} onClick={openCalendar}  placeholder='انتخاب تاریخ' readOnly />
                    <Icon name='Calender' />
                  </TimePickerContainer>
                )}}
              range
              plugins={[
                <DatePanel position="left" />
              ]}
              calendar={persian}
              calendarPosition="bottom-left"
              locale={persian_fa}
            />
            <Link href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/Charts/`}>
                <ResultButton>نمودار ها</ResultButton>
            </Link>
            
            </div>
        </ResultBodyTopPart>
        <ResultTableContainer>
           { (TableColumns?.length && TableData?.length) ?  <Table 
              columns={TableColumns}
              dataSource={TableData}       
              ref={tableRef}
              sticky
              loading={LoadingTable}
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
                onChange : (_,SelectedList) => {
                  console.log(SelectedList)
                  setSelectedRows(SelectedList?.map(item => item?.id))
                },
                hideSelectAll : true,
                columnWidth : 54,
                renderCell : 
                (checked, record, index, originNode) => <div className='order_cell'>
                <div className='order_cell_number'>
                   <p>{digitsEnToFa(index + 1)}</p>
                </div>
                <div className='order_checkbox'>
                  {originNode}
                </div>
                
                </div>,
                columnTitle : () => <p>ردیف</p>
              }}
              size="middle"
              scroll={{  x: 2500, y: "50vh" , draggable : true}}
              scrollableTarget="table-wrapper"
             /> : (!QuestionnaireQuery.data?.data?.questions?.length) ? <EmptyResultContainer>
                <img src={EmptyImage.src} />
                <p>هنوز هیچ سوالی نساختید</p>
                <Link onClick={() => setItem('tabType','question_design')}
                 href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/`}>
                  <EmptyButtonPage type='primary'>الان بسازید</EmptyButtonPage>
                </Link>
              </EmptyResultContainer>
              : <EmptyResultContainer>
                <div className='no_data_table'>
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
                loading={LoadingTable}
                />
                </div>
            </EmptyResultContainer> 
              }
        </ResultTableContainer>
    </ResultBodyContainer>
  )
}

export const ScrollByDrag = () => {
    const slider = document.querySelector("thead.ant-table-thead tr");

    const body = document.querySelector(".ant-table-container .ant-table-body");
    let isDown = false;
    let startX;
    let startY;
    let scrollTop;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - body.offsetLeft;
      startY = e.pageY - body.offsetTop;
      scrollLeft = body.scrollLeft;
      scrollTop = body.scrollTop;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - body.offsetLeft;
      const y = e.pageY - body.offsetTop;
      const yWalk = (y - startY) * 3;
      const walk = (x - startX) * 3; //scroll-fast
      slider.scrollLeft = scrollLeft - walk;
      slider.scrollTop = scrollTop - yWalk;
    });
    body.addEventListener("mousedown", (e) => {
      isDown = true;
      body.classList.add("active");
      startX = e.pageX - body.offsetLeft;
      startY = e.pageY - body.offsetTop;
      scrollTop = body.scrollTop;
      scrollLeft = body.scrollLeft;
    });
    body.addEventListener("mouseleave", () => {
      isDown = false;
      body.classList.remove("active");
    });
    body.addEventListener("mouseup", () => {
      isDown = false;
      body.classList.remove("active");
    });
    body.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - body.offsetLeft;
      const y = e.pageY - body.offsetTop;
      const walk = (x - startX) * 3; //scroll-fast 
      const yWalk = (y - startY) * 3;
      body.scrollLeft = scrollLeft - walk;
      body.scrollTop = scrollTop - yWalk;
    });
}