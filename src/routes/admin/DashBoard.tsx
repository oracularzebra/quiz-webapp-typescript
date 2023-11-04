import axios from "axios";
import { useEffect, useState } from "react"
import { backendUrl } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import { QuestionType, handleButtonDisabled, handleSubmit } from "./dashboard";
import { CatBox, getCategories } from "../home/category";

export function AdminDashBoard(){

  const location = useLocation();
  const state = location.state;

  const navigate = useNavigate(); 
  const [categories, setCategories] = useState<CatBox[] | null>(null); 
  const [selectedCatAndSubCat, setSelectedCatAndSubCat] = useState<{category:string | null, subcategory:string | null} | null>(null);
  const [noOfUsers, setNoOfUsers] = useState<number>(0);
  const [questionType, setQuestionType] = useState<QuestionType | null>(null);
  const [question, setQuestion] = useState<{question: string, options: string[]} | null>(null);
  const [difficulty, setDifficlty] = useState<'easy' | 'medium' | 'hard' | null>(null);

  useEffect(()=>{
    if(state == null || 
        state.username == undefined ||
        state.username == null) navigate('/')
    else 
      (async()=>{
        const noOfUsersReq = await axios({
          url:`${backendUrl}/admin/get-users`
        });
        //Here we are getting a full blown object
        //involving all the headers, data obj only is 
        //of need here
        setNoOfUsers(noOfUsersReq.data.data);
        const categories = await getCategories();
        if(categories.success) setCategories(categories.data);
      })();
  }, [])
 
  useEffect(()=>{
    console.log(question);
  }, [question])

  return (
    <div className="grid justify-center">
      <div className="grid justify-center">
        <h1 className="text-center text-xl m-2">
          Admin dashboard
        </h1>
        Total No of users {noOfUsers}
      </div>
      <h1
        className="text-center
        text-xl
        border-b-2
        border-green-400
        m-2">
          Add questions
      </h1>
      <div
      className="grid
                place-content-center
                gap-2
                flex-wrap">
        <div>
          <label htmlFor="">
            Enter question 
            <input type="text" onChange={(e)=>{
              const currquestion: typeof question = {question: e.currentTarget.value, 
              options: Array.from({length:4})}
              setQuestion(currquestion);
            }}/>
          </label>
          <button
          onClick={()=>setQuestionType((prev)=>prev == null ? 'TRUE&FALSE' : null)}
          className="p-2 bg-slate-400 rounded-xl">Add true-false</button>
          <button
          onClick={()=>setQuestionType((prev)=>prev == null ? 'MULTIPLECHOICE' : null)}
          className="p-2 bg-slate-400 rounded-xl">Add multiple choice</button>
          {questionType == 'MULTIPLECHOICE' && 
            <ul className="grid gap-2 justify-center">
              {Array.from({length:4}).map((_,index)=>{
                return (<li className="" key={index}>
                  <label htmlFor="">
                    {`Option ${index} `}
                    <input type="text" 
                    disabled={question == null || question?.question.length == 0}
                    onChange={(e)=>{
                      const options = question?.options.map((op,index2)=>{
                        if(index2 == index) return e.currentTarget.value;
                        else return op;
                      })
                      setQuestion({question: question?.question!, options: options!})
                    }}/>
                  </label>
                </li>)
              })}
            </ul>
          }
          
        </div>
        <div className="flex flex-wrap gap-3">
          {categories != null &&
          categories.map((cat, key)=>( 
            <div
            className="grid w-screen place-content-center"
            key={key}>
              <p
              className="text-center border-b-2 border-b-green-200"
              >{cat.category}
              </p>
              <div className="flex gap-2 flex-wrap justify-center">
                {cat.sub_categories.map((subCat,key)=>(
                  <div
                  key={key}>
                    <label>
                      <input
                      className="scale-110"
                      onClick={()=>setSelectedCatAndSubCat({category: cat.category, subcategory: subCat})}
                      name="subcat" type="radio" />{subCat}
                    </label>
                 </div>
                ))}
              </div>
            </div>
            )
          )}
        </div>
        <h1 className="text-center border-b-2 border-b-green-200">Add difficulty:</h1>
        <div className="place-content-center flex flex-wrap gap-2">
          <label>
            <input className="scale-110" name="difficulty" type="radio"
            onChange={()=>setDifficlty('easy')}/>
            easy
          </label>
          <label>
            <input className="scale-110" name="difficulty" type="radio"
            onChange={()=>setDifficlty('medium')}/>
            medium
          </label>
          <label>
          <input className="scale-110" name="difficulty" type="radio" onChange={()=>setDifficlty('hard')}/>
            hard
          </label>
        </div>
        <button
            className="bg-slate-400 justify-self-center rounded-lg p-2"
            disabled= {handleButtonDisabled(difficulty, questionType!, question!, selectedCatAndSubCat!)}
            onClick={()=>{handleSubmit(question, selectedCatAndSubCat, difficulty)}}
          >
            Add
        </button>
      </div>
    </div>
  )
}