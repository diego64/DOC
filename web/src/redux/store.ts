import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import usersReducer from './reducers/usersReducer';
import companiesReducer, { CompanyProps } from './reducers/companiesReducers';

const middleware = [thunk];

const initialState = {};

export interface stateProps {
    user: {
        credentials: {
            id: string,
            email: string,
            name: string,   
        },
        authenticated: boolean,
        error: string
    },
    companies: {
        company: CompanyProps,
        companies: Array<CompanyProps> 
    }
}

const reducers = combineReducers({
    user: usersReducer,
    companies: companiesReducer,
});

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
);

export default store;