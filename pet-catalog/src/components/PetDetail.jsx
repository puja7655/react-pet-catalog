import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/useHttp';
import { useContext } from 'react';
import ContextType from '../store/CartContext';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
const requestConfig = {};

export default function PetDetail() {
    const cartCtx = useContext(ContextType) // now cartCtx will have access to all the properties in CartContextProvider

    const { id } = useParams();
    const {
        data: pets,
        error,
        loading
    } = useHttp('http://localhost:3000/pets', requestConfig, [])

    //const pet = pets.find(pet => pet.id === parseInt(id));
    console.log("pet details", pets)
    const pet = pets.find((pet) => pet.id === parseInt(id))
    console.log("data", pet)
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    function handleAddPetToCart() {
        cartCtx.addItem(pet)
    }

    return (
        <>
            {pet &&
                <article className="pet-items">
                    <img src={`http://localhost:3000/${pet.photoUrls[0]}`} alt={pet.name} />
                    <h2>{pet.name}</h2>
                    <h3> Status :{pet.status}</h3>
                    <h3>Tags :
                        {pet.tags.map((tag) => (
                            <span key={tag.id}>{tag.name} ,</span>
                        ))}
                    </h3>
                    <menu>
                        <Link to={`/pets`}>
                            <Button >Back to Catalog</Button>
                        </Link>
                    </menu>
                </article>
            }
        </>
    )
};
