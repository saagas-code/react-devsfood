import css from './template.module.css'
import './modal.css'

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { API } from '../../../api';
import { Address } from '../../../types';




type Props = {
    modalStatus: boolean
    setStatus: React.Dispatch<React.SetStateAction<boolean>>
    address: Address | undefined
}

export const ModalEdit = ({modalStatus, setStatus, address}: Props) => {
    const [location, setLocation] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    

    const auth = useContext(AuthContext)

    useEffect(() => {
      setLocation(address?.local as string)
      setRua(address?.rua as string)
      setNumero(address?.numero as string)
      setEstado(address?.estado as string)
      setCidade(address?.cidade as string)

    }, [])
    
    
    const handleModalClick = (e: any) => {
        if(e.target.classList.contains('Container')) {
            setStatus(false)
        }
        //setModalData()
    }

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let json = await API.UpdateAddress(auth.user?.id as number, location, rua, numero, estado, cidade)
        if(json) {
            alert('Dados editados com sucesso !')
            setStatus(false)
        }
    }

    const handleCloseModal = () => {
        setStatus(false)
    }

    return (
        <div 
            onClick={handleModalClick}
            className='Container'
            style={modalStatus 
                ? {display:'flex'} 
                : {display:'none'}
            }
        >
            <div className={css.modalBody}>
                <div className={css.ModalContainer}>
                    <h1>Adicionar/Editar Endereco</h1>
                    <form action="" onSubmit={(e) => handleEdit(e)}>
                        <div className={css.radioContainer}>      
                            <div className={css.radioName}>Casa ou Trabalho?</div>
                            <input defaultChecked={address?.local === 'Casa'} value={'Casa'} type="radio" name="work--or--house" id="house" onClick={() => setLocation("Casa")} required />
                            <label htmlFor="house">Minha Casa</label>
                            <input defaultChecked={address?.local == 'Trabalho'} value={'Trabalho'}  type="radio" name="work--or--house" id="work" onClick={() => setLocation("Trabalho")} required />
                            <label  htmlFor="work">Meu Trabalho</label>
                        </div>
                        <div className={css.inputs}>
                            <label  htmlFor="rua">Rua</label>
                            <input required value={rua} onChange={(e) => setRua(e.target.value)} id="rua" type="text" />
                        </div>
                        <div className={css.inputs}>
                            <label  htmlFor="numero">Número</label>
                            <input required value={numero} onChange={(e) => setNumero(e.target.value)} id="numero" type="number" />
                        </div>
                        <div className={css.inputs}>
                            <label  htmlFor="estado">Estado</label>
                            <input required value={estado} onChange={(e) => setEstado(e.target.value)} id="estado" type="text" />
                        </div>
                        <div className={css.inputs}>
                            <label  htmlFor="cep">Cidade</label>
                            <input required value={cidade} onChange={(e) => setCidade(e.target.value)} id="cep" type="text" />
                        </div>
                        <div className={css.finish}>
                            <button className={css.finish}>Atualizar</button>
                            <button onClick={handleCloseModal} className={css.cancel}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}