import React, { useEffect } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import style from './style.module.scss'
import classnames from 'classnames'
import * as actions from '../../store/adv/actions'
import { IRootAction, IRootState } from '../../store/rootReducer'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'

const mapDispatchToProps = (dispatch: Dispatch<IRootAction>) =>
  bindActionCreators(
    {
      getAdvCard: actions.getAdvCard.request,
      deleteAdvCard: actions.deleteAdvCard,
    }, dispatch
  )

const mapStateToProps = (state: IRootState) => (
  {
    advCard: state.advCard.advCardData,
    isAdv: state.advCard.isAdv,
  }
)

type TParams = { id: string };

type IProps = ReturnType<typeof mapDispatchToProps>
  & ReturnType<typeof mapStateToProps>
  & RouteComponentProps<TParams>

const AdCard = (props: IProps) => {

  useEffect(() => {
    props.getAdvCard(props.match.params.id)
    return () => {
      props.deleteAdvCard()
    }
  }, [])

  const elems = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(elems, { inDuration: 0, outDuration: 0 });

  if (props.isAdv) {
    return (
      <div className={classnames("row", style.rowcorrect)}>
        <div className="col m9 s12">
          <div className={style.contentWrapper}>
            <div className={style.topPhoto}>
              <img alt={props.advCard.title} className="materialboxed" src={props.advCard.images[0]} />
            </div>
            <div className={style.content}>
              <h1>{props.advCard.title}</h1>
              <span className={style.address}>{props.advCard.address}</span>
              <span className={style.data}>{props.advCard.advDate}</span>
              <p className={style.description}>{props.advCard.description}</p>
            </div>
          </div>
        </div>
        <div className="col m3 s12">
          <div className={style.sidebarWrapper}>
            <div className={style.price}>
              <strong>{props.advCard.price}</strong>
            </div>
            <div className={style.phones}>
              {props.advCard.phones.map((phone: string) => <p key={phone}><i className="material-icons">phone</i>{phone}</p>)}
            </div>
            <div className={style.userWrapper}>
              <img alt={props.advCard.nick} src={props.advCard.avatar} />
              <span className={style.nick}>{props.advCard.nick}</span>
              <span className={style.userData}>Регистрация: {props.advCard.userDate}</span>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <NotFound />
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AdCard))