import React, { useEffect } from 'react'
import style from './style.module.scss'
import { IMessageData } from '../../../store/message/types'

interface IProps {
    data: IMessageData
}

const Message = (props: IProps) => {
    const { text, nick, avatar, createdAt, image, phones } = props.data

    useEffect(()=>{
        const elems = document.querySelectorAll('.materialboxed');
        M.Materialbox.init(elems, { inDuration: 0, outDuration: 0 });
      },[])
    
    return (
        <div className={style.messageWrapper}>
            <div className={style.header}>
                <div className={style.authorWrapper}>
                    <div className={style.avatar}>
                        <img src={`http://marketplace.asmer.fs.a-level.com.ua/${avatar}`} alt={nick} />
                    </div>
                    <span className={style.author}>{nick}</span>
                </div>
                <span className={style.date}>{createdAt}</span>
            </div>
            <div className={style.content}>
                {image && <img className="materialboxed" src={`http://marketplace.asmer.fs.a-level.com.ua/${image}`} alt="kartinka" />}
                <p>{text}</p>
            </div>
            <div className={style.contacts}>
                <i className="material-icons">local_phone</i>
                <span>{phones}</span>
            </div>
        </div>
    )
}

export default React.memo(Message)