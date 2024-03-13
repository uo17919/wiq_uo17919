// src/components/Play.js
import React, { useState } from 'react';
import { Button } from '@mui/material';
import Quiz from './Quiz.js';

const Play = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizKey, setQuizKey] = useState(0); // Agregamos una clave para forzar la renderización del nuevo componente Quiz
  
  const clickPlay = () => {
    setShowQuiz(true);
    setQuizKey(prevKey => prevKey + 1); // Incrementamos la clave para forzar la renderización del nuevo componente
  };

  return (   
    <div>         
      <Button variant="contained" color="primary" onClick={clickPlay}>
        Play 
      </Button>
      <div>
        {showQuiz && <Quiz key={quizKey} />}
      </div>
    </div> 

  );
};

export default Play;
