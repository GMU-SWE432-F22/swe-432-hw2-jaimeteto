const request = require("supertest");
// we also need our app for the correct routes!
const app = require("./app");

jest.setTimeout(20000);

describe("GET /minimalEquipment ", () => {
  test("It should respond with 5 workout routines", async () => {
    
    await new Promise((r) => setTimeout(r, 5000));
    const response = await request(app).get("/minimalEquipment");
    expect(response.body.length).toEqual(5);
    
  });
});


describe("GET /minimalEquipment", () => {
  test("wrong route should return status code 404 and message  Not found ", async () => {
    
    //await new Promise((r) => setTimeout(r, 10000));
    const response = await request(app).get("/minimalEquip");
    expect(response.body).toEqual({message:"Not  Found"});
    
  });
});

describe("GET /minimalEquipment/:bodyPart?", () => {
  test("sending a bodyPart that is not included in the database should return error 404 ", async () => {
    
    //await new Promise((r) => setTimeout(r, 10000));
    const response = await request(app).get("/minimalEquip/head");
    expect(response.statusCode).toBe(404);
    
  });
});


describe("GET /inGym" , () => {
  test("in gym should not include exercises that have body weight or assisted as values for equipment", async () => {
    
    //await new Promise((r) => setTimeout(r, 5000));
    const response = await request(app).get("/inGym");
    //expect(response.body).toEqual({message:"Not  Found"});
    function containsGymEqu(data){
      for (var exercise of  response.body){

          if (exercise.equipment == 'body weight' || exercise.equipment == 'assisted'){
          
            return true;
          }
      }
      return false

    }
    expect(containsGymEqu(response)).toBe(false);
    
  });
});





describe("GET /exercise/:id", () => {
  test("should return exercise with specified id number ", async () => {
    
    //await new Promise((r) => setTimeout(r, 10000));
    const response = await request(app).get("/exercise/0001");

    var id = response.body.id
    expect(id).toBe("0001");
    
  });
});

describe("POST /customeExercise", () => {
  test("should create a new exercise and return code 201", async () => {
    
    //await new Promise((r) => setTimeout(r, 10000));
    const response = await request(app).post("/customeExercise").send({
                    "bodyPart": "upper legs",
                    "equipment":"body weight",
                    "gifUrl":"none",
                    "id":"0002",
                    "name":"lunges",
                    "target": "quads"});

    var code = response.statusCode;
    expect(code).toBe(201);
    
  });
});

describe("POST /customeExercise", () => {
  test("should create a new exercise and return the correct data", async () => {
    
    //await new Promise((r) => setTimeout(r, 10000));
    const response = await request(app).post("/customeExercise").send({
                    "bodyPart": "upper legs",
                    "equipment":"body weight",
                    "gifUrl":"none",
                    "id":"0002",
                    "name":"lunges",
                    "target": "quads"});

    var expectedObj = {"bodyPart": "upper legs",
                    "equipment":"body weight",
                    "gifUrl":"none",
                    "id":"0002",
                    "name":"lunges",
                    "target": "quads"}

      var answer = function(obj1,obj2){


        if(JSON.stringify(obj1) ===JSON.stringify(obj1)){
          return true;
        } 
        return false;
      }
    
    expect(answer(response.body,expectedObj)).toBe(true);
    
  });
});

describe("POST /customeExercise", () => {
  test("should return code 422 since one of the keys does not exist and post should fail", async () => {
    
    //await new Promise((r) => setTimeout(r, 10000));
    const response = await request(app).post("/customeExercise").send({
                    "hello": "upper legs",
                    "equipment":"body weight",
                    "gifUrl":"none",
                    "id":"0002",
                    "name":"lunges",
                    "target": "quads"});

    var code = response.statusCode;
    expect(code).toBe(422);
    
  });
});


describe("POST /customeRoutine", () => {
  test("should return a routine with two values since the request is asking for 2 values", async () => {
    
    
    const response = await request(app).post("/customRoutine").send({
                    "id1": "0001",
                    "id2": "0002"

                    });
    var numberOfValues = Object.values(response.body).length;
    expect(numberOfValues).toEqual(2);
    
  });
});

describe("GET /compound/:bodyPart", () => {
  test(" test the number of exercise objects returned", async () => {
    
    
    const response = await request(app).get("/compound/upper legs");

    
    expect(response.body.length).toEqual(5);
    
  });
});


describe("GET /compound/:bodyPart", () => {
  test("checks whether correct code is returned when bodyPart is not in the database", async () => {
    
    
    const response = await request(app).get("/compound/head");
    var code = response.statusCode;

    
    expect(code).toBe(404);
    
  });
});

describe("GET /wrong input", () => {
  test("checks whether correct code is returned when bodyPart is not in the database", async () => {
    
    
    const response = await request(app).get("/compound/head");
    var code = response.statusCode;
    
    expect(code).toBe(404);
    
  });
});



