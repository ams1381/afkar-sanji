import {
    AddResultButton, AddResultButtonContainer,
    CollaborationHeaderTopPart,
    CollaborationItem,
    CollaborationResultButton,
} from "@/styles/questioner/dashboard/Collaboration/collaboration";
import {Icon} from "@/styles/icons";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {digitsEnToFa} from "@persian-tools/persian-tools";


export default function ({data}) {

    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [chatModal, setChatModal] = useState(false)

    return (
        <>
            <CollaborationItem  isActive={data?.is_active} style={{gap: 10}}>
                {/*<CollaborationItemHeader>*/}
                <CollaborationHeaderTopPart>
                    <div className={'title_container'}>
                        <p>
                            {data.name}
                        </p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row-reverse', gap: 10}}>
                        <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
                            {data.price_pack ? <p style={{opacity: 0.5}}>
                                {data.price_pack.price && digitsEnToFa(data.price_pack.price)}
                            </p> : ''}
                            {/*<p style={{ opacity : 0.5 }}>۲۱،۷۰۰،۲۴۲</p>*/}
                            <Icon name={'Wallet3'}/>
                        </div>
                        <CollaborationResultButton
                            onClick={() => router.push(`/questioner/dashboard/${data?.uuid}/questioner-result`)}>
                            <Icon name={'ArrowLeftBlue'}/>
                            <p>نتایج</p>
                        </CollaborationResultButton>
                    </div>

                </CollaborationHeaderTopPart>
                <div className={'user_data'}
                     style={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
                    <div className={'user_data_container'}
                         style={{display: 'flex', alignItems: 'center', color: 'var(--Neutral-Gray9)'}}>
                        <p className={'name'}>{data.owner.first_name ? `${data.owner.first_name} ${data.owner.last_name}` : 'ناشناس'}</p>
                    </div>
                    <div>
                        <div>
                            <AddResultButton
                                onClick={() => router.push(`/questioner/dashboard/${data?.uuid}/add-result`)}>
                                {/*<img src={addIcon?.src} alt=""/>*/}
                                <AddResultButtonContainer>
                                    <Icon style={{width: 22, height: 22}} name={'AddDark'}/>
                                </AddResultButtonContainer>

                                <div style={{
                                    whiteSpace: 'nowrap',
                                    color: 'var(--primary-color)',
                                    padding: '0 5px',
                                    textAlign: 'center'
                                }}>افزودن نتیجه
                                </div>
                            </AddResultButton>
                        </div>
                    </div>
                </div>
                {/*<CollaborationItemLeft>*/}
                {/*    <div onClick={() => router.push(`/questioner/dashboard/${data?.uuid}/questioner-result`)}*/}
                {/*         className={`result`}>*/}
                {/*        /!*<img src={arrow?.src} alt=""/>*!/*/}
                {/*        <Icon name={'ArrowLeftBlue'}/>*/}
                {/*        <div className="text">نتایج</div>*/}
                {/*    </div>*/}
                {/*    <div className={`price`}>*/}
                {/*        <div className="text">۲۱،۷۰۰،۲۴۲</div>*/}
                {/*        /!*<img src={wallet?.src} alt=""/>*!/*/}
                {/*        <Icon name={'Wallet3'}/>*/}
                {/*    </div>*/}
                {/*</CollaborationItemLeft>*/}
                {/*<CollaborationItemRight color={data?.is_active ? '#5360ED' : 'red'}>*/}
                {/*    <div className={`title`}>{data.name}</div>*/}
                {/*    <div className={`caption`}>{data.owner.first_name}</div>*/}
                {/*</CollaborationItemRight>*/}
                {/*</CollaborationItemHeader>*/}
                {/*<Link style={{textDecoration: 'none'}} href={`/questioner/dashboard/${data?.uuid}/add-result`}>*/}
                {/*    <AddBtnContainer>*/}
                {/*        <Button className={'addBtn'}>*/}
                {/*            <img src={addIcon?.src} alt=""/>*/}
                {/*            <div>افزودن نتیجه</div>*/}
                {/*        </Button>*/}
                {/*    </AddBtnContainer>*/}
                {/*</Link>*/}
            </CollaborationItem>
        </>
    )
}