import React, {useState} from 'react';
import Error from './Error';

const Formulario = () => {
  const [word, saveWord] = useState('');
  const [err, saveErr] = useState(false);

  //buscar imagenes
  const searchImages = e => {
    e.preventDefault();

    //validar
    if (word.trim() === '') {
      saveErr(true);
      return;
    }

    saveErr(false);

    //enviar termino hacia el componente principal
  };

  return (
    <form onSubmit={searchImages}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search image, example: soccer or coffe"
            onChange={e => saveWord(e.target.value)}
          />
        </div>

        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Search"
          />
        </div>
      </div>
      {err ? <Error message="Please add a search term" /> : null}
    </form>
  );
};

export default Formulario;
