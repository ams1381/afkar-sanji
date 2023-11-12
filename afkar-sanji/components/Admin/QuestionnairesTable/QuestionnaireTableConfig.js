import {Divider, Space} from "antd";
import {TableBlockButton} from "@/styles/Admin/adminPanel";

export const QuestionnaireTableColumns = () => {
    return [
        {
            title : 'شناسه' ,
            dataIndex : 'id',
            sorter : true
        },
        {
            title: 'نام',
            dataIndex: 'name',
            key: 'name',
            sorter : true ,
        },
        {
            title: 'تاریخ ایجاد',
            dataIndex: 'createAt',
            key: 'createAt',
            sorter : true ,
        },
        {
            title: 'میانگین سطح',
            dataIndex: 'avgLevel',
            key: 'avgLevel',
            // sorter : true ,
        },
        {
            title: 'تاریخ تعیین سطح',
            dataIndex: 'levelDate',
            key: 'levelDate',
            // sorter : true ,
        },
        {
            title: 'وضعیت',
            dataIndex: 'questionnaireStatus',
            key: 'questionnaireStatus',
            // sorter : true ,
        },
        {
            title: 'دکمه ها',
            dataIndex: 'tableButtons',
            key: 'tableButtons',
            render : (_,record) => {
                return <Space size="large" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span onClick={() => SetActivePopupUser({ id : record.key })}
                          style={{color: 'var(--primary-color)', cursor: 'pointer'}}>مشاهده کاریر</span>
                    <Divider type={'vertical'}/>
                    <TableBlockButton style={{color: 'var(--Error-color)', cursor: 'pointer'}}>
                        بسته‌ قیمت
                        </TableBlockButton>



                </Space>
            }
            // sorter : true ,
        }
    ]
}