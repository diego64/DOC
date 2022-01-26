import api from "../../services/api"
import { GET_COMPANY, GET_COMPANIES } from "../types";

export const getCompanies = (acceptedCompanies: boolean) => (dispatch: Function) => {
    api.get(`/companies/${acceptedCompanies}`)
        .then((res) => {
            dispatch({type: GET_COMPANIES, payload: res.data});        
        })
}

export const getCompany = (id: string) => (dispatch: Function) => {
    api.get(`/company/${id}`)
        .then((res) => {
            dispatch({type: GET_COMPANY, payload: res.data});        
        })
}

export const createCompany = (companyData: FormData, push: Function) => (dispatch: Function) => {
    api.post('/companies', companyData)
        .then(() => {
            alert("Ponto de atendimento registado com sucesso! Verifique a lista de cadastros pendentes.");
            push('/app')
            dispatch(getCompanies(true))
        })
        .catch((err) => {
            alert("Ocorreu um erro ao tentar cadastrar um ponto de atendimento");
            console.log(err)
        })
}

export const companyPendingResponse = (id: string, adminResponse: boolean, push: Function) => (dispatch: Function) => {
    api.post(`/companies/accept-response/${id}`, {adminResponse})
        .then(() => {
            dispatch(getCompanies(true))
            push('/dashboard/companies-registered')
        })
}

export const deleteCompany = (id: string, push: Function) => (dispatch: Function) => {
    api.delete(`/company/${id}`)
        .then(() => {
            dispatch(getCompanies(true))
            alert("Ponto de atendimento excluído com sucesso!")
            push('/dashboard/companies-registered')
        })
}

export const updateCompany = (id: string, data: FormData, push: Function) => (dispatch: Function) => {
    api.put(`/company/${id}`, data)
        .then(() => {
            dispatch(getCompanies(true))
            alert("Ponto de atendimento atualizado com sucesso!")
            push('/dashboard/companies-registered')
        })
}