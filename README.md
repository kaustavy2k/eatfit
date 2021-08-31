# Eat-Fit
Via this site, a user can order food. This web application does target all customers but customer with any ailments.
A user first needs to sign up in order to use this application. There are other options like login and forget password (forget password wont work because the site is deployed in heroku, hence due to security issues, heroku blocks the gmail nodemailer. It will work in local).
So there is a global hosted atlas mongodb server which stores the data of all the user as well as all the food with dummy calorific values.
There is a food section where, based on the filter provided by the user, the correct food gets fetched from the database. The user can add the food to the cart.
In the cart section, i have used dummy stripe integration for payment(credentials: Card Number-4242 4242 4242, Expiry- 04/24, CVV-424).
After payment, there is a profile section where the user can see all his previous/current orders.
A user can also change his name and password. He/She can logout and delete account.
And finally i have integrated the "posts" weavy in the profile section where a user can post a review regarding his experience using this application.
The site is hosted in https://warm-inlet-58682.herokuapp.com/


So the stack i have used here is MERN
Authetication login logout stuff is done via jwt and cookies
Database used is mongodb
In frontend, i have used routers for various section and redux for maintaining cart items.


To run this in local, clone the repo
There are two package.json files, one for frontend and one for backend. So open the backend package.json and change the "start" script from "node server.js" to "nodemon server.js"
type the command "npm install" then "npm start"
Now, move inside the "client" folder by typing "cd client". There is an .env file inside "client" folder. Open that and change the url to "http://localhost:2020"
type the command "npm install" then "npm start". And you are good to go


PS- you can signup or use my credentials to login: email:- kb@gmail.com password:-qqqqqq
