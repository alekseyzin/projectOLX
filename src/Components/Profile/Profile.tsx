import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { bindActionCreators, Dispatch } from 'redux'
import { IRootAction, IRootState } from '../../store/rootReducer'
import * as profileActions from '../../store/profile/actions'
import { checkLengthInput, checkEmail, checkPhones } from '../../GlobalFunctions/GlobalFunctions'
import style from './style.module.scss'
import Input from '../FormElements/Input'
import { connect } from 'react-redux'
import Avatar from './Avatar/Avatar'
import { Helmet } from 'react-helmet'


const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getProfile: profileActions.getProfile.request,
      setProfile: profileActions.setProfile.request,
      deleteSuccess: profileActions.deleteSuccess,
    },
    dispatch
  )

const mapStateToProps = (state: IRootState) => ({
  id: state.profile.profileData._id,
  login: state.profile.profileData.login,
  nick: state.profile.profileData.nick,
  phones: state.profile.profileData.phones,
  addresses: state.profile.profileData.addresses,
  errorServer: state.profile.profileData.error,
  success: state.profile.profileData.success

})

type IProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

const Profile: React.FC<IProps> = (props: IProps) => {

  const [login, setLogin] = useState('')
  const [nick, setNick] = useState('')
  const [phones, setPhones] = useState('')
  const [addresses, setAddresses] = useState('')

  useEffect(() => {
    const textNeedCount = document.querySelectorAll('#nick, #address');
    M.CharacterCounter.init(textNeedCount);
  }, [])

  useEffect(() => {

    if (!props.id) {
      props.getProfile()
    } else {
      setLogin(props.login)
      setNick(props.nick ? props.nick : "")
      setPhones(props.phones ? props.phones.join(', ') : "")
      setAddresses(props.addresses ? props.addresses.join(', ') : "")
    }

    if (props.success) {
      M.toast({ html: props.success, classes: 'green' })
      props.deleteSuccess()
    }
  }, [props])

  const minNickLength = 3
  const maxNickLength = 20
  const minAddressLength = 4;
  const maxAddressLength = 30;

  const submitHandler = (e: React.FormEvent<Element>) => {
    const errors = []
    errors.push(checkEmail('login', login))
    errors.push(checkLengthInput(nick, 'nick', minNickLength, maxNickLength, setNick))
    errors.push(checkPhones('tel', phones))
    errors.push(checkLengthInput(addresses, 'addresses', minAddressLength, maxAddressLength, setAddresses))
    if (errors.indexOf(false) === -1)
      props.setProfile({ login, nick, phones, addresses })
    e.preventDefault()
    e.preventDefault()
  }

  const loginHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
    checkEmail('login', e.currentTarget.value)
  }

  const nickHandler = (e: React.FormEvent<HTMLInputElement>) => {
    checkLengthInput(e.currentTarget.value, "nick", minNickLength, maxNickLength, setNick)
  }

  const phonesHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPhones(e.currentTarget.value)
    checkPhones('tel', e.currentTarget.value)
  }

  const addressesHandler = (e: React.FormEvent<HTMLInputElement>) => {
    checkLengthInput(e.currentTarget.value, 'addresses', minAddressLength, maxAddressLength, setAddresses)
  }

  return (
    <div className={classnames("row", style.wrapper)}>
      <Helmet>
        <title>Профиль - Success</title>
        <meta name="description" content="Подмарафеть свой лук" />
      </Helmet>
      <h1 className="center-align">Профиль</h1>
      <Avatar />
      <form className="col s12 m6 offset-m3" onSubmit={submitHandler} >
        <Input
          id="login"
          type="text"
          labelText="Email"
          value={login}
          onChangeHandler={loginHandler}
          // onBlurHandler={checkEmail}
          dataError={"Это не похоже на E-mail"}
        />
        <Input
          id="nick"
          type="text"
          labelText="Ваше имя"
          value={nick}
          onChangeHandler={nickHandler}
          maxLength={maxNickLength}
          dataError={"Не менее " + minNickLength + " символов"}
        />
        <Input
          id="tel"
          type="tel"
          labelText="Ваш номер телефона"
          value={phones}
          onChangeHandler={phonesHandler}
          // onBlurHandler={checkPhones}
          dataTooltip="<div>Вы можете ввести</div><div>до 3х номеров телефонов</div><div>через запятую</div>"
          dataError={"Это не похоже на номер телефона. 8 XXX XXX XX XX"}
        />
        <Input
          id="addresses"
          type="text"
          labelText="Ваш адрес"
          value={addresses}
          onChangeHandler={addressesHandler}
          maxLength={maxAddressLength}
          dataError={"Не менее " + minAddressLength + " символов"}
        />
        {props.errorServer && <div className="card-panel red lighten-3">{props.errorServer}</div>}
        <button className="btn waves-effect waves-light" type="submit" name="action">Редактировать
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Profile))