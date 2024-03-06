// src/components/GenerateAnswer.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const GenerateAnswer = () => {
//  const [type, setType] = useState('');
//  const [value, setValue] = useState('');
  const [error, setError] = useState('');
//  const [loginSuccess, setLoginSuccess] = useState(false);
//  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
    return jsonResponse;
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (   
    <div>         
      <Button variant="contained" color="primary" onClick={generateAnswer}>
        GenerateAnswer
      </Button>
    </div> 
  );
};

export default GenerateAnswer;
