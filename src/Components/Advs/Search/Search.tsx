import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import history from '../../../history'

import style from './style.module.scss'
import classnames from 'classnames'

interface IProps {
    isMyAdvs: boolean
}

const Search = (props: IProps) => {

    const [questInput, setQuestInput] = useState('')

    useEffect(() => {
        setQuestInput('')
    }, [props.isMyAdvs])

    const searchPath = props.isMyAdvs ? `/myadvs/q-${questInput}` : `/q-${questInput}`
    const clearPath = props.isMyAdvs ? `/myadvs` : `/`

    const changeQuestHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestInput(e.currentTarget.value)
    }

    const keyDownQuestHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && questInput) {
            history.push(searchPath)
        }
    }

    const cleareHandler = () => {
        setQuestInput('')
    }

    return (
        <div className={classnames("col s12", style.searchWrapper)}>
            <div className={style.searchBtn}>
            {questInput
                ? <Link to={searchPath} className={classnames("prefix", style.searchLink)}>
                    <i className={classnames("material-icons", style.searchIcon)}>search</i>
                </Link>
                : <i className="material-icons prefix">search</i>
            }
            </div>
            <input
                value={questInput}
                onChange={changeQuestHandler}
                onKeyDown={keyDownQuestHandler}
                id="icon_prefix"
                type="text"
                placeholder="Search"
            />
            <Link onClick={cleareHandler} className={style.clearBtn}  to={clearPath}><i className="material-icons">close</i></Link>
        </div>
    )
}

export default React.memo(Search)