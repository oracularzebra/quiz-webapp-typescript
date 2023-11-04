export type QuestionType = 'TRUE&FALSE' | 'MULTIPLECHOICE'

export function handleSubmit(
  question :{question: string, options: string[]} | null,
  selectedCategoryAndSubCategory : {category: string | null, subcategory: string | null} | null,
  difficulty: 'easy' | 'medium' | 'hard' | null
){

}
export function handleButtonDisabled(
  difficulty : string | null,
  questionType: QuestionType,
  question: {question:string, options: string[]},
  selectedCategoryAndSubCategory: {category:string | null, subcategory:string | null}
){
  if(difficulty == null) return true;
  if(questionType == null) return true;
  if(selectedCategoryAndSubCategory == null||
    selectedCategoryAndSubCategory.category == null||
    selectedCategoryAndSubCategory.subcategory == null) return true;
  return ( questionType == 'MULTIPLECHOICE') ?
                       (question == null ||
                       question.question.length == 0 ||
                       question.options == null ||
                       question.options[0] == undefined || 
                       question.options[0].length == 0 ||
                       question.options[1] == undefined || 
                       question.options[1].length == 0 ||
                       question.options[2] == undefined || 
                       question.options[2].length == 0 ||
                       question.options[3] == undefined || 
                       question.options[3].length == 0)
                       : questionType == 'TRUE&FALSE' ? (
                          question == null ||
                          question.question.length == 0
                       ): false
                       
}