import React, { useState } from 'react'
import { QuestionnaireFooter , QuestionnaireFooterItem , QuestionnaireFooterButton
} from '@/styles/folders/Questionnaire'
import { Icon } from '@/styles/folders/icons'
import { Popover } from 'antd';
import { SharePopOverContent } from './SharePopover'
import RemovePopoverContent from './RemovePopover';
import Link from 'next/link';

const QuestionnaireFooterPart = ({ questionnaire , FolderReload }) => {
    const [ SharePopover , setSharePopOver] = useState(false);
    const [ DeletePopoverState , setDeletePopoverState ] = useState(false);

  return (
    <QuestionnaireFooter>
        <QuestionnaireFooterItem>
            <Popover
            content={SharePopOverContent}
            trigger="click"
            open={SharePopover}
            onOpenChange={() => setSharePopOver(false)}
            >
            <QuestionnaireFooterButton onClick={() => setSharePopOver(!SharePopover)}>
                <Icon name='Share' />
            </QuestionnaireFooterButton>
            </Popover>
            
        </QuestionnaireFooterItem>
        <QuestionnaireFooterItem>
            <Popover 
            content={<RemovePopoverContent FolderReload={FolderReload} questionnairesUUID={questionnaire.uuid}/>}
            trigger="click"
            open={DeletePopoverState}
            onOpenChange={() => setDeletePopoverState(false)}
            >
            <QuestionnaireFooterButton onClick={() => setDeletePopoverState(!DeletePopoverState)}>
                <Icon name='trash' />
            </QuestionnaireFooterButton>
            </Popover>
        </QuestionnaireFooterItem>
        <QuestionnaireFooterItem>
            <QuestionnaireFooterButton>
                <Link href={{
                    pathname : '/questionnaire/',
                    query : {
                        uuid : questionnaire.uuid
                    }
                }}>
                    <Icon name='GrayPen' />
                </Link>
            </QuestionnaireFooterButton>
        </QuestionnaireFooterItem>
        <QuestionnaireFooterItem>
            <QuestionnaireFooterButton>
            <Icon name='statics' />
            </QuestionnaireFooterButton>
        </QuestionnaireFooterItem>
        <QuestionnaireFooterItem>
            <QuestionnaireFooterButton>
            <Icon name='pdf' />
            </QuestionnaireFooterButton>
        </QuestionnaireFooterItem>
    </QuestionnaireFooter>
  )
}
export default QuestionnaireFooterPart;