import { useReducer } from "react"

const initialState =
    { amountOffered: "",
      category: "",
      date: "",
      distance: "",
      sort:""
      }

function filterRducer(state,action){
    switch(action.type){
        case 'SET_AOUNTOFFERED' :
            return {...state,amountOffered: action.payload};
        case 'SET_CATEGORY':
            return {...state,category: action.payload};
        case 'SET_DATE':
            return {...state,date:action.payload};
        case 'SET_DISTANCE':
            return {...state,distance:action.payload};
        case 'SET_SORT':
            return {...state,sort:action.payload}

    }
}

export default function useFilterReducer(){
   const [state,dispatch] = useReducer(filterRducer,initialState)

   return state,dispatch

}
