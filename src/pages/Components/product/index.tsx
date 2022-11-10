import css from './template.module.css'
import imagem from '../../../images/next.png'
import { Product } from '../../../types'


type Props = {
    id: number,
    id_cat: number,
    name: string
    image: string,
    ingredients: string,
    points: number,
    price: number
    index: number
    products: Product[]
    onClick: (index: number) => void
    setModalStatus: React.Dispatch<React.SetStateAction<boolean>>
    setModalData: React.Dispatch<React.SetStateAction<Product | undefined>>

}

export const ProductItem = ({products, setModalStatus, setModalData, id, id_cat, name, image, ingredients, index, points, price, onClick}: Props) => {
    
    const handleClickItem = () => {
        setModalData(products[index])
        setModalStatus(true)
    }
    
    return (
        <div onClick={handleClickItem} className={css.Container}>
            <div className={css.PhotoArea}>
                <img src={image} alt="" />
            </div>
            <div className={css.InfoArea}>
                <div className={css.ProductName}>{name}</div>
                <div className={css.ProductPrice}>R$ {price}</div>
                <div className={css.ProductIngredients}>{ingredients}</div>
            </div>
            <div className={css.ButtonArea}>
                <img src={imagem} alt="" />
            </div>
        </div>
        
    )
}

