import { DegreeShapeContainer, ShapeSelectorContainer, ToggleContainer } from '@/styles/questionnairePanel/QuestionSetting'
import { Checkbox, Switch } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ChangeDegreeShapeHandler } from '@/utilities/stores/QuestionStore'
import { CommonSetting } from '../Common/CommonSetting'

export const RateQuestionSetting = ({ QuestionInfo }) => {
    const dispatcher = useDispatch();
    const ChangeDegreeIconHandler = (IconName,ShapeName) => {
        dispatcher(ChangeDegreeShapeHandler({ QuestionID : QuestionInfo.id , NewIconName : IconName , NewShape : ShapeName}))
    }
  return (
    <>
    <DegreeShapeContainer>
        <p>سفارشی کردن آیکون</p>
        <ShapeSelectorContainer>
            <input type='radio' name='shape_option' id='star_shape' defaultChecked={QuestionInfo.shape == 'S' ? true : false}/>
            <label htmlFor='star_shape' onClick={() => ChangeDegreeIconHandler('Star','S')}>
            <svg width="17" height="16" viewBox="0 0 17 16"  xmlns="http://www.w3.org/2000/svg">
                <path d="M7.10433 0.898987C7.47114 0.155739 8.53099 0.155744 8.8978 0.898988L10.8282 4.81048L15.1448 5.43772C15.9651 5.55691 16.2926 6.56488 15.699 7.14342L12.5755 10.1881L13.3129 14.4872C13.453 15.3042 12.5956 15.9271 11.8619 15.5414L8.00106 13.5116L4.14018 15.5414C3.40655 15.9271 2.54913 15.3041 2.68924 14.4872L3.4266 10.1881L0.303081 7.14341C-0.290438 6.56488 0.0370772 5.55691 0.857295 5.43772L5.17389 4.81048L7.10433 0.898987Z" />
             </svg>
            </label>
            <input type='radio' name='shape_option' id='like_shape' defaultChecked={QuestionInfo.shape == 'L' ? true : false}/>
            <label htmlFor='like_shape' onClick={() => ChangeDegreeIconHandler('Like','L')}>
            <svg width="16" height="18" viewBox="0 0 16 18"  xmlns="http://www.w3.org/2000/svg">
                <path d="M10.4829 0.703859C9.68406 -0.133267 8.39129 0.317005 8.05198 1.2943C7.77205 2.10056 7.4084 3.06607 7.05406 3.77696C5.99442 5.90288 5.37583 7.11247 3.66974 8.62598C3.44337 8.8268 3.15163 8.98862 2.82905 9.11613C1.69991 9.56245 0.638089 10.7322 0.915812 12.1208L1.26885 13.886C1.45455 14.8145 2.14894 15.5585 3.06251 15.8076L8.66224 17.3348C11.2078 18.0291 13.8017 16.3943 14.2737 13.7984L14.9576 10.0367C15.2924 8.19515 13.8777 6.50001 12.006 6.50001H11.1225L11.1328 6.44778C11.2129 6.0396 11.3093 5.47747 11.3738 4.86485C11.438 4.25459 11.4721 3.58046 11.4218 2.95233C11.3725 2.33596 11.2379 1.70317 10.9176 1.22266C10.8081 1.05844 10.6455 0.874283 10.4829 0.703859Z" />
             </svg>
            </label>
            <input type='radio' name='shape_option' id='dislike_shape' defaultChecked={QuestionInfo.shape == 'D' ? true : false}/>
            <label htmlFor='dislike_shape' onClick={() => ChangeDegreeIconHandler('Dislike','D')}>
            <svg width="16" height="18" viewBox="0 0 16 18"  xmlns="http://www.w3.org/2000/svg">
                <path d="M10.4829 17.2962C9.68406 18.1333 8.39129 17.683 8.05198 16.7057C7.77205 15.8995 7.4084 14.9339 7.05406 14.2231C5.99442 12.0971 5.37583 10.8875 3.66974 9.37403C3.44337 9.17322 3.15163 9.01139 2.82905 8.88388C1.69991 8.43756 0.638089 7.2678 0.915812 5.87918L1.26885 4.11401C1.45455 3.18547 2.14894 2.44154 3.06251 2.19239L8.66224 0.665189C11.2078 -0.0290479 13.8017 1.60569 14.2737 4.20164L14.9576 7.96334C15.2924 9.80486 13.8777 11.5 12.006 11.5H11.1225L11.1328 11.5522C11.2129 11.9604 11.3093 12.5225 11.3738 13.1352C11.438 13.7454 11.4721 14.4195 11.4218 15.0477C11.3725 15.6641 11.2379 16.2968 10.9176 16.7774C10.8081 16.9416 10.6455 17.1257 10.4829 17.2962Z" />
            </svg>
            </label>
            <input type='radio' name='shape_option' id='smile_shape' defaultChecked={QuestionInfo.shape == 'SM' ? true : false}/>
            <label htmlFor='smile_shape' onClick={() => ChangeDegreeIconHandler('Smile','SM')}>
            <svg width="16" height="16" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM5.15467 10.4273C4.96002 10.2314 4.64344 10.2304 4.44757 10.4251C4.25169 10.6197 4.25069 10.9363 4.44533 11.1322C6.33704 13.0359 9.37792 13.103 11.3505 11.3265L11.5547 11.1322L11.6123 11.0627C11.7467 10.8674 11.7265 10.5981 11.5524 10.4251C11.3783 10.252 11.1088 10.2336 10.9144 10.3692L10.8453 10.4273L10.6671 10.5961C9.08775 12.0045 6.66416 11.9463 5.15467 10.4273ZM10.5 5.5C9.94772 5.5 9.5 5.94772 9.5 6.5C9.5 7.05228 9.94772 7.5 10.5 7.5C11.0523 7.5 11.5 7.05228 11.5 6.5C11.5 5.94772 11.0523 5.5 10.5 5.5ZM5.5 5.5C4.94772 5.5 4.5 5.94772 4.5 6.5C4.5 7.05228 4.94772 7.5 5.5 7.5C6.05228 7.5 6.5 7.05228 6.5 6.5C6.5 5.94772 6.05228 5.5 5.5 5.5Z" />
            </svg>
            </label>
        </ShapeSelectorContainer>
    </DegreeShapeContainer>
    <CommonSetting QuestionInfo={QuestionInfo} />
    </>
  )
}
