import css from './template.module.css'
import { useState, useEffect, useContext } from 'react';
import imagem from '../../images/food-and-restaurant.png';
import { API } from '../../api';
import { Address, Categories, Products } from '../../types';
import { Menu } from '../Components/menu';
import { Header } from './../Components/header/index';
import { CategoryItem } from './../Components/category/index';
import { ProductItem } from './../Components/product/index';
import { Modal } from './../Components/modal/index';
import { ModalProduct } from './../Components/modalProduct/index';
import { useSearchParams } from 'react-router-dom';
import { MainCart } from '../Components/mainCart';
import { AuthContext } from '../../contexts/AuthContext';

let limit = 6
export const Home = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('busca')
    const auth = useContext(AuthContext)


    const [headerSearch, setHeaderSearch] = useState('')
    const [categories, setCategories] = useState<Categories[]>([])
    const [products, setProducts] = useState<Products[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [offset, setOffset] = useState(0)
    const [trigger, setTrigger] = useState(0)
    const [loading, setLoading] = useState(false)

    const [modalStatus, setModalStatus] = useState(false)
    const [modalData, setModalData] = useState<Products>()

    
    const [activeCategory, setActiveCategory] = useState(0)
    const [activePage, setActivePage] = useState(1)

    

    // useEffect(() => {
    //   setActivePage(1)
    // }, [])

    useEffect(() => {
        let request = async () => {
            const json = await API.GetCategories( )
            setCategories(json.categories)
        }

        request()
    }, [])

    useEffect(() => {
        setOffset((activePage - 1)*limit)
        setTrigger(trigger+1)
        console.log('calc: ',(activePage - 1)*limit)
        console.log(offset)

        
    }, [activePage])


    useEffect(() => {
        const getProducts = async () => {
            const prods = await API.getProducts(limit, offset, activeCategory, query as string);
            setProducts(prods.foodList);
            setTotalPages((prods.total / limit))
        }
        getProducts();
    }, [activeCategory, query, trigger])
    
    

    const handleCategory = () => {
        setActivePage(1)
    }

    const handleProductClick = (index: number) => {
        setModalStatus(true)
        setModalData(products[index])
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
                    
                    {categories.length > 0 &&
                        
                        <div onClick={handleCategory} className={css.CategoryArea}>
                            {/* <ReactTooltip id="tip-top" place='top' effect="solid" /> */}
                            Selecione uma categoria

                            <div className={css.CategoryList}>
                                <CategoryItem
                                    activeCategory={activeCategory}
                                    setActiveCategory={setActiveCategory} 
                                    id={0} 
                                    title='Todas as categorias' 
                                    image={imagem}
                                    
                                />
                                {categories.map((item, key) => (
                                    <CategoryItem 
                                        activeCategory={activeCategory}
                                        setActiveCategory={setActiveCategory}
                                        key={key} 
                                        id={item.id}
                                        title={item.name}
                                        image={item.image}
                                    />
                                ))}
                            </div>

                        </div>

                    }
                    {products.length > 0 &&
                        <div className={css.ProductArea}>
                            <div className={css.ProductList}>
                                {products.map((item, key) => (
                                    <ProductItem
                                        key={key}
                                        name={item.name}
                                        id={item.id}
                                        id_cat={item.id_cat}
                                        image={item.image}
                                        price={item.price}
                                        ingredients={item.ingredients}
                                        points={item.points}
                                        index={key}
                                        onClick={handleProductClick}
                                        products={products}
                                        setModalStatus={setModalStatus}
                                        setModalData={setModalData}
                                    />
    
                                ))}
                            </div>
                        </div>
                        

                    }

                    {totalPages > 0 && products.length > 0 &&
                        <div className={css.PaginationArea}>
                            {Array(Math.ceil((totalPages))).fill(0).map((item, key) => (
                                <div  
                                    className={css.PaginationItem} 
                                    key={key}
                                    onClick={() => setActivePage(key + 1)}
                                    style={(activePage === (key + 1)) 
                                        ? {backgroundColor:'#CCC'} 
                                        : {backgroundColor:'#FFF'}
                                    }
                                >
                                    {key + 1}
                                </div>
                            ))}
                        </div>
                    }

                    <Modal modalStatus={modalStatus} setStatus={setModalStatus}>
                        <ModalProduct setModalStatus={setModalStatus} modalData={modalData} />
                    </Modal>
                </div>
                <MainCart modalData={modalData} />
                
            </div>
        
        </>
    )
}