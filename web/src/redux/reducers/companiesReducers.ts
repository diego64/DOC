import { CLEAR_COMPANY, GET_COMPANY, GET_COMPANIES } from "../types"

const initialState = {
    companies: [],
    company: {}
}

interface actionProps {
    type: string
    payload: any
}

export interface CompanyProps {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    health_plan: string;
    specialization: string;
    contact_phone: string;
    services_hours: string;
    open_on_weekends: boolean;
    images: Array<{
        id: number;
        url: string;
    }>
    accepted: boolean;
}

export default function companiesReducer(state = initialState, action: actionProps) {

    switch (action.type) {
        case GET_COMPANIES:
            return {...state, companies: action.payload}
            
        case GET_COMPANY:
            return {...state, company: action.payload}
        
        case CLEAR_COMPANY:
            return {...state, company: {}}
            
        default: 
        return state
    }
}