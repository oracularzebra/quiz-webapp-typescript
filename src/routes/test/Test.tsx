import { useEffect, useState } from "react"
import { QuestionListProps, QuestionTypeProps, Questions, TestTime, TimerProps, getQuestions, handleMarkOption, handleNextPrev } from "./test";
import { useNavigate, useParams } from "react-router-dom";

interface UserProps{
    username: string | null,
    loggedIn: boolean
}
export default function Test({loggedIn, username}:UserProps){

    const navigate = useNavigate();
    const {category, difficulty} = useParams();
    const [questions, setQuestions] = useState<Questions | null>(null);
    const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
    const [endTest, setEndTest] = useState<boolean>(false);
    const [testTime, setTestTime] = useState<TestTime | null>(null)
    const [markedOptions, setMarkedOtions] = useState<string[]>([]);
    const [duration, setDuration]  = useState<TestTime | null>(null);

    useEffect(()=>{
        if(!loggedIn) navigate('/home');        
        if(category == undefined || difficulty == undefined) navigate('/home');
        else{
            (async()=>{        
            const result = await getQuestions(category, difficulty);
            setQuestions(result);
            setMarkedOtions(
                Array.from({length:result.data.length})
                .map(_=>"undefined")
            )
            setTestTime({min: result.data.length , sec:0})
            if(result.data.length > 0) setSelectedQuestionId(0);
            })();
        }
    }, [loggedIn, category, difficulty]);
    
    useEffect(()=>{
        if (endTest) {
            navigate('/test/result', {state: {loggedIn, questions, markedOptions, duration, username}});
        }
    }, [endTest]);

    return (
        <>
           {
           questions  
           ?
           <>
            <Counter 
            setDuration={setDuration}
            testTime={testTime!}
            setEnd={setEndTest}
            />
            <QuestionNumbersArray
            length={questions.data.length}
            setSelectedQuestionId={setSelectedQuestionId}/>
            <Question
            index={selectedQuestionId!}
            id={questions.data[selectedQuestionId!].id}
            options={questions.data[selectedQuestionId!].options}
            question={questions.data[selectedQuestionId!].question}
            setMarkedOptions={setMarkedOtions}
            markedOptions={markedOptions}
            />
            <button
            onClick={()=>handleNextPrev(
                'prev',
                questions.data.length,
                selectedQuestionId!,
                setSelectedQuestionId,
                )}
            >Previous</button>
            <button 
            onClick={()=>handleNextPrev(
                'next',
                questions.data.length,
                selectedQuestionId!,
                setSelectedQuestionId,
                )}
            >Next</button>
            <button 
            onClick={()=>setEndTest(true)}
            type="submit">End Test</button>
            </>
            : 
            <>loading</>
           }
        </>
    )
}
function Question(props:QuestionTypeProps){

    return (
        <>
            Q{props.index! + 1}
            {props.question}
            <br/>
            {props.options.map((option, key) => (
                <div key={key}>
                    <input 
                    checked={props.markedOptions[props.index!] == option? true : false}
                    onChange={()=>{
                        handleMarkOption(
                            props.index!,
                            props.setMarkedOptions,
                            option
                        );
                    }} type="radio" name={`${props.id}`} value={option}/>
                    <label htmlFor="">{option}</label>
                </div>
            ))}
        </>
    )
}
function QuestionNumbersArray(props: QuestionListProps){

    const {length, setSelectedQuestionId} = props;
    return (
        Array.from({length:length}).map((_,key)=>(
            <button key={key}
            onClick={()=>{
                setSelectedQuestionId(key);
            }}>{key+1}</button>
        ))
    )
}
const Counter=({testTime, setEnd, setDuration}:TimerProps)=>{

    const [counter, setCounter] = useState<TestTime>(testTime);
    useEffect(()=>{
        setDuration({min: testTime.min-counter.min, sec:Math.abs(testTime.sec-counter.sec)});
    }, [counter])

    function tick(){
        if(counter.min === 0 && counter.sec === 0){
            //show the result
            setEnd(true);
        }
        else if(counter.sec === 0){
            setCounter({min:counter.min-1, sec:59});
        }
        else{
            setCounter({min:counter.min, sec:counter.sec-1});
        }
    }
    useEffect(()=>{
        setTimeout(()=>{
            tick();
        }, 1000);
    });

    return (
        <div className="counter">
            {counter.min+":"+ counter.sec}
        </div>
    )
}