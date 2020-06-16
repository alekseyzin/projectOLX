import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { IRootState } from './store/rootReducer';

// import Advs from './Components/Advs/Advs';
// import Authorization from './Components/Auth/Authorization/Authorization';
// import Registration from './Components/Auth/Registration/Registration';
// import Profile from './Components/Profile/Profile';
// import RegSuccess from './Components/Auth/RegSuccess/RegSuccess';
// import AdvCard from './Components/AdvCard/AdvCard'
// import NotFound from './Components/NotFound/NotFound';
// import AddAdv from './Components/AddAdv/AddAdv';
// import AdvSuccess from './Components/AddAdv/AdvSuccess/AdvSuccess';
// import MyMessages from './Components/MyMessages/MyMessages';

const Advs = React.lazy(() => import('./Components/Advs/Advs'))
const Authorization = React.lazy(() => import('./Components/Auth/Authorization/Authorization'))
const Registration = React.lazy(() => import('./Components/Auth/Registration/Registration'))
const Profile = React.lazy(() => import('./Components/Profile/Profile'))
const RegSuccess = React.lazy(() => import('./Components/Auth/RegSuccess/RegSuccess'))
const AdvCard = React.lazy(() => import('./Components/AdvCard/AdvCard'))
const NotFound = React.lazy(() => import('./Components/NotFound/NotFound'))
const AddAdv = React.lazy(() => import('./Components/AddAdv/AddAdv'))
const AdvSuccess = React.lazy(() => import('./Components/AddAdv/AdvSuccess/AdvSuccess'))
const MyMessages = React.lazy(() => import('./Components/MyMessages/MyMessages'))


const mapStateToProps = (state: IRootState) => ({
  authToken: state.auth.authData.authToken
})

type IProps = ReturnType<typeof mapStateToProps>

const Routes: React.FC<IProps> = (props) => {

  return (
    <React.Suspense fallback={<div>Грузим..</div>}>
      <Switch>
        {props.authToken && <Redirect exact from="/authorization" to="/" />}
        {props.authToken && <Redirect exact from="/registration" to="/" />}
        {props.authToken || <Redirect exact from="/" to="/authorization" />}

        <Route exact path="/" component={Advs} />
        <Route exact path="/q-:q/page-:id" component={Advs} />
        <Route exact path="/page-:id" component={Advs} />
        <Route exact path="/q-:q" component={Advs} />

        <Route exact path="/myadvs" component={Advs} />
        <Route exact path="/myadvs/q-:q/page-:id" component={Advs} />
        <Route exact path="/myadvs/page-:id" component={Advs} />
        <Route exact path="/myadvs/q-:q" component={Advs} />

        <Route exact path="/authorization" component={Authorization} />

        <Route exact path="/registration" component={Registration} />
        <Route exact path="/regsuccess" component={RegSuccess} />

        <Route exact path="/profile" component={Profile} />

        <Route exact path="/mymessages" component={MyMessages} />
        <Route exact path="/mymessages/page-:id" component={MyMessages} />

        <Route path="/advcard/ad-:id" component={AdvCard} />

        <Route exact path="/addadv" component={AddAdv} />
        <Route path="/adedit-:id" component={AddAdv} />
        <Route exact path="/advsaccess" component={AdvSuccess} />

        <Route path="/" component={NotFound} />
      </Switch>
    </React.Suspense>
  );
}

export default connect(mapStateToProps)(React.memo(Routes));