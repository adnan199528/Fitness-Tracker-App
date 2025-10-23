import { createContext, useReducer } from 'react'

export const MealsContext = createContext()

export const mealsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEALS':
      return { 
        meals: action.payload 
      }
    case 'CREATE_MEAL':
      return { 
        meals: [action.payload, ...state.meals] 
      }
    case 'DELETE_MEAL':
      return { 
        meals: state.meals.filter(m => m._id !== action.payload._id) 
      }
    case 'UPDATE_MEAL':
      return {
        meals: state.meals.map((meal) =>
          meal._id === action.payload._id ? action.payload : meal
        ),
      };
    default:
      return state
  }
}

export const MealsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mealsReducer, { 
    meals: null
  })
  
  return (
    <MealsContext.Provider value={{...state, dispatch}}>
      { children }
    </MealsContext.Provider>
  )
}