var inputEL = document.getElementById("input")
var buttonEL = document.getElementById("btn")

buttonEL.addEventListener("click",function(e){
   var inputValue=inputEL.value 
 fetch("http://worldtimeapi.org/api/timezone/America/"+inputValue)
 .then(function(response){
  return response.json()
}).then(function(response){
console.log (response)
})

fetch("http://worldtimeapi.org/api/timezone/America/"+inputValue)
 .then(function(response){
  return response.json()
}).then(function(response){
console.log (response)
})

})

