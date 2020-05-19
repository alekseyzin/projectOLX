import React from 'react'
import style from './style.module.scss'
import Answer from './Answer/Answer'

export interface IProps {
    _id: string
    createdAt: string
    nick: string
    text: string
    avatar: string
    answerExist: boolean
}


const Comment = (props: IProps) => {

    return (
        <div className={style.comment}>
            <div className={style.header}>
                <img src={`http://marketplace.asmer.fs.a-level.com.ua/${props.avatar}`} alt={props.nick} />
                <span className={style.author}>{props.nick}</span>
                <span className={style.date}>{props.createdAt}</span>
            </div>
            <p>{props.text}</p>
            {props.answerExist && <Answer commentID={props._id} answerClosed={true} />}
        </div>
    )
}

export default React.memo(Comment)