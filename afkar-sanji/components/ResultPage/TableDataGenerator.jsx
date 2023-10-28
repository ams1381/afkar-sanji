import {Tooltip, Upload} from "antd";
import {Icon} from "@/styles/icons";
import {QuestionTypeIcon} from "@/utilities/QuestionTypes";
import React from "react";
import {digitsEnToFa} from "@persian-tools/persian-tools";

export const TableColumnGenerator = (QuestionsArray,resultMessage,regex) => {
    return (QuestionsArray?.map(item => ({
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
}

export const TableDataGenerator = (ResultData,QuestionnaireQuery,regex) => {
    let rows = [];
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
    return rows;
}