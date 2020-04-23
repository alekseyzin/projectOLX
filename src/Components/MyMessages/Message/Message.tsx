import React from 'react'
import style from './style.module.scss'

const Message = () => {

    return(
        <div className={style.messageWrapper}>
            <div className={style.header}>
                <div className={style.avatar}>
                    <img src="" alt=""/>
                </div>
                <span className={style.author}>Aleksey</span>
                <span className={style.date}>18.24.28></span>
            </div>
            <div className={style.content}>
                <img src="" />
                <p></p>
            </div>
            <div className={style.contacts}>
                <span></span>
            </div>
        </div>
    )
}

export default React.memo(Message)