import {ChatPrompt} from "@/components/Questioner/ChatModal/ChatPrompt";
import {ChatHeader} from "@/components/Questioner/ChatModal/ChatHeader";
import {ChatContainer, ChatMask, ChatMessageContainer, RecommandedContainer, RecommandedMessage} from "@/styles/common";
import {SentMessage} from "@/components/Questioner/ChatModal/SentMessage";
import React, {useEffect, useRef , useState} from "react";
import {Modal} from "antd";
import {styled} from "styled-components";
import {RecievedMessage} from "@/components/Questioner/ChatModal/RecievedMessage";
import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/utilities/axios";


import { VList } from "virtua";
import {ReadyMessageToSend} from "@/components/Questioner/ChatModal/ReadyMessageToSend";
import {FidgetSpinner, TailSpin} from "react-loader-spinner";
import {queryClient} from "@/pages/_app";

export const ChatModal = ({
          isActive,
          setIsActive ,
          Questionnaire ,
          setPopupType,
          receiverID,
          isAdmin
      }) => {
    const ChatQuery = useQuery(['ChatQuery'],
        async () => await axiosInstance.get(`/${!isAdmin ? 'interview' :'admin'}-api/tickets/${isAdmin ? `?sender_id=${receiverID}&` : ''}${Questionnaire ? `?interview_id=${Questionnaire.id}` : ''}`) ,{
            enabled : true,
            refetchOnWindowFocus : false
        })
    const [ editableMessage , setEditableMessage ] = useState(null);
    const [ messagesItems , setMessagesItems ] = useState([]);
    const [ count , setCount ] = useState(null);
    const [ nextPageUrl , setNextPageUrl ] = useState(null);
    const [ prevPageUrl , setPrevPageUrl ] = useState(null);
    const [ loadingMoreMessages , setLoadingMoreMessage ] = useState(false);
    useEffect(() => {
        if(ChatQuery.data?.data && !ChatQuery.isRefetching && !ChatQuery.isLoading) {
            setMessagesItems(ChatQuery.data?.data.results.reverse())
            setNextPageUrl(ChatQuery.data?.data?.next)
            setPrevPageUrl(ChatQuery.data?.data?.prev)
            setCount(ChatQuery.data?.data.count)
        }
    }, [ChatQuery.data?.data]);

    const ref = useRef();
    const ready = useRef(false);

    const handleScroll = async () => {
        const scrollTop = document.querySelector('.VListContainer').scrollTop;
        const windowHeight = window.innerHeight;
        const offset = document.querySelector('.VListContainer').offsetHeight;

        if(nextPageUrl === null)
            return
        if (scrollTop === 0 && !loadingMoreMessages) {
            setLoadingMoreMessage(true)
            try {
                let { data } =  await axiosInstance.get(nextPageUrl.replace('http://mah-api.codintofuture.ir',''))
                setNextPageUrl(data.next)
                // console.log(queryClient.getQueriesData(['ChatQuery']))
                queryClient.setQueryData(['ChatQuery'], (oldData) => {
                    oldData.data.next = data.next;
                    oldData.data.results = [
                        ...oldData.data.results,
                        ...data.results
                    ]
                    return oldData
                });
                setMessagesItems(prevState => [

                    ...data.results.reverse(),
                    ...prevState ,
                ])
                setPrevPageUrl(data.prev)
            } catch (err) {
                console.log(err)
            } finally {
                setLoadingMoreMessage(false)
            }
        }
    };
    useEffect(() => {
           setTimeout(() => {
               ref.current?.scrollBy(300);
           },1500)
           ready.current = true;

    }, []);
    useEffect(() => {
        const scrollContainer = document.querySelector('.VListContainer');
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [nextPageUrl, loadingMoreMessages]);

    return <>
        <Modal mask={true}
               preserve={false}
               destroyOnClose={true}
               onCancel={() => {
                   setIsActive(null)
                   if(setPopupType)
                       setPopupType('user-info')
               }}
               modalRender={(ReactNode) => <ChatModalContainer>{ReactNode}</ChatModalContainer>}
               centered={true}
               closeIcon={false}
               title={<></>}
               maskClosable={true}
               footer={<></>}
               open={isActive}>
                <ChatHeader isActive={isActive}
                    isAdmin={isAdmin}
                    setPopupType={setPopupType}
                    setIsActive={setIsActive}/>
                <ChatMessageContainer>
                    { ChatQuery.isLoading ? <div style={{ width : '100%' , display : 'flex' , justifyContent : 'center' }}> <TailSpin
                            height="25"
                            width="25"
                            color="#5360ED"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        /> </div>:
                        <VList className={'VListContainer'}
                               ref={ref} style={{height: 300}}
                               initialItemSize={7}
                               initialItemCount={messagesItems?.length}>
                        <>
                            { loadingMoreMessages &&  <div style={{display: 'flex', justifyContent: 'center', height: 40}}><TailSpin
                                height="18"
                                width="18"
                                color="black"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            /></div>}
                            {
                                messagesItems.map(MessageItem => MessageItem.sender === 'me'
                                    ? <SentMessage setEditableMessage={setEditableMessage}
                                           ChatQuery={ChatQuery}
                                           isAdmin={isAdmin}
                                           setMessagesItems={setMessagesItems}
                                           Questionnaire={Questionnaire}
                                           messageData={MessageItem}/> :
                                    <RecievedMessage messageData={MessageItem}
                                         isAdmin={isAdmin}
                                         Questionnaire={Questionnaire}/>)
                            }
                        </>
                    </VList>
                }
                </ChatMessageContainer>
            { !!ChatQuery.isLoading && <RecommandedContainer>
                <ReadyMessageToSend MessageText={'لطفا در مورد پروژه بیشتر توضیح بدید'}
                                    Questionnaire={Questionnaire}
                                    isAdmin={isAdmin}
                                    setMessagesItems={setMessagesItems}
                                    ChatQuery={ChatQuery}/>
                <ReadyMessageToSend MessageText={'چرا قیمت پایینه؟'}
                                    Questionnaire={Questionnaire}
                                    isAdmin={isAdmin}
                                    ChatQuery={ChatQuery}/>
            </RecommandedContainer>}
                <ChatPrompt isAdmin={isAdmin}
                    ChatQuery={ChatQuery}
                    receiverID={receiverID}
                    setEditableMessage={setEditableMessage}
                    editableMessage={editableMessage}
                    messagesItems={messagesItems}
                    setMessagesItems={setMessagesItems}
                    Questionnaire={Questionnaire} />
            {/*</ChatContainer>*/}
        </Modal>

    </>
}
const ChatModalContainer = styled.div`
    direction: ltr;
    .ant-modal-content {
      padding: 0;
    }
`
