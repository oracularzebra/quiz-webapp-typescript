import { useEffect, useState } from "react"
import { QuestionListProps, QuestionTypeProps, Questions, TestTime, TimerProps, getQuestions, handleMarkOption, handleNextPrev } from "./test";
import { useNavigate, useParams } from "react-router-dom";

interface UserProps {
  username: string | null,
  loggedIn: boolean
}
export default function Test({ loggedIn, username }: UserProps) {

  const navigate = useNavigate();
  const { category, difficulty } = useParams();
  const [questions, setQuestions] = useState<Questions | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
  const [endTest, setEndTest] = useState<boolean>(false);
  const [testTime, setTestTime] = useState<TestTime | null>(null)
  const [markedOptions, setMarkedOtions] = useState<string[]>([]);
  const [duration, setDuration] = useState<TestTime | null>(null);

  useEffect(() => {
    if (!loggedIn) navigate('/home');
    if (category == undefined || difficulty == undefined) navigate('/home');
    else {
      (async () => {
        const result = await getQuestions(category, difficulty);
        setQuestions(result);
        setMarkedOtions(
          Array.from({ length: result.data.length })
            .map(_ => "undefined")
        )
        setTestTime({ min: result.data.length - 1, sec: 59 })
        if (result.data.length > 0) setSelectedQuestionId(0);
      })();
    }
  }, [loggedIn, category, difficulty]);

  useEffect(() => {
    if (endTest) {
      const questions_id = questions?.data.map(obj => obj.id);
      navigate('/test/result',
        {
          state: {
            loggedIn, questions_id,
            marked_options: markedOptions, duration,
            username,
            category,
            difficulty
          }
        });
    }
  }, [endTest]);

  return (
    <div className="m-4 sm:m-0">
      <div className="flex place-content-center">
        <h2 className="text-lg">
          {category}:
        </h2>
        <h2 className="text-lg">
          {difficulty}
        </h2>
      </div>
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
              setSelectedQuestionId={setSelectedQuestionId} />
            <Question
              index={selectedQuestionId!}
              id={questions.data[selectedQuestionId!].id}
              options={questions.data[selectedQuestionId!].options}
              question={questions.data[selectedQuestionId!].question}
              setMarkedOptions={setMarkedOtions}
              markedOptions={markedOptions}
            />
            <div className="flex place-content-center">
              <button
                className="bg-slate-400 p-2 m-1 rounded-xl"
                onClick={() => handleNextPrev(
                  'prev',
                  questions.data.length,
                  selectedQuestionId!,
                  setSelectedQuestionId,
                )}
              >Previous</button>
              <button
                className="bg-slate-400 p-2 m-1 rounded-xl"
                onClick={() => handleNextPrev(
                  'next',
                  questions.data.length,
                  selectedQuestionId!,
                  setSelectedQuestionId,
                )}
              >Next</button>
              <button
                className="bg-slate-400 p-2 m-1 rounded-xl"
                onClick={() => setEndTest(true)}
                type="submit">End Test</button>
            </div>
          </>
          :
          <>loading</>
      }
    </div>
  )
}
function Question(props: QuestionTypeProps) {

  return (
    <div 
    className="bg-slate-300
    rounded-xl 
    grid 
    place-content-left 
    gap-2"
    >
      <h2
      className="text-lg">
        Q{props.index! + 1}
        {props.question}
      </h2>
      {props.options.map((option, key) => (
        <div 
        className="p-1 ml-4 sm:ml-0"
        key={key}>
          <label className="text-md font-medium flex gap-1">
          <input
            className="scale-110"
            checked={props.markedOptions[props.index!] == option ? true : false}
            onClick={(e)=>{
              const checked = e.currentTarget.value == props.markedOptions[props.index!]
              handleMarkOption(
                props.index!,
                checked,
                props.setMarkedOptions,
                option
              );
            }}
            type="radio" name={`${props.id}`} value={option} />
          <p>{option}</p>
          </label>
        </div>
      ))}
    </div>
  )
}
function QuestionNumbersArray(props: QuestionListProps) {

  const { length, setSelectedQuestionId } = props;

  return (
    <div 
    className="flex place-content-center flex-wrap flex-shrink-"
    >
      {Array.from({ length: length }).map((_, key) => (
      <button
      className="p-2 bg-slate-400 m-1 rounded-lg"
      key={key}
        onClick={() => {
          setSelectedQuestionId(key);
        }}>{key + 1}</button>
    ))}
    </div>
    
  )
}
const Counter = ({ testTime, setEnd, setDuration }: TimerProps) => {

  const [counter, setCounter] = useState<TestTime>(testTime);
  useEffect(() => {
    setDuration({ min: testTime.min - counter.min, sec: Math.abs(testTime.sec - counter.sec) });
  }, [counter])

  function tick() {
    if (counter.min === 0 && counter.sec === 0) {
      //show the result
      setEnd(true);
    }
    else if (counter.sec === 0) {
      setCounter({ min: counter.min - 1, sec: 59 });
    }
    else {
      setCounter({ min: counter.min, sec: counter.sec - 1 });
    }
  }
  useEffect(() => {
    setTimeout(() => {
      tick();
    }, 1000);
  });

  return (
    <div className="text-lg text-center">
      {counter.min + ":" + counter.sec}
    </div>
  )
}