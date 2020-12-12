const questionNumber=document.querySelector(".question-number")  ;
const questionText=document.querySelector(".question-text")  ;
const optionsContainer=document.querySelector(".options-container")  ;
let questionCounter=0 ;
let currentQuestion ;
let availablequestion=[] ;
let availableoption=[]  ;
const answercontainerindicator=document.querySelector(".answers-indicator") ;
const quizBox=document.querySelector(".quiz-box") ;
const resultBox=document.querySelector(".result-box") ;
const homeBox=document.querySelector(".home-box")  ;
var wrong=0 ;
var attempts=0 ;
var correctans=0 ;
const quiz=[

{
   q:'How many countries are suffering from corona-virus outbreak? ' ,
   options :['more than 50', 'more than 100', 'more than 150', 'more than 200'] ,
   answer:3 
 }   ,

{q:'In which age group covid-19 spreads? ' ,
   options :['all groups', 'mild in children', 'older person with pre-existing medical condition are at higher risk', 'all of above'] ,
   answer:3
}  ,
  
{

         q:'The first case of corona-virus was identified in ..' ,
   options :['beijing', 'shanghai','wuhan'] ,
   answer:2
}  ,


{
	 q:'What are precautions that need to be taken to protect from coronavirus? ' ,
   options :['wear mask and regularly sanitize your hands', 'Add more garlic into your diet', 'Visit your doctar for antibiotics treatment','do regular morning walks'] ,
   answer:0
}  ,




{

   q:'Mild symptoms of novel coronavirus are : ' ,
   options :['fever', 'cough', 'shortness of breadth','All of above'] ,
   answer:3



},

{
  q:'What is full form of covid 19?' ,
  options:['corona orignated virus in dec 19','Chinese orignated virus in dec 19'] ,
  answer:0
} ,
{

  q:'When was first case of coronavirus disease reported in India?' ,
  options:['2 april 2020' ,'30 january 2020' , '15 january 2020','5 march 2020']  ,
  answer:1 

}  ,
{


q:'Which state in india has reported highest number of cases till now?' ,
options:['kerala' ,'punjab','maharashtra','tamil nadu'] ,
answer:2



}  ,
{
q:'When did World Health Organization announces COVID-19 as global Health crisis?' ,
options:['20 february 2020','11 march 2020','15 january 2020','23 december 2019'] ,
answer:1

} ,
{
  q:'Which country in world has reported highest number of corona cases till now?' ,
  options:['America' ,'Brazil','China','India'] ,
  answer:0

}


]
function setquestion(){

  const totalquestion=quiz.length  ;
  for(let i=0;i<totalquestion;i++){
  	availablequestion.push(quiz[i]) ;
  	
  }
}

function getnewquestion(){

 questionNumber.innerHTML="Question "+(questionCounter+1)+" of "+quiz.length ;
 let questionIndex=availablequestion[Math.floor(Math.random()*availablequestion.length)]   ;
   currentQuestion=questionIndex ;
   questionText.innerHTML=currentQuestion.q ;
   questionCounter++ ;

  const index1=availablequestion.indexOf(questionIndex)      ;
  availablequestion.splice(index1,1) ;

  let optionlen=currentQuestion.options.length ;

   

  for(let i=0;i<optionlen;i++){
  	availableoption.push(i) ;

}

for(let i=0;i<optionlen;i++){
	const optionIndex=availableoption[i] ;
	const index2=availableoption.indexOf(optionIndex)  ;
	availableoption.splice(index2,1) ;
   const option=document.createElement("div")   ;
	option.innerHTML=currentQuestion.options[i]  ;
	option.id=i    ;
   option.className="option" ;
	optionsContainer.appendChild(option)  ;
 option.setAttribute("onclick","getresult(this)") ;

}


}

function getresult(element){

  if(element.id==currentQuestion.answer)
    {element.classList.add("correct") ; 
     updateanswer("correct") ;
     correctans++ ; 
     console.log(correctans) ;
  }
   else
   {element.classList.add("wrong") ; 
      updateanswer("wrong") ;
      wrong++ ;
     const q=optionsContainer.children.length  ;
     for(let i=0;i<q;i++){
      if(optionsContainer.children[i].id==currentQuestion.answer){
        optionsContainer.children[i].classList.add("correct") ;
     
      
      }
     }

   }
  attempts++ ;
   unclickableoption()  ;
}
 function unclickableoption(){
  const opt=optionsContainer.children.length ;
  for(let i=0;i<opt;i++){
    optionsContainer.children[i].classList.add("already-answered") ;

  } 

 }
 function quizOver(){
 	quizBox.classList.add("hide") ;
 	resultBox.classList.remove("hide") ;
 	
 	resultBox.querySelector(".total-correct").innerHTML=correctans;
 	resultBox.querySelector(".total-attempt").innerHTML=attempts ;
 	resultBox.querySelector(".total-wrong").innerHTML=wrong ;
 	resultBox.querySelector(".Percentage").innerHTML=(correctans/quiz.length)*100+"%" ;
 	resultBox.querySelector(".total-score").innerHTML=correctans+"/"+quiz.length ;
 	resultBox.querySelector(".total-questions").innerHTML=quiz.length ;

 }

function next(){

  if(questionCounter==quiz.length)
  {
  	console.log("over");
  	quizOver()  ;
  }
  else{
  	disableoption() ;
  	getnewquestion() ;
  }


}


function disableoption(){
	const a=optionsContainer.children.length  ;

   for(let i=0;i<a;i++){
   	optionsContainer.children[i].classList.remove("correct") ;
   		optionsContainer.children[i].classList.remove("wrong") ;


   }
 

   for(i=0;i<optionsContainer.children.length;i++){
         optionsContainer.children[i].classList.add("dis") ;

   }

}


function updateanswer(elemet){
	answercontainerindicator.children[questionCounter-1].classList.add(elemet)  ;
}
function tryagain(){
	resultBox.classList.add("hide")  ;
	quizBox.classList.remove("hide") ;
	resetquiz() ;
	startquiz() ;

}
function resetquiz(){
	 questionCounter=0 ;
	wrong=0 ;
 attempts=0 ;
correctans=0 ;
 for(i=0;i<optionsContainer.children.length;i++){
         optionsContainer.children[i].classList.add("dis") ;

   }


for(i=0;i<10;i++){

  answercontainerindicator.children[i].classList.remove("correct")  ;
  answercontainerindicator.children[i].classList.remove("wrong") ;  

}


}
 
function startquiz(){
	homeBox.classList.add("hide")  ;
	quizBox.classList.remove("hide") ;
     
	setquestion() ;
	getnewquestion() ;
 
}

function gotohome(){
	resultBox.classList.add("hide") ;
	homeBox.classList.remove("hide")  ;
	resetquiz() ;
}