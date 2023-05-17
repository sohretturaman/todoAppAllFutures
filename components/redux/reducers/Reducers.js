import { ADD_NOTE, REMOVE_NOTE } from "../action/ActionTypes";


 const Reducers  = (state=[],action) =>{
    switch(action.type){
        case ADD_NOTE:
           //working properly
            return[...state,...action.payload]
          
            


        case REMOVE_NOTE :
           const  newArray = state.filter((item,index)=>
           index!=action.payload) 
           return newArray; 

        default :
           return state ; 
    }

    
 }

 export default Reducers;