import React, { useState } from 'react'
import { QuestionnaireFooter , QuestionnaireFooterItem , QuestionnaireFooterButton
} from '@/styles/folders/Questionnaire'
import { Icon } from '@/styles/folders/icons'
import { Popover } from 'antd';
import { SharePopOver } from './SharePopover'

const QuestionnaireFooterPart = () => {
    const [ SharePopover , setSharePopOver] = useState(false);

  return (
    <QuestionnaireFooter>
        <QuestionnaireFooterItem>
            <Popover
            content={SharePopOver}
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
            <QuestionnaireFooterButton>
                <Icon name='trash' />
            </QuestionnaireFooterButton>
        </QuestionnaireFooterItem>
        <QuestionnaireFooterItem>
            <QuestionnaireFooterButton>
            <Icon name='GrayPen' />
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