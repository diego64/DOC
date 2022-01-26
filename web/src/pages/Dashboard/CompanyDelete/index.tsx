import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteCompany, getCompany } from '../../../redux/actions/companiesActions';
import { stateProps } from '../../../redux/store';

import sorryMarker from '../../../assets/new_images/sorry-marker_doc.svg';
import './styles.css';

interface paramsProps {
    id: string
}

function DeleteCompany() {    
    const dispatch = useDispatch();
    const { push } = useHistory();
    const { id } = useParams<paramsProps>();
    
    const { company } = useSelector((state: stateProps) => state.companies)

    useEffect(() => {
        dispatch(getCompany(id))
    })

    function handleGoToDashboard() {
        dispatch(deleteCompany(id, push))
    }

    if(!company.id) {
        return <p>loading...</p>
    }

    return (
        <main id="page-landing-delete" >
            <div className="delete-page-wrapper">
                <div className="delete-company-info">
                    <h2>Excluir!</h2>
                    <p>Você tem certeza que deseja excluir {company.name}?</p>

                    <button onClick={handleGoToDashboard}>
                        Deletar
                    </button>
                </div>

                <img src={sorryMarker} alt="delete icon" />

            </div>            
        </main>
    )
}

export default DeleteCompany;