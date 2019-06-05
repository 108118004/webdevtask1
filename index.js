//Personal Details
var personalForm = document.getElementsByClassName("personal")[0];
var message = document.getElementsByClassName("message")[0];
var submit = document.getElementsByTagName('button')[0];
var kcal;
var weight1, height1, age1;

if (localStorage.getItem("data") === null) {
  submit.addEventListener("click", function() {
    var formDetails = {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      weight: document.getElementById("weight").value,
      height: document.getElementById("height").value,
  };
    weight1 = Number(formDetails.weight);
    height1 = Number(formDetails.height);
    age1 = Number(formDetails.age);

    localStorage.setItem("data", JSON.stringify(formDetails));
    personalForm.style.display = "none";
    message.style.display = "block";
    document.getElementsByTagName('h2')[0].innerHTML = "HI!" + formDetails.name;
    changeh2();
  });

}
 else {
  var formDetails = JSON.parse(localStorage.getItem("data"));
  personalForm.style.display = "none";
  message.style.display = "block";
  //messageDiv.style.backgroundColor = "green";
  document.getElementsByTagName('h2')[1].innerHTML = "HI! " + formDetails.name;

  weight1 = Number(formDetails.weight);
  height1 = Number(formDetails.height);
  age1 = Number(formDetails.age);
  changeh2();
}

function changeh2() {
  var kcal1;
  var bmr = 88.362 + (13.397 * weight1) + (4.799 * height1) - (5.677 * age1);

  kcal1 = bmr * 1.24;
  kcal=kcal1;
  document.getElementsByTagName('h2')[2].innerHTML = "Your calorie intake should be " + kcal1 + " Kilocalories per day.";
}


//Calorie Consumption
var caloriemessage = document.getElementsByClassName("calorietab")[0];
var add = document.getElementsByTagName('button')[1];
var calorieform = document.getElementById("calorieform");
var ul = document.getElementsByTagName("ul")[0];
var submit2 = document.getElementsByTagName('button')[2];
var foodarray=[];
var kcalConsumed=0;

const liMaker = text => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
};

if(localStorage.getItem("food")!=null){
   foodarray = JSON.parse(localStorage.getItem("food"));
   Array.from(foodarray).forEach(function(data){
   let kcalOfThis=0;
     kcalOfThis=4*(Number(data.carbs)+Number(data.protein))+9*Number(data.fat);
     kcalOfThis/=1000;
     liMaker(data.name+"-"+kcalOfThis+" kcal");
     kcalConsumed+=4*(Number(data.carbs)+Number(data.protein))+9*Number(data.fat);
   });
changeCalorieConsumed();
 }

add.addEventListener("click",function(){
    calorieform.style.display= "block";
    caloriemessage.style.display = "none";

  });


  submit2.addEventListener("click",function(){
    var calorieDetails = {
      foodname: document.getElementById("food-name").value,
      carbs: document.getElementById("carbs").value,
      protien: document.getElementById("protiens").value,
      fat: document.getElementById("fat").value,
  };

  let currentkcal=0;
   currentkcal=4*(Number(calorieDetails.carbs)+Number(calorieDetails.protein))+9*Number(calorieDetails.fat);
   currentkcal/=1000;
  kcalConsumed+=4*(Number(calorieDetails.carbs)+Number(calorieDetails.protein))+9*Number(calorieDetails.fat);


  calorieform.style.display= "none";
  caloriemessage.style.display = "block";
  Array.from(foodarray).push(calorieDetails);
  localStorage.removeItem("food");
  localStorage.setItem("food", JSON.stringify(Array.from(foodarray)));
  liMaker(calorieDetails.foodname+"-"+ currentkcal+" kcal");
  changeCalorieConsumed();
});

function changeCalorieConsumed(){
   h2ToChange=document.getElementsByClassName("changeCalorieConsumed")[0];
   h2ToChange.innerHTML="Current calorie consumption is "+(kcalConsumed/1000);

   if((kcalConsumed/1000)>kcal)
     alert("Calorie consumption exceeded !!!");
 }

//water Consumption
var waterForm=document.getElementsByClassName("waterform")[0];
var watermessage=document.getElementsByClassName("watermessage")[0];
var waterul=document.getElementsByClassName("waterul")[0];
var add2=document.getElementsByTagName("button")[3];
var submit3=document.getElementsByTagName("button")[4];
var reset=document.getElementsByTagName("button")[5]
var waterarray=[];
var hours,mins;

function waterLiMaker(e){
  const li=document.createElement("li");
  li.textContent=e+" Liters at "+hours+":"+mins;
  waterul.appendChild(li);
}
if(localStorage.getItem("water")!=null){
  waterArray=JSON.parse(localStorage.getItem("water"));
  waterArray.forEach(function(e){
    waterLiMaker(e);
  });

}

add2.addEventListener("click",function(){
  waterForm.style.display="block";
  watermessage.style.display="none";
})

submit3.addEventListener("click",function(){
  var waterconsumed=document.getElementById("water-amount");

  waterForm.style.display="none";
  watermessage.style.display="block";
  waterarray.push(waterconsumed);
  localStorage.removeItem("water");
  localStorage.setItem("water",JSON.stringify(waterarray));
  waterLiMaker(waterconsumed);
  document.location.reload(false);
})
