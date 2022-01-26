import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/usersActions';
import { stateProps } from '../../redux/store';

import { FiArrowLeft } from 'react-icons/fi';
import mapMarker from '../../assets/new_images/map-marker_doc_branco.svg';

import './styles.css';

function Login() {

    const {push} = useHistory();
    const dispatch = useDispatch()

    const {error} = useSelector((state: stateProps) => state.user)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleLogIn() {
        const userData = {email, password}
        dispatch(loginUser(userData, push))
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
                    <h2>Fazer Login</h2>

                    <label>E-mail</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label>Senha</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword( e.target.value)}    
                    />

                    <div className="login-options">
                        <div className="input-check-box">
                            <input type="checkbox" />
                            <p>Lembrar-me</p>
                        </div>
                        <Link to="/forget-password">Esqueci minha senha</Link>
                    </div>

                    {error !== '' && <span className="error">* {error}</span>}

                    <button 
                        className={(email === "" || password === "") ? "disabled-button" : "confirm-button"} 
                        onClick={handleLogIn} 
                        disabled={email === "" || password === ""}
                    >
                        Entrar
                    </button>

                    <Link to="/" className="goBack-button">
                        <FiArrowLeft size={24} color="#15C3D6" />
                    </Link>
                </fieldset>
            </main>
        </div>
    )
}

export default Login