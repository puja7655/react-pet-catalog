import { useContext } from 'react'
import Button from '../ui/Button'
import ContextType from '../store/CartContext'
import UserProgressContext from "../store/UserProgressContext"

export default function Header() {
    const cartCtx = useContext(ContextType)
    const userProgressCtx = useContext(UserProgressContext)

    /*using reduce here as it would calculate all the added items since in the cartlist
     *we are not adding duplicate pet  so simply doing .length would not give the correct pet count
     */
    const totalCartItems = cartCtx.items.reduce((totalNumberofItems, item) => {
        return totalNumberofItems + item.quantity
    }, 0)

    function handleShowCart() {
        userProgressCtx.showCart() // sets the value of progress in UserProgressContext to cart
    }
    return (
        <header id="main-header-cart">
            <nav>
                <Button textOnly onClick={handleShowCart}>cart({totalCartItems})</Button>
            </nav>
        </header>
    )
}