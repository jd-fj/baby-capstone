Copy of database rules to make sure only non-banned users can create messages from their own accounts

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }

    //match the path to the messages collection in database
    match /messages/{docId} {
      allow read: if request.auth.uid != null; //when user wants to read a doc make sure the're logged in
      allow create: if canCreateMessage(); 
    }
    
    function canCreateMessage() {
      let isSignedIn = request.auth.uid != null;  
      let isOwner = request.auth.uid == request.resource.data.uid;

      let isNotBanned = exists(
        /databases/$(database)/documents/banned/$(request.auth.uid)
      ) == false;

      return isSignedIn && isOwner && isNotBanned;
    }
  }
}


