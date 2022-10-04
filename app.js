const express = require('express')
const fetch = require('node-fetch')
const app = express()
const category = require('./mod1.js') // used for grouping workouts

const createRoutine = require('./mod2.js') 
const port = 3000
app.use(express.json());
app.use(express.urlencoded({extended:false}));


class allWorkouts{
  constructor(url){
    this.url = url;
    
    
  }

  //used to fetch all data from the apI
  async workouts(){
    const url = this.url;
    const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '8ea0bd5848msh623aa774c6033b3p17beb2jsn8cfef70a0b1c',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }};
     var workouts = await fetch(url,options).then(res => {return res.json()}).catch(function(error){
       console.log("error retrievind data"+error)

     })

     return workouts
   }
}





//storing all workouts
const bodyParts= 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
const completeData = 'https://exercisedb.p.rapidapi.com/exercises';
var data1 = new allWorkouts(completeData);/// dat1 contains all exercises
var newExercises =[];
//getting list of bodyparts
var data2 = new allWorkouts(bodyParts);//this contains a list of all possible body parts


//storing results
var alldata = data1.workouts().then(res=> alldata = res);
var bodyParts1 = data2.workouts().then(res=>bodyParts1 = res);




app.get('/', (req, res) => {
  res.send("Workouts routines")
})

//returns a list of  5 or (numberofExercises) number of exercises that that use minimal squipment(at home workouts)
app.get('/minimalEquipment/:bodyPart?/:numberOfExercises?', (req, res) => {


//ERORR HANDLING
///////////////////////////////////////////////////////////////////////////////////////////////////////
    var numberOfExercises= req.params.numberOfExercises;
    var bodyPart= req.params.bodyPart;

  //if number is not defined return error

  if(typeof numberOfExercises =='undefined'){

    numberOfExercises = 5;
  }
//if number of exercises is not a number return error
  if(isNaN(numberOfExercises) ){

   return res.status(404).send({message:"Not  Found"});
 }

 
//if body part was ignored used default value
  if(typeof bodyPart =='undefined'){
    
    bodyPart= "none";
  }
//if bodypart param is not in the API return error

  if((!Object.values(bodyParts1).includes(bodyPart)) && (bodyPart != "none")) {
      

      return res.status(404).send({message:"Not  Found"});
  }

  //end of error handling

  //////////////////////////////////////////////////////////////////////////////////////

///fucntion that groups and creater the routines
  //group all "minimal equipment and create  and return a routine "
  async function grouptWorkouts(bodyPart, numberOfExercises=5){
  
//group all workouts that do not require gym equipment
  var assistedGroup = new category();
  var dataa = assistedGroup.minimalEquipment(alldata);


// creating workout routine

  var finalRoutine = await createRoutine(dataa,bodyPart,numberOfExercises);

//returns an object with the routine 
  return finalRoutine;

  }

  var result = grouptWorkouts(bodyPart).then(result =>res.send( result));

  

})





// return 5 or (numberOfExercises) number of exercises that use gym equipment
app.get('/inGym/:bodyPart?/:numberOfExercises?', (req, res) => {
  

  //error handling
  ////////////////////////////////////////////////////
   var numberOfExercises= req.params.numberOfExercises;
  var bodyPart= req.params.bodyPart;

    
  if(typeof numberOfExercises =='undefined'){

    numberOfExercises = 5;
  }

 

  if(typeof bodyPart =='undefined'){
    //console.log("in if statement");
    bodyPart= "none";
  }

  //if number of exercises is not a number return error
  if(isNaN(numberOfExercises) ){

   return res.status(404).send({message:"Not  Found"});
 }

//if bodypart param is not in the API return error

  if((!Object.values(bodyParts1).includes(bodyPart)) && (bodyPart != "none")) {
      

      return res.status(404).send({message:"Not  Found"});
  }
//end of error handling
////////////////////////////////////////////////////////////////

///fucntion that groups and creater the routines
  //group all "minimal equipment and create  and return a routine "
  async function grouptWorkouts(bodyPart, numberOfExercises=5){
  
//group all workouts that do not require gym equipment
  var assistedGroup = new category();
  var dataa = assistedGroup.gymEquipment(alldata);


// creating workout routine

  var finalRoutine = await createRoutine(dataa,bodyPart,numberOfExercises);

//returns an object with the routine 
  return finalRoutine;

  }


  var result = grouptWorkouts(bodyPart).then(result =>res.send( result));





})

// returs 5 number of exercises that focus on one muscle 
app.get('/targeted/:bodyPart', (req, res) => {

  var bodyPart= req.params.bodyPart;

//if bodypart param is not in the API return error

  if((!Object.values(bodyParts1).includes(bodyPart)) && (bodyPart != "none")) {
      

      return res.status(404).send({message:"Not  Found"});
  }
//end of error handling
////////////////////////////////////////////////////////////////
//this is a sample of equipment that is used to isolate a muscle or bodypart
var equipmentTargeted1 = ["band","cable","dumbbell"];
var equipmentTargeted2 =["resistance band","wheel roller"];
//group all workouts that are considered targeted exercises

async function grouptWorkouts(bodyPart){
  var assistedGroup = new category();

  //breaking processes into two events
  var dataa = await assistedGroup.targeted(alldata,equipmentTargeted1);
  var dataa2 = await assistedGroup.targeted(alldata,equipmentTargeted2);
   

   var resulingArray = dataa.concat(dataa2);
  //creating rotine
   var finalRoutine = await createRoutine(resulingArray,bodyPart,5);

//returns an object with the routine 
  return finalRoutine;
}

var result = grouptWorkouts(bodyPart).then(result =>res.send( result));
  
})
app.get('/exercise/:id',(req, res) => {

  //returns specified exercise


  var id= req.params.id;

  const idURL = `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`;
  var value = new allWorkouts(idURL)
  var result1 = value.workouts().then(res=>result1 = res).then(res1 =>res.send(res1));


  
})

// returs 5 or (numberOfExercises) number of exercises that can be consider compund exercises(compound is an exercise
//  that work multiple muscle groups )
app.get('/compound/:bodyPart', (req, res) => {


   var bodyPart= req.params.bodyPart;

//if bodypart param is not in the API return error

  if((!Object.values(bodyParts1).includes(bodyPart)) && (bodyPart != "none")) {
      
      return res.status(404).send({message:"Not  Found"});
  }
//end of error handling
////////////////////////////////////////////////////////////////
//this is a sample of equipment that is used in compound exercises
var equipmentTargeted1 = ["body weight","barbell","olympic barbell"];
var equipmentTargeted2 =["smith machine","sled machine","kettlebell"];
//group all workouts that are considered compund exercises

async function grouptWorkouts(bodyPart){
  var assistedGroup = new category();

  //breaking processes into two events
  var dataa = await assistedGroup.targeted(alldata,equipmentTargeted1);
  var dataa2 = await assistedGroup.targeted(alldata,equipmentTargeted2);
   

   var resulingArray = dataa.concat(dataa2);
  //creating rotine
   var finalRoutine = await createRoutine(resulingArray,bodyPart,5);

//returns an object with the routine 
  return finalRoutine;
}

var result = grouptWorkouts(bodyPart).then(result =>res.send( result));
  
})


//posts a new workout
//app.post('/customeExercise/:exerciseName/:equipment/:target/:bodyPart/:id',(req,res)=>{
app.post('/customeExercise',(req,res)=>{
  /// this route is used to add a new workout to a database

const validKeys=["bodyPart","equipment","gifUrl","id","name","target"]

 for (var key in req.body){

    if (!validKeys.includes(key)){
        return res.status(422).send("invalid input");
    }
 }

var newWorkout = {
bodyPart: req.body.bodyPart,
equipment:req.body.exerciseName,
gifUrl:"none",
id:req.body.id,
name:req.body.name,
target: req.body.target
};

  var result = res.status(201).send(newWorkout);
    
})




app.post('/customRoutine',(req,res)=>{

  //this route is used to create a custom routine of 5 exercises
  
    var responseBody=req.body;


  async function getValues (){

    var finalResult =[];

  for (var key in responseBody){
    var id = responseBody[key];

      const idURL = `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`;
      var value = new allWorkouts(idURL);
       var result = await  value.workouts().then(res=>finalResult.push(res));

    


    
  }
  return finalResult
}

  var response = getValues().then(res1=> response = res1).then(res2 =>res.status(201).send(res2));
  

});

app.use((req, res,next) => {
    res.status(404).send({message:"Not  Found"});
})


module.exports = app;