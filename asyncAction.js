const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const axios = require('axios')

const initialState = {
    loading : false,
    users : [],
    error : ''
}

const FATCH_USERS_REQUEST = 'FATCH_USERS_REQUEST'
const FATCH_USERS_SUCESS = 'FATCH_USERS_SUCESS'
const FATCH_USERS_FAILURE = 'FATCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type : FATCH_USERS_REQUEST
    }
}

const fetchUsersSucess = (users) => {
    return {
        type : FATCH_USERS_SUCESS,
        payload : users
    }
}

const fetchUsersFailer = (error) => {
    return {
        type : FATCH_USERS_FAILURE,
        payload : error
    }
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case FATCH_USERS_REQUEST:
            return {
                ...state ,
                loading:true
            }
        case FATCH_USERS_SUCESS:
            return {
                loading : false ,
                users : action.payload,
                error: ''
            }
        case FATCH_USERS_FAILURE:
            return {
                loading:false,
                users : [],
                error : action.payload
            }
    }
}
// https://jsonplaceholder.typicode.com/users
const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest())
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => {
            const users = res.data
            dispatch(fetchUsersSucess(users))
        }).catch(err => {
            dispatch(fetchUsersFailer(err))
        })
    }
}

const store = createStore(reducer , applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())
