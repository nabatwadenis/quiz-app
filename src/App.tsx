import React, { useState } from 'react';
import QuestionCard from './components/questionCard';
import { fetchQuizQuestions, questionState } from './API';
import { Difficulty } from './API';
import { GloballStyle, Wrapper } from './App.styles';

export type answerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS =10;

const App =() => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<questionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<answerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(true);

  const startTrivia = async () =>{
    setLoading(true);
    setGameover(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) =>{
    if(!gameover){
      //get answer from input
      const answer = e.currentTarget.value;
      //check if answer is correct
      const correct = questions[number].correct_answer === answer;
      //add score if answer is correct
      if(correct) setScore(prev => prev + 1);
      //save answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer : questions[number].correct_answer
      };
      setUserAnswer ((prev) => [...prev, answerObject]);
    }

  }
  const nextQuiz = ()=>{
    //move on to next question
    const nextQuiz = number + 1;
    if(nextQuiz === TOTAL_QUESTIONS){
      setGameover(true);
    }else{
      setNumber(nextQuiz);
    }

  }
  return (
    <>
    <GloballStyle />
    <Wrapper>
      <h1>REACT QUIZ</h1>
      {gameover || userAnswer.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startTrivia}>START TRIVIA</button>
      ): null}
      
      {!gameover? <p className='score'>Score: {score}</p>: null}
      {loading && <p>Loading Questions....</p>}
      {!loading && !gameover && (
        <QuestionCard 
          questionNr={number + 1 }
          totalQuestions={TOTAL_QUESTIONS}
          question ={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number]: undefined}
          callback={checkAnswer}
        />
      )}
      {!gameover && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTIONS -1 ? (
        <button className='next' onClick={nextQuiz}>Next Quiz</button>
      ): null}
      </Wrapper>
      </>
  );
}

export default App;
