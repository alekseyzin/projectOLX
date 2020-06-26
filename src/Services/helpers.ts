import { RefObject } from 'react';
import { IAdv } from './../store/addAdv/types';
import { IImages, IAdvcardData, IAdvCardPayload } from '../store/adv/types'
import { IFilterAdvs, ISortAdvs, TAdvsData, IAdvsDataPayload } from '../store/advs/types'
import { IMessageData, IMessageDataPayload } from '../store/message/types'
import { IGetCommentsSuccess, ICommentsDataPayload } from '../store/comments/types'

import { upLoadPhoto } from './api'

//Comments

export const handlerComentsData = (commentsData: ICommentsDataPayload[]): IGetCommentsSuccess[] => {
    return commentsData && commentsData.map((d) => {
        return {
            _id: d._id,
            text: d.text ? d.text : "I can't write",
            createdAt: new Date(Number(d.createdAt)).toLocaleString(),
            avatar: d.owner.avatar?.url ? d.owner.avatar?.url : "images/696abe18feffa8c402f137b7423a869e",
            nick: d.owner.nick ? d.owner.nick : 'Noname',
            answers: d.answers !== null ? handlerComentsData(d.answers) : null
        }
    })
}

//AddAdv

export async function handlerAddImg(oldImages: IAdv["oldImages"], refPhotos: any, jwtToken: string) {
    const idPhotos = [];
    for (let i = 0; i < 3; i++) {
        let imgId = (oldImages && oldImages[i]?._id) ? oldImages[i]._id : null
        const photo = refPhotos[i]?.current?.elements[0] as HTMLInputElement
        if (!photo) {
            return
        }
        if (photo.files?.length) {
            const body = new FormData(refPhotos[i].current)
            imgId = await upLoadPhoto(jwtToken, body)
        }
        // if (refPhotos[i]?.current?.elements[0].files.length) {
        //     const body = new FormData(refPhotos[i].current)
        //     imgId = await upLoadPhoto(jwtToken, body)
        // }
        idPhotos.push({ _id: imgId })
    }
    return idPhotos
}

//AdvCard

export function formatDate(date: string): string {
    return new Date(Number(date)).toLocaleDateString()
}

export function handlerImagesAdv(images: IImages[] | null) {
    if (images && images.length > 0 && images[0].url) {
        let result = [];
        for (let img of images) {
            img.url && result.push({ url: `http://marketplace.asmer.fs.a-level.com.ua/${img.url}`, _id: img._id })
        }
        return result;
    } else {
        return []
    }
}

export function handlerAdvCardData(advCardData: IAdvCardPayload): IAdvcardData {
    return {
        _id: advCardData._id,
        userId: advCardData.owner._id,
        advDate: formatDate(advCardData.owner.createdAt),
        title: advCardData.title || "I can't wriate headlines",
        description: advCardData.description || "I don't know many words",
        price: advCardData.price ? `${advCardData.price} грн.` : "Contract",
        address: advCardData.address || "Address is empty",
        userDate: formatDate(advCardData.createdAt),
        phones: advCardData.owner.phones ? advCardData.owner.phones : ['No phone'],
        nick: advCardData.owner.nick ? advCardData.owner.nick : "Noname",
        avatar: advCardData.owner.avatar
            ? `http://marketplace.asmer.fs.a-level.com.ua/${advCardData.owner.avatar.url}`
            : "https://apollo-ireland.akamaized.net/v1/files/76ojf53mron92-UA/image;s=261x203",
        images: handlerImagesAdv(advCardData.images),
        tags: advCardData.tags ? advCardData.tags.join(', ') : ""
    }
}

//Advs

export function getAdsCountFilter(type: string, quest: string, userId: string): IFilterAdvs {
    let filter: IFilterAdvs = (type === 'myadvs') ? { ___owner: userId } : {}
    quest && (filter.$or = [{ title: `/${quest}/` }, { description: `/${quest}/` }])
    return filter
}

export function getAdvsDataQuery(filter: IFilterAdvs, advsCount: number, page: number, limit: number, sortType: string): TAdvsData {
    const checkPage = (page * limit > advsCount) ? Math.ceil(advsCount / limit) - 1 : page - 1
    let sort: ISortAdvs[] = []
    switch (sortType) {
        case 'dateDesc':
            sort = [{ _id: -1 }]
            break
        case 'priceDesc':
            sort = [{ price: -1 }]
            break
        case 'priceАsc':
            sort = [{ price: 1 }]
            break
    }
    const skip = checkPage * limit
    return [filter, { sort, limit: [limit], skip: [skip] }]
}


export function handlerAdvsData(advsData: IAdvsDataPayload[]) {
    return advsData.map((d: IAdvsDataPayload) => {
        return {
            ...d,
            title: d.title || "I can't write headlines",
            createdAt: new Date(Number(d.createdAt)).toLocaleDateString(),
            price: d.price ? `${d.price} грн` : `Contract`,
            address: d.address ? d.address : `Address is empty`,
            images: (d.images && d.images[0]?.url)
                ? `http://marketplace.asmer.fs.a-level.com.ua/${d.images[0].url}`
                : "https://boatparts.com.ua/design/boatparts/images/no_image.png"
        }
    })
}

// message

export function handlerMessagesData(messagesData: IMessageDataPayload[]): IMessageData[] {
    return messagesData.map((d: IMessageDataPayload) => {
        return {
            _id: d._id,
            text: d.text ? d.text : "I can't write",
            createdAt: formatDate(d.createdAt),
            image: d.image?.url ? d.image.url : null,
            avatar: d.owner.avatar?.url ? d.owner.avatar?.url : "images/696abe18feffa8c402f137b7423a869e",
            nick: d.owner.nick ? d.owner.nick : 'Noname',
            phones: d.owner.phones?.length ? d.owner.phones.join(', ') : "No phone"
        }
    })
}