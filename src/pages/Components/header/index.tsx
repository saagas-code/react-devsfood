import css from './template.module.css'
import { useState } from 'react';
import logo from '../../../images/logo.png'
import { useNavigate } from 'react-router-dom';

type Props = {
    headerSearch: string
    setHeaderSearch: React.Dispatch<React.SetStateAction<string>>
}

export const Header = ({headerSearch, setHeaderSearch}: Props) => {
    const navigate = useNavigate()

    const handleHome = () => {
        navigate('/')
    }

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            navigate({
                pathname: '/',
                search: `?busca=${headerSearch}`
            })
        }
    };

    
    const [inputActive, setInputActive] = useState(headerSearch == '' ? false : true)
    return (
        <header>
            <div className={css.logo}>
                <h1><img src={logo} alt="" onClick={handleHome} /></h1>
            </div>

            <div className={css.search}>
                <input
                    style={{
                        ...inputActive ? {width:'300px'} : {width:'0px'}, 
                        ...inputActive ? {cursor:''} : {cursor: 'pointer'} 
                    }}
                    placeholder='Digite um produto...' 
                    type="text"
                    value={headerSearch}
                    onKeyDown={keyDownHandler}
                    onChange={e => {setHeaderSearch(e.target.value)}}
                    onFocus={(e) => {setInputActive(true)}}
                    onBlur={(e) => {(headerSearch == '') ? setInputActive(false) : setInputActive(true)}}
                />
            </div>
        </header>
    )
}

