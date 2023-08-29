import { LoginErrorMessage } from '@/styles/auth/Login';
import { AddFolderButtons, SideBarCancelButton, SideBarConfirmButton, SideBarContainer, SideBarFolderItem,
     SideBarInput, SideBarInputBox, SideBarHeader , SideBarTitle,
      SideBarToggleButton } from '@/styles/common';
import { Icon } from '@/styles/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { axiosInstance } from '@/utilities/axios';
import { useLocalStorage } from '@/utilities/useLocalStorage';
import { Drawer, Skeleton, Spin } from 'antd';
import PN from "persian-number";
import React, { useEffect, useRef, useState } from 'react'

const SideBar = ({ isopen , SetSideBar , folders , SelectedFolder  , ReadyToCreate , setReadyToCreate
    , ChangeFolder , FolderReload , ChangeFolderName}) => {
    const { setItem } = useLocalStorage();
    const [ AddFolderState , SetAddFolderState ] = useState(false);
    const [ newFolderName , setNewFolderName ] = useState(null);
    const [ ErrorMessage , SetErrorMessage ] = useState(null);
    const [ FolderAdded , setFolderAddedState ] = useState(false);
    const [ AddFolderLoading , setAddFolderLoading ] = useState(false)
    const  FolderInput  = useRef(null)
    
    useEffect(() => {   
        if(folders && folders[folders.length - 1] && FolderAdded)
        {
            ChangeFolder([folders.length - 1])
            setItem('SelectedFolder',folders.length - 1)
            ChangeFolderName(folders[folders.length - 1].name)
            SetAddFolderState(false)
        }
        (ReadyToCreate && FolderInput.current) ? FolderInput.current.focus() : ''
        // console.log(FolderInput.current)
        // FolderInput.current ? console.log(FolderInput.current) : ''
    },[folders])
    const AddFolder = async () => {
        axiosInstance.defaults.headers['Content-Type'] = 'application/json';
        setAddFolderLoading(true)
        setFolderAddedState(!FolderAdded)
        if(!newFolderName)
        {
            SetErrorMessage('نام پوشه نمیتواند خالی باشد');
            setAddFolderLoading(false)
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
            if(err.response)
                SetErrorMessage(err.response.data.name[0]) 
        }
        finally
        {
            setAddFolderLoading(false);
            setReadyToCreate(false)
        }
    }
  return (
    <div className='ams'>
    <Drawer
     open={isopen} 
     closeIcon={null}
     placement='left'
      closable={false}
      title={<SideBarHeader>
        <div className="sideBar_add_folder">
    <SideBarToggleButton onClick={() => SetAddFolderState(!AddFolderState)}>
        <p>پوشه جدید</p>
        <Icon name='NewFolder' style={{ width : 15 }}/>
    </SideBarToggleButton>
            </div>
            <SideBarTitle>
                <p>پوشه‌ها</p>
                <button className="close_sideBar" onClick={SetSideBar}>
                <Icon name='GrayClose' style={{ width : 13 }}/>
            </button>
            </SideBarTitle>
    </SideBarHeader>}
       onClose={SetSideBar}>
        
        {
            (ReadyToCreate || AddFolderState) ? <SideBarInputBox>
            <p>نام پوشه را وارد کنید</p>
            <SideBarInput type="text" id="side_folder_name"  ref={FolderInput}
            value={newFolderName ? newFolderName : ''} onChange={(e) => {
                SetErrorMessage(null);
                setNewFolderName(e.target.value)
                }}/>
            {ErrorMessage ? <LoginErrorMessage>{ErrorMessage}</LoginErrorMessage> : ''}
            <AddFolderButtons>
                <SideBarConfirmButton disabled={!newFolderName} onClick={AddFolder}>
                   { AddFolderLoading ? <Spin 
                   indicator={<LoadingOutlined style={{ fontSize: 17 , color : 'white' }} spin />} size='12' />
                   : 
                   newFolderName ? <Icon name='Check' style={{ width : 15}} />  
                   : <Icon name='DisableCheck' style={{ width : 15}}/>
                   
                }
                </SideBarConfirmButton>
                <SideBarCancelButton onClick={() => {
                    SetAddFolderState(false)
                    SetErrorMessage(null);
                    setReadyToCreate(false)
                    }}>
                    <Icon name='Close' style={{ width : 12 }} />
                </SideBarCancelButton>
            </AddFolderButtons>      
            
    </SideBarInputBox> : ''
        }
        <div className="sideBar_folders" style={{ marginTop : 16 }}>
            {
                folders ? folders.map((item,index) => <SideBarFolderItem selected={SelectedFolder == index ? 'checked' : null} 
                key={item.id} onClick={() => {
                ChangeFolder(index)
                setItem('SelectedFolder',index)
                ChangeFolderName(folders[index].name)
                }} >
                <p>{item.questionnaires ?  PN.convertEnToPe(item.questionnaires.length) : PN.convertEnToPe(index + 1)}</p>
                <p className='folder_name'>{item.name}</p>
            </SideBarFolderItem>) : <Skeleton style={{ width : '90%' , margin : '0 auto' }}/>
            }
        </div> 
    </Drawer>
    </div>
  )
}
export default SideBar;