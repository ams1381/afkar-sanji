export interface NumberQuestion {
    title : string,
    description : string,
    is_required : boolean,
    show_number : boolean,
    placement : number
    media : object,
    min : number,
    max : number,
}
