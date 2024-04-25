import { useContext } from 'react'
import Modal from '../ui/Modal'
import ContextType from '../store/CartContext'
import Button from '../ui/Button'
import UserProgressContext from '../store/UserProgressContext'
import CartItem from './CartItem'

export default function Cart() {
    const cartCtx = useContext(ContextType)
    const userProgressCtx = useContext(UserProgressContext)

    function handleCloseCart() {
        userProgressCtx.hideCart()
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout()
    }

    //here we are passing onClose as when user tries to close the dialog with esc key onClose() is trigered modal closes but the value of Progress(being managed in userProgressCtx) is not changed so to do that 
    // i am calling handleCloseCart on onclose method.
    return <Modal
        cssClass="cart"
        open={userProgressCtx.progress === 'cart'}
        onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}
    >
        <h2>Your cart</h2>
        <ul>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onIncrease={() => cartCtx.addItem(item)}
                    onDecrease={() => cartCtx.removeItem(item.id)} />
            ))}
        </ul>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length > 0 && (
                <Button onClick={handleGoToCheckout}>Go to Checkout</Button>)}
        </p>
    </Modal>
}