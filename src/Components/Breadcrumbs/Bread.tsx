import React from 'react'
import { Switch } from 'react-router-dom'
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';
import style from './style.module.scss'


const routes = {
    "/": "Success",
    "/page-:id": 'cтр. :id',
    "/q-:q": ':q',   
    "/q-:q/page-:id": 'cтр. :id',
    "/myadvs": 'Мои объявления',
    "/myadvs/q-:q": ':q',
    "/myadvs/page-:id": 'cтр. :id',
    "/myadvs/q-:q/page-:id": 'cтр. :id',
    "/profile": "Profile",
    "/authorization": 'Авторизация',
    "/registration": 'Регистрация',
    "/regsuccess": 'Регистрация',
    "/mymessages": 'Мои сообщения',
    "/mymessages/page-:id": 'cтр. :id',
    "/advcard/ad-:id": 'Объявление',
    "/advcard": null,
    "/addadv": 'Создать объявление',
    "/adedit-:id": 'Редактировать объявление',
    "/advsaccess": 'Размещено'
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