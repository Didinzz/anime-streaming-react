import React from 'react'

const Pagination = ({ page, handlePageChanges, totalPage }) => {
    const rangeSize = 3; // total halaman yang akan ditampilkan di tengah pagination

    // ini adalah menentukan nomor halaman yang akan ditampilkan di tengah pagination
    const startPage = Math.max(1, page - Math.floor(rangeSize / 2))
    const endPage = Math.min(totalPage, startPage + rangeSize - 1)

    // Mengoreksi startPage jika endPage adalah halaman terakhir dan kita memiliki ruang untuk lebih banyak halaman di awal
    const correctedStartPage = Math.max(1, Math.min(startPage, totalPage - rangeSize + 1))
    return (
        <div className="join  ">
            <button className={`join-item btn ${page <= 1 ? 'btn-disabled' : ''}`} onClick={() => handlePageChanges(page - 1)}>«</button>

            {correctedStartPage > 1 && (
                <>
                    <button className="join-item btn" onClick={() => handlePageChanges(1)}>1</button>
                    {page > 2 && <button className="join-item btn ">...</button>}
                </>
            )}
            {/* Tombol Halaman Sekarang */}
            {Array.from({ length: endPage - correctedStartPage + 1 }, (_, i) => i + correctedStartPage).map(pageNum => (
                <button
                    key={pageNum}
                    className={`join-item btn ${pageNum === page ? 'btn-active' : ''}`}
                    onClick={() => handlePageChanges(pageNum)}>
                    {pageNum}
                </button>
            ))}

            {endPage < totalPage && (
                <>
                    {endPage < totalPage - 1 && <button className="join-item btn ">...</button>}
                    <button className="join-item btn" onClick={() => handlePageChanges(totalPage)}>{totalPage}</button>
                </>
            )}
            <button className={`join-item btn ${page >= totalPage ? 'btn-disabled' : ''}`} onClick={() => handlePageChanges(page + 1)}>»</button>
        </div>
    )
}

export default Pagination