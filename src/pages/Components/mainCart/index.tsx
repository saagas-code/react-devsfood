import { useContext, useEffect, useState } from 'react'
import down from '../../../images/down.png'
import plus from '../../../images/plus.png'
import minus from '../../../images/minus.png'
import edit from '../../../images/edit.png'
import css from './template.module.css'
import { AuthContext } from '../../../contexts/AuthContext'
import { Address, Product } from '../../../types'
import { useAppSelector } from './../../../redux/hooks/useAppSelector';
import { findCupom, getTotalPrice, increaseQnt, minusQnt, removeFromCart, FinishCart } from '../../../redux/reducers/Cart'
import { API } from '../../../api'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ModalEdit } from './../modal Edit/index';


type Props = {
    modalData: Product | undefined
}

export const MainCart = ({modalData}: Props) => {
    const auth = useContext(AuthContext)
    const [cupom, setCupom] = useState('')
    const [address, setAddress] = useState<Address>()
    const [modalStatus, setModalStatus] = useState(false)
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(true)

    const carts = useAppSelector(state => state.cart.foodsInCart)
    const discount = useAppSelector(state => state.cart.cupom)
    const total = useAppSelector(getTotalPrice)
    const dispatch = useDispatch();

    useEffect(() => {
        const getAddress = async () => {
            setLoading(true)
            const add = await API.GetAddress(auth.user?.id as number)
            setAddress(add.addresses)
            setLoading(false)
            
        }
        getAddress()
    }, [show, modalStatus])
    

    const handleCartClick = () => {
        setShow(!show)
    }

    const keyDownHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            let json = await API.GetCupom(cupom)
            if(json.discount) {
                dispatch(findCupom(json.discount))
            }
        }
        
    };

    const handleEditAddress = () => {
        setModalStatus(true)
    }

    const finishCart = async () => {
        dispatch(FinishCart(''))
        let json = await API.CreateOrder(auth.user?.id as number, total, carts )
        alert('Compra finalizada!')
    }
    return (
        <div className={css.CartArea}>
            <div onClick={handleCartClick} className={css.CartHeader}>
                <div>
                    <span><FontAwesomeIcon icon={faCartShopping} /></span>
                </div>
                <div className={css.CartText}>Meu Carrinho {carts.length > 0 ? `(${carts.length})`: null}</div>
                {show &&
                    <img src={down} alt="" />
                }
            </div>
            <div 
                className={css.CartBody}
                style={show 
                    ? {display:'block'} 
                    : {display:'none'}}
            >
                <div className={css.ProductsArea}>
                    {carts?.map((item: any, key: any) => (
                        <div key={key} className={css.ProductItem}>
                            <img src={item.image} alt="" />
                            <div className={css.ProductInfoArea}>
                                <div className={css.ProductName}>{item.name}</div>
                                <div className={css.ProductsPrice}>
                                    <div>R$ {(item.price * (item.qnt)).toFixed(2)}</div>
                                    <div onClick={()=> dispatch(removeFromCart(item.id))} className={css.remove}>Remover</div>
                                    
                                </div>
                            </div>
                            <div className={css.ProductQuantityArea}>
                                <div onClick={()=> dispatch(minusQnt(item.id))}><img src={minus} alt="" /></div>
                                <div className={css.ProductQtText}>{item.qnt}</div>
                                <div onClick={()=> dispatch(increaseQnt(item.id))}><img src={plus} alt="" /></div>
                            </div>
                        </div>
                    ))}
                    
                    <div className={css.DeliveryArea}>
                        <div className={css.DeliveryHeader}>
                            Entrega
                        </div>
                        {address &&
                            <div className={css.DeliveryInfoArea}>
                                <div className={css.DeliveryInfoText}>
                                    <div>{address?.local}</div>
                                    <div>{address?.rua} {address?.numero}</div>
                                    <div>{address?.estado}, {address?.cidade}</div>
                                </div>
                                <div className={css.DeliveryEdit}>
                                    <img onClick={handleEditAddress} src={edit} alt="" />
                                </div>
                            </div>
                        }
                    </div>

                    {address &&
                        <>
                            <div className={css.CupomArea}>
                                <div className={css.CupomHeader}>
                                    Cupom de Desconto
                                </div>
                                <div className={css.CupomInput}>
                                    <input value={cupom} onChange={e => {setCupom(e.target.value)}} onKeyDown={keyDownHandler} type="text" />
                                </div>
                            </div>

                            <div className={css.FinishArea}>
                                <div className={css.DiscountInfo}>
                                    <div>Desconto</div>  <div>R$ {discount}</div>
                                </div>
                                <div className={css.DeliveryInfo}>
                                    <div>Taxa de Entrega</div> <div>R$ 0.00</div>
                                </div>
                                <div className={css.TotalInfo}>
                                    <div>Total</div> <div>R$ {Math.max(total as unknown as number, 0).toFixed(2)}</div>
                                </div>
                            </div>

                            <div className={css.FinishButton}>
                                <button onClick={finishCart}>FINALIZAR COMPRA</button>
                            </div>
                        </>
                    }
                    {!address &&
                        <div className={css.messageArea}>
                            <span>Adicione um endereco antes de finalizar a compra !</span>
                            <div><img onClick={handleEditAddress} src={edit} alt="" /></div>
                        </div>
                    }
                    
                </div>  
            </div>
            {!loading &&
                <ModalEdit address={address} modalStatus={modalStatus} setStatus={setModalStatus} />
            }
        </div>
    )
}

