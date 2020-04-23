import React, { useEffect } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import style from './style.module.scss'

import * as actions from '../../store/advs/actions'
import { IRootAction, IRootState } from '../../store/rootReducer'
import { connect } from 'react-redux'
import { IAdv } from '../../store/advs/types'
import Adv from './Adv/Adv'
import Preloader from '../Preloader/Preloader'
import { RouteComponentProps } from 'react-router-dom'
import Pagination from '../Pagination/Pagination'
import AdvUser from './AdvUser/AdvUser'
import Search from './Search/Search'

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
    bindActionCreators(
        {
            getAdvs: actions.getAdvs.request,
            deleteAdvs: actions.deleteAdvs
        },
        dispatch
    )

const mapStateToProps = (state: IRootState) => (
    {
        advsData: state.advs.advsData,
        pagesCount: state.advs.pagesCount
    }
)
type TParams = { id: string, q: string };
type IProps = ReturnType<typeof mapDispatchToProps>
    & ReturnType<typeof mapStateToProps>
    & RouteComponentProps<TParams>

const AdvsBlock = (props: IProps) => {

    useEffect(() => {
        const type = isMyAdvs ? 'myadvs' : 'advs'
        props.getAdvs({ type, page, quest })
        return () => {
            props.deleteAdvs()
        }
    }, [props.match])

    const quest = props.match.params.q || null
    const page = props.match.params.id ? Number(props.match.params.id) : 1
    // debugger;
    const isMyAdvs = props.match.path.includes('myadvs')
    const pathAdvs = quest ? `/q-${quest}` : ''
    const pathMyAdvs = quest ? `/myadvs/q-${quest}` : '/myadvs'
    let h1 = isMyAdvs ? 'Мои объявления' : 'Лудший Сакес в твоей жизни!'
    quest && (h1 = `Поиск: ${quest}`)

    // if (props.advsData.length) {
    return (
        <div>
            <h1>{h1}</h1>
            <Search isMyAdvs={isMyAdvs} />
            <div className="row">
                {props.advsData.length
                    ? props.advsData.map((d: IAdv) => {
                        if (isMyAdvs) {
                            return <AdvUser key={d._id}
                                _id={d._id}
                                title={d.title}
                                address={d.address}
                                createdAt={d.createdAt}
                                price={d.price}
                                images={d.images}
                            />
                        } else {
                            return <Adv key={d._id}
                                _id={d._id}
                                title={d.title}
                                address={d.address}
                                createdAt={d.createdAt}
                                price={d.price}
                                images={d.images}
                            />
                        }
                    })
                    : quest ? <div className="center-align">По вашему запросу ничего не найдено</div> : <Preloader />
                }
            </div>
            <Pagination
                pagesCount={props.pagesCount}
                currentPage={page}
                path={isMyAdvs ? pathMyAdvs : pathAdvs}
            />
        </div>
    )
    //     } else {
    //         return (
    //             <Preloader />
    //         )
    //     }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AdvsBlock));