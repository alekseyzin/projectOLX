import React, { useEffect } from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import style from './style.module.scss'
import classnames from 'classnames'
import * as actions from '../../store/adv/actions'
import { IRootAction, IRootState } from '../../store/rootReducer'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import NotFound from '../NotFound/NotFound'
import Message from './AddMessage/AddMessage'
import Comments from './Comments/Comments'
import { Helmet } from 'react-helmet'

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

type TProps = ReturnType<typeof mapDispatchToProps>
  & ReturnType<typeof mapStateToProps>
  & RouteComponentProps<TParams>

const AdCard = (props: TProps) => {

  useEffect(() => {
    props.getAdvCard(props.match.params.id)
    return () => {
      props.deleteAdvCard()
    }
  }, [])

  useEffect(() => {
    const elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems, { inDuration: 0, outDuration: 0 });
  }, [props.advCard])

  const elems = document.querySelectorAll('.modal');
  M.Modal.init(elems, {});

  const img = props.advCard.images[0]?.url || "https://boatparts.com.ua/design/boatparts/images/no_image.png"

  if (props.isAdv) {
    return (
      <React.Fragment>
        <div className={classnames("row", style.rowcorrect)}>
          <Helmet>
            <title>{`${props.advCard.title} - ad on the Success`}</title>
            <meta name="description" content={props.advCard.description.slice(0, 160)} />
          </Helmet>
          <div className="col m9 s12">
            <div className={style.contentWrapper}>
              <div className={style.topPhoto}>
                <img alt={props.advCard.title} className="materialboxed" src={img} />
              </div>
              <div className={style.content}>
                <h1>{props.advCard.title}</h1>
                <span className={style.address}>{props.advCard.address}</span>
                <span className={style.data}>{props.advCard.advDate}</span>
                <p className={style.description}>{props.advCard.description}</p>
              </div>
              {
                props.advCard.images.map((img, index) => {
                  if (index > 0) {
                    return (
                      <div className={style.topPhoto} key={img._id}>
                        <img alt={props.advCard.title} className="materialboxed" src={img.url} />
                      </div>
                    )
                  }
                })
              }
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
                <span className={style.userData}>Registration: {props.advCard.userDate}</span>
                <a className={classnames("waves-light btn modal-trigger", style.messageBtn)} href="#modal1">Send message</a>
              </div>
            </div>
          </div>
          <Message nick={props.advCard.nick} userId={props.advCard.userId} />
        </div>
        <div className={classnames("row", style.rowcorrect)}>
          <div className="col m9 s12">
            <Comments idAdv={props.match.params.id} />
          </div>
        </div>
      </React.Fragment>
    )
  } else {
    return <NotFound />
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AdCard))