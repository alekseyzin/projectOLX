import React, { useEffect } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import style from './style.module.scss'
import * as actions from '../../../store/comments/actions'
import { IRootAction, IRootState } from '../../../store/rootReducer'
import Comment from './Comment/Comment'
import { connect } from 'react-redux'
import { IGetCommentsSuccess, IComment } from '../../../store/comments/types'
import Answer from './Comment/Answer/Answer'

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
    bindActionCreators(
        {
            getComments: actions.getComments.request
        }, dispatch
    )

const mapStateToProps = (state: IRootState) => (
    {
        commentsData: state.comments.commentsData
    }
)
interface IIdAdv { idAdv: string }
type TProps = ReturnType<typeof mapDispatchToProps>
    & ReturnType<typeof mapStateToProps>
    & IIdAdv

const Comments = (props: TProps) => {

    useEffect(() => {
        props.getComments({ idAdv: props.idAdv })
    }, [])

    const printComments = (commentsData: IGetCommentsSuccess[]) => {
        return (
            commentsData.map((d: IGetCommentsSuccess) => (
                <li key={d._id}>
                    <Comment
                        avatar={d.avatar}
                        createdAt={d.createdAt}
                        nick={d.nick}
                        text={d.text}
                        _id={d._id}
                        answerExist={true}
                    />
                    <ul>
                        { d.answers && printComments(d.answers)}
                    </ul>
                </li>
            ))
        )
    }

    return (
        <div className={style.commentsWrapper}>
            <h2>Comments</h2>
            <div className={style.comments}>
                {!props.commentsData.length && <p>No comments yet. Be the first to write</p>}
                <ul>
                    {printComments(props.commentsData)}
                    {/* {props.commentsData.map((d: IGetCommentsSuccess) => (
                        <li key={d._id}>
                            <Comment
                                avatar={d.avatar}
                                createdAt={d.createdAt}
                                nick={d.nick}
                                text={d.text}
                                _id={d._id}
                                answerExist={true}
                            />
                            <ul>
                                {d.answers
                                    && d.answers.map((b: IComment) => (
                                        <li key={b._id}>
                                            <Comment
                                                avatar={b.avatar}
                                                createdAt={b.createdAt}
                                                nick={b.nick}
                                                text={b.text}
                                                _id={b._id}
                                                answerExist={false}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))} */}
                </ul>
            </div>
            <div className={style.answer}>
                <h2>Write comment</h2>
                <Answer commentID={null} answerClosed={false} />
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Comments))