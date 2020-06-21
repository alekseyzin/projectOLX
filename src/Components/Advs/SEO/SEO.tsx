import React from 'react'
import { Helmet } from 'react-helmet'

interface IProps {
    isMyAdvs: boolean
    page: number
    quest: string | null
}

const SEO = (props:IProps) => {
    let title = "Adverts - The most current ads on the Success"
    if (props.isMyAdvs) title = "My adverts"
    if (props.quest) title = `Поиск - ${props.quest}`
    if (props.page>1) title = `${title} - page ${props.page}` 

    let description = "Your goods will be sold at a bargain price"
    if (props.isMyAdvs) description = "User's personal ads"
    if (props.quest) description = `Ads - ${props.quest} on the Success`

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    )
}

export default React.memo(SEO)