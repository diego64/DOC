import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthRoute from './utils/AuthRoute';
import NotAuthRoute from './utils/NotAuthRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import CompaniesMap from './pages/CompaniesMap';
import Company from './pages/Company';
import CreateCompany from './pages/CreateCompany';
import CompaniesRegistered from './pages/Dashboard/CompaniesRegistered';
import CompaniesPending from './pages/Dashboard/CompaniesPending';
import CompanyEdit from './pages/Dashboard/CompanyEdit/index';
import CompanyPending from './pages/Dashboard/CompanyPending';
import CompanyDelete from './pages/Dashboard/CompanyDelete';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={CompaniesMap} />
                <Route path="/companies/create" component={CreateCompany} />
                <Route path="/companies/:id" component={Company} />
                
                <NotAuthRoute path="/login" component={Login} />
                <NotAuthRoute path="/forget-password" component={ForgetPassword} />
                <NotAuthRoute path="/reset-password/:id" component={ResetPassword} />
                
                <AuthRoute path="/dashboard/companies-registered" exact component={CompaniesRegistered} />
                <AuthRoute path="/dashboard/companies-pending" exact component={CompaniesPending} />
                <AuthRoute path="/dashboard/companies-registered/edit/:id" component={CompanyEdit} />
                <AuthRoute path="/dashboard/companies-pending/:id" component={CompanyPending} />
                <AuthRoute path="/dashboard/companies-registered/delete/:id" component={CompanyDelete} />
            </Switch>
        </BrowserRouter>         
    )
}

export default Routes;