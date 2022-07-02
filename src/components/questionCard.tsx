import React from "react";
//types
import { answerObject} from '../App';

import { Wrapper, ButtonWrapper} from './questionCards.styles';

type Props = {
    question : string;
    answers: string[];
    callback: (e : React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: answerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({
    question, 
    answers, 
    callback, 
    userAnswer, 
    questionNr, 
    totalQuestions}
) => (
<Wrapper>
    <p className="number">
        Question: {questionNr} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{__html: question}} />
    <div>
        {answers.map((answer) => (
            <ButtonWrapper
                key={answer}
                correct={userAnswer?.correctAnswer === answer}
                userClicked={userAnswer?.answer === answer}
             >
                <button disabled ={!!userAnswer} value={answer} onClick={callback}>
                    <span dangerouslySetInnerHTML={{__html: answer}} />
                </button>
            </ButtonWrapper>
        ))}
    </div>
</Wrapper>
);

export default QuestionCard;