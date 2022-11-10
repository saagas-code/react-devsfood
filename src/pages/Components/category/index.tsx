import ReactTooltip from 'react-tooltip'
import { Categories } from '../../../types'
import css from './template.module.css'

type Props = {
    id?: number
    title?: string,
    image?: string,
    activeCategory: number
    setActiveCategory: React.Dispatch<React.SetStateAction<number>>
}

export const CategoryItem = ({id, title,  image, activeCategory, setActiveCategory}: Props) => {


    return (
        <>
        <ReactTooltip id="tip-top" place='top' effect="solid" />
        <div 
            onClick={() => {setActiveCategory(id as number)}} 
            className={css.Container}
            data-tip={title}
            data-for="tip-top"
            style={(activeCategory == id) 
                ? {backgroundColor:'white'} 
                : {backgroundColor:''}
            }
        >
            <img src={image} alt="" />
        </div>
        </>
    )
}

