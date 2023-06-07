import { CHANGE_THEME } from "../action/ActionTypes";


 const ThemeReducer  = (state=false,action) =>{
    switch(action.type){
        case CHANGE_THEME:
           //working properly
            return action.payload
          

        default :
           return state ; 
    }

    
 }

 export default ThemeReducer;