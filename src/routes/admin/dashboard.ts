export type QuestionType = 'TRUE&FALSE' | 'MULTIPLECHOICE'

export function handleQuestionInput(){
  
}
export function handleButtonDisabled(
  questionType: QuestionType,
  question: {question:string, options: string[]},
){
  if(questionType == null) return true;
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