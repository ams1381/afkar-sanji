import {DateFilterContainer, InterviewerCodeSearchContainer} from "@/styles/Result/ResultPage";
import {Checkbox, Input} from "antd";
import {Icon} from "@/styles/icons";
import React, {useState} from "react";
import {digitsEnToFa, digitsFaToEn} from "@persian-tools/persian-tools";

export const QuestionnaireIDFilter = ({ QuestionnaireListData , setFilteredIDQuestionnaires , filteredIDQuestionnaires }) => {

    const [ IDSearchValue , setIDSearchValue ] = useState(null);
    const FilterByIdHandler = (ItemID) => {
        if(filteredIDQuestionnaires.find(QuestionnaireItem => QuestionnaireItem.id === ItemID)) {
            setFilteredIDQuestionnaires(prevState => prevState.filter(Item => Item.id !== ItemID))
        }
        else
        {

            let filteredList = [...filteredIDQuestionnaires];
            filteredList.push(QuestionnaireListData.results.find(item => item.id === ItemID))
            setFilteredIDQuestionnaires(filteredList)
        }
    }
    return <DateFilterContainer>
        <InterviewerCodeSearchContainer>
            <Input value={IDSearchValue ? digitsEnToFa(IDSearchValue) : ''}
                   onChange={(e) => setIDSearchValue(e.target.value)}
                   placeholder={'چیزی بنویسید'}  />
            <span style={{cursor : 'pointer' }}>
                <Icon style={{ width : 14 , height : 14 }} name={'Search'} />
             </span>
        </InterviewerCodeSearchContainer>
                <div style={{ display : 'grid' , gridTemplateColumns : !IDSearchValue ? 'auto auto auto' : 'auto', rowGap : 6 }}>
                    {
                       !IDSearchValue ? QuestionnaireListData?.results.map(item => (
                    <div style={{ display :  'flex' , gap : 5 , justifyContent : 'flex-end' , color : 'var(--Neutral-Gray9)' , textAlign : 'right'}}>
                        <span>{digitsEnToFa(item.id)}</span>
                        <Checkbox checked={filteredIDQuestionnaires.find(QuestionnaireItem => QuestionnaireItem.id === item.id)}
                                  value={item.id} key={item.id} onChange={() => FilterByIdHandler(item.id)} />
                    </div>
                        ))
                           : QuestionnaireListData?.results.filter(QuestionnaireItem => QuestionnaireItem.id == digitsFaToEn(IDSearchValue)).length ?
                               QuestionnaireListData?.results.filter(QuestionnaireItem => QuestionnaireItem.id == digitsFaToEn(IDSearchValue)).map(item => (
                               <div style={{ display :  'flex' , gap : 5 , justifyContent : 'flex-end'}}>
                                   <span>{digitsEnToFa(item.id)}</span>
                                   <Checkbox  value={item.id} key={item.id}
                                  checked={filteredIDQuestionnaires.find(QuestionnaireItem => QuestionnaireItem.id === item.id)}  onChange={() => FilterByIdHandler(item.id)} />
                               </div>
                           )) : <p>یافت نشد</p>
                    }
                </div>
    </DateFilterContainer>
}