import {Mousewheel, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import React from "react";
import {QuestionContainer} from "@/styles/Result/AddResult";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import {SubComponentGenerator} from "@/components/Questioner/AddResult/QuestionSubCompGenerator";
import QuestionComponent from "@/components/Questions/Question";
import {Provider} from "react-redux";
import AnswerStore from "@/utilities/stores/AnswerStore";

export const QuestionsSwiper = ({ setSwiperInstance  , questionnaireData , setCurrentSlide }) => {
    return  <Provider store={AnswerStore}>
        <Swiper
        direction={'vertical'}
        slidesPerView={3}
        navigation
        centeredSlides={true}
        // spaceBetween={20}
        onSlideChange={(e) => setCurrentSlide(e.activeIndex)}
        onSwiper={setSwiperInstance}
        mousewheel={true}
        pagination={{
            clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mySwiper"
    >

        {(questionnaireData && questionnaireData.questions && questionnaireData.questions?.length) &&
            questionnaireData.questions.map(item => item?.question &&
                <SwiperSlide>
                    <QuestionComponent QuestionInfo={ item?.question}
                       ChildQuestion={ item?.question.group ? 'true' : null} Questionnaire={questionnaireData}
                       UUID={questionnaireData.uuid}/>
                </SwiperSlide>)
        }
    </Swiper>
    </Provider>
}