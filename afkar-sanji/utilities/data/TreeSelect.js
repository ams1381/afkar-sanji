export const userTreeData = [
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
                title : 'بدون درخواست پرسشگری' ,
                value : 'n'
            },
            // {
            //     title : 'رد شده' ,
            //     value : 'r'
            // },
            // {
            //     title : 'تایید شده' ,
            //     value : 'a'
            // },
            {
                title : 'نیاز به تایید' ,
                value : 'p'
            }

        ]
    },
];

export const questionnairesTreeData = [
    {
        label : 'وضعیت قیمت' ,
        value : 'price status' ,
        children : [
            // {
            //     label : 'تعیین شده' ,
            //     // value : 'approved_price_employer'
            //     value
            // },
            {
                label : 'در انتظار تعیین ادمین' ,
                value : 'pending_price_admin'
            },
            {
                label : 'در انتظار تعیین کارفرما' ,
                value : 'pending_price_employer'
            },
            {
                label : 'رد شده توسط  کارفرما' ,
                value : 'rejected_price_employer'
            }
        ]
    } ,
    {
        label : 'وضعیت تعیین سطح',
        value : 'level status' ,
        children:  [
            {
                label : 'تعیین سطح شده',
                value : 'approved_level_admin'
            },
            {
                label : 'نیاز به تعیین سطح',
                value : 'pending_level_admin'
            },
            // {
            //     label : 'تعیین سطح کامل نشده' ,
            //     value :  'pending_level_admin'
            // }
        ]
    },
    {
        label: 'وضعیت پرسشگری' ,
        value : 'interview status' ,
        children:  [
            {
                label : 'پرسش‌گر دارد',
                value : 'has_interviewer'
            },
            {
                label : 'پرسش‌گر ندارد' ,
                value : 'no_interviewer'
            }
        ]
    }
]