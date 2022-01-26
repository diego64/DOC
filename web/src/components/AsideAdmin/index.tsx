import { useEffect, useState } from 'react';
import {FiPower, FiMapPin, FiAlertCircle} from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/usersActions';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import mapMarkerImg from '../../assets/new_images/map-marker_doc_branco.svg';

import './styles.css';

function Aside() {
    const {push} = useHistory();
    const {path} = useRouteMatch();
    const dispatch = useDispatch();

    const [registeredCompaniesPage, setRegisteredCompaniesPage] = useState(false)
    const [pendingCompaniesPage, setPendingCompaniesPage] = useState(false)

    useEffect( () => {
        if(path.split('/')[2] === "companies-registered") {
            setRegisteredCompaniesPage(true)
            setPendingCompaniesPage(false)
        }
        
        if(path.split('/')[2] === "companies-pending") {
            setPendingCompaniesPage(true)
            setRegisteredCompaniesPage(false)
        }
    }, [path])

    function handleGoToAppPage() {
        push('/app')
    }

    function handleLogoutUser() {
        dispatch(logoutUser())
    }

    return(
    <aside className="aside-container">
        <img src={mapMarkerImg} alt="DOC" onClick={handleGoToAppPage} style={{cursor: 'pointer'}}/>

        <div className="aside-admin-main-content">
            <Link to="/dashboard/companies-registered" className={ registeredCompaniesPage ? "active-icon" : ""}>
                <FiMapPin size={24} color={ registeredCompaniesPage? "#0089A5" : "#FFF"} />
            </Link>

            <Link to="/dashboard/companies-pending" className={ pendingCompaniesPage ? "active-icon" : ""}>
                <FiAlertCircle size={24} color={  pendingCompaniesPage ? "#0089A5" : "#FFF"} />
            </Link>
        </div>

        <footer>
            <button type="button" onClick={handleLogoutUser}>
                <FiPower size={24} color="#FFF" />
            </button>
        </footer>
    </aside>
    )
}

export default Aside