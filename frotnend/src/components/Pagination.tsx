import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    // Calculate page range to display (show max 5 pages)
    const getPageRange = () => {
        const range: number[] = [];

        // Calculate start and end page numbers
        let startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        // Adjust startPage if endPage is at maximum
        if (endPage === totalPages) {
            startPage = Math.max(1, endPage - 4);
        }

        // Create the page range
        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }

        return range;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button
                className="pagination-button"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            >
                &laquo;
            </button>

            <button
                className="pagination-button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lsaquo;
            </button>

            {getPageRange().map((page) => (
                <button
                    key={page}
                    className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className="pagination-button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &rsaquo;
            </button>

            <button
                className="pagination-button"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                &raquo;
            </button>

            <div className="pagination-info">
                Page {currentPage} of {totalPages}
            </div>
        </div>
    );
};

export default Pagination;