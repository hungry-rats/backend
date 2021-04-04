# Welcome to Seefood's backend!

## Project Description - What did we cook up?
We built this application as a platform for users to discover their new favorite recipe and share their culinary creations. Users can browse their feed, click on recipes that look tasty, and then add comments once they've given the recipe a try. This application can help users dodge the clutter and mess that's so ubiquitous on so many other recipe websites. Everyone reading this can probably relate to needing to scroll through several pages-worth of text just to arrive at a simple 4 step recipe!

## What Features did you bake in?
Seefood demonstrates full CRUD functionality for recipes and CRD (no updates as of this version) functionality for comments.

Seefood lets users post their original recipes, add relevant details (allergens that may be in the recipe, stating their inspiration, uploading the perfect picture) and comment on other recipes that catch their eye. Users must sign-up prior to use (requiring a username, password and email address) and are then able to post, edit, and delete their recipes. Comments can be posted and deleted, but not edited as of this time.

## Which technologies were used for this project?
Seefood's backend was constructed to consist of three models. 
The user is authenticated on sign-in, at which point they are able to access data. The recipe and comment collections are synchonorized so that when a comment is made, edited, or deleted, it is reflected in the parent recipe. 

We are hosting our database on Mongo DB's atlas platform. All path requests were tested using Postman. As stated in the README for our front-end, we made our HTTP requests via Axios, which is available as an additional dependency. 

Our code was written using Express.js. A complete list of the dependencies we used can be found below:

```
  "dependencies": {
    "bcrypt": "^5.0.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.12.2",
    "nodemon": "^2.0.7",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0"
  }
  ```

## Installation Instructions (Follow this recipe!):
Having followed the install instructions for the front-end code, run the same install protocol here. Be sure to ensure that all the above / listed dependencies are running.


Wanna try this recipe out? Our Contribution Guidelines:
We'd love for you to contribute to our recipe. Here you can find our [frontend] (https://github.com/hungry-rats/frontend) as well as our [backend] (https://github.com/hungry-rats/backend).
