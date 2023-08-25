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