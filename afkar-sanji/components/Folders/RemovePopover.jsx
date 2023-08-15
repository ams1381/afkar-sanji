import { themeContext } from '@/utilities/ThemeContext';
import { axiosInstance } from '@/utilities/axios';
import { Button, ConfigProvider } from 'antd';
import React, { useState } from 'react'

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
    <div>
      <ConfigProvider theme={themeContext}>
        <Button type='primary' loading={OperatingState ? true : false}
         style={{ width : 120 }} danger shape='default' onClick={RemoveQuestionnaireHandler}>
          تایید
        </Button>
      </ConfigProvider>
     
    </div>
  )
}
export default RemovePopoverContent;
