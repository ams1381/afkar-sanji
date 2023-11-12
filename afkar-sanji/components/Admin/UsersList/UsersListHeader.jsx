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
import {Button, Popover, Input, TreeSelect} from "antd";
import React , { useState } from "react";
import {ProjectFilterPopover} from "@/components/Admin/UsersList/ProjectFilterPopover";
import {axiosInstance} from "@/utilities/axios";

export const UsersHeader = ({ selectedRows , setRoleFilterValue  , HeaderMode , setInterviewRequestFilter , refetchList , setUserSearchValue }) => {
    const [ filterProjectPopover , setFilterProjectPopover ] = useState(false);
    const [ deleteRowLoading , setDeleteRowLoading ] = useState(false);
    const [ SeachInputValue , setSeachInputValue ] = useState(null);
    const [ TreeSelectValue , setTreeSelectValue ] = useState([]);
    let delayTimer;
    const deleteTableRow = async () => {
        setDeleteRowLoading(true)
        try {
            selectedRows.forEach(async (SelelectedRow) => {
                await axiosInstance.delete(`/admin-api/${HeaderMode}/${SelelectedRow.key}/`)
            })
            setDeleteRowLoading(false)
            refetchList()
        }
       catch (err) {
           setDeleteRowLoading(false)
       }

    }
    const UserSearchHandler = async (e) => {
        setSeachInputValue(e.target.value)
        clearTimeout(delayTimer);
        delayTimer = setTimeout(function() {

            // Do the ajax stuff
            if(!e.target.value?.length)
                setUserSearchValue(null)
            else
                setUserSearchValue(e.target.value)
        }, 1000);
    }
    return <UsersListHeader>
        <UsersListTopPartContainer>
            <div>
                <p>تنظیمات لیست</p>
            </div>
            <UsersListFiltersContainer>
                <HeadersRefreshButton>
                    <Icon name={'Retry'} />
                </HeadersRefreshButton>
                <ResetFiltersContainer>
                    <HeaderDeleteButton onClick={() => deleteTableRow()} loading={deleteRowLoading} disabled={!selectedRows.length}>
                        { !deleteRowLoading && <Icon name={'OutlineTrash'}/>}
                    </HeaderDeleteButton>
                    <HeaderResetFilters onClick={() => {
                        setUserSearchValue(null);
                        setInterviewRequestFilter(null);
                        setRoleFilterValue('')
                        setTreeSelectValue([])
                        setSeachInputValue(null)
                    }}>
                        <Icon name={'ResetFilter'} />
                        <p>بازنشانی فیلتر‌ها</p>
                    </HeaderResetFilters>
                </ResetFiltersContainer>
                {/*  Search Box  */}
                <HeaderSearchContainer>
                    <HeaderSearchInput value={SeachInputValue ? SeachInputValue : ''}
                        onChange={UserSearchHandler}
                        placeholder={'جست‌وجو براساس نام و شماره‌موبایل'} />
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
                    placement={'bottomLeft'}
                    treeCheckable={true}
                    multiple={true}
                    onChange={(value, node, extra) => {
                        setTreeSelectValue(value)
                        // console.log(node)
                        // console.log(value, node, extra)
                        // if(node.length === 1) {
                        if(!node.length) {
                            setRoleFilterValue('')
                            setInterviewRequestFilter(null)
                        }

                        else {
                            if (node.includes('کارفرما'))
                                setRoleFilterValue('e')
                            else if (node.includes('پرسشگر'))
                                setRoleFilterValue('i')
                        }

                            // console.log()
                        // }
                        if(node.length === 2 && node.includes('کارفرما') && node.includes('پرسشگر'))
                            setRoleFilterValue('ie');
                        if(node.length > 2) {
                            let interview_req_status = value.filter(item => (item!== 'e' && item !== 'i'))
                            setInterviewRequestFilter('&interviewer_role_request_status=' + interview_req_status.join('&interviewer_role_request_status='))
                            // console.log())
                        }
                    }}

                    // dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                />

            </div>
            <FiltersDropdownContainer>
                { HeaderMode === 'users' ? <>
                    <Popover placement={'bottom'}
                             trigger={'click'}
                             showCheckedStrategy={TreeSelect.SHOW_PARENT}
                             onOpenChange={() => setFilterProjectPopover(false)}
                             content={<ProjectFilterPopover/>}
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
                               content={<ProjectFilterPopover/>}
                               open={filterProjectPopover}>
                    <FilterButton open={filterProjectPopover}
                                  onClick={() => setFilterProjectPopover(!filterProjectPopover)}>
                        <p>فیلتر براساس شناسه کاربر</p>
                        <Icon name={'ArrowDown'}/>
                    </FilterButton>
                </Popover>
}
            </FiltersDropdownContainer>
        </UsersListBottomPartContainer>
    </UsersListHeader>

}
const userTreeData = [
    {
        title: 'کارفرما',
        value: 'e',
    },
    {
        title: 'پرسشگر',
        value: 'i',
    },
    {
        title: 'کاربر',
        value: 'u',
        children : [
            {
                title : 'بدون درخواست' ,
                value : 'n'
            },
            {
                title : 'رد شده' ,
                value : 'r'
            },
            {
                title : 'تایید شده' ,
                value : 'a'
            },
            {
                title : 'نیاز به تایید' ,
                value : 'p'
            }

        ]
    },
];

const questionnairesTreeData = [
    {
        label : 'ایجاد شده توسط کاربر' ,
        value : 'made_by_user',
    } ,
    {
        label : 'ایجاد شده توسط کارفرما' ,
        value : 'made_by_em' ,
        children : [
            {
                label : 'وضعیت قیمت' ,
                value : 'price status' ,
                children : [
                    {
                        label : 'تعیین شده' ,
                        value : 'APPROVED_PRICE_EMPLOYER'
                    },
                    {
                        label : 'تعیین نشده' ,
                        value : 'PENDING_PRICE_ADMIN'
                    },
                    {
                        label : 'رد شده توسط ادمین' ,
                        value : 'REJECTED_PRICE_EMPLOYER'
                    }
                ]
            } ,
            {
                label : 'وضعیت تعیین سطح',
                value : 'level status' ,
                children:  [
                    {
                        label : 'تعیین سطح شده',
                        value : 'APPROVED_LEVEL_ADMIN'
                    },
                    {
                        label : 'نیاز به تعیین سطح'
                    },
                    {
                        label : 'تعیین سطح کامل نشده' ,
                        value :  'PENDING_LEVEL_ADMIN'
                    }
                ]
            },
            {
                label: 'وضعیت پرسشگری' ,
                value : 'interview status' ,
                children:  [
                    {
                        label : 'پرسش‌گر دارد',
                        value : 'has questioner'
                    },
                    {
                        label : 'پرسش‌گر ندارد' ,
                        value : 'no questioner'
                    }
                ]
            }
        ]
    }
]