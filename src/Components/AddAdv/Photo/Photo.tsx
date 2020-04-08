import React, {useState, MutableRefObject, RefObject} from 'react'
// import {Dispatch, bindActionCreators} from 'redux'
import style from './style.module.scss'
// import {IRootState, IRootAction} from '../../../store/rootReducer'
// import { connect } from 'react-redux'
// import * as profileActions from '../../../store/profile/actions'


// const mapStateToProps = (state:IRootState) =>({
//     avatar: state.profile.profileData.avatar?.url
// })

// const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
//     bindActionCreators(
//         {
//             setAvatar: profileActions.setAvatar.request
//         },
//         dispatch
//     )

// type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

interface IProps {
    id: string
    refPhoto: RefObject<HTMLFormElement> | undefined | null
}

const Photo = (props:IProps) => {

    const [imageUrl, setImageUrl] = useState<any>('')

    // const form: any| null | undefined = useRef()

    const uploadHandler = (e:any) => {

        e.preventDefault()
        let reader = new FileReader()
        let file = e.currentTarget.files[0]
        
        reader.onloadend = () => {
            setImageUrl(reader.result)
        }

        reader.readAsDataURL(file)
    }

    // const uploadHandler = () => {
    //     // console.log('formRef: ', form)
    //     // console.log('form data: ', new FormData(form.current))
    //     props.setAvatar(new FormData(form.current))
    // }

    const avatar = `http://marketplace.asmer.fs.a-level.com.ua/images/696abe18feffa8c402f137b7423a869e`

    return (
        <div className={style.logoWrapper}>
            <img className={style.avatar} src={imageUrl ? imageUrl : avatar} />
            {/* <img alt="logo" className={style.avatar} src={avatar} /> */}
            <div className={style.inputFileWrapper}>
                <form action="/upload" encType ="multipart/form-data" method="post" ref={props.refPhoto}>
                    <input onChange={uploadHandler} type="file" name="photo" id={props.id} className={style.inputFile} />
                    <label htmlFor={props.id}><i className="material-icons">add</i></label>
                </form>
            </div>
        </div>
    )
}

export default React.memo(Photo)