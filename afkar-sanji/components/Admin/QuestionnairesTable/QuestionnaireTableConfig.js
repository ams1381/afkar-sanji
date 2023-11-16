import {Divider, Space} from "antd";
import {TableBlockButton, UserTag} from "@/styles/Admin/adminPanel";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {convertDate, convertToRegularTime} from "@/components/QuestionnairePanel/QuestionnaireSetting/SettingPanel";
import {Icon} from "@/styles/icons";

export const QuestionnaireTableColumns = (setActiveQuestionnairePopup,setActivePricePopup,setPackPopupType) => {
    return [
        {
            title : 'شناسه',
            dataIndex : 'id',
            sorter : (a,b) => a.key - b.key  ,
            width: 93
        },
        {
            title: 'نام',
            dataIndex: 'name',
            key: 'name',
            sorter : (a , b) => a.name?.localeCompare(b.name) ,
            width: 64
        },
        {
            title: 'تاریخ ایجاد',
            dataIndex: 'createAt',
            key: 'createAt',
            sorter : (a , b) => Date.parse(a.rowData.created_at) - Date.parse(b.rowData.created_at),
            width: 122 ,
        },
        {
            title: 'میانگین سطح',
            dataIndex: 'avgLevel',
            key: 'avgLevel',
            width: 122
            // sorter : true ,
        },
        {
            title: 'تاریخ تعیین سطح',
            dataIndex: 'levelDate',
            key: 'levelDate',
            width: 169,
            // sorter : true ,
        },
        {
            title: 'وضعیت',
            dataIndex: 'questionnaireStatus',
            key: 'questionnaireStatus',
            width: 315 ,
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        // console.log(tag)
                        let color;
                        let IconToRender;
                        if(tag?.includes('pending')) {
                            color = 'default';
                            IconToRender = <Icon name={'Union'} />
                        }
                        else if(tag?.includes('rejected')) {
                            color = 'error';
                            IconToRender = <Icon name={'RejectedInterviewRole'} />
                        }
                        else {
                            color = 'geekblue';
                            IconToRender = <Icon name={'AcceptedInterviewRole'} />
                        }
                        return (
                            <UserTag questionnaireTag={true} pending={tag?.includes('pending') ? true : null}
                                 rejected={tag?.includes('rejected') ? true : null}    color={color} key={tag}>
                                {tag?.includes('price') && ' قیمت'}
                                {tag?.includes('level') && 'سطح'}
                                {tag?.includes('content') && 'محتوا'}
                                {/*content*/}
                                { IconToRender && IconToRender }
                            </UserTag>
                        );
                    })}
                </>
            )
            // sorter : true ,
        },
        {
            title: 'دکمه ها',
            dataIndex: 'tableButtons',
            key: 'tableButtons',
            width : 315,
            render : (_,record) => {
                return <Space size="large" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span onClick={() => setActiveQuestionnairePopup({ id : record.key })} style={{color: 'var(--primary-color)', cursor: 'pointer'}}>اطلاعات</span>
                    <Divider type={'vertical'}/>
                    <TableBlockButton onClick={() => {
                        setActivePricePopup({id: record.key})
                        setPackPopupType('view')
                    }} style={{color: 'var(--primary-color)', cursor: 'pointer'}}>
                        { record.rowData.price_pack ? 'ویرایش بسته' : 'بسته قیمت' }
                        </TableBlockButton>
                </Space>
            }
            // sorter : true ,
        }
    ]
}

export const QuestionnaireTableData = (QuestionnairesListData) => {
    return QuestionnairesListData.map(QuestionnaireItem => {
     return ({
         key : QuestionnaireItem.id ,
         id : digitsEnToFa(QuestionnaireItem.id) ,
         name : QuestionnaireItem.name ,
         rowData : QuestionnaireItem,
         createAt : digitsEnToFa(convertDate(convertToRegularTime(QuestionnaireItem.created_at),'jalali')),
         avgLevel : QuestionnairesListData.difficulty ? QuestionnairesListData.difficulty : '' ,
         tags : [ QuestionnaireItem.approval_status ],
         uuid : QuestionnaireItem.uuid
     })
    })
}