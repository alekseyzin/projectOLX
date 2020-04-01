import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
// import M from 'materialize-css/dist/js/materialize'
import M from "materialize-css";

import style from './style.module.scss'
import { Link } from 'react-router-dom'
import { IRootState, IRootAction } from '../../store/rootReducer'
import * as authActions from '../../store/auth/actions'
import classnames from 'classnames'

const mapStateToProps = (state: IRootState) => ({
    authToken: state.auth.authData.authToken,
    nick: state.auth.authData.login
})

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
    bindActionCreators(
        {
            unAuthUser: authActions.unAuthUser
        },
        dispatch
    )

type IProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Header: React.FC<IProps> = (props) => {

    React.useEffect(() => {
        let dropdowns = document.querySelectorAll(".dropdown-trigger");
        M.Dropdown.init(dropdowns, {});
      }, [props.authToken]);

    let userBlock;

    if (props.authToken) {
        userBlock = <a 
        className="dropdown-trigger black-text" 
        href="#!" 
        data-target="dropdown1"
        >
            <span className={classnames("truncate left", style.nick)}>{props.nick}</span>
           <i className="material-icons right">arrow_drop_down</i>
        </a>
    } else {
        userBlock = <div className={style.logIn}>
            <Link to='/registration' className="indigo-text accent-4">Регистрация</Link>
            <span>|</span>
            <Link to='/authorization' className="indigo-text accent-4">Вход</Link>
        </div>
    }

    return (
        <React.Fragment>
        <ul id="dropdown1" className={classnames(style.dropdownPosition, "dropdown-content black-text")}>
            <li><Link to="/profile">Профиль</Link></li>
            <li><a href="#!">two</a></li>
            <li className="divider"></li>
            <li><Link to='/authorization' className="indigo-text accent-4" onClick={() => props.unAuthUser()}>Выход</Link></li>
        </ul>
        <nav className="white">
            <div className={classnames("container", style.h100)}>
                <div className="nav-wrapper">
                    <span className={classnames("left brand-logo", style.logo)}>
                        <Link to="/">Сакес</Link>
                    </span>
                    <ul className="right hide-on-small-and-down">
                        <li><a href="#!" className="waves-effect waves-light btn"><i className="material-icons left">add</i>Объявление</a></li>
                        <li>{userBlock}</li>
                    </ul>
                </div>
            </div>
        </nav>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header))