import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { bindActionCreators, Dispatch } from 'redux'
import { IRootAction, IRootState } from '../../store/rootReducer'
import * as profileActions from '../../store/profile/actions'

import style from './style.module.scss'
import InputTypeText from '../Auth/FormElements/InputTypeText'
import { connect } from 'react-redux'
import Avatar from './Avatar/Avatar'


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

  // useEffect(() => {
  //   props.getProfile()
  // }, [])

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

    return () => {
      //clear store after unmount
    }

  }, [props])

  const submitHandler = (e: React.FormEvent<Element>) => {
    props.setProfile({ login, nick, phones, addresses })
    e.preventDefault()
  }

  const loginHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
  }

  const nickHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setNick(e.currentTarget.value)
  }

  const phonesHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPhones(e.currentTarget.value)
  }

  const addressesHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setAddresses(e.currentTarget.value)
  }

  return (
    <div className={classnames("row container", style.wrapper)}>
      <h1 className="center-align">Профиль</h1>
      <Avatar />
      <form className="col s6 offset-s3" onSubmit={submitHandler} >
        <InputTypeText
          id="login"
          type="text"
          labelText="Email"
          value={login}
          onChangeHandler={loginHandler}
        />
        <InputTypeText
          id="nick"
          type="text"
          labelText="Ваше имя"
          value={nick}
          onChangeHandler={nickHandler}
        />
        <InputTypeText
          id="tel"
          type="tel"
          labelText="Ваш номер телефона"
          value={phones}
          onChangeHandler={phonesHandler}
          dataTooltip="<div>Вы можете ввести</div><div>до 3х номеров телефонов</div><div>через запятую</div>"
        />
        <InputTypeText
          id="address"
          type="text"
          labelText="Ваш адрес"
          value={addresses}
          onChangeHandler={addressesHandler}
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