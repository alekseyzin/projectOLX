import React, { useRef } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import style from './style.module.scss'
import { IRootState, IRootAction } from '../../../store/rootReducer'
import { connect } from 'react-redux'
import * as profileActions from '../../../store/profile/actions'

// interface IProps {
//     src: string
// }

const mapStateToProps = (state: IRootState) => ({
    avatar: state.profile.profileData.avatar?.url
})

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
    bindActionCreators(
        {
            setAvatar: profileActions.setAvatar.request
        },
        dispatch
    )

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Avatar = (props: Props) => {

    const form = useRef<HTMLFormElement | null>(null)

    const uploadHandler = () => {
        
        form.current && props.setAvatar(new FormData(form.current))
    }

    const avatar = props.avatar
        ? `http://marketplace.asmer.fs.a-level.com.ua/${props.avatar}`
        : `http://marketplace.asmer.fs.a-level.com.ua/images/696abe18feffa8c402f137b7423a869e`

    return (
        <div className={style.logoWrapper}>
            <img alt="logo" className={style.avatar} src={avatar} />
            <div className={style.inputFileWrapper}>
                <form action="/upload" encType="multipart/form-data" method="post" ref={form}>
                    <input onChange={uploadHandler} type="file" name="photo" id="photo" className={style.inputFile} />
                    <label htmlFor="photo"><i className="material-icons">photo_camera</i></label>
                </form>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Avatar))