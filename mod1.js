const express = require('express')
const fetch = require('node-fetch')
const category = require('./mod2.js')


//class that creates a routine
module.exports= class category{

//assisted and body weight
constructor(numberOfExercises=5){
  
	this.numberOfExercises = numberOfExercises;

}

// returns 
minimalEquipment(data){

	var minimal=[];

	for(let exercise in data){
		
		if(data[exercise].equipment == "assisted" || data[exercise].equipment == "body weight"){
			
			minimal.push(data[exercise]);
		}

	}
	

	return minimal;
}


gymEquipment(data){

	var gym =[];
	for(let exercise of data){
		//console.log(exercise);
		if((exercise.equipment == "assisted" )|| (exercise.equipment == "body weight")){

			continue;
		} 
			gym.push(exercise);
		

}
return gym;
}


targeted(data, equipmentList){
var targetedList =[];
	for(let exercise of data){
		//console.log(exercise);
		if( equipmentList.includes(exercise.equipment)) {

			targetedList.push(exercise);
		} 
	
		

}
return targetedList;
}


}


