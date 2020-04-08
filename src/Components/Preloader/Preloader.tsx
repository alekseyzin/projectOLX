import React from 'react'
import style from './style.module.scss'
import classnames from 'classnames'

const Preloader = () => {

    return (
        <div className={classnames("progress", style.preloderWrapper)}>
            <div className="indeterminate"></div>
        </div>
    )
}

export default React.memo(Preloader)