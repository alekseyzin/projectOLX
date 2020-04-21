import React from 'react'
import style from './style.module.scss'
import { Link } from 'react-router-dom';
import { IAdv } from '../../../store/advs/types'

const Adv = (props: IAdv) => {

    return (

        <div className="col s6 m12">
            <div className={style.advWrapper}>
                <div className={style.photoWrapper}>
                    <Link to={`/advcard/ad-${props._id}`}>
                        <img alt={props.title} src={props.images} />
                    </Link>
                </div>
                <div className={style.contentWrapper}>
                    <div className={style.content}>
                        <Link to={`/advcard/ad-${props._id}`}>
                            <h4>{props.title}</h4>
                        </Link>
                        <span className={style.address}>{props.address}</span>
                    </div>
                    <div className={style.priceWrapper}>
                        <span className={style.price}>{props.price}</span>
                        <span className={style.data}>{props.createdAt}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default React.memo(Adv);