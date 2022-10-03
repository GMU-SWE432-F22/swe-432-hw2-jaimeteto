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





