import Header from "../Header.jsx";
import Pets from "../Pets.jsx";
import { CartContextProvider } from '../../store/CartContext.jsx'
import { UserProgressContextProvider } from "../../store/UserProgressContext.jsx"
import Cart from '../Cart.jsx'
import Checkout from "../Checkout.jsx"
import { Outlet } from "react-router-dom";

export default function PetsContainer() {
    return (
        <>
            <UserProgressContextProvider>
                <CartContextProvider>
                    <Header />
                    <Pets />
                    <Cart />
                    <Checkout />
                </CartContextProvider>
            </UserProgressContextProvider>
            <Outlet />
        </>
    )
}