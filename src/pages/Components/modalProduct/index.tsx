import css from './template.module.css'
import { useState, useEffect, useContext } from 'react';
import plus from '../../../images/plus.png'
import minus from '../../../images/minus.png'
import { AuthContext } from '../../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/reducers/Cart';



type Product = {
    id: number,
    id_cat: number,
    name: string
    image: string,
    ingredients: string,
    points: number,
    price: number,
    qnt?: number
}

type Props = {
    modalData: Product | undefined
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalProduct = ({modalData, setModalStatus}: Props) => {
    const [qt, setQt] = useState(1)

    const dispatch = useDispatch();
    const auth = useContext(AuthContext)

    useEffect(() => {
      setQt(1)
    }, [modalData])
    
    
    const handleCloseModal = () => {
        setModalStatus(false)
        setQt(1)
    }

    const handleMinusQt = () => {
        if(qt > 1) {
            setQt(qt - 1)
        }
    }
    const handlePlusQt = () => {
        setQt(qt + 1)
    }

    const handleAddCart = () => {
        if(modalData) {
            let tmpData = {
                id: modalData.id,
                name: modalData.name,
                price: modalData.price,
                image: modalData.image,
                qnt: qt
            }
            dispatch(addToCart(tmpData))
            setModalStatus(false)
        }
        
    }

    

    return (
        <div className={css.Container}>
            <div className={css.ProductArea}>
                <div className={css.ProductPhoto}>
                    <img src={modalData?.image} alt="" />
                </div>
                <div className={css.ProductInfoArea}>
                    <div className={css.ProductDetails}>
                        <div className={css.ProductName}>{modalData?.name}</div>
                        <div className={css.ProductIngredients}>{modalData?.ingredients}</div>
                    </div>
                    <div className={css.ProductQuantityArea}>
                        <div className={css.ProductQuantity}>
                            <img onClick={handleMinusQt} src={minus} alt="" />
                            <div>{qt}</div>
                            <img onClick={handlePlusQt} src={plus} alt="" />
                        </div>
                        <div className={css.ProductPrice}>
                                
                                {modalData &&
                                    <>
                                        R$ {(modalData.price * qt).toFixed(2)}
                                    </>
                                }
                                
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.ProductButtons}>
                <button onClick={handleCloseModal}>
                    Cancelar
                </button>
                <button onClick={handleAddCart}>
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>  
    )
}

