import { AddFolderButtons, SideBarCancelButton, SideBarConfirmButton, SideBarContainer, SideBarFolderItem,
     SideBarInput, SideBarInputBox, SideBarHeader , SideBarTitle,
      SideBarToggleButton } from '@/styles/common';
import { axiosInstance } from '@/utilities/axios';
import React, { useState } from 'react'

const SideBar = ({ IsOpen , SetSideBar , folders , ChangeFolder}) => {
    const [ AddFolderState , SetAddFolderState ] = useState(false);
    const [ newFolderName , setNewFolderName ] = useState(null);
    const [ InputSelect , SetSelect ] = useState(false);
    
    const AddFolder = async () => {
        await axiosInstance.post('/user-api/folders/',{ name : newFolderName })
        setNewFolderName(null);
        folders.push({ name : newFolderName  })
    }
  return (
    <SideBarContainer open={IsOpen}>
        <SideBarHeader>
            <div className="sideBar_add_folder">
    <SideBarToggleButton onClick={() => SetAddFolderState(!AddFolderState)}>
        <p>پوشه جدید</p>
        <i>
        <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.20669 1.5H5.17539L4.06235 0.609566C3.97369 0.53864 3.86354 0.5 3.75 0.5H2C0.89543 0.5 0 1.39543 0 2.5V2.99998H3.5567L5.20669 1.5Z" fill="#EEF0FF"/>
            <path d="M6.6933 1.5L4.08633 3.86995C3.9943 3.95362 3.87438 3.99998 3.75 3.99998H0V8.5C0 9.60457 0.89543 10.5 2 10.5H10C11.1046 10.5 12 9.60457 12 8.5V3.5C12 2.39543 11.1046 1.5 10 1.5H6.6933Z" fill="#EEF0FF"/>
        </svg>
                
        </i>
    </SideBarToggleButton>
            </div>
            <SideBarTitle>
            <button className="close_sideBar" onClick={SetSideBar}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.92473 5.99916L11.6122 0.411663C11.6908 0.318806 11.6247 0.177734 11.5033 0.177734H10.0783C9.99437 0.177734 9.91401 0.215234 9.85865 0.27952L5.99258 4.88845L2.12651 0.27952C2.07294 0.215234 1.99258 0.177734 1.90687 0.177734H0.481867C0.360439 0.177734 0.294367 0.318806 0.372939 0.411663L5.06044 5.99916L0.372939 11.5867C0.355338 11.6074 0.344047 11.6327 0.340404 11.6596C0.336762 11.6865 0.340922 11.7139 0.352391 11.7386C0.36386 11.7632 0.382156 11.784 0.405107 11.7985C0.428057 11.8131 0.454698 11.8207 0.481867 11.8206H1.90687C1.9908 11.8206 2.07115 11.7831 2.12651 11.7188L5.99258 7.10988L9.85865 11.7188C9.91222 11.7831 9.99258 11.8206 10.0783 11.8206H11.5033C11.6247 11.8206 11.6908 11.6795 11.6122 11.5867L6.92473 5.99916Z" fill="#8F8F8F"/>
                    </svg>
                </button>
                <p>پوشه ها</p>
            </SideBarTitle>
        </SideBarHeader>
        {
            AddFolderState ? <SideBarInputBox>
            <p>نام پوشه را وارد کنید</p>
            <SideBarInput type="text" id="side_folder_name" 
            value={newFolderName ? newFolderName : ''} onChange={(e) => setNewFolderName(e.target.value)}/>
            <AddFolderButtons>
                <SideBarConfirmButton onClick={AddFolder}>
                    <i>
                        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.03212 10.9072L1.56056 7.00173C1.28538 6.69214 0.811322 6.66425 0.501735 6.93944C0.192148 7.21463 0.164263 7.68869 0.439451 7.99827L4.43945 12.4983C4.72614 12.8208 5.2252 12.8355 5.53034 12.5303L16.0303 2.03033C16.3232 1.73744 16.3232 1.26256 16.0303 0.96967C15.7374 0.676777 15.2626 0.676777 14.9697 0.96967L5.03212 10.9072Z" fill="#EEF0FF"/>
                            </svg>
                            
                    </i>
                </SideBarConfirmButton>
                <SideBarCancelButton onClick={() => SetAddFolderState(false)}>
                    <i>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.897052 1.05379L0.96967 0.96967C1.23594 0.703403 1.6526 0.679197 1.94621 0.897052L2.03033 0.96967L7 5.939L11.9697 0.96967C12.2359 0.703403 12.6526 0.679197 12.9462 0.897052L13.0303 0.96967C13.2966 1.23594 13.3208 1.6526 13.1029 1.94621L13.0303 2.03033L8.061 7L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7641 13.2966 12.3474 13.3208 12.0538 13.1029L11.9697 13.0303L7 8.061L2.03033 13.0303C1.76406 13.2966 1.3474 13.3208 1.05379 13.1029L0.96967 13.0303C0.703403 12.7641 0.679197 12.3474 0.897052 12.0538L0.96967 11.9697L5.939 7L0.96967 2.03033C0.703403 1.76406 0.679197 1.3474 0.897052 1.05379L0.96967 0.96967L0.897052 1.05379Z" fill="#FF4D4F"/>
                        </svg>    
                    </i>
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