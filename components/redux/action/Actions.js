import { ADD_NOTE, REMOVE_NOTE } from "./ActionTypes";

export const AddNoteToTrash = data =>(
    {
    type:ADD_NOTE,
    payload:data
  
    
})
 export const RemoveNoteFromTrash= index =>({
    type:REMOVE_NOTE,
    payload:index
 })