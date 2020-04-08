import React, { useState, useRef } from 'react'
import InputTypeText from '../Auth/FormElements/InputTypeText'
import * as actions from '../../store/addAdv/actions'
import { Dispatch, bindActionCreators } from 'redux'
import { IRootAction } from '../../store/rootReducer'
import { connect } from 'react-redux'
import Photo from './Photo/Photo'
import style from './style.module.scss'

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
    bindActionCreators(
        {
            addAdv: actions.addAdv.request
        }, dispatch
    )

type IProps = ReturnType<typeof mapDispatchToProps>

const AddAdv = (props: IProps) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [tags, setTags] = useState('')

    const photo1 = useRef<HTMLFormElement>(null)
    const photo2 = useRef<any>(null)
    const photo3 = useRef(null)

    const titleLength = 70;
    const descriptionLength = 300;
    const addressLength = 50;

    const submitHandler = (e: React.FormEvent<Element>) => {
        // props.addAdv({ title, description, address, price, tags })
        // console.log('photo1 ', photo1.current?.elements[0].files.length)
        console.log('photo1 ', photo1)
        // console.log('photo1 ', photo1.current?.elements[0].files.length)
        console.log('photo2 ', photo2.current?.elements[0].files.length)
        
        e.preventDefault()
    }

    const titleHandler = (e: React.FormEvent<HTMLInputElement>) => {

        e.currentTarget.value.length < titleLength && setTitle(e.currentTarget.value)
    }

    const descriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.currentTarget.value.length < descriptionLength && setDescription(e.currentTarget.value)
    }

    const addressHandler = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.value.length < addressLength && setAddress(e.currentTarget.value)
    }

    const priceHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setPrice(e.currentTarget.value)
    }

    const tagsHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setTags(e.currentTarget.value)
    }

    document.addEventListener('DOMContentLoaded', function () {
        var textNeedCount = document.querySelectorAll('#title, #description');
        M.CharacterCounter.init(textNeedCount);
    });

    return (
        <div className="row">
            <h1 className="center-align">Разместить объявление на Сакесе</h1>
            <div className={style.photoWrapper}>
                <Photo id="photo1" refPhoto={photo1}/>
                <Photo id="photo2" refPhoto={photo2}/>
                <Photo id="photo3" refPhoto={photo3}/>
            </div>
            <form className="col s12 m6 offset-m3" onSubmit={submitHandler} >
                <InputTypeText
                    id="title"
                    type="text"
                    labelText="Заголовок"
                    value={title}
                    onChangeHandler={titleHandler}
                    dataLength={titleLength}
                />
                <div className="row">
                    <div className="input-field col s12">
                        <textarea
                            id="description"
                            className="materialize-textarea"
                            value={description}
                            onChange={descriptionHandler}
                            placeholder=" "
                            data-length={descriptionLength}
                        />
                        <label className="active" htmlFor="description">Описание объявления</label>
                    </div>
                </div>
                <InputTypeText
                    id="address"
                    type="text"
                    labelText="Ваш адресс"
                    value={address}
                    onChangeHandler={addressHandler}
                    data-length={addressLength}
                />
                <InputTypeText
                    id="price"
                    type="number"
                    labelText="Цена"
                    value={price}
                    onChangeHandler={priceHandler}
                />
                <InputTypeText
                    id="tags"
                    type="text"
                    labelText="Теги"
                    value={tags}
                    onChangeHandler={tagsHandler}
                    dataTooltip="<div>Вводите теги </div><div>через запятую</div>"
                />
                {/* {props.errorServer && <div className="card-panel red lighten-3">{props.errorServer}</div>} */}
                <button className="btn waves-effect waves-light" type="submit" name="action">Создать
          <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(React.memo(AddAdv))