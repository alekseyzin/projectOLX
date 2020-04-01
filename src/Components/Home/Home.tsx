import React from 'react'
// import style from './style.module.scss'
import AdvsBlock from './AdvsBlock/AdvsBlock'
import Description from './Description/Description'

const Home = () => {

    return (
        <React.Fragment>
            <AdvsBlock />
            <Description />
        </React.Fragment>
    )
}

export default React.memo(Home);