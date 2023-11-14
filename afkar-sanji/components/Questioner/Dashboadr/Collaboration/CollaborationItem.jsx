// style
import {
    CollaborationItem,
    CollaborationItemLeft,
    CollaborationItemRight
} from "@/styles/questioner/dashboard/Collaboration/collaboration";
// icon

import {Icon} from "@/styles/icons";

export default function ({data}) {
    return (
        <CollaborationItem>
            <CollaborationItemLeft>
                <div className={`result`}>
                    {/*<img src={arrow?.src} alt=""/>*/}
                    <Icon name={'ArrowLeftBlue'} />
                    <div className="text">نتایج</div>
                </div>
                <div className={`price`}>
                    <div className="text">۲۱،۷۰۰،۲۴۲</div>
                    {/*<img src={wallet?.src} alt=""/>*/}
                    <Icon name={'Wallet3'} />
                </div>
            </CollaborationItemLeft>
            <CollaborationItemRight color={data?.is_active ? '#5360ED' : 'red'}>
                <div className={`title`}>{data?.owser?.first_name}</div>
                <div className={`caption`}>{data?.name ? data?.name : "ندارد"}</div>
            </CollaborationItemRight>
        </CollaborationItem>
    )
}