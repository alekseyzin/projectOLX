import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const RegSuccess = () => {

    return (
        <div className="row">
            <Helmet>
                <title>Registration ok - Success</title>
                <meta name="description" content="Registration was success" />
            </Helmet>
            <div className="col m6 s12 offset-m3 center-align card-panel teal lighten-5">
                <p>Registration was success</p>
                <Link to="/authorization">Sing in</Link>
            </div>
        </div>

    )
}

export default React.memo(RegSuccess)