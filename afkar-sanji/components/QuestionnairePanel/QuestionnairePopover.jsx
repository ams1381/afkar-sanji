import { FolderPopoverContainer } from '@/styles/folders/Popovers';
import React from 'react'
import RemovePopup from '../Folders/RemovePopup';

export const QuestionnairePopover = ({ RenameInput , RenameFolderState , SelectedFolderNumber , closeEditPopover, Folders , SelectFolder }) => {
    const RemoveQuestionnaireStateHandler = () => {
         
    }

  return (
    <FolderPopoverContainer>
        <FolderPopoverItem>
          <button onClick={() => {
            RenameFolderState(true);
            setTimeout(()=> {
              RenameInput.current.select();
            },100)
            }}>
              <Icon name='GrayPen'/>
              <p>تغییر نام</p>
            </button>
        </FolderPopoverItem>
        <FolderPopoverItem deleteitem={'true'}>
          <RemovePopup 
          title='این پرسشنامه حذف شود؟'
          onOkay={deleteFolder} DeleteState={deleteFolderState} setDeleteState={setDeleteFolderState}>
          </RemovePopup>
          <button onClick={RemoveQuestionnaireStateHandler}>
              <Icon name='RedTrash' />
              <p>حذف</p>
            </button>
        </FolderPopoverItem>
    </FolderPopoverContainer>
  )
}
