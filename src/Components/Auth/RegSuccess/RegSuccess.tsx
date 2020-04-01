import React from 'react'
import { Link } from 'react-router-dom'

const RegSuccess = () => {

    return (
        <div className="row">
            <div className="col m6 s12 offset-m3 center-align card-panel teal lighten-5">
                <p>Регистрация прошла успешно</p>
                <Link to="/authorization">Авторизоваться</Link>
            </div>
        </div>

    )
}

export default React.memo(RegSuccess)