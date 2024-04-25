import { useContext } from "react"
import ContextType from "../store/CartContext"
import UserProgressContext from '../store/UserProgressContext'
import { currencyFormatter } from "../util/formatting"
import Input from "../ui/Input"
import Button from "../ui/Button"
import Modal from "../ui/Modal"
import useHttp from "../hooks/useHttp"
import Error from "./Error.jsx"

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
}
export default function Checkout() {
    const { data,
        error,
        loading: isSending,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig)
    const cartCtx = useContext(ContextType);
    const userProgressCtx = useContext(UserProgressContext)
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => (
        totalPrice + item.quantity * item.price
    ), 0)

    function handleCloseButton() {
        userProgressCtx.hideCheckout()
    }

    function handleFinishCheckout() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart()
        clearData(); //resets the value of data to its inital State after every checkout.
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target)
        const cusomerData = Object.fromEntries(fd.entries())//{email:test@example.com}

        // we want to send the data also in the request but since we are setting requestConfig outside of component to avoid infinite loop at 
        // that time data would not be available so sending it here.
        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: cusomerData
            }
        }))
    }

    let actions = (<>
        <Button type="button" textOnly onClick={handleCloseButton}>Close</Button>
        <Button >Request for Approval</Button>
    </>)

    if (isSending) {
        actions = (<span>Sending Data...</span>)
    }

    if (data && !error) {
        return (
            <Modal
                className="modal"
                open={userProgressCtx.progress === 'checkout'}
                onClose={handleFinishCheckout}>
                <h2>Success!</h2>
                <p>Your order was successfully placed</p>
                <p>we will get back to you with more details in few mintutes</p>
                <p className="modal-actions">
                    <Button onClick={handleFinishCheckout}>okay</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal
            className="modal"
            open={userProgressCtx.progress === 'checkout'}
            onClose={userProgressCtx.progress === 'checkout' ? handleCloseButton : null}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <Input label="Full-Name" id="name" type="text"></Input>
                <Input label="E-mail Address" id="email" type="email"></Input>
                <Input label="Street" id="street" type="text"></Input>
                <div className="control-row">
                    <Input label="Postal code" id="postal-code" type="text"></Input>
                    <Input label="City" id="city" type="text"></Input>
                </div>

                {error && <Error title="Failed to submit Order" message={error} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )

}