// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const AddAnswer = () => {
//  const [type, setType] = useState('');
//  const [value, setValue] = useState('');
  const [error, setError] = useState('');
//  const [loginSuccess, setLoginSuccess] = useState(false);
//  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const endpointUrl = 'https://query.wikidata.org/sparql';
  const sparqlQuery = `#List of present-day countries and capital(s)
  SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel
  WHERE
  {
    ?country wdt:P31 wd:Q3624078 .
    #not a former country
    FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240}
    #and no an ancient civilisation (needed to exclude ancient Egypt)
    FILTER NOT EXISTS {?country wdt:P31 wd:Q28171280}
    OPTIONAL { ?country wdt:P36 ?capital } .

    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }
  }
  ORDER BY ?countryLabel`;

  const generateAnswer = async () => {
    const fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery );
    const headers = { 'Accept': 'application/sparql-results+json' };
    const response = await fetch( fullUrl, { headers } );
    const jsonResponse = await response.json();

    const index = Math.floor(Math.random() * 200);
    console.log(jsonResponse.results.bindings[index].capitalLabel.value + 
                ' es la capital de ' + 
                jsonResponse.results.bindings[index].countryLabel.value );
    const answer = {
      type: 'capital',
      attribute: jsonResponse.results.bindings[index].countryLabel.value,
      right: jsonResponse.results.bindings[index].capitalLabel.value,
      wrong1: jsonResponse.results.bindings[index+1].capitalLabel.value,
      wrong2: jsonResponse.results.bindings[index+2].capitalLabel.value,
      wrong3: jsonResponse.results.bindings[index+3].capitalLabel.value,
    };
    return answer;
  };

  const addAnswer = async () => {
      
      const answer = await generateAnswer();
      const type = answer.type;
      const attribute = answer.attribute;
      const right = answer.right;
      const wrong1 = answer.wrong1;
      const wrong2 = answer.wrong2;
      const wrong3 = answer.wrong3;

      console.log('AddAnswer');
      try {
        await axios.post(`${apiEndpoint}/addanswer`, { type, attribute, right, wrong1, wrong2, wrong3 });
        setOpenSnackbar(true);
      } catch (error) {
        setError(error.response.data.error);
      }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (   
    <div>         
      <Button variant="contained" color="primary" onClick={addAnswer}>
        addAnswer
      </Button>
    </div> 
  );
};

export default AddAnswer;
