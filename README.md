# OMDbApp
Movie Search Web Site Node.Js.and React via OMDB api

## Getting Started

These instructions will get a copy of the project running on your local machine.





### Prerequisites

* Node.js 

```
$ brew install node
```

* An API key from http://www.omdbapi.com/





### Setup and run

Clone the repo and install dependencies:


#### Setup

```
$ npm install
```


#### Start

Finally, run the app on a local server. 
Application will automatically launch in your default browser:
```
$ npm start
```

#### Run time:

Node js api serves the movies based on searhed keyword
<br/>
Port: 3001 <br/>
http://localhost:3001/api/search
<br/>
To clean cache <br/>
http://localhost:3001/api/cache/refresh 


React web page uses these movie contents to show on the page.
<br/>
Port: 3000 <br/>
http://localhost:3000


#### Unit test
```
$ npm test
```
<br/>


### Summary of my work

 * The time you spent on the challenge:
 I spent 11 hours to build this application.
 - frontend 6 hours
 - backend 3,5 hours
 - non-functional 1,5 hours 

 * What would you change in your submission to make it production ready?
 I used constants in project static.
 In production I will not set this key as a open at file
 
 I could not set Docker because of mine windows version.
 Windows does not support it at windows 10 home.
 set to docker => Docker for Windows requires Windows 10 Pro or Enterprise version 14393, or Windows server 2016 RTM to run
 In production I will fix this with using different development machine.
 
 * What would you do differently if you had more time?
 I can write more unit test to handle the errors.
 I can spend much time for UI design
 I can manage a single command to run the apps and test at different computers

