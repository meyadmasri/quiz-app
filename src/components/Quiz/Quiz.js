import { useRef, useState, useEffect } from "react";
import questions from "../../data/quistions";
import './Quiz.css'


const Quiz = ({ goBack }) => {
    const [userAnswers,setUserAnswers]= useState({})
    const [activeQ,setActiveQ]= useState(0)
    const [Questions, setQuestions] = useState([])
    const question = useRef()
    useEffect(() => {setQuestions(question.current.querySelectorAll(".question"))}, [])
    useEffect(() => {
        const windowWidth = 580;
        const distanceToQuestion = windowWidth * activeQ
        Questions.forEach((question, i) => {
        question.style.transform = `translateX(-${distanceToQuestion}px)`
        })}, [activeQ])
    

    const userAnswerd= (qIndex,aIndex)=>{
        const currentAnswers = {...userAnswers}
        currentAnswers[qIndex]=aIndex
        setUserAnswers (currentAnswers)
        goNextQuestion()
        
    }
    const goNextQuestion = () => {
        if (activeQ < Questions.length - 1) {
            setActiveQ(activeQ + 1);
        }
      }
      const goPreviousQuestion = () => {
        if (activeQ > 0) {
            setActiveQ(activeQ - 1);
        }
      }
      const getResult = () => {
        const markPerQuestion = 100 / questions.length
        let score = 0
        const answeredQuestions = Object.keys(userAnswers)
        answeredQuestions.forEach((qIndex, i) => {
          if (questions[qIndex].answers[userAnswers[qIndex]].isCorrect) {
            score = score + markPerQuestion
          }
        })
        window.alert(Math.round(score))
      }
    




    return (
       <div >
        <div className="questions" ref={question}>
            {questions.map((q,i)=>{
                return(
                    <div className="question" key={i}>
                        <h2>{`${i+1}- `}{q.question}</h2>
                        {q.answers.map((a,j)=>{
                            return(
                                
                                <p key={j}>
                                    <input type='radio' name={`answer-${i}`} onClick={()=>{
                                        userAnswerd(i,j)
                                    }}/> {' '} {a.answer}

                                </p>
                                
                            )
                        })}

                    </div>
                )

            })}

        </div>
        {activeQ < Questions.length - 1 &&(
          <div className="navigation next" onClick={goNextQuestion} >
            <div className="arrow"></div>
          </div>
        )}
        {activeQ > 0 && goBack &&(
          <div className="navigation previous" onClick={goPreviousQuestion} >
            <div className="arrow"></div>
          </div>
        )}

        <div className="qNumber">
            <div>
                {questions.map((n,i)=>{
                    return(
                    <div className="d-inline-flex p-1 ">
                    <button type="button" className={`btn ${ Object.keys(userAnswers)? "btn-secondary" : "btn-success" }`} key={i} onClick={() => (goBack ? setActiveQ(i) : "#")}> {i+1} </button>
                    </div>
                    
                    )


                })}
            </div>

        </div>
        <div className="resultBtn pt-4">
        {<button type="button" class="btn btn-info" onClick={getResult}>Get Result</button>}


        </div>

       </div>
       
    
    )


};

export default Quiz;
