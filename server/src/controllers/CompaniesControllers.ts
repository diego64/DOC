import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import * as Yup from 'yup' ;
import { getRepository } from 'typeorm';
import Company from '../models/Company';

import CompanyView from '../views/companies_view';

interface companyProps {
  name: string, 
  latitude: number, 
  longitude: number, 
  address: string,
  health_plan: string,
  specialization: string,
  contact_phone: string,
  services_hours: string,
  open_on_weekends: boolean,
  images?: Array<{}>,
  accepted: boolean
}

async function validateCompanyData(data: companyProps) { 
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    address: Yup.string().required().max(300),
    health_plan: Yup.string().required(),
    specialization: Yup.string().required(),
    contact_phone: Yup.string().required(),
    services_hours: Yup.string().required(),
    open_on_weekends: Yup.boolean().required(),
    images: Yup.array(
      Yup.object().shape({
        path: Yup.string().required(),
    })
    ),
    accepted: Yup.boolean().required()
  });

  await schema.validate(data, {
    abortEarly: false
  })
}

export default {
  async index(request: Request, response: Response) {
    const { accepted } = request.params

      const companiesRepository = getRepository(Company)

      const companies = await companiesRepository.find({
        where: {accepted: accepted === "true"},
        relations: ['images']
      });

      return response.json(CompanyView.renderMany(companies))
  },

  async show(request: Request, response: Response) {
    const { id } = request.params
    const companiesRepository = getRepository(Company)

    const company = await companiesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(CompanyView.render(company)) 
  },

  async create(request: Request, response: Response) {
    const { 
      name, 
      latitude, 
      longitude, 
      address,
      health_plan,
      specialization, 
      contact_phone,
      services_hours,
      open_on_weekends 
    } = request.body

    const requestImages = request.files as Express.Multer.File[];
    
    const images = requestImages.map( image => {
      return { 
          path: image.filename
      }
    });
    
    const companiesRepository = getRepository(Company)

    const data = {
      name,
      latitude,
      longitude,
      address,
      health_plan,
      specialization,
      contact_phone,
      services_hours,
      open_on_weekends: open_on_weekends === "true",
      images,
      accepted: false //original é false
    }

    await validateCompanyData(data)

    const company = companiesRepository.create(data)
  
    await companiesRepository.save(company);
  
    return response.status(200).json(company);
  },

  async update(request: Request, response: Response) {
    const { 
            name,
            latitude,
            longitude, 
            address,
            health_plan,
            specialization,
            contact_phone,
            services_hours,
            open_on_weekends
          } = request.body
    
    const { id } = request.params;

    const companiesRepository = getRepository(Company)

    const data = {
      name,
      latitude,
      longitude,
      address,
      health_plan,
      specialization,
      contact_phone,
      services_hours,
      open_on_weekends: open_on_weekends === "true",
      accepted: true 
    }

    await validateCompanyData(data);
    
    const company = await companiesRepository.findOne(id)
    
    await companiesRepository.update(id, data)
    return response.status(200).send("Company updated successfully")
  },
  
  async delete(request: Request, response: Response) {
    const {id} = request.params
    const companiesRepository = getRepository(Company)

    const company = await companiesRepository.findOne(id, {
      relations: ['images']
    })

    if(!company) return response.status(404).send('Company not found')

    company.images.map( image => {
      return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', image.path))
    })

    await companiesRepository.delete(id)

    return response.status(200).send()
  
  },

  async acceptCompanyResponse(req: Request, res: Response) {
    const { id } = req.params
    const { adminResponse } = req.body
    
    const companiesRepository = getRepository(Company)

    const company = await companiesRepository.findOne({ id: parseInt(id) })

    if(!company) { return res.status(404).send("Company not found") }

    if(adminResponse) {
      company.accepted = true
      await companiesRepository.save(company)
      return res.status(200).send("Company saved")
    } else {
      await companiesRepository.delete({ id: parseInt(id)})
      return res.status(200).send("Company removed")
    }
  }
}