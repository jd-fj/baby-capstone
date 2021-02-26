-I'm need to take my api key out of App, I'm going to try to do that...

- after reading Firebase docs, I will want to do some more research on database rules when I have a clearer idea of how my app will behave, if I'll have different roles (moderator/user)

-Still working on storing api key in .env

-Fixed error with firebase imports. Copied from Stackoverflow: 
Before 8.0.0;
```import * as firebase from 'firebase/app'```
After 8.0.0;
```import firebase from 'firebase/app'```