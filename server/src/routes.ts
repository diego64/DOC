import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import 'express-async-errors';
import 'dotenv/config';

import CompaniesControllers from './controllers/CompaniesControllers';
import UsersController from './controllers/UsersControllers';

const routes = Router();
const upload = multer(uploadConfig);

//Rotas para usuários
routes.post('/register', UsersController.create);
routes.post('/login', UsersController.login);
routes.get('/user/:id', UsersController.getUserData);
routes.post('/forgot-password', UsersController.forgotPassword); 
routes.post('/reset-password', UsersController.resetPassword);

//Rotas para os pontos de atendimentos
routes.post('/companies', upload.array('images'), CompaniesControllers.create);
routes.get('/company/:id', CompaniesControllers.show);
routes.post('/companies/accept-response/:id', CompaniesControllers.acceptCompanyResponse);
routes.get('/companies/:accepted', CompaniesControllers.index);
routes.put('/company/:id', upload.array('images'), CompaniesControllers.update);
routes.delete('/company/:id', CompaniesControllers.delete);

export default routes;