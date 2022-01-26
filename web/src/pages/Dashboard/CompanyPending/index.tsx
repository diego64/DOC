import {  useEffect } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stateProps } from '../../../redux/store';
import { getCompany, companyPendingResponse } from '../../../redux/actions/companiesActions';

import { FiXCircle, FiCheck } from 'react-icons/fi';
import AsideAdmin from '../../../components/AsideAdmin';
import mapIcon from '../../../utils/mapIcon';

import './styles.css'

interface ParamsProps {
    id: string;
}

function CompanyPadding() {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const { id } = useParams<ParamsProps>();
    
    const { company } = useSelector((state: stateProps) => state.companies);

    useEffect( () => { 
        dispatch(getCompany(id))
    }, [id, dispatch])

    function handleAdminResponseToCompanyPending(adminResponse: boolean) {
        dispatch(companyPendingResponse(id, adminResponse, push))
    }

    if(!company.id || (!company.latitude || !company.longitude)) {
        return <p>Loading...</p>
    }

    return(
        <div id="page-create-company">
            <AsideAdmin />

            <main>
                <div className="company-details">
                    <h2>Dados</h2>

                    <hr />

                    <div className="map-container">
                        <MapContainer
                            center={[company.latitude, company.longitude]}
                            zoom={16}   
                            dragging={false}
                            touchZoom={false}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            doubleClickZoom={false}
                            style={{width: '100%', height: 200}}
                        >
                            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                      
                            <Marker position={[company.latitude, company.longitude]} icon={mapIcon}/>
                      
                        </MapContainer>
                        
                    </div>

                    <fieldset>

                    <div className="input">
                        <label htmlFor="name">Nome do posto de atendimento</label>
                        <input type="text" name="name" value={company.name} readOnly/>
                    </div>

                    <div className="input">
                        <label htmlFor="address">Endereço</label>
                        <input type="text" name="address" value={company.address} readOnly/>
                    </div>

                    <div className="input">
                        <label htmlFor="name">Especialização de atendimento</label>
                        <input type="text" name="specialization" value={company.specialization} readOnly/>
                    </div>

                    <div className="input">
                        <label htmlFor="name">Planos e convénios</label>
                        <input type="text" name="health_plan" value={company.health_plan} readOnly/>
                    </div>

                    <div className="input">
                        <label htmlFor="contact_phone">Telefone para contato</label>
                        <input type="text" name="contact_phone" value={company.contact_phone} readOnly/>
                    </div>

                        <div className="images-section">
                            <label>Fotos</label>
                            
                            <div className="images-container">
 
                                {company.images.map( image => (
                                    <img key={image.id} src={image.url} alt="company" />
                                ) )}

                            </div>
                        </div>
                        
                        <h2>Mais detalhes</h2>
                        <hr />
                        
                        <div className="input">
                            <label htmlFor="opening-hours">Horário de atendimento</label>
                            <input 
                            type="text" 
                            name="opening-hours" 
                            value={company.services_hours} 
                            readOnly 
                            />
                        </div>
                        
                        <div className="open-on-weekends">
                            <p>Atende fim de semana?</p>
                            <div className="switch" >
                                <input type="checkbox" checked={company.open_on_weekends} readOnly/>
                                <span className="slider round" />
                            </div>
                        </div>
                        
                        <div className="company-pending-buttons">
                            <button className="button-decline-company" onClick={ () => handleAdminResponseToCompanyPending(false)}>
                                <FiXCircle size={20} color="#FFF" style={{marginRight: "10px"}} />
                                Recusar
                            </button>
                            
                            <button className="button-accept-company" onClick={ () => handleAdminResponseToCompanyPending(true)}>
                                <FiCheck size={20} color="#FFF" style={{marginRight: "10px"}} />
                                Aceitar
                            </button>
                        </div>
                    </fieldset>
                </div>
            </main>
        </div>
    )
}

export default CompanyPadding;