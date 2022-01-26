import {FiArrowLeft} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import mapMarkerImg from '../../assets/new_images/map-marker_doc_branco.svg';

import './styles.css';

function Aside() {
    const {goBack} = useHistory()

    return(
        <aside className="aside-container">
        <img src={mapMarkerImg} alt="DOC" />

        <footer>
            <button type="button" onClick={goBack}>
                <FiArrowLeft size={24} color="#FFF" />
            </button>
        </footer>
    </aside>
    )
}

export default Aside;