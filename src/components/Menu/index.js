import React from 'react';
import Logo from '../../assets/img/LogoMain.png';
import './Menu.css'
//import ButtonLink from '../Menu/components/ButtonLink/index.js';
import Button from '../Button/index.js'

function Menu() {
    return (
        <nav className="Menu">
            <a href="/">
                <img className="Logo" src={Logo} alt="DomFLix Logo" />
            </a>

            <Button as="a" className="ButtonLink" href="/">
                Novo video
            </Button>
        </nav>    
    );
}

export default Menu;