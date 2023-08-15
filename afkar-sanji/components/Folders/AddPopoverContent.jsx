import { PopoverContainer , PopoverButtonHolder , PopOverButton} from '@/styles/folders/cornerAdd';
import React, { useState } from 'react'
import { Icon } from '@/styles/folders/icons';
import AddQuestionnairePopUp from './AddQuestionnairePopUp';

const AddPopoverContent = ({folders , SetSideBar , SelectedFolderNumber , setAddPopover , FolderReload}) => {
    const [ AddQuestionnaireModal , setQuestionnaireModalState ] = useState(false);
    const [ NewQuestionnaireName , setNewQuestionnaireName ] = useState(null);
    const [ ErrMessage , SetErrMessage ] = useState(null);

    const AddQuestionnaireModalHandler = () => {
        setAddPopover()
        if(folders.length)
            setQuestionnaireModalState(true);
        else
            SetSideBar(true);
    }
    const AddFolderHandler = () => {
        SetSideBar(true);
        setAddPopover();
    }
  return (
    <PopoverContainer>
        <PopoverButtonHolder onClick={AddFolderHandler}>
            <p>اضافه کردن پوشه</p>
            <PopOverButton>
                <Icon name='AddFile'/>
            </PopOverButton>
        </PopoverButtonHolder>
        <PopoverButtonHolder onClick={AddQuestionnaireModalHandler}>
            <p>اضافه کردن نظر سنجی</p>
            <PopOverButton>
                <Icon name='AddFile'/>
            </PopOverButton>
        </PopoverButtonHolder>
        <AddQuestionnairePopUp AddQuestionnaireModal={AddQuestionnaireModal}
        setQuestionnaireModalState={() => setQuestionnaireModalState(!AddQuestionnaireModal)}
        FolderReload={FolderReload}
        folders={folders}
        SelectedFolderNumber={SelectedFolderNumber}
        />
        
    </PopoverContainer>
  )
}
export default AddPopoverContent;