import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { getCompany } from '../../redux/actions/companiesActions';
import { stateProps } from '../../redux/store';

import { FiClock, FiInfo } from "react-icons/fi";
import { FaWhatsapp } from 'react-icons/fa';
import Aside from '../../components/Aside';
import mapIcon from '../../utils/mapIcon';

import './styles.css';

interface CompanyParams {
    id: string;
}

function CompaniesMap() {
    const params = useParams<CompanyParams>();
    const dispatch = useDispatch();

    const { company } = useSelector((state: stateProps) => state.companies)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    useEffect( () => {
        dispatch(getCompany(params.id))
    }, [params.id, dispatch])
    
    if(!company.id || (!company.latitude && !company.longitude)) {
        return <p>Loading...</p>
    }

    return (
    <div id="page-company">
       
       <Aside />

        <main>
            <div className="company-details">
                <img src={company.images[activeImageIndex].url} alt={company.name} />

                <div className="images">
                    {company.images.map( (image, index) => (
                        <button 
                            key={image.id} 
                            className={activeImageIndex === index ? "active" : ""} 
                            type="button"
                            onClick={() => {setActiveImageIndex(index)}}
                        >
                            <img src={image.url} alt={image.url} />
                        </button>
                    ))}

                </div>

                <div className="company-details-content"> 
                    <h1>{company.name}</h1>
                    <p>{company.address}</p>

                    <div className="map-container">
                        <MapContainer
                            center={[company.latitude, company.longitude]}
                            zoom={16}
                            style={{width: '100%', height: 200}}
                            dragging={false}
                            touchZoom={false}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            doubleClickZoom={false}
                        >
                            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                            <Marker interactive={false} icon={mapIcon} position={[company.latitude, company.longitude]} />
                        </MapContainer>

                        <a href={`https://www.google.com/maps/place/${company.latitude},${company.longitude}`} target="_blank" rel="noopener noreferrer">
                            Ver rotas no Google Maps
                        </a>
                    </div>

                    <hr />

                    <h2>Informações sobre o local</h2>
                    <p>Especialização: {company.specialization}</p>
                    <p>Carência: {company.health_plan}</p>
                    <p>Telefone de contato: {company.contact_phone}</p>

                    <div className="open-details">
                        <div className="hour">
                            <FiClock size={32} color="#29B6D1"/>
                            {company.services_hours}
                        </div>
                       
                        {company.open_on_weekends ? (
                            <div className="open-on-weekends">
                                <FiInfo size={32} color="#39CC83" />
                                Atendemos <br />
                                fim de semana 
                            </div>
                        ) : (
                            <div className="open-on-weekends dont-open">
                                <FiInfo size={32} color="#FF669D" />
                                Não Atendemos <br />
                                fim de semana 
                            </div>
                        )}
                    </div>

                    <button className="button">
                        <FaWhatsapp size={20} color="#FFF" />
                        Entrar em contato
                    </button>
                      
                </div>
            </div>
        </main>

    </div>
    )
}

export default CompaniesMap