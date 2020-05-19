import React, { useState, useRef, useEffect } from 'react'
import Input from '../FormElements/Input'
import * as actionsAddAdv from '../../store/addAdv/actions'
import * as actionsAdv from '../../store/adv/actions'
import { Dispatch, bindActionCreators } from 'redux'
import { IRootAction, IRootState } from '../../store/rootReducer'
import { connect } from 'react-redux'
import Photo from './Photo/Photo'
import style from './style.module.scss'
import TextArea from '../FormElements/TextArea'
import { checkLengthInput } from '../../GlobalFunctions/GlobalFunctions'
import { RouteComponentProps } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
    bindActionCreators(
        {
            addAdv: actionsAddAdv.addAdv.request,
            checkUserData: actionsAddAdv.checkUserData,
            getAdvData: actionsAdv.getAdvCard.request,
            deleteAdvData: actionsAdv.deleteAdvCard,

        }, dispatch
    )

const mapStateToProps = (state: IRootState) => (
    {
        advData: state.advCard.advCardData
    }
)

type TParams = { id: string };
type IProps = ReturnType<typeof mapDispatchToProps> &
    ReturnType<typeof mapStateToProps>
    & RouteComponentProps<TParams>

const AddAdv = (props: IProps) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [tags, setTags] = useState('')

    const refPhoto1 = useRef<HTMLFormElement | null>(null)
    const refPhoto2 = useRef<HTMLFormElement | null>(null)
    const refPhoto3 = useRef<HTMLFormElement | null>(null)

    const minTitleLength = 10;
    const maxTitleLength = 70;
    const minDescriptionLength = 10;
    const maxDescriptionLength = 1000;
    const minAddressLength = 4;
    const maxAddressLength = 30;

    useEffect(() => {
        const textNeedCount = document.querySelectorAll('#title, #description, #address');
        M.CharacterCounter.init(textNeedCount);
        props.checkUserData() //Проверяем заполнены ли юзера телефон и ник, если нет то редирект в профиль
        props.match.params.id && props.getAdvData(props.match.params.id) // если редактирование то подгружаем данные по объяве
        return () => { props.deleteAdvData() }
    }, [])

    useEffect(() => {
        setTitle(props.advData.title)
        setDescription(props.advData.description)
        setAddress(props.advData.address)
        setPrice((parseInt(props.advData.price, 10)).toString())
        setTags(props.advData.tags)
    }, [props.advData])

    useEffect(() => {
        !props.match.params.id && props.deleteAdvData() // удаляем стейт если с редактирования уходим в создание
    }, [props.match.params.id])

    const submitHandler = (e: React.FormEvent<Element>) => {
        const refPhotos = [refPhoto1, refPhoto2, refPhoto3]
        const errors = []
        errors.push(checkLengthInput(title, 'title', minTitleLength, maxTitleLength, setTitle))
        errors.push(checkLengthInput(description, 'description', minDescriptionLength, maxDescriptionLength, setDescription))
        errors.push(checkLengthInput(address, 'address', minAddressLength, maxAddressLength, setAddress))
        if (errors.indexOf(false) === -1) {
            const oldImages = props.advData.images ? props.advData.images : null
            const _id = props.advData._id ? props.advData._id : null
            props.addAdv({ title, description, address, price, tags, refPhotos, oldImages, _id })
        }
        e.preventDefault()
    }

    const titleHandler = (e: React.FormEvent<HTMLInputElement>) => {
        checkLengthInput(e.currentTarget.value, 'title', minTitleLength, maxTitleLength, setTitle)
    }

    const descriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        checkLengthInput(e.currentTarget.value, 'description', minDescriptionLength, maxDescriptionLength, setDescription)
    }

    const addressHandler = (e: React.FormEvent<HTMLInputElement>) => {
        checkLengthInput(e.currentTarget.value, 'address', minAddressLength, maxAddressLength, setAddress)
    }

    const priceHandler = (e: React.FormEvent<HTMLInputElement>) => {
        checkLengthInput(e.currentTarget.value, 'price', 0, 0, setPrice)
    }

    const tagsHandler = (e: React.FormEvent<HTMLInputElement>) => {
        checkLengthInput(e.currentTarget.value, 'tags', 0, 0, setTags)
    }

    return (
        <div className="row">
            <Helmet>
                <title>Разместить объявление - Сакес</title>
                <meta name="description" content="Форма создания объявления" />
            </Helmet>
            <h1 className="center-align">Разместить объявление на Сакесе</h1>
            <div className={style.photoWrapper}>
                <Photo id="photo1" refPhoto={refPhoto1} src={props.advData.images[0]?.url || ''} />
                <Photo id="photo2" refPhoto={refPhoto2} src={props.advData.images[1]?.url || ''} />
                <Photo id="photo3" refPhoto={refPhoto3} src={props.advData.images[2]?.url || ''} />
            </div>
            <form className="col s12 m6 offset-m3" onSubmit={submitHandler} >
                <Input
                    id="title"
                    type="text"
                    labelText="Заголовок"
                    value={title}
                    onChangeHandler={titleHandler}
                    maxLength={maxTitleLength}
                    dataError={"Не менее " + minTitleLength + " символов"}
                />
                <TextArea
                    id="description"
                    labelText="Описание объявления"
                    value={description}
                    onChangeHandler={descriptionHandler}
                    maxLength={maxDescriptionLength}
                    dataError={"Не менее " + minDescriptionLength + " символов"}
                />
                <Input
                    id="address"
                    type="text"
                    labelText="Ваш адресс"
                    value={address}
                    onChangeHandler={addressHandler}
                    maxLength={maxAddressLength}
                    dataError={"Не менее " + minAddressLength + " символов"}
                />
                <Input
                    id="price"
                    type="number"
                    labelText="Цена"
                    value={price}
                    onChangeHandler={priceHandler}
                />
                <Input
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AddAdv))