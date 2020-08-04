import React from 'react';
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/LogoMain.png';
import './Menu.css'
//import ButtonLink from '../Menu/components/ButtonLink/index.js';
import Button from '../Button/index.js'

function Menu() {
    return (
        <nav className="Menu">
            <Link to="/">
                <img className="Logo" src={Logo} alt="DomFLix Logo" />
            </Link>

            <Button as={Link} className="ButtonLink" to="cadastro/video">
                Novo video
            </Button>
        </nav>    
    );
}

export default Menu;