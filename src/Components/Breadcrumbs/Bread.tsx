import React from 'react'
import { Switch } from 'react-router-dom'
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';
import style from './style.module.scss'


const routes = {
    "/": "Success",
    "/page-:id": 'page :id',
    "/q-:q": ':q',   
    "/q-:q/page-:id": 'page :id',
    "/myadvs": 'My adverts',
    "/myadvs/q-:q": ':q',
    "/myadvs/page-:id": 'page :id',
    "/myadvs/q-:q/page-:id": 'page :id',
    "/profile": "Profile",
    "/authorization": 'Authorization',
    "/registration": 'Registration',
    "/regsuccess": 'Registration',
    "/mymessages": 'My messages',
    "/mymessages/page-:id": 'page :id',
    "/advcard/ad-:id": 'Adverts',
    "/advcard": null,
    "/addadv": 'Create adverts',
    "/adedit-:id": 'Edit adverts',
    "/advsaccess": 'Created'
}

const Bread = () => {

    return (
        <Switch>
            <Breadcrumbs
                WrapperComponent={(props: any) => <ul className={style.breadcrumbs} >{props.children}</ul>}
                ActiveLinkComponent={(props: any) => <li className={style.activeLink} >{props.children}</li>}
                LinkComponent={(props: any) => <li className={style.parentLink}>{props.children}</li>}
                mappedRoutes={routes}
                routeMatcherRegex="([\w-]+)" />
        </Switch>
    )
}

export default React.memo(Bread)