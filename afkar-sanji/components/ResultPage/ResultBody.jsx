import { ResultBodyContainer , ResultButton , DeleteRowButton ,
      ResultTableContainer , ResultBodyTopPart , TableOutPut } from '@/styles/Result/ResultPage';
import { Icon } from '@/styles/icons';
import { Skeleton , Table , ConfigProvider, Upload, message, Tooltip } from 'antd';
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import { DatePicker as DatePickerJalali, JalaliLocaleListener } from "antd-jalali";
import moment from 'moment-jalaali';
import Link from 'next/link';
import { axiosInstance } from '@/utilities/axios';
import ScrollContainer from 'react-indiana-drag-scroll'
import { digitsEnToFa } from '@persian-tools/persian-tools';
import { convertDate, convertStringToDate } from '../QuestionnairePanel/SettingPanel';
import { Excel } from 'antd-table-saveas-excel';
import { useRef } from 'react';

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
  const tableRef = useRef(null);
  let ResultData = ResultQuery.data?.data;
  let selectedRows = [];
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
        <p>{Answer}</p>,
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
              item.answer.options.forEach(optionItem => {
                rows[rows.length - 1][optionItem.text] = optionItem.text;
              })
          }
           
            rows[rows.length - 1]['key'] = item.id;
            rows[rows.length - 1]['ردیف'] = rows.length ;
      })
    }
  }) 

  useEffect(() => {
    if(tableRef.current)
      ScrollByDrag();  
  }, [tableRef.current]);
  const RowSelectHandler = (RowInfo) => {
      if(selectedRows.find(item => item.key == RowInfo.key))
        selectedRows.splice(selectedRows.findIndex(item => item.key == RowInfo.key) , 1)
      else
        selectedRows.push(RowInfo)
  }
  const DeleteRowHandler = async () => {
    try
    {
      if(selectedRows.length)
        selectedRows.forEach(async (row) => {
           await axiosInstance.delete(`/question-api/questionnaires/${QuestionnaireQuery.data?.data?.uuid}/answer-sets/${row.id}/`)
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
    try {
       if(filterDate[0].length == 0)
        ResultData = ResultQuery.data?.data;
       else {
        let response =  await axiosInstance.get(`/result-api/${QuestionnaireQuery.data?.data?.uuid}/answer-sets/?answered_at&${convertDate(filterDate[0],'gregorian')}&${convertDate(filterDate[1],'gregorian')}`)
        ResultData =  response?.data;
       }
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
      {contextHolder}
        <ResultBodyTopPart>
            <TableOutPut>
                <div className='table_control'>   
                    <DeleteRowButton>
                        <Icon name='trash' />
                     </DeleteRowButton>     
                    <ResultButton 
                    onClick={() => ExcelExportHandler(ResultData,QuestionnaireQuery)}
                    >دریافت نتایج</ResultButton>    
                </div>
                
            </TableOutPut>
            <div className='date_filter'>      
                
            <ConfigProvider locale={fa_IR} direction="rtl">
                <DatePickerJalali.RangePicker direction="ltr"
                onChange={DateFilterHandler}
                defaultValue={[dayjs(convertDate(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDay(),'jalali'))]}
                locale={fa_IR.DatePicker} 
                />
                <JalaliLocaleListener /> 
            </ConfigProvider>
            <Link href={`/questionnaire/${QuestionnaireQuery.data?.data?.uuid}/Charts/`}>
                <ResultButton>نمودار ها</ResultButton>
            </Link>
            
            </div>
        </ResultBodyTopPart>
        <ResultTableContainer>
            <Table 
              columns={columns}
              dataSource={rows}
              ref={tableRef}
              sticky
              bordered
              direction='ltr'
              pagination={false}
              components={(fd) => console.log(fd)}
              rowSelection={{
                onSelect : RowSelectHandler,
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
             />
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