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