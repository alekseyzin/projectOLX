import React from 'react'
import style from './style.module.scss'

const Preloader = () => {

    return (
        <div className={style.preloderWrapper}>
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
            {/* <img src="https://cdn.fishki.net/upload/post/201403/26/1255064/f557e272f0f5bcdd1021565a53404cab.jpg" /> */}
        </div>
    )
}

export default React.memo(Preloader)