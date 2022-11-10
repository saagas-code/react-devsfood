import css from './template.module.css'
import { useState, useEffect, useContext } from 'react';




import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { API } from '../../api';
import { Menu } from './../Components/menu/index';
import { erroLogin } from '../../types';



export const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [errors, setError] = useState<erroLogin | undefined >(undefined)



    const auth = useContext(AuthContext);
    const navigate = useNavigate()


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            setError(undefined)
            //setDisabled(true)
            
            if(password !== confirmPassword) {
                setError({
                    confirmPassword: 'Senhas não batem'
                })
                //setDisabled(false)
                return
            }
            const json = await API.Register(name, email, password);
            if(json.token) {
                await auth.signin(json.token)
                alert('Conta criada com sucesso !')
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
                        <div className={css.titleName}>Cadastro</div>
                        <div className={css.titleBar}></div>
                    </div>
                    {errors &&
                        <div className={css.ErrorMessage}>
                            <>
                                <div>{errors.confirmPassword}</div>
                                <div>{errors.email?.msg}</div>
                            </>
                        </div>
                    }
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={css.inputArea}>
                            <label htmlFor="login--name">Nome</label>
                            <input required onChange={(e)=>setName(e.target.value)} id="login--name" type="text"  />
                        </div>
                        <div className={css.inputArea}>
                            <label htmlFor="login--email">E-mail</label>
                            <input required onChange={(e)=>setEmail(e.target.value)} id="login--email" type="email"  />
                        </div>
                        <div className={css.inputArea}>
                            <label htmlFor="password--pass">Senha</label>
                            <input required onChange={(e)=>setPassword(e.target.value)} id="password--pass" type="password" />
                        </div>
                        <div className={css.inputArea}>
                            <label htmlFor="password--passC">Confirma a senha</label>
                            <input required onChange={(e)=>setConfirmPassword(e.target.value)} id="password--passC" type="password" />
                        </div>

                        <button>Fazer Cadastro</button>
                    </form>  
                    <div className={css.registerArea}>
                        <Link to="/login">Fazer Login</Link>
                    </div>                
                </div>
            </div>
            
            
        </div>
    )
}