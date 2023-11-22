import {
    FilterButton,
    FiltersDropdownContainer,
    HeaderDeleteButton, HeaderResetFilters, HeaderSearchContainer, HeaderSearchInput,
    HeadersRefreshButton, HeadersTreeSelect, ResetFiltersContainer, UsersListBottomPartContainer,
    UsersListFiltersContainer,
    UsersListHeader,
    UsersListTopPartContainer
} from "@/styles/Admin/adminPanel";
import {Icon } from "@/styles/icons";
import {Button, Popover, Input, TreeSelect, message} from "antd";
import React , { useState } from "react";
import {ProjectFilterPopover} from "@/components/Admin/UsersList/ProjectFilterPopover";
import {axiosInstance} from "@/utilities/axios";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {QuestionnaireIDFilter} from "@/components/Admin/QuestionnaireList/QuestionnaireIDFilter";
import {questionnairesTreeData, userTreeData} from "@/utilities/data/TreeSelect";

export const UsersHeader = ({
        selectedRows ,
        setRoleFilterValue  ,
        HeaderMode ,
        filteredIDQuestionnaires,
        setFilteredIDQuestionnaires,
        InterviewSearch ,
        setHasQuestionerFilter ,
        setLevelFilter,
        setPriceFilter,
        setInterviewSearch ,
        setInterviewRequestFilter,
        refetchList ,
        QuestionnairesListQuery,
        setUserSearchValue }) => {
    const [ filterProjectPopover , setFilterProjectPopover ] = useState(false);
    const [ deleteRowLoading , setDeleteRowLoading ] = useState(false);
    const [ SeachInputValue , setSeachInputValue ] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [ TreeSelectValue , setTreeSelectValue ] = useState([]);
    let delayTimer;
    const deleteTableRow = async () => {
        setDeleteRowLoading(true)
        // uuid
        try {
            selectedRows.forEach(async (SelelectedRow) => {
                await axiosInstance.delete(`/admin-api/${HeaderMode}/${HeaderMode  === 'users' ? SelelectedRow.key : SelelectedRow.uuid}/`)
            })
            setDeleteRowLoading(false)


        }
       catch (err) {
            console.log(err)

           messageApi.error({
               content : 'در حذف کردن کاربر مشکلی پیش آمد'
           })
           setDeleteRowLoading(false)
       }
        setTimeout(() => {
            refetchList()
        },700)
    }
    const UserSearchHandler = async (e) => {
        setSeachInputValue(e.target.value)
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function() {

            // Do the ajax stuff
            if(!e.target.value?.length)
                HeaderMode === 'users' ? setUserSearchValue(null) : setInterviewSearch(null)
            else
                HeaderMode === 'users' ? setUserSearchValue(e.target.value) : setInterviewSearch(e.target.value)
        }, 1000);
    }
    return <UsersListHeader>
        {contextHolder}
        <UsersListTopPartContainer>
            <div>
                <p>تنظیمات لیست</p>
            </div>
            <UsersListFiltersContainer>
                <HeadersRefreshButton onClick={() => refetchList()}>
                    <Icon name={'Retry'} />
                </HeadersRefreshButton>
                <ResetFiltersContainer>
                    <HeaderDeleteButton onClick={() => deleteTableRow()} loading={deleteRowLoading} disabled={!selectedRows.length}>
                        { !deleteRowLoading && <Icon name={'OutlineTrash'}/>}
                    </HeaderDeleteButton>
                    <HeaderResetFilters onClick={() => {
                        if(HeaderMode  === 'users') {
                            setUserSearchValue(null);
                            setInterviewRequestFilter(null);
                            setRoleFilterValue('')
                        }
                        else {
                            setInterviewSearch(null)
                            setPriceFilter('')
                            setLevelFilter('')
                            setHasQuestionerFilter('')
                        }
                        setTreeSelectValue([])
                        setSeachInputValue(null)
                    }}>
                        <Icon name={'ResetFilter'} />
                        <p>بازنشانی فیلتر‌ها</p>
                    </HeaderResetFilters>
                </ResetFiltersContainer>
                {/*  Search Box  */}
                <HeaderSearchContainer>
                    <HeaderSearchInput value={SeachInputValue ? digitsEnToFa(SeachInputValue) : ''}
                        onChange={UserSearchHandler}
                        placeholder={HeaderMode === 'users' ? 'جست‌وجو براساس نام و شماره‌موبایل'  : 'جست‌وجو براساس صورت سوالات' } />
                    <Button type={'primary'}>
                        <Icon name={'WhiteSearch'} />
                    </Button>
                </HeaderSearchContainer>
            </UsersListFiltersContainer>
        </UsersListTopPartContainer>
        <UsersListBottomPartContainer>
            <div>
                <HeadersTreeSelect
                    style={{ direction : 'rtl' , width : 274 }}
                    suffixIcon={<Icon name={'suffixIcon'} style={{ width : 11 }} />}
                    placeholder={'لطفا انتخاب کنید'}
                    treeData={HeaderMode === 'users' ? userTreeData : questionnairesTreeData}
                    value={TreeSelectValue}
                    showCheckedStrategy={TreeSelect.SHOW_PARENT}
                    placement={'bottomLeft'}
                    treeCheckable={true}
                    // treeCheckStrictly={true}
                    multiple={true}
                    onChange={(value, node, extra) => {
                        // if(!node)
                        //     return;
                        setTreeSelectValue(value)
                        if(HeaderMode === 'users') {
                            if(!node.length) {
                                setRoleFilterValue('');
                                setInterviewRequestFilter(null);

                            }
                            else {
                                if (node.includes('کارفرما'))
                                    setRoleFilterValue('e')
                                else if (node.includes('پرسشگر'))
                                    setRoleFilterValue('i')
                            }
                            if(node.length === 2 && node.includes('کارفرما') && node.includes('پرسشگر'))
                                setRoleFilterValue('ie');
                            if(node.length <= 2 && (node.includes('بدون درخواست پرسشگری') || node.includes('نیاز به تایید'))) {
                                let interview_req_status = value.filter(item => (item!== 'e' && item !== 'i'))

                                setInterviewRequestFilter('&interviewer_role_request_status=' + interview_req_status.join('&interviewer_role_request_status='))
                            }
                            if(node.length > 2) {
                                let interview_req_status = value.filter(item => (item!== 'e' && item !== 'i'))

                                setInterviewRequestFilter('&interviewer_role_request_status=' + interview_req_status.join('&interviewer_role_request_status='))
                            }
                        }
                        else if(setPriceFilter && setLevelFilter && setHasQuestionerFilter) {
                            if(!value.length) {
                                setPriceFilter('')
                                setLevelFilter('')
                                setHasQuestionerFilter('')
                                return
                            }
                            if(node.includes('وضعیت قیمت')) {
                                setPriceFilter('')
                            }
                            if(node.includes('وضعیت تعیین سطح')) {
                                setLevelFilter('')
                            }

                            if(value.includes('pending_price_admin') || value.includes('pending_price_employer') || value.includes('rejected_price_employer')) {
                                let PriceFilteredValues = value.filter(item => item === 'pending_price_admin' || item === 'pending_price_employer' || item === 'rejected_price_employer');
                                setPriceFilter('&approval_status=' + PriceFilteredValues.join('&approval_status='))
                            }
                            if(value.includes('approved_level_admin') || value.includes('pending_level_admin')) {
                                let LevelFilteredValue = value.filter(item => item === 'approved_level_admin' || item === 'pending_level_admin');
                                setLevelFilter('&approval_status=' + LevelFilteredValue.join('&approval_status='))
                            }
                            if(value.includes('has_interviewer') || value.includes('no_interviewer')) {
                                if(value.includes('has_interviewer') && value.includes('no_interviewer'))
                                    setHasQuestionerFilter('')
                                else {
                                    if(value.includes('has_interviewer')) {
                                        setHasQuestionerFilter('true')
                                    }
                                    else if(value.includes('no_interviewer'))
                                        setHasQuestionerFilter('false')
                                }

                            }


                            // let interview_req_status = value.filter(item => (item!== 'e' && item !== 'i'))
                            // setInterviewRequestFilter('&interviewer_role_request_status=' + interview_req_status.join('&interviewer_role_request_status='))
                        }
                    }}
                />

            </div>
            <FiltersDropdownContainer>
                { HeaderMode === 'users' ? <>
                    <Popover placement={'bottom'}
                             trigger={'click'}
                             showCheckedStrategy={TreeSelect.SHOW_PARENT}
                             onOpenChange={() => setFilterProjectPopover(false)}
                             content={<ProjectFilterPopover setInterviewSearch={setInterviewSearch}
                                    InterviewSearch={InterviewSearch}/>}
                             open={filterProjectPopover}>
                        <FilterButton open={filterProjectPopover}
                                      onClick={() => setFilterProjectPopover(!filterProjectPopover)}>
                            <p>فیلتر پروژه‌ها</p>
                            <Icon name={'ArrowDown'}/>
                        </FilterButton>
                    </Popover>
                    <Popover>
                        <FilterButton>
                            <p>وضعیت مسدودیت</p>
                            <Icon name={'ArrowDown'} />
                        </FilterButton>
                    </Popover>
                </> : <Popover placement={'bottom'}
                               trigger={'click'}
                               showCheckedStrategy={TreeSelect.SHOW_PARENT}
                               onOpenChange={() => setFilterProjectPopover(false)}
                               content={<QuestionnaireIDFilter filteredIDQuestionnaires={filteredIDQuestionnaires}
                                   setFilteredIDQuestionnaires={setFilteredIDQuestionnaires}
                                    QuestionnaireListData={QuestionnairesListQuery?.data?.data} />}
                               open={filterProjectPopover}>
                    <FilterButton open={filterProjectPopover}
                                  onClick={() => setFilterProjectPopover(!filterProjectPopover)}>
                        <p>فیلتر براساس شناسه پرسشنامه</p>
                        <Icon name={'ArrowDown'}/>
                    </FilterButton>
                </Popover>
}
            </FiltersDropdownContainer>
        </UsersListBottomPartContainer>
    </UsersListHeader>

}
