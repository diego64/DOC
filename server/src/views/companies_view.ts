import Company from '../models/Company';
import imagesView from './images_view';

// Dados dos pontos de atendimentos mostrados no Front
export default {
    render(company: Company) {
        return {
            id: company.id,
            name: company.name,
            latitude: company.latitude,
            longitude: company.longitude,
            address: company.address,
            health_plan: company.health_plan,
            specialization: company.specialization,
            contact_phone:company.contact_phone,
            services_hours: company.services_hours,
            open_on_weekends: company.open_on_weekends,
            images: imagesView.renderMany(company.images),
            accepted: company.accepted,
        }
    },
/*
    renderMany(company: Company[]) {
        return company.map(company => this.render(company))
    }
*/

    renderMany(companies: Company[]) {
        return companies.map(company => this.render(company))
    }
}