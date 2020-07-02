import React, { useRef, useState } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import style from './style.module.scss'
import { IRootState, IRootAction } from '../../../store/rootReducer'
import { connect } from 'react-redux'
import * as profileActions from '../../../store/profile/actions'
import { checkPhoto } from '../../../Services/helpersForComponents'

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
    const [isError, setIsError] = useState(false)

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            let file = e.currentTarget.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                if (typeof reader.result === 'string' && checkPhoto(reader.result)) {
                    form.current && props.setAvatar(new FormData(form.current))
                    setIsError(false)
                } else {
                    setIsError(true)
                    console.log('error');

                }
            }
        }
    }

    const avatar = props.avatar
        ? `http://marketplace.asmer.fs.a-level.com.ua/${props.avatar}`
        : `http://marketplace.asmer.fs.a-level.com.ua/images/696abe18feffa8c402f137b7423a869e`

    return (
        <div className="blockHolder">
            <div className={style.logoWrapper}>
                <img alt="logo" className={style.avatar} src={avatar} />
                <div className={style.inputFileWrapper}>
                    <form action="/upload" encType="multipart/form-data" method="post" ref={form}>
                        <input onChange={uploadHandler} type="file" name="photo" id="photo" className={style.inputFile} />
                        <label htmlFor="photo"><i className="material-icons">photo_camera</i></label>
                    </form>
                </div>
            </div>
            <span
                style={isError ? { display: "block" } : { display: "none" }}
                className={style.error}
            >Only: jpeg, jpg, png, gif</span>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Avatar))