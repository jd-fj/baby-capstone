-I'm need to take my api key out of App, I'm going to try to do that...

- after reading Firebase docs, I will want to do some more research on database rules when I have a clearer idea of how my app will behave, if I'll have different roles (moderator/user)

-Still working on storing api key in .env

-Fixed error with firebase imports. Copied from Stackoverflow: 
Before 8.0.0;
```import * as firebase from 'firebase/app'```
After 8.0.0;
```import firebase from 'firebase/app'```

-having trouble getting firebase to initialize in my project without putting the configuration snippet in App.js. Thinking I should build out something I know how to make (like the help queue) and try to combine these two projecets. 

-why doesn't my project work?

-Researching if maybe I could use useFirestoreConnect's isLoaded instead of async on line 59?

- I really don't know how to make this tutorial run without putting the api key in the app. It's not processing the string correctly? So I suspect I'm not importing it correctly? but all the research for importing is saying that I'm doing it as expected? 