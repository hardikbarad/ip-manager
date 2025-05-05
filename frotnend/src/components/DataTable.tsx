import React from 'react';
import { CMDB, ColumnConfig } from '../types/cmdb.types';

interface DataTableProps {
    data: CMDB[];
    columns: ColumnConfig[];
    loading: boolean;
    sortColumn?: string;
    sortOrder?: 'asc' | 'desc';
    onSort: (column: string) => void;
    onRowClick?: (record: CMDB) => void;
}

const DataTable: React.FC<DataTableProps> = ({
    data,
    columns,
    loading,
    sortColumn,
    sortOrder,
    onSort,
    onRowClick,
}) => {
    // Render the sort indicator
    const renderSortIcon = (column: ColumnConfig) => {
        if (!column.sortable) return null;
        if (sortColumn !== column.key) return <span className="sort-icon">⇅</span>;

        return (
            <span className="sort-icon">
                {sortOrder === 'asc' ? '↑' : '↓'}
            </span>
        );
    };

    // Handle sort column click
    const handleHeaderClick = (column: ColumnConfig) => {
        if (column.sortable) {
            onSort(column.key as string);
        }
    };

    return (
        <div className="data-table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key as string}
                                onClick={() => handleHeaderClick(column)}
                                className={column.sortable ? 'sortable' : ''}
                            >
                                {column.label}
                                {renderSortIcon(column)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className="loading-cell">
                                Loading...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="empty-cell">
                                No data found
                            </td>
                        </tr>
                    ) : (
                        data.map((record) => (
                            <tr
                                key={record.id || record.addressIP}
                                onClick={() => onRowClick && onRowClick(record)}
                                className={onRowClick ? 'clickable' : ''}
                            >
                                {columns.map((column) => (
                                    <td key={`${record.id || record.addressIP}-${column.key as string}`}>
                                        {column.render
                                            ? column.render(record[column.key], record)
                                            : record[column.key] !== undefined
                                                ? String(record[column.key])
                                                : ''}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;