import React, {useContext, useState} from 'react'
import { QuestionnaireFooter , QuestionnaireFooterItem , QuestionnaireFooterButton
} from '@/styles/folders/Questionnaire'
import { Icon } from '@/styles/icons'
import { Popover, message } from 'antd';
import { SharePopOverContent } from './SharePopover'
import RemovePopoverContent from '../common/RemovePopover';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RemovePopup from '../common/RemovePopup';
import { axiosInstance } from '@/utilities/axios';
import { PdfGenerator } from './pdfExport';
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { PDFDownloadLink } from '@react-pdf/renderer';
import TopBarProgress from 'react-topbar-progress-indicator';
import {AuthContext} from "@/utilities/AuthContext";


const QuestionnaireFooterPart = ({ questionnaire , FolderReload , folderNumber}) => {
    const [ SharePopover , setSharePopOver] = useState(false);
    const [ DeletePopoverState , setDeletePopoverState ] = useState(false);
    const [ OperatingState, SetOperatingState ] = useState(false);
    const [ SavedMessage , contextHolder] = message.useMessage();
    const { setItem } = useLocalStorage();
    const [ ProgressBarState , SetProgressBarState ] = useState(false);
    const router = useRouter();
    const [ RetrievedQuestionnaire , setRetrievedQuestionnaire ] = useState(null);
    const Auth = useContext(AuthContext);
    const RemoveQuestionnaireHandler = async () => {
        // SetOperatingState(true)
        try
        {
          await axiosInstance.delete(`/${Auth.reqRole}/${questionnaire.uuid}/`);
          FolderReload();
          setDeletePopoverState(false);
        }
        catch(err)
        {
         
            SavedMessage.error({
                content : 'در حذف کردن پرسشنامه مشکلی پیش آمد',
                duration : 5
            })
        }
        finally
        {
        //   SetOperatingState(false)
        // setDeletePopoverState(false)
        }
      }
    const RetrieveQuestionnaire = async () => {
        try 
        {
         let { data } = await axiosInstance.get(`/${Auth.reqRole}/${questionnaire.uuid}/`)
         console.log(data)
         setRetrievedQuestionnaire(data)
        }
        catch(err)
        {
    
        }
    }
  return (
    <QuestionnaireFooter>
        {ProgressBarState ? <TopBarProgress /> : ''}
        {contextHolder}
        <QuestionnaireFooterItem>
            <Popover
            content={<SharePopOverContent Questionnaire={questionnaire} />}
            trigger="click"
            open={SharePopover}
            onOpenChange={() => setSharePopOver(false)}>
            <QuestionnaireFooterButton onClick={() => setSharePopOver(!SharePopover)}>
                <Icon name='Share' />
            </QuestionnaireFooterButton>
            </Popover>
            
        </QuestionnaireFooterItem>
        <QuestionnaireFooterItem onClick={() => setDeletePopoverState(!DeletePopoverState)}>
            <RemovePopup 
            DeleteState={DeletePopoverState}
            title='این پرسشنامه حذف شود؟'
            onOkay={RemoveQuestionnaireHandler}
            setDeleteState={setDeletePopoverState}
            // onOpenChange={() => setDeletePopoverState(false)}
            />
            <QuestionnaireFooterButton >
                <Icon name='trash' />
            </QuestionnaireFooterButton>
            
        </QuestionnaireFooterItem>
        <QuestionnaireFooterItem>
        <Link href={`questionnaire/${questionnaire.uuid}/`} onClick={() => setItem('SelectedFolder',folderNumber)}>
            <QuestionnaireFooterButton>
                    <Icon name='GrayPen' />
            </QuestionnaireFooterButton>
            </Link>
        </QuestionnaireFooterItem>
        <QuestionnaireFooterItem>
        <Link href={`questionnaire/${questionnaire.uuid}/charts/`}>
            <QuestionnaireFooterButton>
            <Icon name='statics' />
            </QuestionnaireFooterButton>
        </Link>
        </QuestionnaireFooterItem>
        <QuestionnaireFooterItem style={{ borderRight : 0 }}>
            
         <QuestionnaireFooterButton onClick={async () => {
           SetProgressBarState(true)
            await PdfGenerator(questionnaire)
            setTimeout(() => {
                SetProgressBarState(false)
            },900)
            }}>
            {/* <PDFDownloadLink document={<PdfGenerator />} > */}
                    <Icon name='PDFExport' />
             {/* </PDFDownloadLink> */}
        </QuestionnaireFooterButton>
       
        </QuestionnaireFooterItem>
    </QuestionnaireFooter>
  )
}
export default QuestionnaireFooterPart;