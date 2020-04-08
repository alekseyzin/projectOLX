import React from 'react'
import style from './style.module.scss'
import { Link } from 'react-router-dom'

const NotFound = () => {

    return (
        <div className={style.notFoundWrapper}>
            <div className="row">
                <div className="col s12 m6 offset-m3">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="center-align card-title">404</span>
                            <p>Запрашиваемая Вами страница не найдена.</p>
                        </div>
                        <div className="card-action">
                            <Link to="/">Перейти на стартовую</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(NotFound)