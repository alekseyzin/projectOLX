import React from 'react'
import style from './style.module.scss'
import classnames from 'classnames'

const Footer = () => {

    return (
        <footer className={classnames("page-footer", style.footer)}>
          <div className="footer-copyright">
            <div className="container">
            © 2014 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">Контакты</a>
            </div>
          </div>
        </footer>
    )
}

export default React.memo(Footer)