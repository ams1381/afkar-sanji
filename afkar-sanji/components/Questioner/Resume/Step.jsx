import {StepForm, StepText} from "@/styles/questioner/resume/resume";

export default function ({current,onChange}){
    return (
        <StepForm current={current}
                  onChange={onChange}
                  direction="vertical"
                  style={{height: '100vh'}}
                  items={[
                      {
                          title: <StepText>
                              سابقه تحصیلی
                          </StepText>,
                      },
                      {
                          title: <StepText>
                              مهارت‌ها
                          </StepText>,
                      },
                      {
                          title: <StepText>
                              افتخارات
                          </StepText>,
                      },
                      {
                          title: <StepText>
                              سابقه شغلی
                          </StepText>,
                      },
                      {
                          title: <StepText>
                              سابقه پژوهشی
                          </StepText>,
                      },
                  ]}/>
    )
}