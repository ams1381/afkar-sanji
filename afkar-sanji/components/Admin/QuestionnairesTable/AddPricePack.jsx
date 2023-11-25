import {ChatHeaderTitle, ChatMask, ChatMessageContainer} from "@/styles/common";
import {
    PopupContainer, PopupFooter, PopupFooterButton,
    PopupHeader,
    PopupInfoContainer,
    PopupRowContainer,
    PopupTopButtonsContainer
} from "@/styles/Admin/userInfoPopup";
import {Icon} from "@/styles/icons";
import {Button, Input, InputNumber, message, Modal} from "antd";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import React, {useState} from "react";
import {styled} from "styled-components";
import TextArea from "antd/lib/input/TextArea";
import {axiosInstance} from "@/utilities/axios";

export const AddPricePack = ({ EditMode ,
         setEditPricePack
         ,setPackPopupType
            ,pricePacksList
         , activePricePopup ,
         selectedPricePack,
         setActivePricePopup ,
         QuestionnaireList}) => {
    const [ MessageApi , MessageContext ] = message.useMessage();
    const [ priceValue , setPriceValue ] = useState(EditMode ? pricePacksList.find(item => item.id ===selectedPricePack).price : null);
    const [ priceDescription , setPriceDescription ] = useState(EditMode ? pricePacksList.find(item => item.id === selectedPricePack).description : null);
    const [ priceTitle , setPriceTitle ] = useState(EditMode ? pricePacksList.find(item => item.id === selectedPricePack).name : null);
    const [ errMessage , setErrMessage ] = useState(null);
    const [ PriceLoading , setPriceLoading ] = useState(false);


    const AddPricePackHandler = async () => {
        setPriceLoading(true)
        try {
            await axiosInstance.post('/admin-api/price-packs/',{
                name : priceTitle ,
                price : priceValue ,
                description : priceDescription
            })
            setPackPopupType('view')
        } catch (err) {
            if(err?.response?.data)
                setErrMessage(Object.values(err?.response?.data)[0])
        } finally {
            setPriceLoading(false);
        }
    }
    const EditPricePackHandler = async  () => {
        setPriceLoading(true)
        try {
            await axiosInstance.patch(`/admin-api/price-packs/${selectedPricePack}/`,{
                name : priceTitle ,
                price : priceValue ,
                description : priceDescription
            })
            setEditPricePack(false)
            setPackPopupType('view')
        } catch (err) {

        } finally {
            setPriceLoading(false);
        }
    }

    return <>
        <Modal mask={true}
               preserve={false}
               destroyOnClose={true}
               onCancel={() => setActivePricePopup(null)}
               modalRender={(ReactNode) => <div style={{ direction : 'ltr' }}>{ReactNode}</div>}
               centered={true}
               closeIcon={true}
               title={<></>}
               maskClosable={true}
               footer={<></>}
               open={activePricePopup}>
            <PopupContainer style={{ height : 'auto' }}>
                <PopupHeader style={{ boxShadow : ''}}>
                    <div style={{ cursor : 'pointer' }} onClick={() => setActivePricePopup(null)}>
                        <Icon style={{ width : 12 , height : 12 }} name={'GrayClose'} />
                    </div>
                    <ChatHeaderTitle>
                        <p style={{ fontSize : 16 , color : 'black' }}>
                            اضافه کردن بسته
                        </p>
                    </ChatHeaderTitle>
                </PopupHeader>
                <ChatMessageContainer>
                    <div>
                        <div style={{ display : 'flex' , justifyContent : 'space-between' , gap : 10 }}>
                            <AddPriceInputContainer>
                                <p>ارزش هر نتیجه</p>
                                <AddPriceNumberInput style={{ fontFamily : 'IRANSans' }}
                                         value={priceValue ? digitsEnToFa(priceValue) : ''}
                                         onChange={(e) => setPriceValue(e.target.value)}
                                     placeholder={'قیمت را وارد کنید'} />
                            </AddPriceInputContainer>
                            <AddPriceInputContainer>
                                <p>عنوان بسته</p>
                                <AddPriceInput onChange={e => setPriceTitle(e.target.value)} value={priceTitle} placeholder={'کوتاه بنویسید'} />
                            </AddPriceInputContainer>
                        </div>
                        <AddPriceInputContainer style={{ marginTop : 5 }}>
                            <p>توضیحات</p>
                            <AddPriceTextarea value={priceDescription ? priceDescription : ''}
                                 onChange={(e) => setPriceDescription(e.target.value)} placeholder={'چیزی بنویسید'} />
                        </AddPriceInputContainer>
                    </div>
                    {
                        errMessage && <div style={{ color : 'var(--Error-color)' , padding : '5px 0' , textAlign : 'right' }}>
                            { errMessage }
                        </div>
                    }
                    <AddPricePackButton loading={PriceLoading} type={'primary'} onClick={EditMode ? EditPricePackHandler : AddPricePackHandler}>
                        { EditMode ? <p>
                            ثبت تغییرات
                        </p> : <span style={{ display : 'flex' , gap : 8 , alignItems : 'center' }}>
                            <p>افزودن</p>
                            <Icon style={{width : 12 , height : 12}} name={'Add'}/>
                        </span> }
                    </AddPricePackButton>
                </ChatMessageContainer>
            </PopupContainer>
        </Modal>
    </>
}
const AddPriceInput = styled(Input)`
    border-radius: 2px;
    font-family: IRANSans;
    text-align: right;
    direction: rtl;
`
const AddPriceTextarea = styled(TextArea)`
  border-radius: 2px;
  font-family: IRANSans;
  text-align: right;
  direction: rtl;
`
const AddPriceNumberInput = styled(Input)`
  border-radius: 2px;
  font-family: IRANSans;
  text-align: right;
  direction: rtl;
  width: 100%;
`
const AddPriceInputContainer = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
`

const AddPricePackButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  //flex-direction: row-reverse;
  align-items: center;
  gap: 8px;
  direction: rtl;
`