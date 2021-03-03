import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Listado from './components/Listado';

function App() {
  const [search, saveSearch] = useState('');
  const [images, saveImages] = useState([]);
  const [actualPage, saveActualPage] = useState(1);
  const [totalPages, saveTotalPages] = useState(1);

  useEffect(() => {
    if (search === '') return;

    const consultAPI = async () => {
      const imgForPage = 30;
      const APIKey = '20466787-575b0711c3fae9df5d8adbfd5';
      const url = `https://pixabay.com/api/?key=${APIKey}&q=${search}&per_page=${imgForPage}&page=${actualPage}`;

      const response = await fetch(url);
      const data = await response.json();

      saveImages(data.hits);

      //calcular el total de páginas
      const calculateTotalPages = Math.ceil(data.totalHits / imgForPage);
      saveTotalPages(calculateTotalPages);

      //mover pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    };
    consultAPI();
  }, [search, actualPage]);

  //definir la pagina anterior
  const backPage = () => {
    const newPage = actualPage - 1;
    if (newPage === 0) return;
    saveActualPage(newPage);
  };

  const nextPage = () => {
    const newPage = actualPage + 1;
    if (newPage > totalPages) return;
    saveActualPage(newPage);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">image search engine</p>

        <Formulario saveSearch={saveSearch} />
      </div>
      <div className="row justify-content-center">
        <Listado images={images} />

        {actualPage === 1 ? null : (
          <button type="button" className="btn btn-info mr-1" onClick={backPage}>
            &laquo; Anterior
          </button>
        )}

        {actualPage === totalPages ? null : (
          <button type="button" className="btn btn-info mr-1" onClick={nextPage}>
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
