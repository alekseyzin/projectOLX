import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import style from './style.module.scss'
import classnames from 'classnames'

interface IProps {
    isMyAdvs: boolean
}

const Search = (props:IProps) => {

    const [questInput, setQuestInput] = useState('')

    const searchPath = props.isMyAdvs ? `/myadvs/q-${questInput}` : `/q-${questInput}`

    const changeQuestHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setQuestInput(e.currentTarget.value) 
     }
 
     const keyDownQuestHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
         if (e.key === 'Enter' && questInput){
            document.location.href = searchPath;
         }
     }

    return (
        <div className="input-field col s6">
            {questInput
                ? <Link to={searchPath} className={classnames("prefix", style.searchIconWrapper)}>
                    <i className={classnames("material-icons", style.searchIcon)}>search</i>
                </Link>
                : <i className="material-icons prefix">search</i>
            }
            <input
                value={questInput}
                onChange={changeQuestHandler}
                onKeyDown={keyDownQuestHandler}
                id="icon_prefix"
                type="text"
                placeholder="Поиск" />
        </div>
    )
}

export default React.memo(Search)