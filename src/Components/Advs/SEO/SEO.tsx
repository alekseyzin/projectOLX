import React from 'react'
import { Helmet } from 'react-helmet'

interface IProps {
    isMyAdvs: boolean
    page: number
    quest: string | null
}

const SEO = (props:IProps) => {
    let title = "Объявления - самые сакесные объявления на Сакесе"
    if (props.isMyAdvs) title = "Мои объявления"
    if (props.quest) title = `Поиск - ${props.quest}`
    if (props.page>1) title = `${title} - page ${props.page}` 

    let description = "Лучше нет интереса чем размещать объявления на Сакесе. Не тормози - Сакесни"
    if (props.isMyAdvs) description = "Личные объявления пользователя"
    if (props.quest) description = `Объявления - ${props.quest} на Сакесе`

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

export default React.memo(SEO)