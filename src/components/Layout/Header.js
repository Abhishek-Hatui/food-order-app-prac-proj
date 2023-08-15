import classses from './Header.module.css';
import { Fragment } from 'react';
import mealImg from '../../assests/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return(
        <Fragment>
            <header className={classses.header}>
                <h1>Foodu</h1>
                <HeaderCartButton  show={props.show}/>
            </header>
            <div className={classses['main-image']}>
                <img src={mealImg} alt='tasty food'/>
            </div>
        </Fragment>
    )
}

export default Header;