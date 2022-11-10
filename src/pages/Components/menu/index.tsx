import css from './template.module.css'
import { useContext } from 'react';

import { MenuItem } from './../menuItem/index';
import store from '../../../images/store.png'
import order from '../../../images/order.png'
import profile from '../../../images/profile.png'
type Props =  {

}

export const Menu = () => {


    return (
        <div className={css.menuContainer}>
            <nav>
                <MenuItem title="Loja" icon={store} link="/"></MenuItem>
                <MenuItem title="Pedidos" icon={order} link="/orders"></MenuItem>
                <MenuItem title="Perfil" icon={profile} link="/login"></MenuItem>
            </nav>
        </div>
    )
}

