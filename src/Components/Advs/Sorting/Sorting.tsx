import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/advs/actions'
import { IRootState, IRootAction } from '../../../store/rootReducer'
import { Dispatch, bindActionCreators } from 'redux'
import { IsortArr } from '../../../store/advs/types'

const mapStateToProps = (state: IRootState) => (
    {
        advsLimit: state.advs.advsLimit,
        sortType: state.advs.sortType
    }
)

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
    bindActionCreators(
        {
            setAdvsLimit: actions.setAdvsLimit,
            setAdvSort: actions.setAdvSort
        }, dispatch
    )

type IProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

const Sorting = (props: IProps) => {

    const advsLimitHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        props.setAdvsLimit(Number(e.currentTarget.value))
    }

    const advsSortHandler = (e: React.FormEvent<HTMLSelectElement>) => {
        props.setAdvSort(e.currentTarget.value)
    }

    const advsLimitArr = [5, 10, 20, 80]
    const sortArr: IsortArr[] = [
        { id: 1, text: "New", value: "dateDesc" },
        { id: 2, text: "Expensive", value: "priceDesc" },
        { id: 3, text: "Cheap", value: "priceАsc" },
    ]

    return (
        <React.Fragment>
            <div className="col s6 m3">
                <label>Ads count</label>
                <select defaultValue={props.advsLimit} className="browser-default" onChange={advsLimitHandler}>
                    {advsLimitArr.map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
            </div>
            <div className="col s6 m3">
                <label>Sorting</label>
                <select value={props.sortType} className="browser-default" onChange={advsSortHandler}>
                    {sortArr.map((d: IsortArr) => (
                        <option key={d.id} value={d.value}>{d.text}</option>
                    ))}
                </select>
            </div>
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Sorting))