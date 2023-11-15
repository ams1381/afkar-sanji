import { Header } from '@/components/common/Header';
import SideBar from '@/components/Folders/SideBar';
import { PageBox, ScreenMask } from '@/styles/common';
import { CornerAddButton } from '@/styles/folders/cornerAdd';
import AddPopoverContent from '@/components/Folders/AddPopoverContent';
import { ContentBox, QuestionnaireBodyStat, QuestionnaireDiv, QuestionnaireFooter, QuestionnaireHeader, QuestionnaireNameContainer, QuestionnaireNameInput, QuestionnaireSeeResultButton } from '@/styles/folders/Questionnaire';
import QuestionnaireBox from '@/components/Folders/questionnaire';
import { Popover, Progress, message } from 'antd';
import { Icon } from '@/styles/icons';
import { Skeleton, Switch } from 'antd';
import Head from 'next/head';
import React, {Suspense, lazy, useRef, useContext} from 'react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/utilities/axios';
import { useRouter } from 'next/router';
import FolderPopoverContent from '@/components/common/FolderPopover';
import { QuestionnaireContainer , MainContainer ,
   FolderEditContainer, FolderPopoverToggle 
   , EmptyFolderContainer} from '@/styles/folders/Questionnaire';
import AddQuestionnairePopUp from '@/components/Folders/AddQuestionnairePopUp';
import ProgressBarLoading from '@/styles/ProgressBarLoading';
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { handleInputWidth } from '@/utilities/RenameFunctions';
import { useQuery } from '@tanstack/react-query';
import { CommonDrawer } from '@/components/common/CommonDrawer';
import {TailSpin} from "react-loader-spinner";
import {AuthContext} from "@/utilities/AuthContext";
import {queryClient} from "@/pages/_app";

export default function Home({ cookies }) {
  const { getItem , removeItem , setItem} = useLocalStorage();
  const [ MessageApi , MessageContext ] = message.useMessage();
  const [ SelectedFolder , SelectFolder ] = useState(getItem('SelectedFolder') || 0);
  const [ AddQuestionnaireState , setAddQuestionnaireState ] = useState(false);
  const [ SideBarOpen , setOpen ] = useState(false);
  const [ RenameFolderLoading , setRenameFolderLoading ] = useState(false);
  const [ addPopOver , setAddPopover ] = useState(false);
  const [ FolderPopover , setFolderPopover ] = useState(false);
  const [ readyToCreate , setReadyToCreate ] = useState(false);
  const [ renameFolderError , setRenameFolderError ]  = useState(false);
  const CornerButton = useRef(null);
  const Auth = useContext(AuthContext)
  const [ RightDrawerOpen , setRightDrawerOpen ] = useState(false);
  const FolderNameInput = useRef(null);
  const [ ChangeFolderName , SetChangeFolderNameState ] = useState(false);
  const [ FolderName , SetFolderName ] = useState(null);
  const [ SekeltonLoading , setSkeletonLoading ] = useState(true);
  const { data , isLoading, error , refetch , isFetching, isFetched } = useQuery(['FolderFetch'],
  async () => await axiosInstance.get(`/user-api/folders/?is_interview=${getItem('roleReq') && getItem('roleReq') === 'question-api/questionnaires' ? 0 : 1}`),{
    refetchOnWindowFocus : false
      })

  useEffect(() => {
        queryClient.resetQueries({ queryKey : 'FolderFetch' })
       refetch();
  }, [Auth.reqRole , getItem('roleReq')]);

  useEffect(() => {

    // console.log(axiosInstance.defaults.headers['Authorization'])
    let scroll_position = 0;
    let scroll_direction;
    window.addEventListener('scroll', function(e){
      scroll_direction = (document.body.getBoundingClientRect()).top > scroll_position ? 'up' : 'down';
      scroll_position = (document.body.getBoundingClientRect()).top;
      if(CornerButton.current)
      {
        scroll_direction == 'down' ? CornerButton.current.setAttribute('style',' right : -30%;') :
         CornerButton.current.removeAttribute('style');
      }
  });
  },[])
 
  useEffect(() => {   
      if(getItem('SelectedFolder') && data?.data && data?.data[SelectedFolder])
      {
        SetFolderName(data?.data[getItem('SelectedFolder')]?.name) 
        handleInputWidth(FolderNameInput,data?.data[getItem('SelectedFolder')]?.name)
      }
        
      else {
        SelectFolder(0);
        SetFolderName(data?.data[0]?.name) 
        handleInputWidth(FolderNameInput,data?.data[0]?.name)
        removeItem('SelectedFolder')
      }  
  },[data])
  useEffect(() => {
    if(data?.data && data?.data[SelectedFolder])
      handleInputWidth(FolderNameInput,data?.data[SelectedFolder].name);
  },[data?.data , FolderNameInput , SelectedFolder])

  const folderNameChangeHandler = (e) => {

    if(!e.target.value?.length && FolderNameInput.current)
    {
      handleInputWidth(FolderNameInput,'sdfs');
      console.log()
    }
      
    handleInputWidth(FolderNameInput,FolderName);
    SetFolderName(e.target.value);
  }
  const folderRenameConfirm = async () => {
    if(!FolderName)
      return
    try 
    {
      setRenameFolderLoading(true)
      await axiosInstance.patch(`/user-api/folders/${data?.data[SelectedFolder].id}/`, { 'name' : FolderName });
      handleInputWidth(FolderNameInput,FolderName)
      SetChangeFolderNameState(false);
      setRenameFolderError(false)
      // SetFolderReload(true)
      refetch();
    }
    catch(err)
    {
      setRenameFolderError(true)
      setRenameFolderLoading(false)
      MessageApi.error({
        content : Object.values(err.response.data)[0],
        duration : 5,
        style : {
          fontFamily : 'IRANSans',
          direction : 'rtl'
        }
      })
      handleInputWidth(FolderNameInput,FolderName);
    }

    setRenameFolderLoading(false)
  }

  return (
    <>
      <style global jsx>{`
           .spiner_loading_wrapper
           {
             align-items: center;
           }
    `}</style>
      <Head>
        <title>Afkar Sanji</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {MessageContext}
      <ProgressBarLoading />
      <PageBox>
        <CommonDrawer RightDrawerOpen={RightDrawerOpen} setRightDrawerOpen={setRightDrawerOpen} />

      <Header SetSideBar={() => setOpen(!SideBarOpen)} cookies={cookies} />
      <SideBar folders={data?.data} SelectedFolder={SelectedFolder} isopen={SideBarOpen} ReadyToCreate={readyToCreate}
       setReadyToCreate={setReadyToCreate} FolderReload={refetch}  ChangeFolder={SelectFolder}
        SetSideBar={() => setOpen(!SideBarOpen)} ChangeFolderName={SetFolderName}/>
      <Popover
            content={<AddPopoverContent  SelectedFolderNumber={SelectedFolder} 
            folders={data?.data} FolderReload={refetch} 
            SetSideBar={() => setOpen(!SideBarOpen)} setReadyToCreate={setReadyToCreate}
            setAddPopover={() => setAddPopover(!addPopOver)}/>}
            trigger="click"
            open={addPopOver}
            overlayInnerStyle={{ 
              boxShadow : 'none' 
              , marginRight : window.innerWidth > 720 ?
              RightDrawerOpen ? '9.5vw' : '7.7vw' : '4vw'
               , background : 'transparent'
          }}
            onOpenChange={() => setAddPopover(false)}
            style={{marginRight : 15}}>
                <CornerAddButton ref={CornerButton} RightDrawerOpen={RightDrawerOpen ? 'active' : null}
                 clicked={addPopOver ? 'true' : null} onClick={() => setAddPopover(!addPopOver)}>
                  <Icon name='Add' />
                </CornerAddButton>
        </Popover>
        <main style={{ width : RightDrawerOpen ? '80%' : '100%', transition : '0.3s' }}>
    <ContentBox >
      {
        data?.data && data?.data.length !== 0 ? <MainContainer>
        <FolderEditContainer>
            <Popover
            trigger="click"
            content={<FolderPopoverContent  RenameFolderState={SetChangeFolderNameState} RenameInput={FolderNameInput}
            SelectFolder={SelectFolder} FolderReload={refetch}
            closeEditPopover={() => setFolderPopover(false)}
             SelectedFolderNumber={SelectedFolder} Folders={data?.data} />}
            open={FolderPopover}
            placement="bottom"
            overlayInnerStyle={{ marginRight : 15}}
            onOpenChange={() => setFolderPopover(false)} />
          { RenameFolderLoading ? <TailSpin
              height="18"
              width="18"
              color="black"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass="spiner_loading_wrapper"
              visible={true}
          /> :
              <>
                <FolderPopoverToggle onClick={ChangeFolderName ? folderRenameConfirm : () => setFolderPopover(!FolderPopover)}
                                     style={FolderName ? { pointerEvents : 'all'} : { pointerEvents : 'none'}}>
                  {ChangeFolderName ? <Icon name='GrayCheck' style={{ width : 20 }} /> : <Icon name='Menu' /> }
                </FolderPopoverToggle>
                {ChangeFolderName && <FolderPopoverToggle onClick={() => {
                  SetFolderName(data?.data[SelectedFolder]?.name)
                  handleInputWidth(FolderNameInput,data?.data[SelectedFolder]?.name)
                  SetChangeFolderNameState(false);
                  setRenameFolderError(false)
                }}>
                  <Icon name='BlackClose' style={{ width : 15 , marginLeft : 10}} />
                </FolderPopoverToggle>}
              </>
          }
              <QuestionnaireNameInput type='text' onKeyDown={e => e.key === 'Enter' ? folderRenameConfirm() : ''}
              ref={FolderNameInput} error={renameFolderError} value={FolderName} onChange={folderNameChangeHandler}
               disabled={!ChangeFolderName} />
          </FolderEditContainer>
      <QuestionnaireContainer>
        {
          data?.data[SelectedFolder]?.questionnaires.length ? data?.data[SelectedFolder].questionnaires.map((item) =>
          <QuestionnaireBox FolderReload={refetch} folderNumber={SelectedFolder}
           Questionnaire={item} key={item.id} />)
          : <EmptyFolderContainer>
          <p>یک پرسشنامه درست کنید</p>
          <AddQuestionnairePopUp AddQuestionnaireModal={AddQuestionnaireState}
          setQuestionnaireModalState={() => setAddQuestionnaireState(!AddQuestionnaireState)}
          FolderReload={refetch}
          folders={data?.data}
          SelectedFolderNumber={SelectedFolder}
          />
          <button onClick={() => setAddQuestionnaireState(true)}>
              <p>ایجاد نظر سنجی</p>
              <Icon name='AddFile' style={{ width : 14 }}/>
             </button>
          </EmptyFolderContainer>
        }
      </QuestionnaireContainer>
        </MainContainer>
        : data?.data ?  <EmptyFolderContainer>
            <p>برای مدیریت بهتر نظر سنجی ها یک پوشه درست کن</p>
            <button onClick={() => setOpen(true)}>
                <p>پوشه ها</p>
                <Icon name='Folder' />
               </button>
         </EmptyFolderContainer> : <MainContainer>
          <FolderEditContainer>
            <Skeleton.Input active style={{ height : 20 }}/>
          </FolderEditContainer>
         <QuestionnaireContainer>
          <QuestionnaireDiv isloading={true}>
              <QuestionnaireHeader>
                  <QuestionnaireNameContainer>
                      <Skeleton.Input active  style={{ height : 20 }}/>
                  </QuestionnaireNameContainer>
                  <div className='questionnaire_preview'>
                    <Skeleton.Input active style={{ minWidth : 20 , width : 90 , height : 20 }}/>
                  </div>
              </QuestionnaireHeader>
              <div className="questionnaire_body">
                  <div className="questionnaire_stats">
                          <QuestionnaireBodyStat>
                              <Skeleton.Input active style={{ height : 20 , width: 80 , minWidth : 20}} />
                              <Skeleton.Input active style={{ height : 20 , width: 90 , minWidth : 20}}/>
                          </QuestionnaireBodyStat>
                          <QuestionnaireBodyStat>
                              <Skeleton.Input active  style={{ height : 20 , width: 70 , minWidth : 20}}/>
                              <Skeleton.Input active  style={{ height : 20 , width: 110 , minWidth : 20}}/>
                          </QuestionnaireBodyStat>
                    </div>
                    <div className="questionnaire_see_result">
                      <QuestionnaireSeeResultButton>
                          <Skeleton.Button active />
                      </QuestionnaireSeeResultButton>

                    </div>
              </div>
              <QuestionnaireFooter loading='active'>
                  <Skeleton.Button active style={{ width : 73 }} />
                  <Skeleton.Button active style={{ width : 73 }}/>
                  <Skeleton.Button active style={{ width : 73 }}/>
                  <Skeleton.Button active style={{ width : 73 }}/>
              </QuestionnaireFooter>
          </QuestionnaireDiv>
          <QuestionnaireDiv isloading={true}>
              <QuestionnaireHeader>
                  <QuestionnaireNameContainer>
                      <Skeleton.Input active  style={{ height : 20 }}/>
                  </QuestionnaireNameContainer>
                  <div className='questionnaire_preview'>
                    <Skeleton.Input active style={{ minWidth : 20 , width : 90 , height : 20 }}/>
                  </div>
              </QuestionnaireHeader>
              <div className="questionnaire_body">
                  <div className="questionnaire_stats">
                          <QuestionnaireBodyStat>
                              <Skeleton.Input active style={{ height : 20 , width: 80 , minWidth : 20}} />
                              <Skeleton.Input active style={{ height : 20 , width: 90 , minWidth : 20}}/>
                          </QuestionnaireBodyStat>
                          <QuestionnaireBodyStat>
                              <Skeleton.Input active  style={{ height : 20 , width: 70 , minWidth : 20}}/>
                              <Skeleton.Input active  style={{ height : 20 , width: 110 , minWidth : 20}}/>
                          </QuestionnaireBodyStat>
                    </div>
                    <div className="questionnaire_see_result">
                      <QuestionnaireSeeResultButton>
                          <Skeleton.Button active />
                      </QuestionnaireSeeResultButton>

                    </div>
              </div>
              <QuestionnaireFooter loading='active'>
                  <Skeleton.Button active style={{ width : 73 }} />
                  <Skeleton.Button active style={{ width : 73 }}/>
                  <Skeleton.Button active style={{ width : 73 }}/>
                  <Skeleton.Button active style={{ width : 73 }}/>
              </QuestionnaireFooter>
          </QuestionnaireDiv>
          <QuestionnaireDiv isloading={true}>
              <QuestionnaireHeader>
                  <QuestionnaireNameContainer>
                      <Skeleton.Input active  style={{ height : 20 }}/>
                  </QuestionnaireNameContainer>
                  <div className='questionnaire_preview'>
                    <Skeleton.Input active style={{ minWidth : 20 , width : 90 , height : 20 }}/>
                  </div>
              </QuestionnaireHeader>
              <div className="questionnaire_body">
                  <div className="questionnaire_stats">
                          <QuestionnaireBodyStat>
                              <Skeleton.Input active style={{ height : 20 , width: 80 , minWidth : 20}} />
                              <Skeleton.Input active style={{ height : 20 , width: 90 , minWidth : 20}}/>
                          </QuestionnaireBodyStat>
                          <QuestionnaireBodyStat>
                              <Skeleton.Input active  style={{ height : 20 , width: 70 , minWidth : 20}}/>
                              <Skeleton.Input active  style={{ height : 20 , width: 110 , minWidth : 20}}/>
                          </QuestionnaireBodyStat>
                    </div>
                    <div className="questionnaire_see_result">
                      <QuestionnaireSeeResultButton>
                          <Skeleton.Button active />
                      </QuestionnaireSeeResultButton>

                    </div>
              </div>
              <QuestionnaireFooter loading='active'>
                  <Skeleton.Button active style={{ width : 73 }} />
                  <Skeleton.Button active style={{ width : 73 }}/>
                  <Skeleton.Button active style={{ width : 73 }}/>
                  <Skeleton.Button active style={{ width : 73 }}/>
              </QuestionnaireFooter>
          </QuestionnaireDiv>
         </QuestionnaireContainer>
        </MainContainer>
      }
    </ContentBox>
    </main>
    </PageBox>
    </>
  )
}
export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = req.headers.cookie;

  // Check if cookies are present
  if (cookies) {
    // Parse the cookies
    const parsedCookies = cookies.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
    return {
      props: {
        // Pass the cookies as props to the component
        cookies: parsedCookies,
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/auth"
    }
  };
}