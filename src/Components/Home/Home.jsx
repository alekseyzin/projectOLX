import React from 'react'
import style from './style.module.scss'
import CategoriesPrewiev from './CategoriesPrewiev/CategoriesPrewiev'
import LastAdv from './LastAdv/LastAdv'
import Description from './Description/Description'

const Home = () => {

    return (
        <React.Fragment>
            <CategoriesPrewiev />
            <LastAdv />
            <Description />
        </React.Fragment>
    )
}

export default React.memo(Home);