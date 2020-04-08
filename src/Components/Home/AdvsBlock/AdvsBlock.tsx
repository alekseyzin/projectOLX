import React, { useEffect} from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import style from './style.module.scss'

import * as actions from '../../../store/advs/actions'
import { IRootAction, IRootState } from '../../../store/rootReducer'
import { connect } from 'react-redux'
import { IAdv } from '../../../store/advs/types'
import Adv from './Adv/Adv'
import Preloader from '../../Preloader/Preloader'

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
        advsData: state.advs.advsData
    }
)

type IProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

const AdvsBlock = (props: IProps) => {

    useEffect(() => {
        props.getAdvs()

        return () => {
            props.deleteAdvs()
        }
    }, [])

    if (props.advsData.length) {
        return (
            <div className={style.lastAdvWrapper}>
                <h1>Лудший Сакес в твоей жизни!</h1>
                <div className="row">
                    {props.advsData.map((d: IAdv) => (<Adv key={d._id}
                        _id={d._id}
                        title={d.title}
                        address={d.address}
                        createdAt={d.createdAt}
                        price={d.price}
                        images={d.images}
                    />))
                    }
                </div>
            </div>
        )
    } else {
        return (
            <Preloader />
        )
    }


}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AdvsBlock));