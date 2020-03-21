import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import classnames from 'classnames'
import jsonRequest from '../../../Request'

const LastAdv = () => {
    const [data, setData] = useState({})

    useEffect(() => {
       
        (async function sumple () {
        const allAd = `[{}]`
        let result = await jsonRequest("http://marketplace.asmer.fs.a-level.com.ua/graphql", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.authToken,
            },
            body: JSON.stringify({
                query: `query getAd($allAd: String){
                AdFind(query: $allAd) {
                  owner{
                    login
                  },
                  images{
                    url
                  }
                  createdAt,
                  title,
                  price,
                  description
                }
              }`,
              variables: {"allAd": allAd}
            })
        })
        setData(result)
        console.log(result)
        // debugger;
    })()
    }, [])

    return (
        <div className={style.lastAdvWrapper}>
            {console.log("in render: ", data.data ? data.data.AdFind[0].title : 'dsdfsdf')}
    <h4>Последние объявления {data.data ? data.data.AdFind[0].title : 'dsdfsdf'}</h4>
            <div className="row">
                <div className="col s12 m3">
                    <div className="card">
                        <a href="#!" className="card-image">
                            <img src="https://apollo-ireland.akamaized.net/v1/files/cat3lit2am512-UA/image;s=261x203" />
                        </a>
                        <div className={classnames(style.padFix, "card-content")}>
                            <a href="#!">Card Title</a>
                        </div>
                        <div className={classnames(style.padFix, "card-action")}>
                            <span>5000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(LastAdv);