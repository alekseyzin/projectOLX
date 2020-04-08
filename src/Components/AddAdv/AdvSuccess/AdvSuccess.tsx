import React from 'react'
import style from './style.module.scss'
import { Link } from 'react-router-dom'

const AdvSuccess = () => {

    return (
        <div className={style.wrapper}>
            <div className="row">
                <div className="col s12 m10 offset-m1">
                    <h1>Объявление успешно размещено</h1>
                    <p>Вы можете разместить еще одно объявление</p>
                    <Link to='/addadv' className="waves-effect waves-light btn">
                        <i className="material-icons left">add</i>Объявление
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default React.memo(AdvSuccess)