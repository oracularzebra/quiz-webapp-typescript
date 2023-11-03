import axios from "axios";
import { useEffect, useState } from "react"
import { backendUrl } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import { QuestionType, handleButtonDisabled } from "./dashboard";
import { CatBox, getCategories } from "../home/category";

export function AdminDashBoard(){

  const location = useLocation();
  const state = location.state;

  const navigate = useNavigate(); 
  const [categories, setCategories] = useState<CatBox[] | null>(null); 
  const [selectedCatAndSubCat, setSelectedCatAndSubCat] = useState<{category:string | null, subcategory:string | null} | null>(null);
  const [noOfUsers, setNoOfUsers] = useState<number>(0);
  const [questionType, setQuestionType] = useState<QuestionType | null>(null);
  const [question, options] = useState<{question: string, options: string[]} | null>(null);


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
        console.log(categories);
        if(categories.success) setCategories(categories.data);
      })();
  }, [])
  
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
      className="flex
                place-content-center
                gap-2
                flex-wrap">
        <div>
          <label htmlFor="">
            Enter question 
            <input type="text" />
          </label>
          <button
          onClick={()=>setQuestionType((prev)=>prev == null ? 'TRUE&FALSE' : null)}
          className="p-2 bg-slate-400 rounded-xl">Add true-false</button>
          <button
          onClick={()=>setQuestionType((prev)=>prev == null ? 'MULTIPLECHOICE' : null)}
          className="p-2 bg-slate-400 rounded-xl">Add multiple choice</button>
          {questionType == 'MULTIPLECHOICE' && 
            <ul className="grid gap-2">
              {Array.from({length:4}).map((_,index)=>{
                return (<li className="" key={index}>
                  <label htmlFor="">
                    {`Option ${index} `}
                    <input type="text" />
                  </label>
                </li>)
              })}
            </ul>
          }
          <button
            className="bg-slate-400 rounded-lg"
            disabled= {handleButtonDisabled(questionType!, question!)}
            onClick={()=>{}}
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* TODO: Here we'll show the categories and subcategories */}
          {categories != null &&
          categories.map((cat, key)=>( 
            <div
            className="flex flex-wrap"
            key={key}>
              <input
              className="scale-110"
              name="category" type="radio" />{cat.category}
              <div className="flex flex-wrap">
                {cat.sub_categories.map((subCat,key)=>(
                  <div
                  key={key}>
                    <input
                    className="scale-110"
                    onClick={()=>setSelectedCatAndSubCat(prev => {
                      if(prev == null) return {category: null, subcategory: subCat}
                      else return {category: prev.category, subcategory: subCat}})}
                    name="subcat" type="radio" />{subCat}
                  </div>
                ))}
              </div>
            </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}