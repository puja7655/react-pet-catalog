import Button from '../ui/Button'
import { useContext } from 'react'
import ContextType from '../store/CartContext'
import { Link } from 'react-router-dom'

export default function PetItem({ pet }) {

    const cartCtx = useContext(ContextType) // now cartCtx will have access to all the properties in CartContextProvider

    function handleAddPetToCart() {
        cartCtx.addItem(pet)
    }

    return <li className="pet-item">
        <article>
            <Link to={`/pets/${pet.id}`}>
                <img src={`http://localhost:3000/${pet.photoUrls[0]}`} alt={pet.name} />
            </Link>
            <p className="pet-item-action">
                <Button onClick={handleAddPetToCart}>Adopt me</Button>
            </p>

        </article>

    </li>
}