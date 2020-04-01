import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from './Components/Home/Home';
import Authorization from './Components/Auth/Authorization/Authorization';
import Registration from './Components/Auth/Registration/Registration';
import { IRootState } from './store/rootReducer';
import Profile from './Components/Profile/Profile';
import RegSuccess from './Components/Auth/RegSuccess/RegSuccess';

const mapStateToProps = (state: IRootState) => ({
  authToken: state.auth.authData.authToken
})

type IProps = ReturnType<typeof mapStateToProps>

const Routes: React.FC<IProps> = (props) => {

  return (
    <Switch>
      {props.authToken && <Redirect exact from="/authorization" to="/" />}
      {props.authToken && <Redirect exact from="/registration" to="/" />}
      <Route exact path="/" component={Home} />
      {/* <Route exact path="/goods" component={Goods} /> */}
      {/* <Route exact path="/goodsCard" component={GoodsCard} /> */}
      <Route exact path="/authorization" component={Authorization} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/regsuccess" component={RegSuccess} />
      <Route path="/" render={() => <p>not found</p>} />
    </Switch>
  );
}

export default connect(mapStateToProps)(React.memo(Routes));