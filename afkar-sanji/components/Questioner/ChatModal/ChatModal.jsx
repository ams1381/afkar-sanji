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
                            // ChatDada=
                            isAdmin={isAdmin}
                            setIsActive={setIsActive}/>
                <ChatMessageContainer>
                    { messagesItems.length &&
                        <VList onScroll={() => console.log('check')} className={'VListContainer'}
                               ref={ref} style={{height: 300}}
                               autoHeight={true}
                               overscan={4}
                               // rowHeight={50}
                               rowCount={ChatQuery.data?.data.count} shift={shifting}
                            onRangeChange={async (start, end) => {
                                if (!ready.current) return;
                                // console.log(start, end)
                                if (end + THRESHOLD >  ChatQuery.data?.data.count && endFetchedCountRef.current <  ChatQuery.data?.data.count) {
                                    endFetchedCountRef.current = ChatQuery.data?.data.count;
                                    console.log('fetch more from end')

                                    // setItems(prev => [...prev, ...createRows(ITEM_BATCH_COUNT)]);
                                } else if (start - THRESHOLD < 0 && startFetchedCountRef.current <  ChatQuery.data?.data.count) {
                                    startFetchedCountRef.current = ChatQuery.data?.data.count;
                                    // console.log('fetch more from top')
                                    await fetchItemsFromTop()
                                    // await fetchItems(true);
                                    // setItems(prev => [...createRows(ITEM_BATCH_COUNT).reverse(), ...prev]);
                                }
                            }}>

                        <>
                            {
                                messagesItems.map(MessageItem => MessageItem.sender === 'me'
                                    ? <SentMessage setEditableMessage={setEditableMessage}
                                                   Questionnaire={Questionnaire}
                                                   messageData={MessageItem}/> :
                                    <RecievedMessage messageData={MessageItem}
                                                     isAdmin={isAdmin}
                                                     Questionnaire={Questionnaire}
                                    />)
                            }

                        </>

                    </VList>
                }
                        {/*<SentMessage />*/}
                        {/*<RecievedMessage />*/}
                </ChatMessageContainer>
            <RecommandedContainer>
                <RecommandedMessage>
                    <p>لطفا در مورد پروژه بیشتر توضیح بدید</p>
                </RecommandedMessage>
                <RecommandedMessage>
                    <p>چرا قیمت پایینه؟</p>
                </RecommandedMessage>
            </RecommandedContainer>
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
const MessageList = ({ messages }) => {
    const rowRenderer = ({ index, style }) => {
        const message = messages[index];
        return (
            <div style={{ width : 200 , height : 100 , background : 'red' }}>
                {message.sender === 'me' ? (
                    <SentMessage messageData={message} />
                ) : (
                    <ReceivedMessage messageData={message} />
                )}
            </div>
        );
    };

    return (
        <VList
            height={400} // Set the height of your virtual list
            rowCount={messages.length} // Total number of messages
            rowHeight={50}
            rowRenderer={rowRenderer}
        />
    );
};
// function rowRenderer({
//                          index, // Index of row
//                          isScrolling, // The List is currently being scrolled
//                          isVisible, // This row is visible within the List (eg it is not an overscanned row)
//                          key, // Unique key within array of rendered rows
//                          parent, // Reference to the parent List (instance)
//                          style, // Style object to be applied to row (to position it);
//                          // This must be passed through to the rendered row element.
//                      }) {
//     const user = list[index];
//
//     // If row content is complex, consider rendering a light-weight placeholder while scrolling.
//     const content = isScrolling ? '...' : <User user={user} />;
//
//     // Style is required since it specifies how the row is to be sized and positioned.
//     // React Virtualized depends on this sizing/positioning for proper scrolling behavior.
//     // By default, the List component provides following style properties:
//     //    position
//     //    left
//     //    top
//     //    height
//     //    width
//     // You can add additional class names or style properties as you would like.
//     // Key is also required by React to more efficiently manage the array of rows.
//     return (
//         <div key={key} style={style}>
//             {content}
//         </div>
//     );
// }