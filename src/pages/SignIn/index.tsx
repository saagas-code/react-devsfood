import css from './template.module.css'
import { useState, useEffect, useContext } from 'react';
import { Categories, Products } from '../../types';
import { API } from '../../api';

import { Menu } from '../Components/menu/index';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';



export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState<string>('')

    const auth = useContext(AuthContext);
    const navigate = useNavigate()
    const pass = localStorage.getItem('password')
    const mail = localStorage.getItem('email')

    useEffect(() => {
        
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            setError('')
            setDisabled(true)
            const json = await API.Login(email, password);
            if(json.error) {
                setError(json.error);
                setDisabled(false)
            }
            if(json.token) {
                const login = await auth.signin(json.token)
                navigate('/') 
            }
            setDisabled(false)
    }

    return (
        <div id={css.HOME} className={css.Home}>
            <Menu />

            <div className={css.mainContainer}>
                <div className={css.loginContainer}>
                    <div className={css.titleArea}>
                        <div className={css.titleName}>Login</div>
                        <div className={css.titleBar}></div>
                    </div>
                    {error &&
                    <div className={css.ErrorMessage}>
                        {error}
                    </div>
                }
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={css.inputArea}>
                            <label htmlFor="login--email">E-mail</label>
                            <input required onChange={(e)=>setEmail(e.target.value)} id="login--email" type="email"  />
                        </div>
                        <div className={css.inputArea}>
                            <label htmlFor="password--login">Password</label>
                            <input required onChange={(e)=>setPassword(e.target.value)} id="password--login" type="password" />
                        </div>

                        <button>Fazer Login</button>
                    </form>  
                    <div className={css.registerArea}>
                        <Link to="/register">Criar nova conta</Link>
                    </div>                
                </div>
            </div>
            
            
        </div>
    )
}