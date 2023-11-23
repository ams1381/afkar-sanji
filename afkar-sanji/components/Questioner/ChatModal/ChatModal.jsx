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

export const ChatModal = ({
          isActive,
          setIsActive ,
          Questionnaire ,
          isAdmin
      }) => {
    const ChatQuery = useQuery(['ChatQuery'],
        async () => await axiosInstance.get(`/${!isAdmin ? 'interview' :'admin'}-api/tickets/?interview_id=${Questionnaire.id}`) ,{
            enabled : true,
            refetchOnWindowFocus : false
        })
    const [ editableMessage , setEditableMessage ] = useState(null);
    const [ messagesItems , setMessagesItems ] = useState([]);
    const [ count , setCount ] = useState(null);
    const [ nextPageUrl , setNextPageUrl ] = useState(null);
    const [ prevPageUrl , setPrevPageUrl ] = useState(null);
    useEffect(() => {
        if(ChatQuery.data?.data?.results) {
            setMessagesItems(ChatQuery.data?.data.results)
            setNextPageUrl(ChatQuery.data?.data?.next)
            setPrevPageUrl(ChatQuery.data?.data?.prev)
            setCount(ChatQuery.data?.data.count)
        }
    }, [ChatQuery.data?.data]);
    // console.log(messagesItems)
    const id = useRef(0);
    const createRows = (num) => {
        const heights = [20, 40, 80, 77];
        return Array.from({
            length: num
        }).map(() => {
            const i = id.current++;
            return <div key={i} style={{
                height: heights[i % 4],
                borderBottom: "solid 1px #ccc",
                background: "#fff"
            }}>
                {i}
            </div>;
        });
    };
    const ref = useRef();
    const [shifting, setShifting] = useState(false);
    const [startFetching, setStartFetching] = useState(false);
    const [endFetching, setEndFetching] = useState(false);
    const fetchItems = async (isStart = false) => {
        setShifting(isStart);
        const setFetching = isStart ? setStartFetching : setEndFetching;
        setFetching(true);
        console.log('fetching items')
        // await delay(1000);
        setFetching(false);
    };
    const startFetchedCountRef = useRef(-1);
    const endFetchedCountRef = useRef(-1);
    const ready = useRef(false);
    const ITEM_BATCH_COUNT = 5;
    const [items, setItems] = useState(() => createRows(ITEM_BATCH_COUNT * 2))
    const THRESHOLD = 3;

    useEffect(() => {
        // if(messagesItems.length) {
            setTimeout(() => {
                ref.current?.scrollBy(300);
                // ref.current?.scrollToIndex(8)
                // console.log(ref.current)

            },1500)
            ready.current = true;
        // }

    }, [messagesItems]);
    const fetchItemsFromTop = async () => {
        setShifting(true)
        console.log(nextPageUrl)
        if(!nextPageUrl)
            return
        try {
           let { data } =  await axiosInstance.get(nextPageUrl.replace('http://mah-api.codintofuture.ir',''))
            setMessagesItems(prevState => [
                ...prevState ,
                ...data.results
            ])
            setNextPageUrl(data.next)
            setPrevPageUrl(data.prev)
            // setCount(data.count)
        } catch (err) {
            console.log(err)
        }
    }
    return <>
        {/*<ChatMask onClick={() => setIsActive(false)}></ChatMask>*/}
        <Modal mask={true}
               preserve={false}
               destroyOnClose={true}
               onCancel={() => setIsActive(null)}
               modalRender={(ReactNode) => <ChatModalContainer>{ReactNode}</ChatModalContainer>}
               centered={true}
               closeIcon={false}
               title={<></>}
               maskClosable={true}
               footer={<></>}
               open={isActive}>
                <ChatHeader isActive={isActive}
                    isAdmin={isAdmin}
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
                        <VList onScroll={() => console.log('check')} className={'VListContainer'}
                               ref={ref} style={{height: 300}}
                               autoHeight={true}
                               overscan={4}
                               // rowHeight={50}
                               rowCount={ChatQuery.data?.data.count} shift={shifting}
                            onRangeChange={async (start, end) => {
                                if (!ready.current) return;
                                if (end + THRESHOLD >  ChatQuery.data?.data.count && endFetchedCountRef.current <  ChatQuery.data?.data.count) {
                                    endFetchedCountRef.current = ChatQuery.data?.data.count;
                                    console.log('fetch more from end')
                                    // setItems(prev => [...prev, ...createRows(ITEM_BATCH_COUNT)]);
                                } else if (start - THRESHOLD < 0 && startFetchedCountRef.current <  ChatQuery.data?.data.count) {
                                    startFetchedCountRef.current = ChatQuery.data?.data.count;
                                    await fetchItemsFromTop()
                                }
                            }}>

                        <>
                            {
                                messagesItems.map(MessageItem => MessageItem.sender === 'me'
                                    ? <SentMessage setEditableMessage={setEditableMessage}
                                           ChatQuery={ChatQuery}
                                           isAdmin={isAdmin}
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
                                    ChatQuery={ChatQuery}/>
                <ReadyMessageToSend MessageText={'چرا قیمت پایینه؟'}
                                    Questionnaire={Questionnaire}
                                    isAdmin={isAdmin}
                                    ChatQuery={ChatQuery}/>
            </RecommandedContainer>}
                <ChatPrompt isAdmin={isAdmin}
                    ChatQuery={ChatQuery}
                    setEditableMessage={setEditableMessage}
                    editableMessage={editableMessage}
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
