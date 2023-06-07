import { ADD_NOTE, CHANGE_THEME, REMOVE_NOTE } from "./ActionTypes";

export const AddNoteToTrash = data =>(
    {
    type:ADD_NOTE,
    payload:data
  
    
})
 export const RemoveNoteFromTrash= index =>({
    type:REMOVE_NOTE,
    payload:index
 })
 

 export const changeTheme = value =>(
    {
    type:CHANGE_THEME,
    payload:value
  
    
})

 