import { LoginErrorMessage } from '@/styles/auth/Login';
import { AddFolderButtons, SideBarCancelButton, SideBarConfirmButton, SideBarContainer, SideBarFolderItem,
     SideBarInput, SideBarInputBox, SideBarHeader , SideBarTitle,
      SideBarToggleButton } from '@/styles/common';
import { Icon } from '@/styles/folders/icons';
import { axiosInstance } from '@/utilities/axios';
import React, { useState } from 'react'

const SideBar = ({ IsOpen , SetSideBar , folders , ChangeFolder , FolderReload}) => {
    const [ AddFolderState , SetAddFolderState ] = useState(false);
    const [ newFolderName , setNewFolderName ] = useState(null);
    const [ ErrorMessage , SetErrorMessage ] = useState(null);
    const [ InputSelect , SetSelect ] = useState(false);
    
    const AddFolder = async () => {
        if(!newFolderName)
        {
            SetErrorMessage('نام پوشه نمیتواند خالی باشد')
            return
        }
        try 
        {
            await axiosInstance.post('/user-api/folders/',{ name : newFolderName })
            setNewFolderName(null);
            SetAddFolderState(false)
            FolderReload();
        }
        catch(err)
        {
            typeof err == Error ? SetErrorMessage(err.data.name[0]) : ''
        }
    }
  return (
    <SideBarContainer open={IsOpen}>
        <SideBarHeader>
            <div className="sideBar_add_folder">
    <SideBarToggleButton onClick={() => SetAddFolderState(!AddFolderState)}>
        <p>پوشه جدید</p>
        <Icon name='NewFolder' style={{ width : 15 }}/>
    </SideBarToggleButton>
            </div>
            <SideBarTitle>
            <button className="close_sideBar" onClick={SetSideBar}>
                <Icon name='GrayClose' style={{ width : 13 }}/>
            </button>
                <p>پوشه ها</p>
            </SideBarTitle>
        </SideBarHeader>
        {
            AddFolderState ? <SideBarInputBox>
            <p>نام پوشه را وارد کنید</p>
            <SideBarInput type="text" id="side_folder_name" 
            value={newFolderName ? newFolderName : ''} onChange={(e) => {
                SetErrorMessage(null);
                setNewFolderName(e.target.value)
                }}/>
            {ErrorMessage ? <LoginErrorMessage>{ErrorMessage}</LoginErrorMessage> : ''}
            <AddFolderButtons>
                <SideBarConfirmButton onClick={AddFolder}>
                    <Icon name='Check' style={{ width : 15}} /> 
                </SideBarConfirmButton>
                <SideBarCancelButton onClick={() => SetAddFolderState(false)}>
                    <Icon name='Close' style={{ width : 12 }} />
                </SideBarCancelButton>
            </AddFolderButtons>      
            
    </SideBarInputBox> : ''
        }
        <div className="sideBar_folders" style={{ marginTop : 16 }}>
            {
                folders ? folders.map((item,index) => <SideBarFolderItem key={item.id} onClick={() => ChangeFolder(index)} >
                <p>{index + 1}</p>
                <p>{item.name}</p>
            </SideBarFolderItem>) : 'Loaing'
            }
        </div>
    </SideBarContainer>
  )
}
export default SideBar;