import { Header } from '@/components/common/Header';
import SideBar from '@/components/common/SideBar';
import { ScreenMask } from '@/styles/common';
import { CornerAddButton } from '@/styles/folders/cornerAdd';
import AddPopoverContent from '@/components/Folders/AddPopoverContent';
import { ContentBox, QuestionnaireNameInput } from '@/styles/folders/Questionnaire';
import QuestionnaireBox from '@/components/Folders/questionnaire';
import { Popover, Progress, message } from 'antd';
import { Icon } from '@/styles/icons';
import { Skeleton, Switch } from 'antd';
import Head from 'next/head';
import { Suspense , lazy, useRef } from 'react';
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

export default function Home() {
  const router = useRouter();
  const { getItem , removeItem } = useLocalStorage();
  const [ MessageApi , MessageContext ] = message.useMessage();
  const [ folders , setFolder ] = useState(null);
  const [ SelectedFolder , SelectFolder ] = useState(getItem('SelectedFolder') || 0);
  const [ FolderReload , SetFolderReload ] = useState(false);
  const [ AddQuestionnaireState , setAddQuestionnaireState ] = useState(false);
  const [ SideBarOpen , setOpen ] = useState(false);
  const [ addPopOver , setAddPopover ]= useState(false);
  const [ FolderPopover , setFolderPopover ]= useState(false)
  const CornerButton = useRef(null);
  const FolderNameInput = useRef(null);
  const [ ChangeFolderName , SetChangeFolderNameState ] = useState(false);
  const [ FolderName , SetFolderName ] = useState(null);

  useEffect(() => {
    let scroll_position = 0;
    const { getItem , setItem } = useLocalStorage();
    let scroll_direction;
    const getData = async () => {
      // if(getItem('cookie'))
      // {
        let { data } = await axiosInstance.get('/user-api/folders/');
        setFolder(data);
        SetFolderReload(false);
        if(data[SelectedFolder])
          SetFolderName(data[SelectedFolder].name) 
        else {
          SelectFolder(0);
          removeItem('SelectedFolder')
        }   
      // } 
    }
    window.addEventListener('scroll', function(e){
        scroll_direction = (document.body.getBoundingClientRect()).top > scroll_position ? 'up' : 'down';
        scroll_position = (document.body.getBoundingClientRect()).top;
        if(this.window.innerWidth  < 480 && CornerButton.current)
        {
          scroll_direction == 'down' ? CornerButton.current.setAttribute('style',' right : -30%;') :
           CornerButton.current.setAttribute('style','right : 1rem;');
        }
    });
    getData();
  },[FolderReload])

  FolderNameInput.current ? FolderNameInput.current.style.width = ((FolderNameInput.current.value.length * 8) + 20) + 'px' : '';
  const folderNameChangeHandler = (e) => {
    SetFolderName(e.target.value);
    FolderNameInput.current ? FolderNameInput.current.style.width = ((FolderNameInput.current.value.length * 7)+ 8) + 'px' : ''
  }
  const folderRenameConfirm = async () => {
    try 
    {
      await axiosInstance.patch(`/user-api/folders/${folders[SelectedFolder].id}/`, { 'name' : FolderName });
      
    }
    catch(err)
    {
      MessageApi.error({
        content : Object.values(err.response.data)[0],
        duration : 5
      })
    }
    SetChangeFolderNameState(false);
  }
  return (
    <>
      <Head>
        <title>Afkar Sanji</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
      {MessageContext}
      <ProgressBarLoading />
      <Header SetSideBar={() => setOpen(!SideBarOpen)} />
      <SideBar folders={folders} SelectedFolder={SelectedFolder} IsOpen={SideBarOpen}
        FolderReload={() => SetFolderReload(true)}  ChangeFolder={SelectFolder}
        SetSideBar={() => setOpen(!SideBarOpen)} ChangeFolderName={SetFolderName}/>
      <ScreenMask shown={SideBarOpen} onClick={() => setOpen(false)}/>
      <Popover
            content={<AddPopoverContent SelectedFolderNumber={SelectedFolder} 
            folders={folders} FolderReload={() => SetFolderReload(true)} 
            SetSideBar={() => setOpen(!SideBarOpen)} setAddPopover={() => setAddPopover(!addPopOver)}/>}
            trigger="click"
            open={addPopOver}
            overlayInnerStyle={{ boxShadow : 'none' , marginRight : 15}}
            onOpenChange={() => setAddPopover(false)}
            style={{marginRight : 15}}
            >
                <CornerAddButton ref={CornerButton} clicked={addPopOver ? 'true' : null} onClick={() => setAddPopover(!addPopOver)}>
                  <Icon name='Add' />
                </CornerAddButton>
        </Popover>
    </>
    <ContentBox >
      { 
        folders && folders.length !== 0 ? <MainContainer>
        <FolderEditContainer>
            <Popover
            trigger="click"
            content={<FolderPopoverContent RenameFolderState={SetChangeFolderNameState} RenameInput={FolderNameInput}
            SelectFolder={SelectFolder} FolderReload={() => SetFolderReload(true)} 
            closeEditPopover={() => setFolderPopover(false)}
             SelectedFolderNumber={SelectedFolder} Folders={folders} />}
            open={FolderPopover}
            placement="bottom"
            overlayInnerStyle={{ marginRight : 15}}
            onOpenChange={() => setFolderPopover(false)}>
                  <FolderPopoverToggle onClick={ChangeFolderName ? folderRenameConfirm : () => setFolderPopover(!FolderPopover)}
                  style={FolderName ? { pointerEvents : 'all'} : { pointerEvents : 'none'}}>
                    {ChangeFolderName ? <Icon name='GrayCheck' /> : <Icon name='Menu' /> }
                  </FolderPopoverToggle>
            </Popover>
              <QuestionnaireNameInput type='text' ref={FolderNameInput} value={FolderName} onChange={folderNameChangeHandler}
               disabled={!ChangeFolderName} /> 
          </FolderEditContainer>
      <QuestionnaireContainer>        
        {
          folders[SelectedFolder].questionnaires.length ? folders[SelectedFolder].questionnaires.map((item) => 
          <QuestionnaireBox FolderReload={() => SetFolderReload(true)}  Questionnaire={item} key={item.id} />)
          : <EmptyFolderContainer>
          <p>یک پرسشنامه درست کنید</p>
          <AddQuestionnairePopUp AddQuestionnaireModal={AddQuestionnaireState}
          setQuestionnaireModalState={() => setAddQuestionnaireState(!AddQuestionnaireState)}
          FolderReload={() => SetFolderReload(true)} 
          folders={folders}
          SelectedFolderNumber={SelectedFolder}
          />
          <button onClick={() => setAddQuestionnaireState(true)}>
              <p>ایجاد نظر سنجی</p>
              <Icon name='Folder' style={{ width : 14 }} />
             </button>
          </EmptyFolderContainer> 
        }
      </QuestionnaireContainer>
        </MainContainer> 
        : folders ?  <EmptyFolderContainer>
            <p>برای مدیریت کردن پرسشنامه پوشه درست کنید</p>
            <button onClick={() => setOpen(true)}>
                <p>پوشه ها</p>
                <Icon name='Folder' />
               </button>
         </EmptyFolderContainer> : <MainContainer>
         <QuestionnaireContainer>
             <Skeleton block style={{ width : '90%' , height : 200 , margin : '2rem auto'}} loading={true} active />

             <Skeleton block style={{ width : '90%' , height : 200 , margin : '2rem auto'}} loading={true} active />

             <Skeleton block style={{ width : '90%' , height : 200 , margin : '2rem auto'}} loading={true} active />
         </QuestionnaireContainer>
        </MainContainer> 
      } 
    </ContentBox>
    </>
  )
}