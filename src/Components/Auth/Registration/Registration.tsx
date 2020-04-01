import React, { useState } from 'react'
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"

import * as authActions from "../../../store/auth/actions"

import style from './style.module.scss'
import classnames from 'classnames'
import InputTypeText from '../FormElements/InputTypeText'
import { IRootState, IRootAction } from '../../../store/rootReducer'

const mapStateToProps = (state: IRootState) => ({
    error: state.auth.authData.error
})

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) => 
  bindActionCreators(
    {
      // authUser: authActions.authUser.request,
      deleteError: authActions.deleteError,
      regUser: authActions.regUser.request,
    },
    dispatch
  )

type AuthProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Authorization: React.FC<AuthProps> = (props) => {

  const [login, setLogin] = useState('life')
  const [password, setPassword] = useState('lifemr')

  React.useEffect(() => {
    return () => {
      props.deleteError()
    }
  },[])

  const loginHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
  }

  const passwordHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const submitHandler = (e: React.FormEvent<Element>) => {
    e.preventDefault()
    props.regUser({login, password})
  }

  return (

    <div className={classnames("row container", style.wrapper)}>
      <h1 className="center-align">Регистрация</h1>
      <form className="col s6 offset-s3" onSubmit={submitHandler} >
        <InputTypeText
          id="login"
          type="text"
          labelText="Email"
          value={login}
          onChangeHandler={loginHandler}
        />
        <InputTypeText
          id="password"
          type="password"
          labelText="Password"
          value={password}
          onChangeHandler={passwordHandler}
        />
        {props.error && <div className="card-panel red lighten-3">{props.error}</div>}
        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Authorization));