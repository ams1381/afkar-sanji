import { PopoverContainer , PopoverButtonHolder , PopOverButton} from '@/styles/folders/cornerAdd';
import React, { useEffect, useState } from 'react'
import { Icon } from '@/styles/icons';
import AddQuestionnairePopUp from './AddQuestionnairePopUp';

const AddPopoverContent = ({folders , setReadyToCreate , SetSideBar , SelectedFolderNumber , setAddPopover , FolderReload}) => {
    const [ AddQuestionnaireModal , setQuestionnaireModalState ] = useState(false);
    const [ NewQuestionnaireName , setNewQuestionnaireName ] = useState(null);
    const [ ErrMessage , SetErrMessage ] = useState(null);
    useEffect(() => {
        window.addEventListener('scroll',() => setAddPopover())
    },[])
    const AddQuestionnaireModalHandler = () => {
        setAddPopover()
        if(folders?.length)
            setQuestionnaireModalState(true);
        else
            SetSideBar(true);
    }
    const AddFolderHandler = () => {
        SetSideBar(true);
        setAddPopover();
        setReadyToCreate(true);
    }
  return (
    <PopoverContainer>
        <PopoverButtonHolder onClick={AddFolderHandler}>
            <p>اضافه کردن پوشه</p>
            <PopOverButton>
                <Icon name='AddFolder' style={{ width : 14 }}/>
            </PopOverButton>
        </PopoverButtonHolder>
        <PopoverButtonHolder onClick={AddQuestionnaireModalHandler}>
            <p>اضافه کردن نظر سنجی</p>
            <PopOverButton>
                <Icon name='AddFile' style={{ width : 14 }}/>
            </PopOverButton>
        </PopoverButtonHolder>
        <AddQuestionnairePopUp AddQuestionnaireModal={AddQuestionnaireModal}
        setQuestionnaireModalState={() => setQuestionnaireModalState(!AddQuestionnaireModal)}
        FolderReload={FolderReload}
        folders={folders}
        SelectedFolderNumber={SelectedFolderNumber}/>
    </PopoverContainer>
  )
}
export default AddPopoverContent;