import { useSelector } from 'react-redux';
import { stateProps } from '../../redux/store';
import logoImg from '../../assets/new_images/logo_doc.svg';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

function Landing() {
    const { authenticated } = useSelector((state: stateProps) => state.user)

    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <header>
                    <img src={logoImg} alt="DOC" />
                    <div className="location">
                        <strong>Rio de Janeiro</strong>
                    </div>
                </header>

                <main>
                    <h1>Busque por um ponto de atendimento próximo</h1>
                    <p>Não se preocupe, iremos encontrar local para voce</p>
                </main>

                { authenticated ? (
                    <Link to="/dashboard/companies-registered" className="button-restricted-access">
                        Dashboard
                    </Link>
                ) : (
                    <Link to="/login" className="button-restricted-access">
                        Acesso Restrito
                    </Link>
                )}
                
                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </div>
        </div>
    )
}

export default Landing;