import React from 'react'
import style from './style.module.scss'
import classnames from 'classnames'

const Footer = () => {

    return (
        <footer className={classnames("page-footer white", style.footer)}>
          <div className="footer-copyright">
            <div className="container black-text">
            © 2020 Zinchenko Aleksey
            <a className="blue-text right" href="#!">aleksey.zin@gmail.com</a>
            </div>
          </div>
        </footer>
    )
}

export default React.memo(Footer)