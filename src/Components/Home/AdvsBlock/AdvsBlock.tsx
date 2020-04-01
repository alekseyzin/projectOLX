import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
// import classnames from 'classnames'
import jsonRequest from '../../../Request'
import Adv from './Adv/Adv'

const AdvsBlock = () => {
    const [advs, setAdvs] = useState([])

    useEffect(() => {

        (async function sumple() {
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
                    _id,
                  owner{
                    nick,
                    phones
                  },
                  images{
                    url
                  }
                  createdAt,
                  title,
                  description,
                  address,
                  price
                }
              }`,
                    variables: { "allAd": allAd }
                })
            })
            setAdvs(result.data.AdFind)

            // debugger;
        })()
    }, [])

    console.log(advs)
    console.log(advs.length)

    return (
        <div className={style.lastAdvWrapper}>
            <h1>Лудший Сакес в твоей жизни!</h1>
            <div className="row">
            {advs.length > 0 
                ? advs.map((d:any) => (<Adv key={d._id} 
                    title={d.title}
                    address={d.address}
                    data={d.createdAt} 
                    price={d.price} 
                    photo={d.images }
                />)) 
                : <p>Loading</p>}
            </div>
        </div>
    )
}
// )

export default React.memo(AdvsBlock);

// console.log(" title: ", d.title, 'price: ', d.price, 'photo: ', d.images ? d.images[0].url : "null")

{/* <Adv 
            title={d.title ? d.title : 'Я идиот и не умею писать заголовки'} 
            price={d.price} 
            photo={d.images 
                ? `http://marketplace.asmer.fs.a-level.com.ua/${d.images[0]}` 
                : "https://apollo-ireland.akamaized.net/v1/files/76ojf53mron92-UA/image;s=261x203"}/> */}