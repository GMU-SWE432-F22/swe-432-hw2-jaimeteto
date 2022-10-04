const express = require('express')
const fetch = require('node-fetch')
const category = require('./mod1.js')



//groups and return a routine of five workouts that work on the given bodypart or none which returns
// a full body routine 
//
 module.exports = function createRoutine(data, bodyPart = "none", numberOfExercises=5){

		
 	var list =[];
 	var listOfBodyParts=[];

 	var sizeOfData = data.length;
 	if (bodyPart =="none"){

 		while(numberOfExercises>0){


 		var randomNum = Math.floor(Math.random()*sizeOfData);

 	

 		var exercise = data[randomNum];


 		if(!listOfBodyParts.includes( data.bodyPart)) {
 		list.push(exercise);
 		listOfBodyParts.push(exercise.bodyPart);
 		numberOfExercises --;
 		}


 		}
 	}

 	else{

 			// group all exercises that target the same bodypart

 			var exerciseSameBodyPart =[]; 

 			for (var exercise of data){

 				if(exercise.bodyPart == bodyPart){
 					exerciseSameBodyPart.push(exercise);
 				}
 			}


 			//changin the size of the data lenght to the new size of array with the same bodypart
 			// this portion is used to create an array of exercises that works on the same bodypart
 			sizeOfData = exerciseSameBodyPart.length;
 			while(numberOfExercises>0){


 				var randomNum = Math.floor(Math.random()* sizeOfData); //random number

		 		var exercise = exerciseSameBodyPart[randomNum];

		 		
		 		list.push(exercise);
		 		listOfBodyParts.push(exercise.bodyPart);
		 		numberOfExercises --;
 		


 			}


 	}


 	return list;

 	}

 
