import React, { useState, RefObject, useEffect } from 'react'
import style from './style.module.scss'
import { checkPhoto } from '../../../Services/helpersForComponents'

interface IProps {
    id: string
    refPhoto: RefObject<HTMLFormElement> | undefined | null
    src: string
}

const Photo = (props: IProps) => {

    const [imageUrl, setImageUrl] = useState<string>('https://brilliant24.ru/files/cat/bg_template_01.png')
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        props.src && setImageUrl(props.src)
    }, [props.src])

    useEffect(() => {
        const elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
    }, [])

    const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.currentTarget.files) {
            let file = e.currentTarget.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                if (typeof reader.result === 'string' && checkPhoto(reader.result)) {
                    setImageUrl(reader.result)
                    setIsError(false)
                } else {
                    // props.refPhoto?.current?.reset()
                    // const elem: any = document.getElementById('modal2')
                    // const instance = M.Modal.getInstance(elem)
                    // instance.open();
                    setIsError(true)
                }
            }
        }
    }

    return (
        <div className={style.blockHolder}>
            <div className={style.logoWrapper}>
                <img className={style.avatar} src={imageUrl} alt="addphoto" />
                <div className={style.inputFileWrapper}>
                    <form action="/upload" encType="multipart/form-data" method="post" ref={props.refPhoto}>
                        <input
                            accept="image/jpg,image/jpeg,image/png,image/gif"
                            onChange={uploadHandler}
                            type="file"
                            name="photo"
                            id={props.id}
                            className={style.inputFile}
                        />
                        <label htmlFor={props.id}><i className="material-icons">add</i></label>
                    </form>
                </div>
                {/* <div id="modal2" className="modal">
                <div className="modal-content">
                    <p>Photo format is invalid. You can use: jpeg, jpg, png, gif</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Ok</a>
                </div>
            </div> */}
                {/* style={true ? "color:red" : "color:gren"} */}
            </div>
            <span
                style={isError ? { display: "block" } : { display: "none" }}
                className={style.error}
            >Only: jpeg, jpg, png, gif</span>
        </div>
    )
}

export default React.memo(Photo)