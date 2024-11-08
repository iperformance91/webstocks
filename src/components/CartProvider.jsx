import React , {createContext , useContext, useReducer} from 'react'

const CartStateContext = createContext();

const CartDispatchContext = createContext();

const reducer = (state , action) => {
    switch(action.type){
        case "ADD": {
          console.log("Reducer got called")
          console.log("The action id" ,action)
            const existingItemIndex = state.findIndex(item => item.id === action.id && item.size === action.size);
            console.log("the value of " , existingItemIndex)
            if (existingItemIndex !== -1) {
              console.log("reaching here unqiue")
              
              const updatedState = state.map((item, index) => {
                if (index === existingItemIndex) {
                  return {
                    ...item,
                    qty: item.qty + action.qty,
                    price: item.price + action.price
                  };
                }
                return item;
              });
      
              return updatedState;
            }
      
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price }];
          }

          // case "ADD_SINGLE": {
          //   const existingItemIndex = state.findIndex(item => item.id === action.id);
          
          //   if (existingItemIndex !== -1) {
          //     const updatedState = [...state]; // Copy the state array
          
          //     if (updatedState[existingItemIndex].qty === 1) {
          //       // If the quantity is 1, remove the item
          //       updatedState.splice(existingItemIndex, 1);
          //     } else {
          //       // Decrease the quantity by 1 and update the price
          //       updatedState[existingItemIndex] = {
          //         ...updatedState[existingItemIndex],
          //         qty: updatedState[existingItemIndex].qty + 1,
          //         price: updatedState[existingItemIndex].price + (updatedState[existingItemIndex].price / updatedState[existingItemIndex].qty)
          //       };
          //     }
          
          //     return updatedState;
          //   }
          
          //   return state;
          // }

          case "ADD_SINGLE": {
            const existingItemIndex = state.findIndex(item => item.id === action.id);
          
            if (existingItemIndex !== -1) {
              const updatedState = [...state]; // Copy the state array
              const unitPrice = updatedState[existingItemIndex].price / updatedState[existingItemIndex].qty; // Calculate the unit price
          
              // Increase the quantity by 1 and update the price
              updatedState[existingItemIndex] = {
                ...updatedState[existingItemIndex],
                qty: updatedState[existingItemIndex].qty + 1,
                price: updatedState[existingItemIndex].price + unitPrice
              };
          
              return updatedState;
            }
          
            // If the item does not exist, you might want to add it as a new item with quantity 1
            return [
              ...state,
              {
                id: action.id,
                name: action.name,
                qty: 1,
                size: action.size,
                price: action.unitPrice // Assuming action has unitPrice for the new item
              }
            ];
          }
          

        case "DROP" : {
            let empArray = []
            return empArray
        }

        case "REMOVE": {
            return state.filter(item => item.id !== action.id);
          }

          case "REMOVE_SINGLE": {
            const existingItemIndex = state.findIndex(item => item.id === action.id);
          
            if (existingItemIndex !== -1) {
              const updatedState = [...state]; // Copy the state array
          
              if (updatedState[existingItemIndex].qty === 1) {
                // If the quantity is 1, remove the item
                updatedState.splice(existingItemIndex, 1);
              } else {
                // Decrease the quantity by 1 and update the price
                updatedState[existingItemIndex] = {
                  ...updatedState[existingItemIndex],
                  qty: updatedState[existingItemIndex].qty - 1,
                  price: updatedState[existingItemIndex].price - (updatedState[existingItemIndex].price / updatedState[existingItemIndex].qty)
                };
              }
          
              return updatedState;
            }
          
            return state;
          }
        default:
            console.log("default")
    }

}


export const CartProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer , [])
    return (
        <CartDispatchContext.Provider value = {dispatch}>
            <CartStateContext.Provider value= {state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}


export const useCart = () => useContext(CartStateContext)
export const useDispatch = () => useContext(CartDispatchContext)