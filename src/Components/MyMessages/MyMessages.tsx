import React, { useEffect } from 'react'
import style from './style.module.scss'
import Message from './Message/Message'
import {Dispatch, bindActionCreators} from 'redux'
import {IRootAction, IRootState} from '../../store/rootReducer'
import * as actions from '../../store/message/actions'
import { connect } from 'react-redux'
import Pagination from '../Pagination/Pagination'
import { RouteComponentProps } from 'react-router-dom'

const mapDispatchToProps = (dispatch:Dispatch<IRootAction>) =>
    bindActionCreators(
        {
            getMessage: actions.getMessages.request
        }, dispatch
    )

const mapStateToProps = (state:IRootState) => (
    {
        messagesData: state.message.messagesData,
        pagesCount: state.message.pagesCount
    }
)

type TParams = {id: string}
type TProps = ReturnType<typeof mapDispatchToProps> 
    & ReturnType<typeof mapStateToProps>
    & RouteComponentProps<TParams>

const MyMessages = (props:TProps) => {

    useEffect(()=>{
        props.getMessage({page})
    },[props.match.params.id])

    const page = props.match.params.id ? Number(props.match.params.id) : 1
    // console.log(page)
    return(
        <div className={style.messagesWrapper}>
            <h1>Incoming messages</h1>
            {props.messagesData.length 
                ? props.messagesData.map(d => <Message key={d._id} data={d}/>)
                : <div className="center-align">
                    <p>If no one writes to you...</p>
                    <p>Think about it...</p>
                    <p>May be</p>
                    <p>You're colonel?</p>
                </div>
            }
            <Pagination
                pagesCount={props.pagesCount}
                currentPage={page}
                path="/mymessages"
            />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (React.memo(MyMessages))