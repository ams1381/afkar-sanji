import {digitsEnToFa} from "@persian-tools/persian-tools";
import {Tooltip, Upload} from "antd";
import {Icon} from "@/styles/icons";
import {QuestionTypeIcon} from "@/utilities/QuestionTypes";
import React from "react";
const regex = /(<([^>]+)>)/gi;
export const TableColumnGenerator = (QuestionsArray,ResultData,resultMessage,regex,SelectedTypeFilter) => {
    let ColumnsArray =  (QuestionsArray?.map((item,index) =>  !SelectedTypeFilter.length || SelectedTypeFilter.length == 12 ?  ({
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
                                   url:  Answer,
                                   thumbUrl :  Answer
                               }]} />
            else if(typeof Answer == 'string' || typeof Answer == 'number')
                return <div>
                    <p>{Answer}</p>
                </div>
        },
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
                width : 83,
                ellipsis: true,
                dataIndex : option.text
            }))
    }) :
        SelectedTypeFilter.includes(item.question.question_type) ? ({
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
                           url: 'https://mah-api.codintofuture.ir.com' + Answer,
                           thumbUrl : 'https://mah-api.codintofuture.ir.com' + Answer
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
                width : 83,
                ellipsis: true,
                dataIndex : option.text
            }))
    }) :
            item.question.question_type == 'group' ? ({
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
                                           url: 'https://mah-api.codintofuture.ir.com' + Answer,
                                           thumbUrl : 'https://mah-api.codintofuture.ir.com' + Answer
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
                children :
                    item?.question.child_questions.map(ChildQuestion => SelectedTypeFilter.includes(ChildQuestion.question?.question_type) ?
                        ({
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
                            width : 83,
                            dataIndex : option?.text
                        }))
                    }) : null)
            }) : null));

    ColumnsArray = ColumnsArray.filter(item => item !== null);
    ColumnsArray.forEach(ColItem => {
        if(ColItem.children && ColItem.children.length)
        {
            if(ColItem.children.every(item => item === null))
                ColItem.children = [];
            else
                ColItem.children = ColItem.children.filter(item => item !== null)
        }
    })

    ColumnsArray = ColumnsArray.filter(item => (Array.isArray(item.children) && !item.children.length) ? null : item);

    return ColumnsArray;
}
export const TableDataGenerator = (ResultData,QuestionnaireQuery) => {
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
                    if(item.question_type == 'file')
                        rows[rows.length - 1][item.question] =  item.answer ? item.answer : '';
                    else
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

                // rows[rows.length - 1]['key'] = item.id;
                // rows[rows.length - 1]['ردیف'] = rows.length ;

            })
            rows[rows.length - 1]['id'] = AnswerSet.id;
            rows[rows.length - 1]['key'] = AnswerSet.id;
            rows[rows.length - 1]['ردیف'] = rows.length
        }
        else if(!AnswerSet.answers.length)
        {
            rows.push({});
            QuestionnaireQuery.data?.data?.questions.forEach(item => {
                if(item.question)
                {
                    // rows[rows.length - 1][item?.question?.title] = '';
                    // rows[rows.length - 1]['id'] = AnswerSet.id;
                    // rows[rows.length - 1]['key'] = AnswerSet.id;

                    // console.log(rows[rows.length - 1][item?.question?.title])
                    if(item?.question?.options)
                    {
                        item.question.options.forEach(optionItem => {
                            rows[rows.length - 1][optionItem.text] = ''
                        })
                    }
                }
            })
            rows[rows.length - 1]['id'] = AnswerSet.id;
            rows[rows.length - 1]['key'] = AnswerSet.id;
        }
    })

    return rows;
}