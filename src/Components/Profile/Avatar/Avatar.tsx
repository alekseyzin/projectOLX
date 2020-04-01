import React, { useRef} from 'react'
import {Dispatch, bindActionCreators} from 'redux'
import style from './style.module.scss'
import {IRootState, IRootAction} from '../../../store/rootReducer'
import { connect } from 'react-redux'
import * as profileActions from '../../../store/profile/actions'

// interface IProps {
//     src: string
// }

const mapStateToProps = (state:IRootState) =>({
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

    // const [imageUrl, setImageUrl] = useState<any>('')

    const form: any| null | undefined = useRef()

    // const uploadHandler = async (e:any) => {
        
    //     // fetch('http://marketplace.asmer.fs.a-level.com.ua/upload', {
    //     //     method: "POST",
    //     //     headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
    //     //     body: new FormData(form.current)
    //     // })
    //     // .then(response => response.json())
    //     // .then(data => console.log(data))

    //     e.preventDefault()
    //     let reader = new FileReader()
    //     let file = e.currentTarget.files[0]
        
    //     reader.onloadend = () => {
    //         setImageUrl(reader.result)
    //     }

    //     reader.readAsDataURL(file)
    // }

    const uploadHandler = () => {
        // console.log('formRef: ', form)
        // console.log('form data: ', new FormData(form.current))
        props.setAvatar(new FormData(form.current))
    }

    const avatar = props.avatar
    ? `http://marketplace.asmer.fs.a-level.com.ua/${props.avatar}`
    : `http://marketplace.asmer.fs.a-level.com.ua/images/696abe18feffa8c402f137b7423a869e`

    return (
        <div className={style.logoWrapper}>
            {/* <img className={style.avatar} src={imageUrl ? imageUrl : avatar} /> */}
            <img alt="logo" className={style.avatar} src={avatar} />
            <div className={style.inputFileWrapper}>
                <form action="/upload" encType ="multipart/form-data" method="post" ref={form}>
                    <input onChange={uploadHandler} type="file" name="photo" id="photo" className={style.inputFile} />
                    <label htmlFor="photo"><i className="material-icons">photo_camera</i></label>
                </form>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (React.memo(Avatar))