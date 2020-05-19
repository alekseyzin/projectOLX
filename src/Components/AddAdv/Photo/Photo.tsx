import React, { useState, RefObject, useEffect } from 'react'
import style from './style.module.scss'

interface IProps {
    id: string
    refPhoto: RefObject<HTMLFormElement> | undefined | null
    src: string
}

const Photo = (props: IProps) => {

    const [imageUrl, setImageUrl] = useState<string>('https://brilliant24.ru/files/cat/bg_template_01.png')

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.currentTarget.files) {
            let file = e.currentTarget.files[0]
            let reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onloadend = () => {
                (typeof reader.result === 'string') && setImageUrl(reader.result)
            }
        }

    }
    useEffect(() => {
        props.src && setImageUrl(props.src)
    }, [props.src])

    return (
        <div className={style.logoWrapper}>
            <img className={style.avatar} src={imageUrl} alt="addphoto" />
            <div className={style.inputFileWrapper}>
                <form action="/upload" encType="multipart/form-data" method="post" ref={props.refPhoto}>
                    <input onChange={uploadHandler} type="file" name="photo" id={props.id} className={style.inputFile} />
                    <label htmlFor={props.id}><i className="material-icons">add</i></label>
                </form>
            </div>
        </div>
    )
}

export default React.memo(Photo)