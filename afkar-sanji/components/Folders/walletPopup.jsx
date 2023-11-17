import {Button, Input, Modal} from "antd";
import React, {useContext, useState} from "react";
import {PopupContainer, PopupHeader, PopupInfoContainer} from "@/styles/Admin/userInfoPopup";
import {Icon} from "@/styles/icons";
import {ChatHeaderTitle, ChatMessageContainer} from "@/styles/common";
import {styled} from "styled-components";
import {digitsEnToFa, digitsFaToEn} from "@persian-tools/persian-tools";
import {axiosInstance} from "@/utilities/axios";
import {useLocalStorage} from "@/utilities/useLocalStorage";
import {useRouter} from "next/router";
import {AuthContext} from "@/utilities/AuthContext";

export const WalletPopup = ({ setWalletPopupOpen , distPage , walletPopupOpen }) => {
    const { getItem , setItem } = useLocalStorage();
    const router = useRouter();
    const Auth = useContext(AuthContext);
    const [ WalletData , setWalletData ] = useState( { cardNumber: null , IBANNumber : null });
    const [ loadingButton, setLoadingButton ] = useState(false);
    const [ inputErrName , setInputErrName ] = useState(null);
    // const [  ]
    const [ errMessage , setErrMessage ] = useState(null);
    const createWallet = async  () => {
        setLoadingButton(true)
        try {
            await  axiosInstance.post('/wallet-api/wallet/',{
                IBAN : WalletData.IBANNumber ,
                card_number : WalletData.cardNumber
            })
            setWalletPopupOpen(false);
            await axiosInstance.patch('/user-api/users/me/',{
                role : getItem('role') === 'n' ? 'e' : 'ie'
            })
            getItem('role') === 'n' ? Auth.setUserRole('e') : Auth.setUserRole('ie')
            getItem('role') === 'n' ? setItem('role','e') : setItem('role','ie')

            if(distPage === 'employer') {
                Auth.setReqRole('interview-api/interviews');
                setItem('roleReq', 'interview-api/interviews');
                await router.push('/')
            }
            else {
                await router.push('/questioner/dashboard/wallet/')
            }
        } catch (err) {
            if(err?.response?.status === 500)
                setErrMessage('خطای داخلی سرور')
            else
                setErrMessage(Object.values(err?.response?.data)[0])
            if(Object.keys(err.response?.data).includes('IBAN'))
                setInputErrName('IBAN')
            else if(Object.keys(err.response?.data).includes('card_number'))
                setInputErrName('card_number')
        }
        finally {
            setLoadingButton(false)
        }
    }
    return <Modal mask={true}
                  preserve={false}
                  destroyOnClose={true}
                  onCancel={() => setWalletPopupOpen(false)}
                  modalRender={(ReactNode) => <div style={{ direction : 'ltr' }}>{ReactNode}</div>}
                  centered={true}
                  closeIcon={true}
                  title={<></>}
                  maskClosable={true}
                  footer={<></>}
                  open={walletPopupOpen}>
        <PopupContainer style={{ height : 'auto' }}>
            <PopupHeader style={{ boxShadow : ''}}>
                <div style={{ cursor : 'pointer' }} onClick={() => setWalletPopupOpen(null)}>
                    <Icon style={{ width : 12 , height : 12 }} name={'GrayClose'} />
                </div>
                <ChatHeaderTitle>
                    <p style={{ fontWeight : 600 }}>
                         ساخت کیف پول
                    </p>
                </ChatHeaderTitle>
            </PopupHeader>
            <ChatMessageContainer>
                <PopupInfoContainer style={{ textAlign : 'right' , margin : 0 }}>
                    <div>
                        <p>لطفا اطلاعات کیف پول خود را وارد کنید</p>
                        <InputsContainer>
                            <WalletInputContainer>
                                <p>شماره حساب</p>
                                <WalletPopupInput status={inputErrName === 'card_number' ? 'error' : null}
                                          value={WalletData.cardNumber ? digitsEnToFa(WalletData.cardNumber) : ''}
                                      onChange={(e) => {
                                          setInputErrName(null)
                                          if(!e.target.value) {
                                              setWalletData(prevState => ({
                                                  ...prevState ,
                                                  cardNumber :null
                                              }))
                                              return
                                          }
                                          const inputValue = digitsFaToEn(e.target.value);
                                          const cleanedValue = inputValue.replace(/[^0-9]/g, '');

                                          setWalletData(prevState => ({
                                              ...prevState ,
                                              cardNumber :cleanedValue
                                          }))
                                      }}
                                      placeholder={'شماره کارت را وارد کنید'} />
                            </WalletInputContainer>
                            <WalletInputContainer>
                                <p>شماره شبا</p>
                                <WalletPopupInput
                                    status={inputErrName === 'IBAN' ? 'error' : null}
                                    onChange={(e) => {
                                        setInputErrName(null)
                                        if(!e.target.value) {
                                            setWalletData(prevState => ({
                                                ...prevState ,
                                                IBANNumber :null
                                            }))
                                            return
                                        }
                                        // const inputValue = digitsFaToEn(e.target.value);
                                        // const cleanedValue = inputValue.replace(/[^0-9]/g, '');

                                        setWalletData(prevState => ({
                                            ...prevState ,
                                            IBANNumber :digitsFaToEn(e.target.value)
                                        }))
                                    }}
                                    value={WalletData.IBANNumber ? digitsEnToFa(WalletData.IBANNumber) : ''}
                                      placeholder={'شماره شبا را وارد کنید'} />
                            </WalletInputContainer>
                            <div>
                                { errMessage && <p style={{color: 'var(--Error-color)'}}>{errMessage}</p>}
                                <CreateWalletButton onClick={createWallet} loading={loadingButton} type={'primary'}>
                                    ساخت کیف پول
                                </CreateWalletButton>
                            </div>
                        </InputsContainer>

                    </div>
                </PopupInfoContainer>
            </ChatMessageContainer>
        </PopupContainer>
    </Modal>
}
const WalletPopupInput = styled(Input)`
    border-radius: 2px;
    font-family: IRANSans;
    text-align: right;
`
const WalletInputContainer = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: var(--Neutral-Gray9);
`
const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;
`
const CreateWalletButton = styled(Button)`
  width: 100%;
  height: 35px;
  margin-top: 10px;
`