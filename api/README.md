Group project UI by team : WDX Repo link to API: https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_WDX_UI.git

## Project Introduction and Development Progression:
Our App Alumni's Insight is designed for users to fetch the school evaluations from the school alumni. Our App structure is referred to our TextBook and IssueTracker APP.
Our dataset comes from https://data.opendatasoft.com/explore/dataset/us-colleges-and-universities%40public-us/information/?sort=population, and the existed rating and comments fields are sampled by the developer.

### Iteration 2.0
This week we implemented App Register/login, user profile and comments management. 
1. After registration, user can login and maintain his "signIn" state for an hour. The jwt token is stored in local storage and will be expired after an hour.
2. Create a new collection to manage user comments.
3. User can fetch his personal information, update his personal information and see his comments history.
4. API heroku: https://new-app-api1.herokuapp.com. You can see graphql playground at https://new-app-api1.herokuapp.com/graphql. 

### Iteration 1.0
The API is the back-end of our APP. It includes two parts:
1. School Databases: School data api has almost been developed, including:
   1. School api which return the exact school information (params: school id)
   2. School list api (params: filter: state, name, zip, rating)
   3. School edit api (params: id and changed information)
   4. School evaluation api (params: id and added rating/comments)
   5. School delete api (params: id)
2. User Databases: this database manage the user data. It has not been implemented yet.

Note: School Database is on MongoDB Atlas.

## Team Member
Mi Tang, Zihan Xiao

## API Installation Instruction
1. Run `npm install` for installation.
2. Run `npm start` for running api.

## Dev logs
Aug 10 by Zihan
1. Fixed errors in graphql error return type.

Aug 10 by Mi Tang
1. Fix UI css style. Admin navbar and user navbar conflicts solved.

Aug 9 by Zihan
1. Fix stateType error.

Aug 9 by Mi Tang
1. Sucessfully use login state to control rendering of userprofile page, and user will be able to update his comment and personal info.
2. Complete comment add part, when user add new comment to school, comment database records both userID and schoolID, so user could view his submitted comment from his profile.

Aug 8 by Zihan
1. Add school as the required field in user and fix registration.

Aug 8 by Mi Tang
1. User database update function implemented. Only admin could update user database.

Aug 7 by Mi Tang
1. Set PORT so codes work both for heroku and local.

Aug 6 by Zihan
1. Finish API Heroku deployment.

Aug 6 by MiTang
1. Impelemented user profile update function (8080/profile/$(id)) including updating personal info and school review info, with manually setting userID and schoolID. Will continue on get userID from login information.

Aug 5 by Zihan
1. Finished Register/Login authentication and set UserContext.
2. Fixed bugs.

Aug 5 By MiTang
1. Fixed function to show comments only related with school on school detail page.
2. Use react-bootstrap to pretify comment submit interface.

Aug 4 By MiTang
1. Redefined comment databases, school databases and user databases along with graphql schema to relate commentID to schoolID and userID.
2. Implemented add comment function to related school under school detail page. Comment is able to added to specific schools but not identified as specific user yet. 
3. Each school detail page nows shows a full-list of comments. Need to show only related comments. Will continue to do. 

Aug 3 By Zihan
1. Implemented Auth, JWT authentication and register functionality.

July 31 by Zihan
1. Move local dataset to MongoDB atlas.

July 30, 2020 by Zihan
1. Fixed StateType, added state "PR".
2. Add range search function for rating


July 27, 2020 by Zihan
1. Finished api: school, schoolList, schoolAdd
2. auth and user have not been added yet
3. Changed state type from String to Enum