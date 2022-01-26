import { FormEvent, useCallback, useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvent} from 'react-leaflet';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stateProps } from '../../../redux/store';
import { getCompany, updateCompany } from '../../../redux/actions/companiesActions';

import { FiPlus, FiX} from 'react-icons/fi';
import AsideAdmin from '../../../components/AsideAdmin';
import mapIcon from '../../../utils/mapIcon';

import './styles.css';

interface ParamsProps {
    id: string;
}

interface imageProps {
    id: number;
    url: string;
};

function CompanyConfirm() {
    const dispatch = useDispatch();
    const { push } = useHistory();
    const { id } = useParams<ParamsProps>();
    
    const { company } = useSelector((state: stateProps) => state.companies);

    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState<number | null>();
    const [longitude, setLongitude] = useState<number | null>();
    const [address, setAddress] = useState('');
    const [health_plan, setHealthPlan] = useState(''); //vz
    const [specialization, setSpecialization] = useState('');
    const [contact_phone, setContactPhone] = useState(''); //vz
    const [services_hours, setServicesHours] = useState(''); //vz
    const [openOnWeekends, setOpenOnWeekends] = useState(true);
    const [previewImages, setPreviewImages] = useState<imageProps[]>([]);

    useEffect(() => {
        dispatch(getCompany(id))
    }, [id, dispatch]);

    useEffect(() => {
        if(company.id) {
            setName(company.name)
            setLatitude(company.latitude)
            setLongitude(company.longitude)
            setAddress(company.address)
            setHealthPlan(company.health_plan)
            setSpecialization(company.specialization)
            setContactPhone(company.contact_phone)
            setServicesHours(company.services_hours)
            setOpenOnWeekends(company.open_on_weekends)
            setPreviewImages(company.images)
        }
    },[company]);

    function removeImageFromPreviewImages(id: number) {
        setPreviewImages(
            previewImages.filter( image => image.id !== id)
        )
    };
    
    function handleEditCompany(e: FormEvent) {
        e.preventDefault();
    
        const data = new FormData();

        data.append('name', name);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('address', address);
        data.append('health_plan', health_plan);
        data.append('specialization', specialization);
        data.append('contact_phone', contact_phone);
        data.append('services_hours', services_hours);
        data.append('open_on_weekends', String(openOnWeekends));

        dispatch(updateCompany(id, data, push));
    }

    function toggleOpenOnWeekends() {
        setOpenOnWeekends(!openOnWeekends)
    }

    function MinimapBounds() {
        const onClick = useCallback(
          (e) => {   
            setLatitude(e.latlng.lat)
            setLongitude(e.latlng.lng)
            },
          [],
        )
        useMapEvent('click', onClick)

        return null
    }
    
    if(!company.id || !latitude || !longitude) {
        return <p>Loading...</p>
    }

    return(
        <div id="page-create-company">
            <AsideAdmin />

            <main>
                <form onSubmit={handleEditCompany} className="company-details">
                    <h2>Dados</h2>

                    <hr />

                    <div className="map-container">
                        <MapContainer
                            center={[latitude, longitude]}
                            zoom={16}   
                            style={{width: '100%', height: 200}}
                        >
                            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                      
                            <MinimapBounds />
                                {latitude && longitude && (
                                    <Marker position={[latitude, longitude]} icon={mapIcon}/>
                                )}
                        </MapContainer>
                        
                    </div>

                    <fieldset>

                    <div className="input">
                            <label htmlFor="name">Nome do posto de atendimento</label>
                            <input 
                            type="text" 
                            name="name" 
                            value={name} 
                            onChange={ e => setName(e.target.value)} 
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="address">Endereço</label>
                            <input
                            type="text" 
                            name="address" 
                            value={address} 
                            onChange={ e => setAddress(e.target.value)} 
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="specialization">Especialização do atendimento</label>
                            <input 
                            type="text" 
                            name="specialization" 
                            value={specialization} 
                            onChange={ e => setSpecialization(e.target.value)} 
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="health_plan">Planos e convénios</label>
                            <input 
                            type="text" 
                            name="health_plan" 
                            value={health_plan} 
                            onChange={ e => setHealthPlan(e.target.value)} 
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="services_hours">Telefone para contato</label>
                            <input 
                            type="text" 
                            name="services_hours" 
                            value={contact_phone} 
                            onChange={ e => setContactPhone(e.target.value)} 
                            />
                        </div>

                    <div className="images-section">
                        <label>Fotos</label>
                        
                        <div className="images-container">

                            {previewImages.map( image => (
                                <div key={image.id} className="image-wrapper">
                                    <img src={image.url} alt="company" />
                                    <FiX size={16} color="red" className="image-remove-icon" onClick={() => removeImageFromPreviewImages(image.id)} />
                                </div>
                            ) )}
                            
                            <label htmlFor="image[]" className="upload-image">
                                <FiPlus size={24} color="#15b6d6"/>
                            </label>

                        </div>
                        <input
                            type="file" 
                            multiple 
                            id="image[]"
                        />
                    </div>
                        
                    <h2>Mais detalhes</h2>
                        <hr />
                        
                        <div className="input">
                            <label htmlFor="services_hours">Horário de atendimento</label>
                            <input 
                            type="text" 
                            name="services_hours" 
                            value={services_hours} 
                            onChange={ e => setServicesHours(e.target.value)} 
                            />
                        </div>
                        
                        <div className="open-on-weekends">
                            <p>Atende final de semana ?</p>
                            <div className="switch" onClick={() => toggleOpenOnWeekends()} >
                                <input type="checkbox" checked={openOnWeekends} readOnly/>
                                <span className="slider round"></span>
                            </div>
                        </div>
                        
                        <button className="button" type="submit">
                            Confirmar
                        </button>
                    </fieldset>
                </form>
            </main>
        </div>
    )
}

export default CompanyConfirm;