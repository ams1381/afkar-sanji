import {StepForm, StepFormMobile, StepText} from "@/styles/questioner/resume/resume";


function Step({current, onChange}) {
    return (
        <StepForm current={current}
                  onChange={onChange}
                  direction="vertical"
                  style={{height: '100vh'}}
                  responsive={true}
                  status={'process'}
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

function StepMobile({current, onChange}) {
    return (
        <StepFormMobile current={current}
                        onChange={onChange}
                        style={{width: '100%'}}
                        responsive={false}
                        items={[
                            {},
                            {},
                            {},
                            {},
                            {},
                        ]}/>
    )
}

export {Step, StepMobile}