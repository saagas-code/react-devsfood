import css from './template.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react';
import ReactTooltip from 'react-tooltip';

type Props = {
    title: string,
    icon: string,
    link: string
}


export const MenuItem = ({title, icon, link}: Props) => {
    const navigate = useNavigate()
    const location = useLocation()


    const isActive = location.pathname == link

    const handleLinkClick = (e: any) => {
        e.preventDefault();
        navigate(link)
    }

    return (
        <>
        <ReactTooltip id="tip-right" place='right' effect="solid" />
        <Link className={css.menuItemA}
            data-tip={title} 
            data-for="tip-right" 
            style={isActive ? {backgroundColor:'#0B4D0B'} : {backgroundColor:'transparent'}} 
            onClick={handleLinkClick} 
            to={link}
        >
            <img className={css.img} src={icon} alt="" />
        </Link>
        </>
    )
}