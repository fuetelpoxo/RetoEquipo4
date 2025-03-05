import React from 'react';

const Paginador = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange,
  showingFrom,
  showingTo
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Limitar número de páginas mostradas
  const getPageNumbers = () => {
    const delta = 2; // Número de páginas a mostrar antes y después de la página actual
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div>
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
          </li>

          {getPageNumbers().map((pageNumber, index) => (
            <li 
              key={index} 
              className={`page-item ${pageNumber === currentPage ? 'active' : ''} ${pageNumber === '...' ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => pageNumber !== '...' && onPageChange(pageNumber)}
                disabled={pageNumber === '...'}
              >
                {pageNumber}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="text-center mt-3">
        Mostrando {showingFrom} - {showingTo} de {totalItems} resultados
      </div>
    </div>
  );
};

export default Paginador;