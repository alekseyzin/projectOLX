import React, {useState, RefObject, useEffect} from 'react'
import style from './style.module.scss'

interface IProps {
    id: string
    refPhoto: RefObject<HTMLFormElement> | undefined | null
    src: string
}

const Photo = (props:IProps) => {

    const [imageUrl, setImageUrl] = useState<any>('https://brilliant24.ru/files/cat/bg_template_01.png')

    const uploadHandler = (e:any) => {
        e.preventDefault()
        let reader = new FileReader()
        let file = e.currentTarget.files[0] 
        reader.onloadend = () => {
            setImageUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }
    useEffect(()=>{
        props.src && setImageUrl(props.src)
    },[props.src])

    return (
        <div className={style.logoWrapper}>
            <img className={style.avatar} src={imageUrl} />
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