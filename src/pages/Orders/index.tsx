import css from './template.module.css'
import { useState, useEffect, useContext } from 'react';
import { API } from '../../api';
import { Order, Products } from '../../types';
import { Menu } from '../Components/menu';
import { Header } from '../Components/header/index';
import { useSearchParams } from 'react-router-dom';
import { MainCart } from '../Components/mainCart';
import { AuthContext } from '../../contexts/AuthContext';
import {faAngleDown, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let limit = 6
export const Orders = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('busca')
    const auth = useContext(AuthContext)

    const [orderList, setOrderList] = useState<Order[]>([])
    const [showMore, setShowMore] = useState(false)
    const [trigger, setTrigger] = useState(0)

    const [headerSearch, setHeaderSearch] = useState('')
    const [modalData, setModalData] = useState<Products>()

    useEffect(() => {
        let request = async () => {
            let json = await API.GetOrders(auth.user?.id as number)
            setOrderList(json.order)
        }
        request()
    }, [trigger])

    const handleFinishOrder = async (id: number, status: string) => {

        if(status == 'Andamento') {
            let json = await API.UpdateOrder(id, 'Finalizado')
            alert('Estado do pedido atualizado com sucesso !')
            setTrigger(trigger+1)
            return
        }
        alert('Estado do pedido já foi finalizado !')

    }

    const handleDeleteOrder = async (id: number) => {
        let json = await API.DeleteOrder(id)
        alert('Pedido excluido com sucesso !')
        setTrigger(trigger+1)
    }
    



    return (
        <>
            <div id={css.HOME} className={css.Home}>
                <Menu />

                <div className={css.mainContainer}>

                    <Header
                        headerSearch={headerSearch} 
                        setHeaderSearch={setHeaderSearch}
                    />
                    
                    <h2 style={{color: 'white'}}>Meus pedidos</h2>
                    <h3 style={{color: 'white', margin: '0px'}}>Histórico</h3>
                    
                    <div className={css.ordersContainer}>
                    {orderList &&
                        <>
                            {orderList.map((i,k) => (
                                <div className={css.Container}>
                                    <div className={css.Diviser}>
                                        <div className={css.InfoArea}>
                                            <div className={css.ProductName}>Pedido Nº {i.id}</div>
                                            <div className={css.ProductPrice}><span>Total: </span> R$ {i.total.toFixed(2)}</div>
                                            <div className={css.ProductPrice}>Status:  {i.status}</div>

                                        </div>
                                    </div>
                                    <div className={css.itemsContainer}>
                                        {i.OrderItems.map((i,k) => (
                                            <>
                                                <div className={css.item}>
                                                    <span>{i.qnt}</span> {i.name}
                                                </div>
                                                
                                            </>
                                            
                                        ))}
                                        <div className={css.seeMore}>
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </div>
                                    </div>
                                    <div className={css.buttonArea}>
                                        <button onClick={e => handleFinishOrder(i.id, i.status)}>Finalizar Pedido</button>
                                        <button onClick={e => handleDeleteOrder(i.id)}>Excluir</button>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                    </div>
                    {orderList.length == 0 &&
                        <div className={css.noOrder}>
                            <h1>Não há pedidos</h1>
                        </div>
                    }

                </div>
                <MainCart modalData={modalData} />
                
            </div>
        
        </>
    )
}