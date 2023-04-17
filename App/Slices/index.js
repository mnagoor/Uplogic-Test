import { combineReducers } from 'redux'
import loginReducer from './login';


const rootReducer = combineReducers({

    loginObj: loginReducer,
    
})

export default rootReducer;