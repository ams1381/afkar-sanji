import { themeContext } from '@/utilities/ThemeContext';
import { axiosInstance } from '@/utilities/axios';
import { Button, ConfigProvider } from 'antd';
import React, { useState } from 'react'
import { RemovePopoverContainer } from '@/styles/folders/Popovers';

const RemovePopoverContent = ({ questionnairesUUID , FolderReload}) => {
  const [ OperatingState, SetOperatingState ] = useState(false);
  const RemoveQuestionnaireHandler = async () => {
    SetOperatingState(true)
    try
    {
      await axiosInstance.delete(`/question-api/questionnaires/${questionnairesUUID}/`);
    FolderReload();
    }
    catch(err)
    {

    }
    finally
    {
      SetOperatingState(false)
    }
  }
  return (
    <RemovePopoverContainer>
      <ConfigProvider theme={themeContext}>
        <p>
          این نظر سنجی حذف شود؟
        </p>
        <Button type='primary' loading={OperatingState ? true : false}
         style={{ width : 120 }} danger shape='default' onClick={RemoveQuestionnaireHandler}>
          تایید
        </Button>
      </ConfigProvider>
     
    </RemovePopoverContainer>
  )
}
export default RemovePopoverContent;
