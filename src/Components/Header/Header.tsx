import React from 'react'
import style from './style.module.scss'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <nav className="white">
            <div className="container">
                <div className="nav-wrapper">
                    <a href="/" className="left brand-logo black-text">Suces</a>
                    <ul className="right hide-on-small-and-down">
                        <li><a className="waves-effect waves-light btn"><i className="material-icons left">add</i>Объявление</a></li>
                        <li>
                            <Link to='/authorization'>
                                <span className="indigo-text accent-4">Авторизация</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default React.memo(Header)