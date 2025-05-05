/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CMDB, ColumnConfig, PaginatedResponse, QueryParams } from '../types/cmdb.types';
import { CMDBService } from '../services/api.service';
import DataTable from './DataTable';
import Pagination from './Pagination';
import Filters from './Filters';
import CMDBDetailsModal from './CMDBDetailsModal';

const CMDBList: React.FC = () => {
    // State
    const [loading, setLoading] = useState<boolean>(true);
    const [cmdbData, setCMDBData] = useState<PaginatedResponse<CMDB>>({
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    });
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 1,
        limit: 10,
        sortBy: 'lastSeen',
        sortOrder: 'desc',
    });
    const [selectedEntry, setSelectedEntry] = useState<CMDB | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    // Fetch data from API
    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await CMDBService.getAllEntries(queryParams);
            setCMDBData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };


    // Fetch data when query params change
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams]);


    // Handle sort column change
    const handleSort = (column: string) => {
        setQueryParams((prev) => ({
            ...prev,
            sortBy: column,
            sortOrder:
                prev.sortBy === column && prev.sortOrder === 'asc' ? 'desc' : 'asc',
            page: 1, // Reset to first page when sorting changes
        }));
    };

    // Handle page change
    const handlePageChange = (page: number) => {
        setQueryParams((prev) => ({
            ...prev,
            page,
        }));
    };

    // Handle filter change
    const handleFilterChange = (filters: QueryParams) => {
        setQueryParams((prev) => ({
            ...prev,
            ...filters,
            page: 1, // Reset to first page when filters change
        }));
    };

    // Handle row click to show details
    const handleRowClick = (record: CMDB) => {
        setSelectedEntry(record);
        setShowModal(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedEntry(null);
    };

    // Handle limit change
    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const limit = parseInt(e.target.value, 10);
        setQueryParams((prev) => ({
            ...prev,
            limit,
            page: 1, // Reset to first page when limit changes
        }));
    };

    // Table columns configuration
    const columns: ColumnConfig[] = [
        {
            key: 'addressIP',
            label: 'IP Address',
            sortable: true,
            filterable: true,
        },
        {
            key: 'addressType',
            label: 'Type',
            sortable: true,
            filterable: true,
        },
        {
            key: 'organization',
            label: 'Organization',
            sortable: true,
            filterable: true,
        },
        {
            key: 'country',
            label: 'Country',
            sortable: true,
            filterable: true,
            render: (value, record) => `${value} (${record.countryCode})`,
        },
        {
            key: 'continentCode',
            label: 'Continent',
            sortable: true,
            filterable: true,
        },
        {
            key: 'usageType',
            label: 'Usage',
            sortable: true,
            filterable: true,
        },
        {
            key: 'threatLevel',
            label: 'Threat',
            sortable: true,
            filterable: true,
            render: (value) => (
                <span className={`threat-level threat-level-${value?.toLowerCase()}`}>
                    {value}
                </span>
            ),
        },
        {
            key: 'lastSeen',
            label: 'Last Seen',
            sortable: true,
            render: (value) => value ? format(new Date(value), 'yyyy-MM-dd HH:mm') : '',
        },
    ];

    return (
        <div className="cmdb-list-container">
            <h1>IP Address Management</h1>

            <div className="list-controls">
                <Filters
                    filters={queryParams}
                    onFilterChange={handleFilterChange}
                />

                <div className="entries-per-page">
                    <label htmlFor="limit">Show: </label>
                    <select
                        id="limit"
                        value={queryParams.limit}
                        onChange={handleLimitChange}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span> entries per page</span>
                </div>
            </div>

            <DataTable
                data={cmdbData.data}
                columns={columns}
                loading={loading}
                sortColumn={queryParams.sortBy}
                sortOrder={queryParams.sortOrder}
                onSort={handleSort}
                onRowClick={handleRowClick}
            />

            <div className="list-footer">
                <div className="total-entries">
                    Showing {cmdbData.data.length} of {cmdbData.total} entries
                </div>

                <Pagination
                    currentPage={cmdbData.page}
                    totalPages={cmdbData.totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            {showModal && selectedEntry && (
                <CMDBDetailsModal
                    entry={selectedEntry}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default CMDBList;