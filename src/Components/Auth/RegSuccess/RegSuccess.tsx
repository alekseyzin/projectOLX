import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const RegSuccess = () => {

    return (
        <div className="row">
            <Helmet>
                <title>Успех Братан - Сакес</title>
                <meta name="description" content="Поздравляю, ты достик успеха и уважения на Сакесе" />
            </Helmet>
            <div className="col m6 s12 offset-m3 center-align card-panel teal lighten-5">
                <p>Регистрация прошла успешно</p>
                <Link to="/authorization">Авторизоваться</Link>
            </div>
        </div>

    )
}

export default React.memo(RegSuccess)