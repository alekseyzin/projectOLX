import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Advs from './Components/Advs/Advs';
import Authorization from './Components/Auth/Authorization/Authorization';
import Registration from './Components/Auth/Registration/Registration';
import { IRootState } from './store/rootReducer';
import Profile from './Components/Profile/Profile';
import RegSuccess from './Components/Auth/RegSuccess/RegSuccess';
import AdvCard from './Components/AdvCard/AdvCard'
import NotFound from './Components/NotFound/NotFound';
import AddAdv from './Components/AddAdv/AddAdv';
import AdvSuccess from './Components/AddAdv/AdvSuccess/AdvSuccess';

const mapStateToProps = (state: IRootState) => ({
  authToken: state.auth.authData.authToken
})

type IProps = ReturnType<typeof mapStateToProps>

const Routes: React.FC<IProps> = (props) => {

  return (
    <Switch>
      {props.authToken && <Redirect exact from="/authorization" to="/" />}
      {props.authToken && <Redirect exact from="/registration" to="/" />}

      <Route exact path="/" component={Advs} />
      <Route path="/page-:id" component={Advs} />
      <Route path="/q-:q" component={Advs} />
      <Route path="/q-:q/page-:id" component={Advs} />

      <Route exact path="/myadvs" component={Advs} />
      <Route path="/myadvs/page-:id" component={Advs} />
      <Route path="/myadvs/q-:q" component={Advs} />
      <Route path="/myadvs/q-:q/page-:id" component={Advs} />

      <Route exact path="/authorization" component={Authorization} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/regsuccess" component={RegSuccess} />
      <Route path="/advcard/ad-:id" component={AdvCard} />
      <Route exact path="/addadv" component={AddAdv} />
      <Route path="/adedit-:id" component={AddAdv} />
      <Route exact path="/advsaccess" component={AdvSuccess} /> 
      <Route path="/" component={NotFound} />
    </Switch>
  );
}

export default connect(mapStateToProps)(React.memo(Routes));