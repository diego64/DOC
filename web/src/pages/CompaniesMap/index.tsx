import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stateProps } from '../../redux/store';
import { getCompanies } from '../../redux/actions/companiesActions';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { FiPlus, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import mapMarkerImg from '../../assets/new_images/map-marker_doc_branco.svg';
import mapIcon from '../../utils/mapIcon';

import './styles.css';

function CompaniesMap() {

    const dispatch = useDispatch();
    const [latitude, setLatitude] = useState<number | null>()
    const [longitude, setLongitude] = useState<number | null>()

    const { authenticated } = useSelector((state: stateProps) => state.user)
    const { companies } = useSelector((state: stateProps) => state.companies)

    useEffect( () => {
        dispatch(getCompanies(true))
    }, [])

    useEffect( () => {
        navigator.geolocation.getCurrentPosition( pos => {
            setLatitude(pos.coords.latitude)
            setLongitude(pos.coords.longitude)
        })
    }, [])

    if(!latitude || !longitude) {
        return <p>loading...</p>
    }
    
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="marker"/>

                    <h2>Escolha um Ponto de atendimento no mapa</h2>
                </header>

                <footer>
                    <strong>Rio de Janeiro</strong>
                    <span>Rio de Janeiro</span>
                </footer>
                
                <Link to="/" className="goBack-button">
                    <FiArrowLeft size={50} color="#FFFFFF"/>
                </Link>
            </aside>

            <MapContainer 
                center={[latitude, longitude]} 
                zoom={15} 
                scrollWheelZoom={false}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

            {companies.map( (company) => (
                <Marker 
                    key={company.id}
                    position={[company.latitude, company.longitude]}
                    icon={mapIcon}
                >
                    <Popup 
                      closeButton={false}
                      minWidth={240}
                      maxWidth={240}
                      className="map-popup"
                    >
                    {company.name}
                    <Link to={`/companies/${company.id}`}>
                      <FiArrowRight size={20} color="#FFF" />
                    </Link>
                    </Popup>

              </Marker>      
            ))}

            </MapContainer>

            {
                authenticated &&
                <Link to="/companies/create" className="create-company">
                    <FiPlus size={32} color="#FFF" />
                </Link>
            }
            

            { authenticated &&
                <Link to="/dashboard/companies-registered" className="dashboard">
                    Dashboard
                </Link>

            
            }
        </div>
    )
}

export default CompaniesMap