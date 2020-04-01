import React, { useEffect, useState } from 'react'
import style from './style.module.scss'

interface IProps {
    title: string,
    price: string,
    photo?: Array<Object> | null,
    address: string,
    data: string,
}

const Adv = (props: IProps) => {
    console.log(props.photo)
    let photoUrl: string = "";
    if(props.photo){
        photoUrl = props.photo[0].url 
            ? `http://marketplace.asmer.fs.a-level.com.ua/${props.photo[0].url}` 
            : "https://apollo-ireland.akamaized.net/v1/files/76ojf53mron92-UA/image;s=261x203"
    }
    // console.log(photoUrl)

    // const photoUrl = "https://apollo-ireland.akamaized.net/v1/files/76ojf53mron92-UA/image;s=261x203"

    return (

        <div className="col s12">
            <div className={style.advWrapper}>
                <div className={style.photoWrapper}>
                    <img alt={props.title} src={photoUrl} />
                </div>
                <div className={style.contentWrapper}>
                    <div className={style.content}>
                        <a href="#!">
                            <h4>{props.title}</h4>
                        </a>
                        {/* <div className={style.footWrapper}> */}
                        <span className={style.address}>{props.address}</span>

                        {/* </div> */}
                    </div>
                    <div className={style.priceWrapper}>
                        <span className={style.price}>{props.price}</span>
                        <span className={style.data}>{props.data}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default React.memo(Adv);