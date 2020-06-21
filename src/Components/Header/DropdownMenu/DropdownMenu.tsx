import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

interface IProps {
    unAuthUser: () => void
    isMobile: boolean
}

const DropdownMenu = (props: IProps) => {

    const closeMenuHandler = () => {
        if (props.isMobile) {
            const elem: HTMLElement | null = document.getElementById('mobile-demo')
            if (elem) {
                const instance = M.Sidenav.getInstance(elem);
                instance.close()
            }
        }
    }

    return (
        <React.Fragment>
            <li onClick={closeMenuHandler}><Link to="/profile">Profile</Link></li>
            <li onClick={closeMenuHandler}><Link to="/myadvs">My adverts</Link></li>
            <li onClick={closeMenuHandler}><Link to="/mymessages">Messages</Link></li>
            <li className="divider"></li>
            <li onClick={closeMenuHandler}><Link to='/authorization' className="indigo-text accent-4" onClick={() => props.unAuthUser()}>Sign out</Link></li>
            {props.isMobile && <li className={style.close} onClick={closeMenuHandler}>Close</li>}
        </React.Fragment>
    )
}

export default React.memo(DropdownMenu)