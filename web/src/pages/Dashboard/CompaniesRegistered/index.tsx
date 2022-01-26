import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stateProps } from '../../../redux/store';
import { getCompanies } from '../../../redux/actions/companiesActions';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { CLEAR_COMPANY } from '../../../redux/types';

import AsideAdmin from '../../../components/AsideAdmin';
import mapIcon from '../../../utils/mapIcon';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import './styles.css';

function CompaniesRegistered() {
    const {push} = useHistory();
    const dispatch = useDispatch();

    const { companies } = useSelector( (state: stateProps) => state.companies )
    
    useEffect(() => {
        dispatch(getCompanies(true))
        dispatch({ type: CLEAR_COMPANY })
    }, [dispatch]);

    function handleEditCompany(id: number) {
        push(`/dashboard/companies-registered/edit/${id}`)
    }

    function handleDeleteCompany(id: number) {
        push(`/dashboard/companies-registered/delete/${id}`)
    }

    return (
        <div id="dashboard-container">
            <AsideAdmin />

            <main>
                <div className="dashboard-main-container">
                    <header>
                        <h1>Pontos de atendimentos Cadastrados</h1>

                        <span>{companies.length} Pontos de atendimento</span>
                    </header>

                    <hr />

                    <div className="companies-wrapper">
                        {companies.map( company => (
                            <div key={company.id} className="company-container">
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

                            <div className="company-footer">
                                <h2>{company.name}</h2>

                                <div className="company-options">
                                    <button onClick={() => handleEditCompany(company.id)}>
                                        <FiEdit size={16} color="#15C3D6" />
                                    </button>
                                    <button onClick={() => handleDeleteCompany(company.id)}>
                                        <FiTrash2 size={16} color="#15C3D6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CompaniesRegistered;