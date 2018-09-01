# prototype-app
___

 ## Dependencies
 - Npm version 6.4.1
 - Node v8.11.4
 - Vue cli 3.0
 
  ### Technologies
 - [Vue Cli](http://cli.vuejs.org/guide/installation.html) 
 - [Vue Cli instant prototyping](https://cli.vuejs.org/guide/prototyping.html)
 - [Firebase dynamic-links](https://firebase.google.com/docs/dynamic-links/)
 - [Firebase Firestore](https://firebase.google.com/docs/firestore/)
 
  ## Steps to recreate
 
 1. Clone this repository,
 
 2. cd in `prototype-app` directory
 
 3. run `npm install axios --save`
        `npm install firebase@5.3.0 --save`

 3. Then you can serve it with `vue serve app.vue`, (this is a feature of vue for rapid prototyping. You might need to have this feature installed to do this. see recourses)
 
 4. Paste a long url into the input field, it should generate a short, dynamic url. You can open the console to see the record has been recored in firebases firestore relation database.
