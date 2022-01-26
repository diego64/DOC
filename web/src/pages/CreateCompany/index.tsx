import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvent} from 'react-leaflet'
import { useHistory } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';
import Aside from '../../components/Aside';
import mapIcon from '../../utils/mapIcon';

import './styles.css';

import { useDispatch } from 'react-redux';
import { createCompany } from '../../redux/actions/companiesActions';

function CreateCompany() {
    const { push } = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [health_plan, setHealth_plan] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [contact_phone, setContact_phone] = useState('');
    const [services_hours, setServices_hours] = useState('');
    const [openOnWeekends, setOpenOnWeekends] = useState(true);
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
            navigator.geolocation.getCurrentPosition( pos => {
                setLatitude(pos.coords.latitude)
                setLongitude(pos.coords.longitude)
            });
    }, []);
    
    async function handleCreateNewCompany(e: FormEvent) {
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
        data.append('openOnWeekends', String(openOnWeekends));

        images.forEach( image => {
            data.append('images', image)
        });
        
        dispatch(createCompany(data, push))
    }

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if(!event.target.files) {
            return;
        }
        const selectedImages = Array.from(event.target.files)
        setImages(selectedImages)
        
        const selectedFilesImagesPreview = selectedImages.map( image => {
            return URL.createObjectURL(image)
        })

        setPreviewImages(selectedFilesImagesPreview)
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

    if(!latitude || !longitude) {
        return <p>loading...</p>
    }

    return(
        <div id="page-create-company">
            <Aside />

            <main>
                <form onSubmit={handleCreateNewCompany} className="company-details">
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

                        <p>
                            Clique no mapa para adicionar a localização
                        </p>
                        
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
                            onChange={ e => setHealth_plan(e.target.value)} 
                            />
                        </div>

                        <div className="input">
                            <label htmlFor="contact_phone">Telefone para contato</label>
                            <input 
                            type="text" 
                            name="contact_phone" 
                            value={contact_phone} 
                            onChange={ e => setContact_phone(e.target.value)} 
                            />
                        </div>

                        <div className="images-section">
                            <label>Fotos</label>
                            
                            <div className="images-container">
 
                                {previewImages.map( image => (
                                    <img key={image} src={image} alt={name} />
                                ) )}
 
                                <label htmlFor="image[]" className="upload-image">
                                    <FiPlus size={24} color="#15B6B6"/>
                                </label>
 
                            </div>
                            <input 
                                type="file" 
                                multiple 
                                id="image[]"
                                onChange={handleSelectImages}
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
                            onChange={ e => setServices_hours(e.target.value)} 
                            />
                        </div>
                        
                        <div className="open-on-weekends">
                            <p>Atende fim de semana ?</p>
                            <div className="switch" onClick={() => toggleOpenOnWeekends()} >
                                <input type="checkbox" checked={openOnWeekends} readOnly/>
                                <span className="slider round"></span>
                            </div>
                        </div>
                        
                        <button type="submit" className="button" >
                            Confirmar
                        </button>
                    </fieldset>

                </form>
            </main>
        </div>
    )
}

export default CreateCompany