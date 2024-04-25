import PetItem from "./PetItem.jsx"
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
import Filter from "./Filter.jsx"
import SearchBox from "./SearchBox.jsx";
import { useState, useEffect, useMemo } from "react";

const requestConfig = {}; // storing the config i seperate variable as if we put empty opbject in useHttp, everytime the component loads object would be recreated leading to infinite loop
export default function Pets() {
    const [filteredPets, setFilteredPets] = useState([]);
    const {
        data: pets,
        error,
        loading
    } = useHttp('http://localhost:3000/pets', requestConfig, [])

    //directly setting 'filteredPets to 'pets' would not work because useState hook is called only once
    //when the component is first rendered and at the time pets data might not be avilable yet. so putting it inside useEffect
    useEffect(() => {
        if (pets.length > 0) {
            setFilteredPets(pets);
        }
    }, [pets]);

    //to Handle the filters
    const applyFilters = (selectedTags, statusFilter) => {
        let filtered = [...pets];

        if (selectedTags.length > 0) {
            filtered = filtered.filter(pet =>
                selectedTags.every(tag => pet.tags.some(tagName => tagName.name === tag))
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(pet => pet.status === statusFilter);
        }

        setFilteredPets(filtered);
    };

    //to handle the search functionality
    const handleSearch = searchTerm => {
        const originalPetList = [...pets]
        if (!searchTerm) {
            setFilteredPets(originalPetList); // Reset filtered pets to original list if search term is empty
            return;
        }
        const filtered = originalPetList.filter(pet =>
            pet.category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPets(filtered);
    };

    const clearFilters = () => {
        setFilteredPets(pets);
    };

    // Memoize the filteredPets array to prevent unnecessary re-renders
    const memoizedFilteredPets = useMemo(() => filteredPets, [filteredPets]);


    if (loading) {
        return <p className="center">Fetching Data soon...</p>
    }

    if (error) {
        return <Error title="Failed to Fetch pets" message={error} />
    }

    return (
        <>
            <div className="filter-section">
                <Filter onFilter={applyFilters} onClearFilter={clearFilters} />
                <SearchBox onSearch={handleSearch} />
            </div>
            <ul id="pets">
                {memoizedFilteredPets.map((pet) => {
                    return <PetItem key={pet.id} pet={pet} />
                })}
            </ul>
        </>
    )

}