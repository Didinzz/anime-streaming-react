import React, { useRef } from 'react'

const Pagination = ({ currentPage, lastPage, hasPreviousPage, hasNextPage, previousPage, nextPage, handlePageChanges }) => {

    console.log(currentPage, lastPage, hasPreviousPage, hasNextPage, previousPage, nextPage);


    return (
        <div className="join">
            {hasPreviousPage && (
                <button className="join-item btn" onClick={() => handlePageChanges(previousPage)}>«</button>
            )}

            <button className={`join-item btn ${currentPage == 1 ? 'btn-active' : ''}`} onClick={() => handlePageChanges(1)}>1</button>

            {/* elips lebih dari 3 */}
            {currentPage > 3 && <button className="join-item btn">...</button>}

            {/* previous button for last page */}
            {nextPage === null && <button className="join-item btn" onClick={() => handlePageChanges(previousPage - 1)}>{previousPage - 1}</button>}

            {/* previous button  */}
            {currentPage > 2 && currentPage <= lastPage && <button className="join-item btn" onClick={() => handlePageChanges(previousPage)}>{previousPage}</button>}

            {/* current button */}
            {currentPage != 1 && currentPage != lastPage && <button className={`join-item btn btn-active`}>{currentPage}</button>}

            {/* next button */}
            {currentPage < lastPage - 1 && <button className="join-item btn" onClick={() => handlePageChanges(nextPage)}>{nextPage}</button>}

            {/* next button for start page */}
            {previousPage === null && <button className="join-item btn" onClick={() => handlePageChanges(nextPage + 1)}>{nextPage + 1}</button>}

            {/* elips */}
            {currentPage < lastPage - 2 && <button className="join-item btn">...</button>}


            {/* last button */}
            <button className={`join-item btn ${currentPage == lastPage ? 'btn-active' : ''}`} btn onClick={() => handlePageChanges(lastPage)}>{lastPage}</button>

            {hasNextPage && (
                <button className="join-item btn">»</button>
            )}
        </div>
    )
}

export default Pagination