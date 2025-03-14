

import style from './Title.module.scss'

export const Title = ({text}) => {

    return (
       <h1 className={style.title}> {text} </h1>
    )
}

