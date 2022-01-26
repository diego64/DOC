import React, { useEffect } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getCompanies } from '../../../redux/actions/companiesActions'
import { stateProps } from '../../../redux/store'
import { CLEAR_COMPANY } from '../../../redux/types'

import AsideAdmin from '../../../components/AsideAdmin'
import mapIcon from '../../../utils/mapIcon'

function CompaniesPending() { 

    const {push} = useHistory();
    const dispatch = useDispatch();

    const { companies } = useSelector( (state: stateProps) => state.companies )
    
    useEffect( () => {
        dispatch(getCompanies(false))
        dispatch({type: CLEAR_COMPANY})
    }, [dispatch])
    
    function handleGoToAcceptOrDeclineCompanyPage(id: number) {
        push(`/dashboard/companies-pending/${id}`)
    }

    return (
        <div id="dashboard-container">
            <AsideAdmin />

            <main>
                <div className="dashboard-main-container">
                    <header>
                        <h1>Cadastrados Pendentes</h1>

                        <span>{companies.length} Pontos de atendimento</span>
                    </header>

                    <hr />

                    <div className="companies-wrapper">
                        {companies.map(company => (
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

                                <button onClick={() => handleGoToAcceptOrDeclineCompanyPage(company.id)}>
                                    <FiArrowRight size={16} color="#15C3D6" />
                                </button>
                                
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default CompaniesPending