import React, { useState } from 'react';
import Button from '../ui/Button';

const Filter = ({ onFilter, onClearFilter }) => {
    const [selectedTags, setSelectedTags] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    const handleTagChange = (tag) => {
        const updatedTags = selectedTags.includes(tag)
            ? selectedTags.filter((tagName) => tagName !== tag)
            : [...selectedTags, tag];
        setSelectedTags(updatedTags);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const applyFilters = () => {
        onFilter(selectedTags, statusFilter);
    };

    const clearFilters = () => {
        setSelectedTags([]);
        setStatusFilter('');
        onClearFilter();
    };

    let actions = (<>
        <Button type="button" onClick={applyFilters}>Apply Filters</Button>
        <Button  onClick={clearFilters}>Clear Filters</Button>
    </>)

    return (
        <div className="filter-container">
            {/* Filter by Tags (Dropdown) */}
            <div className="filter-item">
                <label >All Tags:</label>
                <div className="dropdown">
                    <Button className="dropbtn">Select Tags</Button>
                    <div className="dropdown-content">
                        {['Friendly', 'Playful', 'Elegant', 'Intelligent', 'Protective', 'Fluffy'].map((tag) => (
                            <label key={tag} className="tag-checkbox">
                                <input
                                    type="checkbox"
                                    value={tag}
                                    checked={selectedTags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                />
                                {tag}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter by Status */}
            <div className="filter-item">
                <label>Status:</label>
                <select
                    value={statusFilter}
                    onChange={handleStatusChange}
                    className="status-dropdown"
                >
                    <option value="">All Status</option>
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                </select>
            </div>
            <p className="modal-actions">
                {actions}
            </p>
        </div>
    );
};

export default Filter;

