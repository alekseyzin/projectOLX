import React, { useEffect } from 'react'
import { Dispatch, bindActionCreators } from 'redux'

import * as actions from '../../store/advs/actions'
import { IRootAction, IRootState } from '../../store/rootReducer'
import { connect } from 'react-redux'
import { IAdv } from '../../store/advs/types'
import Adv from './Adv/Adv'
import { RouteComponentProps } from 'react-router-dom'
import Pagination from '../Pagination/Pagination'
import AdvUser from './AdvUser/AdvUser'
import Search from './Search/Search'
import Preloader from '../Preloader/Preloader'
import Sorting from './Sorting/Sorting'
import SEO from './SEO/SEO'

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
    bindActionCreators(
        {
            getAdvs: actions.getAdvs.request,
            // deleteAdvs: actions.deleteAdvs
            togglePreloader: actions.togglePreloader
        },
        dispatch
    )

const mapStateToProps = (state: IRootState) => (
    {
        advsData: state.advs.advsData,
        pagesCount: state.advs.pagesCount,
        advsLimit: state.advs.advsLimit,
        sortType: state.advs.sortType,
        isFetching: state.advs.isFetching
    }
)
type TParams = { id: string, q: string };
type TProps = ReturnType<typeof mapDispatchToProps>
    & ReturnType<typeof mapStateToProps>
    & RouteComponentProps<TParams>

const AdvsBlock = (props: TProps) => {

    const quest = props.match.params.q || null
    const page = props.match.params.id ? Number(props.match.params.id) : 1
    const isMyAdvs = props.match.path.includes('myadvs')
    const pathAdvs = quest ? `/q-${quest}` : ''
    const pathMyAdvs = quest ? `/myadvs/q-${quest}` : '/myadvs'
    let h1 = isMyAdvs ? 'Мои объявления' : 'Список объявлений!'
    quest && (h1 = `Поиск: ${quest}`)

    useEffect(() => {
        const type = isMyAdvs ? 'myadvs' : 'advs'
        props.getAdvs({ type, page, quest })
        // return () => {
        //     props.deleteAdvs()
        // }
    }, [props.match, props.advsLimit, props.sortType])

    // useEffect(() => {
    //     props.setAdvsLimit(10)
    // }, [])

    if (!props.isFetching) {
        return (
            <React.Fragment>
                <SEO isMyAdvs={isMyAdvs} quest={quest} page={page} />
                <h1>{h1}</h1>
                <div className="row">
                    <Search isMyAdvs={isMyAdvs} />
                    <Sorting />
                </div>
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
                        : <div className="center-align">По вашему запросу ничего не найдено</div>
                    }
                </div>
                <Pagination
                    pagesCount={props.pagesCount}
                    currentPage={page}
                    path={isMyAdvs ? pathMyAdvs : pathAdvs}
                />
            </React.Fragment>
        )
    } else {
        return <Preloader />
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AdvsBlock));