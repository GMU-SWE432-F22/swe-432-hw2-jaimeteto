# SWE-432 HW-2 Starter Application

## Submission Information

### Student Information

*Please fill in this information before submission*

* **Student Name: Jaime Pena** 
* **Student G-Number:*G01300925* 
* **Heroku Deployment URL:*https://jaime-pena-swe432-hw2.herokuapp.com/*

### Documentation of your 7 Scenarios

*Here please describe your 7 scenarios complete with details about the endpoint and expected output. We provide one example below. If using route parameters, please provide an example API query*

* 1)retrieve and return a set of workout exercises that require minimal equipment(bodypart and number of exercises is optional) default for body part is "none" and default for numberOfExercises = 5
  * API Endpoint: GET /minimalEquipment/:bodyPart?/:numberOfExercises?
  * Example: GET /minimalEquipment/chest/5/
  * Expected Output: 5 exercises that work on the chest (picked at random) ex output :

  [{"bodyPart":"chest","equipment":"body weight","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/3145.gif","id":"3145","name":"push-up plus","target":"pectorals"},{"bodyPart":"chest","equipment":"body weight","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/1297.gif","id":"1297","name":"isometric chest squeeze","target":"pectorals"},{"bodyPart":"chest","equipment":"body weight","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/0806.gif","id":"0806","name":"suspended push-up","target":"pectorals"},{"bodyPart":"chest","equipment":"body weight","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/3211.gif","id":"3211","name":"kneeling push-up (male)","target":"pectorals"},{"bodyPart":"chest","equipment":"body weight","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/0803.gif","id":"0803","name":"superman push-up","target":"pectorals"}]



  * 2)retrieve and return a set of workout exercises that require gym equipment(bodypart and number of exercises are optional) default for body part is "none" and default for numberOfExercises = 5
  * API Endpoint: GET /inGym/:bodyPart?/:numberOfExercises?
  * Example: GET /inGym/back/5/
  * Expected Output: 5 exercises that work on the back and require gym equipment (picked at random)  output example :


  [{"bodyPart":"back","equipment":"leverage machine","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/0606.gif","id":"0606","name":"lever t bar row ","target":"upper back"},{"bodyPart":"back","equipment":"band","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/1018.gif","id":"1018","name":"band shrug","target":"traps"},{"bodyPart":"back","equipment":"cable","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/1324.gif","id":"1324","name":"cable upper row","target":"upper back"},{"bodyPart":"back","equipment":"dumbbell","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/1329.gif","id":"1329","name":"dumbbell palm rotational bent over row","target":"upper back"},{"bodyPart":"back","equipment":"barbell","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/0248.gif","id":"0248","name":"cambered bar lying row","target":"upper back"}]


  3)retrieve and return a set of 5 workout exercises that targets or focuses in a specific muscle group.
  * API Endpoint: GET /targeted/:bodyPart
  * Example: GET /targeted/upper arms
  * Expected Output: 5 exercises that focus on the upper arms muscle groups (picked at random) ex output :

  [{"bodyPart":"upper arms","equipment":"dumbbell","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/1649.gif","id":"1649","name":"dumbbell alternating bicep curl with leg raised on exercise ball","target":"biceps"},{"bodyPart":"upper arms","equipment":"dumbbell","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/1664.gif","id":"1664","name":"dumbbell high curl","target":"biceps"},{"bodyPart":"upper arms","equipment":"dumbbell","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/0422.gif","id":"0422","name":"dumbbell standing one arm curl (over incline bench)","target":"biceps"},{"bodyPart":"upper arms","equipment":"cable","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/2406.gif","id":"2406","name":"cable reverse grip triceps pushdown (sz-bar) (with arm blaster)","target":"triceps"},{"bodyPart":"upper arms","equipment":"cable","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/1726.gif","id":"1726","name":"cable rope lying on floor tricep extension","target":"triceps"}]

4)retrieve and return a set of 5 workout exercises that targets or focuses in a specific muscle group.
  * API Endpoint: GET /compound/:bodyPart
  * Example: GET /compound/chest
  * Expected Output: 5 exercises that focus on the upper arms muscle groups (picked at random) ex output :

  [{"bodyPart":"chest","equipment":"barbell","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/0025.gif","id":"0025","name":"barbell bench press","target":"pectorals"},{"bodyPart":"chest","equipment":"body weight","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/0251.gif","id":"0251","name":"chest dip","target":"pectorals"},{"bodyPart":"chest","equipment":"smith machine","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/0757.gif","id":"0757","name":"smith incline bench press","target":"pectorals"},{"bodyPart":"chest","equipment":"body weight","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/3288.gif","id":"3288","name":"korean dips","target":"pectorals"},{"bodyPart":"chest","equipment":"smith machine","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/0764.gif","id":"0764","name":"smith reverse-grip press","target":"pectorals"}]


5) retrieve and return an specific exercised by id number
  * API Endpoint: GET /exercise/:id
  * Example: GET /exercise/0001
  * Expected Output: exercise object with respective id number. ex output :
  {"bodyPart":"waist","equipment":"body weight","gifUrl":"http://d205bpvrqc9yn1.cloudfront.net/0001.gif","id":"0001","name":"3/4 sit-up","target":"abs"}

6) create and send a new workout like the ones we have in database.
  * API Endpoint: POST /customeExercise
  * Example: POST /customeExercise/   
  * Expected Output:  an object with the given information as values. ex output:

  7) create and send a new routine when exercise id's are given for each exercise.
  * API Endpoint: POST /customRoutine
  * Example: POST /customRoutine    together with an object like this: {
                    "id1": "0001",
                    "id2": "0002"

                    }   
  * Expected Output:  an object with the routine containing exercises with the respective id's. ex output:

  [
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
        "id": "0001",
        "name": "3/4 sit-up",
        "target": "abs"
    },
    {
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "http://d205bpvrqc9yn1.cloudfront.net/0002.gif",
        "id": "0002",
        "name": "45° side bend",
        "target": "abs"
    }
]


## Project Overview

This repo contains a barebones Node.js app using [Express 4](http://expressjs.com/). You will use this as the "base" version of your Microserivce application for HW Assignment #2. You will simply create a copy of this repo through GitHub classroom and then work in that repo. 

## Homework Assignment #2 Detailed Instructions

You can find the deatiled instructions for HW Assignment #2 on the [course webpage](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw2). Please read these carefully before getting started.

## Running this Project Locally

Make sure you have [Node.js](http://nodejs.org/) and (optionally) the [Heroku CLI](https://cli.heroku.com/) installed. You only need the Heroku CLI installed if you plan to deploy the project from the CLI instead of the Heroku web interface. See the [HW Assignment #2 instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw2) for more details.

*Note the following commands assume a Unix-based enviornment. If you are on windows, you may need to use something such as Windows Subsystem for Linux (https://docs.microsoft.com/en-us/windows/wsl/about).*

```sh
$ git clone <repo-name>
$ cd <repo-name>
$ npm install
$ npm start
```

After executing these commands, your app should now be running on [localhost:3000](http://localhost:3000/). You can visit this in your browser to see your 

## Deploying to Heroku

Check out [our instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw2) for deploying your application to Heroku. You can use the button below for quick access to your Heroku account.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Testing with Continuous Integration

Currently, this repo is set up to run the Jest tests in the `app.test.js` file upon each commit to the `main` branch of the repository. If any of the tests fail, the CI process will fail and this will be indicated with red "X" on the main page of your repo, and GitHub will likely also send you a notification email that your automated tests have failed.

Currently, the tests are configured to run by getting deployed to a remote virtual server with an Ubuntu operating system, where the `npm install` and `npm test` commands are executed. We don't anticpate you needing to change this configuration, as it is fine to keep all of your tests in the `app.test.js` for this assignment. 

We expect that all of your (at least) 12 unit tests will have passed via the command line by the time you turn in the assignment.

You can find the [GitHub Actions](https://github.com/features/actions) script for this CI job [here](.github/workflows/ci.yml) if you want to learn more.

## Additional Resources

For more information about using Node.js on Heroku, see these Heroku Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
