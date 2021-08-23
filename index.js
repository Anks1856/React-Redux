const redux = require('redux')
const reduxLoger = require('redux-logger')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const logger = reduxLoger.createLogger()
// Action

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

function buyCake() {
   return {
        type : BUY_CAKE,
        info : 'First redux action'
    }    
}

function buyIcecream() {
   return {
        type : BUY_ICECREAM,
        info : 'second redux action'
    }    
}

// Reducer
// (prevState, action) => newState

const cakeInitialState = {
    numOfCakes : 10
}

const icecreamInitialState = {
    numOfIcecream : 20
}

const cakeReducer = (state = cakeInitialState, action) => {
    switch(action.type) {
        case BUY_CAKE : return {
            ...state ,
            numOfCakes : state.numOfCakes - 1
        }

        // cases .......

        default : return state 

    }
}
const Icecreamreducer = (state = icecreamInitialState, action) => {
    switch(action.type) {
        case BUY_ICECREAM : return {
            ...state ,
            numOfIcecream : state.numOfIcecream - 1
        }

        // cases .......

        default : return state 

    }
}

 
// create store 

const rootReducer = redux.combineReducers({
    cake : cakeReducer,
    icecream : Icecreamreducer
})

const store = createStore(rootReducer , applyMiddleware(logger))
console.log('Initial State - ' , store.getState());
 const unsubscribe = store.subscribe(() => console.log('Updated state - ' , store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())

unsubscribe()

// OutPut

// Initial State -  { cake: { numOfCakes: 10 }, icecream: { numOfIcecream: 20 } }
// Updated state -  { cake: { numOfCakes: 9 }, icecream: { numOfIcecream: 20 } }
// Updated state -  { cake: { numOfCakes: 8 }, icecream: { numOfIcecream: 20 } }
// Updated state -  { cake: { numOfCakes: 7 }, icecream: { numOfIcecream: 20 } }
// Updated state -  { cake: { numOfCakes: 7 }, icecream: { numOfIcecream: 19 } }
// Updated state -  { cake: { numOfCakes: 7 }, icecream: { numOfIcecream: 18 } }
// Updated state -  { cake: { numOfCakes: 7 }, icecream: { numOfIcecream: 17 } }