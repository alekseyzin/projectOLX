import React, { useEffect } from 'react'
import style from './style.module.scss'
import Message from './Message/Message'
import {Dispatch, bindActionCreators} from 'redux'
import {IRootAction, IRootState} from '../../store/rootReducer'
import * as actions from '../../store/message/actions'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch:Dispatch<IRootAction>) =>
    bindActionCreators(
        {
            getMessage: actions.getMessages.request
        }, dispatch
    )

type IProps = ReturnType<typeof mapDispatchToProps>    

const MyMessages = (props:IProps) => {

    useEffect(()=>{
        props.getMessage()
    },[])

    return(
        <div className={style.messagesWrapper}>
            <Message />
        </div>
    )
}

export default connect(null, mapDispatchToProps) (React.memo(MyMessages))