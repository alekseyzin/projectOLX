import React, { useState } from 'react'
import { bindActionCreators, Dispatch } from "redux"
import { connect } from "react-redux"
import * as authActions from "../../../store/auth/actions"
import style from './style.module.scss'
import classnames from 'classnames'
import Input from '../../FormElements/Input'
import { IRootState, IRootAction } from '../../../store/rootReducer'
import { checkEmail } from '../../../Services/helpersForComponents'
import { Helmet } from 'react-helmet'

const mapStateToProps = (state: IRootState) => ({
  error: state.auth.authData.error
})

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      authUser: authActions.authUser.request,
      deleteError: authActions.deleteError
    },
    dispatch
  )

type AuthProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Authorization: React.FC<AuthProps> = (props) => {

  const [login, setLogin] = useState('life@gmail.com')
  const [password, setPassword] = useState('lifemr')

  const minPassLength = 5;

  React.useEffect(() => {
    return () => {
      props.deleteError()
    }
  }, [])

  const loginHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLogin(e.currentTarget.value)
    checkEmail('login', e.currentTarget.value)
  }

  const passwordHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const submitHandler = (e: React.FormEvent<Element>) => {
    checkEmail('login', login) && props.authUser({ login, password })
    e.preventDefault()
  }

  return (
    <div className={classnames("row container", style.wrapper)}>
      <Helmet>
        <title>Authorization- Success</title>
        <meta name="description" content="Форма автризации на сайте Сакес" />
      </Helmet>
      <h1 className="center-align">Authorization</h1>
      <form className="col s6 offset-s3" onSubmit={submitHandler} >
        <Input
          id="login"
          type="text"
          labelText="Email"
          value={login}
          onChangeHandler={loginHandler}
          dataError="This is not like E-mail"
        />
        <Input
          id="password"
          type="password"
          labelText="Password"
          value={password}
          onChangeHandler={passwordHandler}
          dataError={"Must be at last " + minPassLength + " characters"}
        />
        {props.error && <div className="card-panel red lighten-3">{props.error}</div>}
        <button className="btn waves-effect waves-light" type="submit" name="action">Sing in
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