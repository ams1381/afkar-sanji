import { ResultBodyContainer , ResultButton , DeleteRowButton , EmptyButtonPage ,
      ResultTableContainer , EmptyResultContainer , ResultBodyTopPart , TableOutPut } from '@/styles/Result/ResultPage';
import { Icon } from '@/styles/icons';
import { Skeleton , Table , ConfigProvider, Upload, message, Tooltip, Button, Modal, Select } from 'antd';
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import { DatePicker as DatePickerJalali, JalaliLocaleListener } from "antd-jalali";
import moment from 'moment-jalaali';
import Link from 'next/link';
import transition from "react-element-popper/animations/transition"
import { axiosInstance } from '@/utilities/axios';
import EmptyImage from '../../public/Images/empty-image.png'
import ScrollContainer from 'react-indiana-drag-scroll'
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

const SkeletonTable = ({ columns, rowCount }) => {
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
  console.log(columns,rows)
  const excel = new Excel();
  excel
    .addSheet("test")
    .addColumns(columns)
    .addDataSource(rows, {
      str2Percent: true
    })
    .saveAs(`${QuestionnaireQuery.data?.data?.name}ExcelOutput.xlsx`);
}
export const ResultBody = ({ ResultQuery , QuestionnaireQuery }) => {
  const [ resultMessage , contextHolder] = message.useMessage();
  const [ deleteRowState , setDeleteRowState ] = useState(false);
  const [ selectedRows , setSelectedRows ] = useState([]);
  const [ SearchValue , setSearchValue ] = useState('')
  const [ DateFilterValue , setDateFilterValue ] = useState(null);
  const [ ClearedFilterState , setClearedFilterValueState ] = useState(false);
  const tableRef = useRef(null);
  let ResultData = ResultQuery.data?.data;
  // let selectedRows = [];
  let columns = [];
  let rows = [];

  ResultData?.forEach((AnswerSet,index) => {
    if(AnswerSet.answers && AnswerSet.answers.length)
    {
      rows.push({});
      columns = AnswerSet.answers.map(item => ({ 
        excelTitle : item.question, 
        title : <Tooltip 
        title={<div className='tooltip_container' onClick={() => navigator.clipboard.writeText(item.question)}>
          {item.question} <Icon name='WDuplicate' />
          </div>}>
              <p>{item.question}</p>
          
          </Tooltip> , 
        render : (Answer) => (Answer && typeof Answer == 'string' && Answer.includes('/media/'))
        ? 
        <Upload isImageUrl={() => true} disabled
        iconRender={() => <Icon name='File' />}
         defaultFileList={[{
          name: Answer.split('/')[6],
          status: 'done',
          url: 'https://mostafarm7.pythonanywhere.com' + Answer,
          thumbUrl : 'https://mostafarm7.pythonanywhere.com' + Answer
        }]} />: 
        <div ><p>{Answer}</p></div>,
        dataIndex : item.question  , 
        key : item.id ,
        align : 'center' ,
        children : Array.isArray(item.answer) ? item.answer?.map(optionItem => ({
          excelTitle : optionItem.text,
          title : <Tooltip title={<div className='tooltip_container' 
          onClick={() => navigator.clipboard.writeText(optionItem.text)}>
          {optionItem.text} <Icon name='WDuplicate' />
          </div>}>
              <p>{optionItem.text}</p>
          </Tooltip>  ,
          align : 'center' ,
          key : optionItem.key,
          dataIndex : optionItem.text
        })) : item.answer?.options?.map(optionItem => ({
          excelTitle : optionItem.text, 
          title : <Tooltip title={<div className='tooltip_container' 
          onClick={() => navigator.clipboard.writeText(optionItem.text)}>
          {optionItem.text} <Icon name='WDuplicate' />
          </div>}>
              <p>{optionItem.text}</p>
          </Tooltip>  ,
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
            {
              
              item.answer.options.forEach(optionItem => {
                rows[rows.length - 1][optionItem.text] = optionItem.text ? optionItem.text : '';
              })
            }
              
          }
           
            rows[rows.length - 1]['key'] = item.id;
            rows[rows.length - 1]['ردیف'] = rows.length ;
            
      })
      rows[rows.length - 1]['id'] = AnswerSet.id;
    }
  })
 

const ResultSearchHandler = async (e) => {
  if(!e)
  {
    ResultData = ResultQuery.data?.data
    return
  }    
  try 
  {
   let { data } = await axiosInstance.get(`/result-api/${QuestionnaireQuery.data?.data?.uuid}/answer-sets/search/?search=${e}`);
   ResultData = data;
  }
  catch(err)
  {
    console.log(err)
    resultMessage.error({
      content : 'یافت نشد',
      duration : 6,
      style : {
        fontFamily : 'IRANSans',
        direction : 'rtl'
      }
    })
  }
} 

  useEffect(() => {
    if(tableRef.current)
        ScrollByDrag();  
  }, [tableRef.current]);
  const DeleteRowHandler = async () => {
    try
    {
      if(selectedRows.length)
        selectedRows.forEach(async (row) => {
           await axiosInstance.delete(`/question-api/questionnaires/${QuestionnaireQuery.data?.data?.uuid}/answer-sets/${row}/`)
    }) 
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
    }
  }

  const DateFilterHandler = async (_,filterDate) => {
    // console.log(filterDate)
    // console.log()
    // convertDate
    // return
    try {
      
      //  else {
        let response =  await axiosInstance.get(`/result-api/${QuestionnaireQuery.data?.data?.uuid}/answer-sets/?answered_at&start_date=
        ${convertDate(digitsFaToEn(filterDate.validatedValue[0]),'gregorian')}
        &end_date=${filterDate.validatedValue[1] ? convertDate(digitsFaToEn(filterDate.validatedValue[1]),'gregorian') : ''}`)
        ResultData =  response?.data;
        console.log(ResultData)
      //  }
    }
   catch(err)
   {
    console.log(err)
   }
  }
  return (
    ResultQuery.isLoading ? 
    <ResultTableContainer loading='active'>
        <ResultBodyContainer>
        <ResultBodyTopPart>
            <TableOutPut>
                <div className='table_control'>   
                        <Skeleton.Button loading />    
                        <Skeleton.Button loading /> 
                </div>
                
            </TableOutPut>
            <div className='date_filter'>      
                <Skeleton.Input loading style={{ width : 300 }}/>
                <Skeleton.Input loading />
            </div>
        </ResultBodyTopPart>
        <ResultTableContainer>
            <SkeletonTable columns={5} rowCount={10}/>
        </ResultTableContainer>
    </ResultBodyContainer>
    </ResultTableContainer>  :
    <ResultBodyContainer>
      <QuestionSearchContainer style={{ marginTop : 10 }}>   
                <Select
                showSearch
                defaultActiveFirstOption={false}
                suffixIcon={<div>
                  <Icon name='GraySearch' style={{ width : 15 }}/>
                  </div>}
                allowClear
                placeholder="براساس عنوان سوال جست‌وجو کنید"
                optionFilterProp="children"
                onSearch={ResultSearchHandler}
               
                style={{ width : '100%' , height : '100%' , direction : 'rtl' , fontFamily : 'IRANSans' }}
                notFoundContent={null}
                />
                 
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
            animations={[transition()]}
            onChange={DateFilterHandler}
              render={(value, openCalendar) => {
             
                return (
                  <TimePickerContainer active={'active'} style={{ width : '100%' }}>
                    <input value={value} onClick={openCalendar}  placeholder='انتخاب تاریخ' />
                    <Icon name='Calender' />
                  </TimePickerContainer>
                )}}
              range
              plugins={[
                <DatePanel position="left" />
              ]}
              // onChange={DateChangeHandler}
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
           { ResultData?.length ?  <Table 
              columns={columns}
              dataSource={rows}
              ref={tableRef}
              sticky
              bordered
              direction='ltr'
              pagination={false}
              components={(fd) => console.log(fd)}
              rowSelection={{
                onChange : (_,SelectedList) => {
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
             /> : <EmptyResultContainer>
                <img src={EmptyImage.src} />
                <p>هنوز هیچ سوالی نساختید</p>
                <Link href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/`}>
                  <EmptyButtonPage type='primary'>الان بسازید</EmptyButtonPage>
                </Link>
              </EmptyResultContainer>}
        </ResultTableContainer>
    </ResultBodyContainer>
  )
}

const ScrollByDrag = () => {
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
  // })
    
}