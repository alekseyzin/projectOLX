import React, { useEffect } from 'react'
import {Dispatch, bindActionCreators} from 'redux'
import style from './style.module.scss'
import * as actions from '../../../store/comments/actions'
import {IRootAction, IRootState} from '../../../store/rootReducer'
import Comment from './Comment/Comment'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch:Dispatch<IRootAction>) => 
    bindActionCreators(
        {
            getComments: actions.getComments.request
        }, dispatch
    )
interface IIdAdv {idAdv: string}    
type TProps = ReturnType<typeof mapDispatchToProps>
        & IIdAdv

const Comments = (props:TProps) => {

    useEffect(()=>{
        props.getComments({idAdv:props.idAdv})
    },[])

    return (
        <div className={style.commentsWrapper}>
            <h2>Комментарии</h2>
            <div className={style.comments}>
                <ul>
                    <li>
                        <Comment />
                        <ul>
                            <li><Comment /></li>
                        </ul>
                    </li>
                </ul>
                
                <Comment />
            </div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(React.memo(Comments))