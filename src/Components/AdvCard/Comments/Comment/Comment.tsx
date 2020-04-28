import React, { useState } from 'react'
import style from './style.module.scss'

const Comment = () => {

    const [toggle, setToggle] = useState(true)

    const togleHandler = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setToggle(!toggle)
    }

    return (
        <div className={style.comment}>
            <div className={style.header}>
                <img src="http://marketplace.asmer.fs.a-level.com.ua/images/3a5df8384b7e2d1a34de8cbb397cdf3a" />
                <span className={style.author}>Aleksey</span>
                <span className={style.date}>11.22.2015</span>
            </div>
            <p>Однако я могу Вас и обрадовать — мы говорим о Frontend приложениях! Давайте смотреть правде в глаза
            — как правило, подобные приложения не вырастают до миллионов строк, иначе браузеры бы банально долго
            загружали такие приложения. В крайнем случае, они разбиваются на разные продукты, а основная логика
            лежит на backend стороне. Поэтому мы в какой-то мере можем стремиться к приведенной выше тенденции
            роста стоимости кода (с разной успешностью, в зависимости от размера приложения). Если наш проект
            даже на 50% дешевле сопровождается, чем мог бы без хорошей архитектуры — это уже экономия
            времени разработчиков и средств заказчика.
                    </p>
            <div>
                {toggle
                    ? <button onClick={togleHandler} className={style.answerButton}>Ответ</button>
                    : <div className={style.answerWrapper}>
                        <textarea></textarea>
                        <div className={style.buttons}>
                            <button className={style.sendButton}>Отправить</button>
                            <button onClick={togleHandler} className={style.cancelButton}>Отмена</button>
                        </div>
                    </div>
                    
                }
            </div>
        </div>
    )
}

export default React.memo(Comment)