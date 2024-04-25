import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import debounce from 'lodash/debounce';

const SearchBox = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce the search function with a delay of 50ms
    const debouncedSearch = debounce((term) => {
        onSearch(term);
    }, 50);

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <div className='filter-container'>
            <Input
                type="text"
                placeholder="Search by category..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {searchTerm && (
                <Button textOnly onClick={clearSearch}>
                    X
                </Button>
            )}
        </div>
    );
};

export default SearchBox;

