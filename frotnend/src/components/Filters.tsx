import React, { useState } from 'react';
import { QueryParams } from '../types/cmdb.types';

interface FiltersProps {
    filters: QueryParams;
    onFilterChange: (filters: QueryParams) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
    const [localFilters, setLocalFilters] = useState<QueryParams>(filters);
    const [isExpanded, setIsExpanded] = useState(false);

    // Handle filter input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLocalFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Apply filters
    const handleApplyFilters = () => {
        onFilterChange(localFilters);
    };

    // Reset filters
    const handleResetFilters = () => {
        const resetFilters: QueryParams = {
            page: 1,
            limit: filters.limit,
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder,
        };
        setLocalFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="filters-container">
            <div className="filters-header">
                <h3>Filters</h3>
                <button
                    className="toggle-filters-button"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {isExpanded && (
                <div className="filters-content">
                    <div className="filters-grid">
                        <div className="filter-item">
                            <label htmlFor="addressIP">IP Address</label>
                            <input
                                type="text"
                                id="addressIP"
                                name="addressIP"
                                value={localFilters.addressIP || ''}
                                onChange={handleInputChange}
                                placeholder="Filter by IP"
                            />
                        </div>

                        <div className="filter-item">
                            <label htmlFor="addressType">Address Type</label>
                            <select
                                id="addressType"
                                name="addressType"
                                value={localFilters.addressType || ''}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>

                        <div className="filter-item">
                            <label htmlFor="organization">Organization</label>
                            <input
                                type="text"
                                id="organization"
                                name="organization"
                                value={localFilters.organization || ''}
                                onChange={handleInputChange}
                                placeholder="Filter by organization"
                            />
                        </div>

                        <div className="filter-item">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={localFilters.country || ''}
                                onChange={handleInputChange}
                                placeholder="Filter by country"
                            />
                        </div>

                        <div className="filter-item">
                            <label htmlFor="continentCode">Continent</label>
                            <select
                                id="continentCode"
                                name="continentCode"
                                value={localFilters.continentCode || ''}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>
                                <option value="AF">Africa</option>
                                <option value="AS">Asia</option>
                                <option value="EU">Europe</option>
                                <option value="NA">North America</option>
                                <option value="SA">South America</option>
                                <option value="OC">Oceania</option>
                                <option value="AN">Antarctica</option>
                            </select>
                        </div>

                        <div className="filter-item">
                            <label htmlFor="usageType">Usage Type</label>
                            <input
                                type="text"
                                id="usageType"
                                name="usageType"
                                value={localFilters.usageType || ''}
                                onChange={handleInputChange}
                                placeholder="Filter by usage type"
                            />
                        </div>

                        <div className="filter-item">
                            <label htmlFor="threatLevel">Threat Level</label>
                            <select
                                id="threatLevel"
                                name="threatLevel"
                                value={localFilters.threatLevel || ''}
                                onChange={handleInputChange}
                            >
                                <option value="">All</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                    </div>

                    <div className="filter-actions">
                        <button
                            className="apply-filters-button"
                            onClick={handleApplyFilters}
                        >
                            Apply Filters
                        </button>
                        <button
                            className="reset-filters-button"
                            onClick={handleResetFilters}
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Filters;