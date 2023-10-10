import {
    QuestionerResultChangerContainer,
    QuestionerResultHeader, QuestionTypeFilterContainer, QuestionTypeSelector,
    RowSelectorContainer
} from "@/styles/Result/QuestionerResult";
import {Button, Checkbox, Divider, message, Popover, Select} from "antd";
import {DeleteRowButton} from "@/styles/Result/ResultPage";
import {Icon} from "@/styles/icons";
import React, {useState} from "react";
import Link from "next/link";
import { Skeleton } from "antd";
import {axiosInstance} from "@/utilities/axios";
import RemovePopup from "@/components/common/RemovePopup";

export const QuestionTypeFilterContent = ({ setSelectedTypeFilter , SelectedTypeFilter }) => {
    // const [ SelectedTypeFilter , setSelectedTypeFilter ] = useState([]);

    const SelectQuestionFilterHandler = (QuestionType) => {
        if(SelectedTypeFilter.find(item => item === QuestionType))
        {
            let FilterArray = [...SelectedTypeFilter];
            FilterArray = FilterArray.filter(item => item != QuestionType)
            setSelectedTypeFilter(FilterArray)
        }
        else
        {
            let FilterArray = [...SelectedTypeFilter];
            FilterArray.push(QuestionType)
            setSelectedTypeFilter(FilterArray)
        }
    }
    return <QuestionTypeFilterContainer>
        <div className={'filter_type_item'} onClick={() => SelectQuestionFilterHandler('optional')}>
            <p>چند گزینه ای</p>
            <Checkbox checked={SelectedTypeFilter.find(item => item === 'optional')} />
        </div>
        <div className={'filter_type_item'} onClick={() => SelectQuestionFilterHandler('integer_selective')}>
            <p>درجه بندی</p>
            <Checkbox checked={SelectedTypeFilter.find(item => item === 'integer_selective')} />
        </div>
        <div className={'filter_type_item'} onClick={() => SelectQuestionFilterHandler('no_answer')}>
        <p>متنی بدون پاسخ</p>
        <Checkbox checked={SelectedTypeFilter.find(item => item === 'no_answer')} />
    </div>
        <div className={'filter_type_item'} onClick={() => SelectQuestionFilterHandler('file')}>
        <p>آپلود فایل</p>
        <Checkbox checked={SelectedTypeFilter.find(item => item === 'file')} />
    </div>
        <div className={'filter_type_item'} onClick={() => SelectQuestionFilterHandler('number_answer')}>
        <p>عدد</p>
        <Checkbox checked={SelectedTypeFilter.find(item => item === 'number_answer')} />
    </div>
        <div className={'filter_type_item'} onClick={() => SelectQuestionFilterHandler('sort')}>
        <p>اولویت دهی</p>
        <Checkbox checked={SelectedTypeFilter.find(item => item === 'sort')} />
    </div>
        <div className={'filter_type_item'} onClick={() => SelectQuestionFilterHandler('group')}>
            <p>گروه سوال</p>
            <Checkbox checked={SelectedTypeFilter.find(item => item === 'group')} />
        </div>
        <div className={'filter_type_item'} onClick={() => SelectQuestionFilterHandler('email_field')}>
            <p>ایمیل</p>
            <Checkbox checked={SelectedTypeFilter.find(item => item === 'email_field')} />
        </div>
        <div className={'filter_type_item'} onClick={() => SelectQuestionFilterHandler('link')}>
        <p>لینک</p>
        <Checkbox checked={SelectedTypeFilter.find(item => item === 'link')} />
    </div>
    <div className={'filter_type_item'} onClick={() => SelectQuestionFilterHandler('drop_down')}>
        <p>لیست کشویی</p>
        <Checkbox checked={SelectedTypeFilter.find(item => item === 'drop_down')} />
    </div>
    <div className={'filter_type_item'} onClick={() => SelectQuestionFilterHandler('text_answer')}>
        <p>متنی با پاسخ</p>
        <Checkbox checked={SelectedTypeFilter.find(item => item === 'text_answer')} />
    </div>
        <div className={'filter_type_item'} onClick={() => {
            if(SelectedTypeFilter.length == 12)
                setSelectedTypeFilter([])
            else
            setSelectedTypeFilter(['optional', 'link', 'email_field', 'group', 'sort',
                'no_answer', 'text_answer', 'file', 'drop_down', 'number_answer', 'integer_range', 'integer_selective'])
        }}>
            <p>همه گزینه ها</p>
            <Checkbox checked={SelectedTypeFilter.length == 12} />
        </div>
    </QuestionTypeFilterContainer>
}
export const QuestionerResultHead = ({ questionnaireQuery , SetCurrentPage ,
     SelectedTypeFilter,  setSelectedTypeFilter ,  CurrentPage , setSelectedRows , ResultQuery , SelectedRows }) => {
    const [ QuestionTypeSelectorPopover , setQuestionTypeSelectorPopover ] = useState(false);
    const [ DeleteRowState , setDeleteRowState ] = useState(false)
    const [ resultMessage , contextHolder] = message.useMessage();
    const DeleteRowHandler = async () => {
        try
        {
            if(SelectedRows.length)
            {
                SelectedRows.forEach(async (row) => {
                    await axiosInstance.delete(`/question-api/questionnaires/${questionnaireQuery.data?.data?.uuid}/answer-sets/${row}/`)

                    // ResultQuery?.refetch()
                })
                if(SelectedRows.length == ResultQuery?.data?.data?.results.length || ResultQuery?.data?.data?.results.length == 1)
                {
                    SetCurrentPage(CurrentPage - 1)
                }

                setTimeout(() => {
                    setDeleteRowState(false);
                    setSelectedRows([])
                },1500)
                // SelectedRows(false);
            }
        }
        catch(err)
        {
            console.log(err)
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
    return questionnaireQuery.isLoading ?
        <QuestionerResultHeader>
            <Skeleton.Input />
            <QuestionerResultChangerContainer>
                <RowSelectorContainer>
                    <label>
                        <Skeleton.Input />
                    </label>
                    {/*<DeleteRowButton>*/}
                        <Skeleton.Button style={{ width : '100px' , minWidth : '100px' }} />
                    {/*</DeleteRowButton>*/}
                </RowSelectorContainer>
                <QuestionTypeSelector open={QuestionTypeSelectorPopover ? 'active' : null}>
                    <Skeleton.Input />
                </QuestionTypeSelector>
                <Skeleton.Input />

            </QuestionerResultChangerContainer>

        </QuestionerResultHeader>
        : <QuestionerResultHeader>
            {contextHolder}
        <p>جدول نتایج</p>
        <QuestionerResultChangerContainer>
            <RowSelectorContainer>
                <label>
                    <p>انتخاب همه</p>
                    <Checkbox
                        onClick={e => e ?
                            setSelectedRows(ResultQuery?.data?.data?.results.map(item => item.id)) : setSelectedRows([])}
                        checked={ResultQuery?.data?.data?.results?.length == SelectedRows.length}/>
                </label>
                <RemovePopup DeleteState={DeleteRowState} onOkay={DeleteRowHandler}
                             setDeleteState={setDeleteRowState} title='نتیجه یا نتایجی که انتخاب کردید حذف شود؟'/>
                <DeleteRowButton disabled={!SelectedRows.length} onClick={() => setDeleteRowState(true)}>
                    <Icon name='trash' />
                </DeleteRowButton>
            </RowSelectorContainer>
            <QuestionTypeSelector open={QuestionTypeSelectorPopover ? 'active' : null}>
            <Popover
                content={<QuestionTypeFilterContent setSelectedTypeFilter={setSelectedTypeFilter}
                            SelectedTypeFilter={SelectedTypeFilter} />}
                trigger={'click'}
                placement={'bottom'}
                onOpenChange={(openState) => setQuestionTypeSelectorPopover(openState)}
                open={QuestionTypeSelectorPopover}>
                    <Icon name={'ArrowDown'}  />
                    <p onClick={() =>  setQuestionTypeSelectorPopover(!QuestionTypeSelectorPopover)}>انتخاب نوع سوال</p>
            </Popover>
            </QuestionTypeSelector>
            <Link href={`/questioner/dashboard/${questionnaireQuery?.data?.data?.uuid}/add-result/`}>
                <Button type={'primary'}>
                    + افزودن نتیجه
                </Button>
            </Link>

        </QuestionerResultChangerContainer>

    </QuestionerResultHeader>
}