#:vinyl_shop:
###Installation:

No dotenv Installation Required:

As long as you have a .env file placed in the root directory of your project,
environment variables will be loaded automatically when you execute a script defined in your package.json file. 
This eliminates the need for manual installation of the dotenv package.

You can access them in any file of your code importing:
	
 	import { env } from "./utility/env";
  
Create a file named .env in the root directory of your project (usually where your package.json file is).
Add key-value pairs: Each line represents a variable. The format is KEY=VALUE.

 	MONGODB_URI=

	ACCESS_SECRET_TOKEN=
	REFRESH_SECRET_TOKEN=

	LOCAL_DBNAME=
	DEV_DBNAME=
	PROD_DBNAME=

	LOCAL_PORT=
	DEV_PORT=
	PROD_PORT=

 If you want to add any other key to the .env file, make sure you do the same in the env.ts you'll find in the utility folder. 
 
 To generate random keys to use as ACCESS/REFRESH TOKEN copy this in your the terminal:
 	
  	node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
 
Initial Setup: Open a terminal in your project directory and run: 

	npm install

This command will download and install all the necessary dependencies listed in the package.json file.
Transpilation (First Time Only): After the initial installation, run:

 	npm run tsc 
 
 only once to transpile your TypeScript code into JavaScript. This step is only required the first time you set up the project.

Running the Server:

From then on, you can use the single command:

	npm run server

to both transpile your code and start the server using Nodemon. 
Nodemon will automatically watch for changes in your TypeScript files and restart the server whenever you make modifications, streamlining your development workflow.

No dotenv Installation Required:

As long as you have a .env file placed in the root directory of your project,
environment variables will be loaded automatically when you execute a script defined in your package.json file. 
This eliminates the need for manual installation of the dotenv package.


