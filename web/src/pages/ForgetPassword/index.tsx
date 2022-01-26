import { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { CLEAR_ERROR } from '../../redux/types';

import mapMarker from '../../assets/new_images/map-marker_doc_branco.svg';
import api from '../../services/api';

function ForgetPassword() {
    const dispatch = useDispatch();
    const {push} = useHistory();
    const [email, setEmail] = useState('');
    
    function handleSendEmailToResetPassowrd() {
        api.post('/forget-password', {email})
        dispatch({type: CLEAR_ERROR})
        alert("Check your email to reset password") 
        push('/login')
    }

    return (
        <div id="page-content">
            <aside className="aside-app-content">
                <div className="logo">
                    <img src={mapMarker} alt="logo" />
                    <h1>DOC</h1>
                </div>
                
                <footer className="location">
                    <strong>Rio de Janeiro</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <main className="login-content">
                <fieldset>
                    <h2>Esqueci a senha</h2>

                    <p className="login-content-description">Sua redefinição de senha será enviada para o e-mail cadastrado</p>

                    <label>E-mail</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

                    <button 
                    className={ email === "" ? "disabled-button" : "confirm-button"}
                    onClick={handleSendEmailToResetPassowrd}
                    disabled={email === ""}
                    >
                        Entrar
                    </button>

                    <Link to="/login" className="goBack-button">
                        <FiArrowLeft size={24} color="#15C3D6" />
                    </Link>
                </fieldset>
            </main>
        </div>
    )
}

export default ForgetPassword