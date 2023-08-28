
## Getting Started

1. Pull source code through respository

   First take pull from remote url : https://github.com/Amar9691/tello.git

2. Install required packages

   Then, install required dependencies packages in order to run application 

   Command:-  npm install 

3. Setup environment files

   Create 3 files with following naming
   .env => development local
   .env.local => staging local environment
   .env.production => production environment  

4. Setup Environment variable

    We have used appwrite cloud to manage application so you need to create account and create project , database and collections and write down their ids
   
    NEXT_PUBLIC_PROJECT_ID= your project id in appwrite cloude
    NEXT_PUBLIC_DB_ID= your database id in appwrite cloud
    NEXT_PUBLIC_TODO_COLLETION_ID= your todo collection id in appwrite cloud.
    NEXT_PUBLIC_OPENAI_API_KEY= your open ai api key 
    NEXT_PUBLIC_APPWRITE_ENDPOINT=app write end point url
    NEXT_PUBLIC_STORAGE_ID= storage bucket id

   
6.  Run Application

    Finally run your application in local environment using following command

    npm run dev

    or
    
    yarn dev 

