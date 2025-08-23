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
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8 fade-in">
          <div className="card p-6">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              📚 {category} Quiz
            </h1>
            <p className="text-gray-600 text-lg capitalize">
              🎯 Difficulty: <span className="font-semibold">{difficulty}</span>
            </p>
          </div>
        </div>

        {questions ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Timer */}
            <div className="card p-4">
              <Counter
                setDuration={setDuration}
                testTime={testTime!}
                setEnd={setEndTest}
              />
            </div>

            {/* Question Navigation */}
            <div className="card p-6">
              <QuestionNumbersArray
                length={questions.data.length}
                setSelectedQuestionId={setSelectedQuestionId} 
              />
            </div>

            {/* Question */}
            <div className="card p-8">
              <Question
                index={selectedQuestionId!}
                id={questions.data[selectedQuestionId!].id}
                options={questions.data[selectedQuestionId!].options}
                question={questions.data[selectedQuestionId!].question}
                setMarkedOptions={setMarkedOtions}
                markedOptions={markedOptions}
              />
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center gap-4">
              <button
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => handleNextPrev(
                  'prev',
                  questions.data.length,
                  selectedQuestionId!,
                  setSelectedQuestionId,
                )}
              >
                ⬅️ Previous
              </button>
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => handleNextPrev(
                  'next',
                  questions.data.length,
                  selectedQuestionId!,
                  setSelectedQuestionId,
                )}
              >
                Next ➡️
              </button>
              <button
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={() => setEndTest(true)}
                type="submit">
                🏁 End Test
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="pulse-animation text-white/80 text-lg">
              🔄 Loading quiz questions...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
function Question(props: QuestionTypeProps) {

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        <span className="text-blue-600">Q{props.index! + 1}.</span> {props.question}
      </h2>
      
      <div className="space-y-3">
        {props.options.map((option, key) => (
          <label 
            key={key}
            className="flex items-start p-4 bg-gray-50 rounded-lg border-2 border-transparent hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-300 group">
            <input
              className="w-5 h-5 text-blue-600 accent-blue-600 mr-4 mt-1"
              checked={props.markedOptions[props.index!] == option ? true : false}
              onChange={(e)=>{
                const checked = e.currentTarget.value == props.markedOptions[props.index!]
                handleMarkOption(
                  props.index!,
                  checked,
                  props.setMarkedOptions,
                  option
                );
              }}
              type="radio" 
              name={`${props.id}`} 
              value={option} 
            />
            <span className="text-gray-700 group-hover:text-blue-700 font-medium">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
function QuestionNumbersArray(props: QuestionListProps) {

  const { length, setSelectedQuestionId } = props;

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">📝 Question Navigation</h3>
      <div className="flex justify-center flex-wrap gap-2">
        {Array.from({ length: length }).map((_, key) => (
        <button
          className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
          key={key}
          onClick={() => {
            setSelectedQuestionId(key);
          }}>
          {key + 1}
        </button>
      ))}
      </div>
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
    <div className="text-center">
      <div className="inline-flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 px-6 rounded-full shadow-lg">
        <span className="text-2xl mr-2">⏰</span>
        <span className="text-xl">
          {String(counter.min).padStart(2, '0')}:{String(counter.sec).padStart(2, '0')}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-2">Time Remaining</p>
    </div>
  )
}