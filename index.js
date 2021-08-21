const redux = require('redux')
const createStore = redux.createStore
// Action

const BUY_CAKE = 'BUY_CAKE'

function buyCake() {
   return {
        type : BUY_CAKE,
        info : 'First redux action'
    }
    
}

// Reducer
// (prevState, action) => newState

const initialState = {
    numOfCakes : 10
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BUY_CAKE : return {
            ...state ,
            numOfCakes : state.numOfCakes - 1
        }

        // cases .......

        default : return state 

    }
}

 
// create store 

const store = createStore(reducer)
console.log('Initial State - ' , store.getState());
 const unsubscribe = store.subscribe(() => console.log('Updated state - ' , store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

// unsubscribe()