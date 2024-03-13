import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const PreguntaComponent = () => {
  const [attribute, setAttribute] = useState('');
  const [right, setRight] = useState('');
  const [wrong1, setWrong1] = useState('');
  const [wrong2, setWrong2] = useState('');
  const [wrong3, setWrong3] = useState('');
  const [error, setError] = useState('');

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  useEffect(() => {
    // Simulamos la carga de datos desde un archivo JSON
    const fetchData = async () => {
      const type = 'capital';
      const attribute = 'Brazil';
      console.log('Play');
      try {  
        const response = await axios.post(`${apiEndpoint}/getquestion`, { type, attribute } );
        // Extract data from the response
        //const { attribute: attribute, right:right, wrong1:wrong1, wrong2:wrong2, wrong3:wrong3 } = response.data;
        setAttribute(response.data.attribute);
        setRight(response.data.right);
        setWrong1(response.data.wrong1);
        setWrong2(response.data.wrong2);
        setWrong3(response.data.wrong3);
        console.log('Play');
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    fetchData();
  }, []);

//  if (!preguntaData) {
//    return <div>Cargando...</div>;
//  }

  //const { pregunta, correcta, falsa1, falsa2, falsa3 } = preguntaData;

  return (
    <div>
      <h2>Cual es la capital de {attribute} ?</h2>
      <Button variant="contained" color="primary">{right}</Button>
      <Button variant="contained" color="primary">{wrong1}</Button>
      <Button variant="contained" color="primary">{wrong2}</Button>
      <Button variant="contained" color="primary">{wrong3}</Button>
    </div>
  );
};

export default PreguntaComponent;
