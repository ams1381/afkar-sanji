export const form_data_convertor = (obj, formData, namespace) => {
    let form_Data = new FormData();
    namespace = namespace || '';
    for (let property in obj) {
        if (Array.isArray(obj[property])) {
            obj[property].map((item, i) => {
                form_Data.append(`${property}[${i}]text`, item.text !== null ? item.text : 'null')
            })
        } else {
            if (obj[property] !== null) {
                form_Data.append(property, obj[property] !== null ? obj[property] : 'null')
            }
        }
    }
    return form_Data;
}
export const detectFileFormat = (fileName) => {
    if(!fileName)
     return
     fileName = fileName.toLowerCase();
    let pictureFormats = ['jpg', 'jpeg', 'png', 'gif'];
    let videoFormats = ['mp4', 'avi', 'mkv', 'mov', 'flv', 'wmv'];
    let zip_formats  = ['zip','rar','7z'];
    let audio_formats = ['mp3','wav','ogg','mpeg-1']
    let fileFormat = fileName.split(".")[fileName.split(".").length - 1];

    return pictureFormats.includes(fileFormat) ? 'Picture' :
           videoFormats.includes(fileFormat) ? 'Video' : zip_formats.includes(fileFormat) ?
            'Zip' : audio_formats.includes(fileFormat) ? 'Audio' : 'UNKNOWN';
}
export const  AnswerSetFormDataConverter = (dataArray) => {
    const formData = new FormData();
    
    dataArray.forEach((item, index) => {
      const itemName = `[${index}]`;
  
      formData.append(`${itemName}question`, item.question);
  
      if (item.answer && typeof item.answer === 'object') {
        Object.keys(item.answer).forEach(answerItems => {
            if(answerItems == 'other_text')
                formData.append(`${itemName}answer.other_text`,item['answer']['other_text']);
            else
            if(Array.isArray(item.answer[answerItems]))
            {
                item.answer[answerItems].forEach((answerChildItem,index) => {
                    console.log(answerChildItem)
                    formData.append(`${itemName}answer.${answerItems}[${index}]`,answerChildItem)
                })
            }
            else 
            {
                item.answer[answerItems]
                formData.append(`${itemName}answer.${answerItems}`,item.answer[answerItems])
            }
        })
      } 
      if (item.file !== null) {
        formData.append(`${itemName}file`, item.file);
      }
    });
  
    return formData;
  }


//  0[question]:24
// 0[answer][integer_selective]:3
