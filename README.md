  
# Vinyl Shop
🛒 A simple RESTful API for Purchases and Products 🛒 

## <b> **Table of Contents** </b>
- [Vinyl Shop](#vinyl-shop)
	- [ **Table of Contents** ](#-table-of-contents-)
		- [Installation:](#installation)
		- [No dotenv Installation Required:](#no-dotenv-installation-required)
		- [Setting up .env file](#setting-up-env-file)
		- [Generating Random Keys](#generating-random-keys)
		- [Initial Setup:](#initial-setup)
		- [Transpilation (Run it the first time only):](#transpilation-run-it-the-first-time-only)
		- [Running the Server:](#running-the-server)
- [Features](#features)
	- [ **Authentication API** ](#-authentication-api-)
	- [ **Products API** ](#-products-api-)
	- [ **Cart API** ](#-cart-api-)
	- [ **Order API** ](#-order-api-)
- [Interfaces](#interfaces)
	- [ User Interface ](#-user-interface-)
		- [Login Interface](#login-interface)
		- [Role Enum](#role-enum)
	- [ Product Interface ](#-product-interface-)
		- [StockStatus Enum](#stockstatus-enum)
	- [ Cart Interface ](#-cart-interface-)
	- [ LineItem Interface ](#-lineitem-interface-)
	- [ Order Interface ](#-order-interface-)
		- [Status Enum](#status-enum)
	- [ Decode Token Interface ](#-decode-token-interface-)
- [Project Tree](#project-tree)
- [Credits](#credits)

### Installation:

### No dotenv Installation Required:

As long as you have a .env file placed in the root directory of your project,
environment variables will be loaded automatically when you execute a script defined in your package.json file. 
This eliminates the need for manual installation of the dotenv package.     
**If you want to add any other key to the .env file, make sure you do the same in the env.ts you'll find in the utility folder.**

You can access them in any file of your code importing:
	
 	import { env } from "./utility/env";

	
### Setting up .env file
  
Create a file named .env in the root directory of your project (usually where your package.json file is).
Add key-value pairs: Each line represents a variable. The format is KEY=VALUE.  
**If you want to add any other key to the .env file, make sure you do the same in the env.ts you'll find in the utility folder.**

how your .env file should look like:

 	MONGODB_URI=mongodb://localhost:"Your port number ex.= 27017, use no quotation mark"/ 

	ACCESS_SECRET_TOKEN= Random Key no quotation mark
	REFRESH_SECRET_TOKEN= Random Key no quotation mark

	LOCAL_DBNAME= VinylShop_db_local
	DEV_DBNAME= VinylShop_db_dev
	PROD_DBNAME= VinylShop_db_prod

	LOCAL_PORT= "NUMBER for ex.= 3***, use no quotation mark"
	DEV_PORT= "NUMBER for ex.= 808*, use no quotation mark"
	PROD_PORT= "NUMBER for ex.= 808*, use no quotation mark"

 
 
### Generating Random Keys
 To generate random keys to use as ACCESS/REFRESH TOKEN copy this in your the terminal:
 	
  	node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
 
### Initial Setup:

Open a terminal in your project directory and run: 

	npm install

This command will download and install all the necessary dependencies listed in the package.json file.

### Transpilation (Run it the first time only):

Transpilation (First Time Only): After the initial installation, run:

 	npm run tsc 
 
 only once to transpile your TypeScript code into JavaScript. This step is only required the first time you set up the project.

### Running the Server:

From then on, you can use the single command:

	npm run server

to both transpile your code and start the server using Nodemon. 
Nodemon will automatically watch for changes in your TypeScript files and restart the server whenever you make modifications, streamlining your development workflow.


# Features

## <b> **Authentication API** </b>
| Feature            | Endpoint                      |  Coded?  | PrivateRoutes |
| ------------------ | :---------------------------- | :------: | :-----------: |
| **Register User**  | POST /api/auth/register       | &#10004; |    PUBLIC     |
| **Register Admin** | POST /api/auth/admin/register | &#10004; |    PUBLIC     |
| **Login**          | POST /api/auth/login          | &#10004; | USER / ADMIN  |
| **Logout**         | POST /api/auth/logout         | &#10004; |  USER/ADMIN   |
| **Auth Info**      | GET /api/auth/user            | &#10004; |  USER/ADMIN   |

## <b> **Products API** </b>

| Feature                      | Endpoint                 |  Coded?  | PrivateRoutes |
| ---------------------------- | :----------------------- | :------: | :-----------: |
| **Show all Products**        | GET /api/products        | &#10004; |    PUBLIC     |
| **Show a specific Products** | GET /api/products/:id    | &#10004; |    PUBLIC     |
| **Add a ProductADMIN**       | POST /api/products       | &#10004; |     ADMIN     |
| **Edit a Product**           | PUT /api/products/:id    | &#10004; |     ADMIN     |
| **Delete a Product**         | DELETE /api/products/:id | &#10004; |     ADMIN     |

## <b> **Cart API** </b>
| Feature                       | Endpoint                    |  Coded?  | PrivateRoutes |
| ----------------------------- | :-------------------------- | :------: | :-----------: |
| **Show Current User Cart**    | GET /api/cart               | &#10004; |     USER      |
| **Add one Item to a line**    | POST /api/cart/add/:id      | &#10004; |     USER      |
| **Remove one Item to a line** | DELETE /api/cart/remove/:id | &#10004; |     USER      |
| **Remove Cart**               | DELETE /api/cart/clear      | &#10004; |     USER      |

## <b> **Order API** </b>
| Feature                      | Endpoint              |  Coded?  | PrivateRoutes |
| ---------------------------- | :-------------------- | :------: | :-----------: |
| **Show Current User Orders** | GET /api/order        | &#10006; |  USER/ADMIN   |
| **Show a specific Order**    | GET /api/order/:id    | &#10006; |  USER/ADMIN   |
| **Add an Order**             | POST /api/order       | &#10006; |     USER      |
| **Edit an Order**            | PUT /api/order/:id    | &#10006; |     ADMIN     |
| **Delete an Order**          | DELETE /api/order/:id | &#10006; |     ADMIN     |

# Interfaces

## <b> User Interface </b>
| Key      | Type            |
| -------- | --------------- |
| _id      | ObjectId        |
| username | String          |
| login    | Login Interface |
| role     | Enum            |

### Login Interface 
| Key      | Type    |
| -------- | ------- |
| email    | String  |
| password | String  |
| loggedIn | Boolean |

### Role Enum
| Value | Description |
| ----- | ----------- |
| 0     | User        |
| 1     | Admin       |

## <b> Product Interface </b>

| Key           | Type     |
| ------------- | -------- |
| name          | String   |
| description   | String   |
| price         | Number   |
| images        | [String] |
| stockQuantity | Number   |
| StockStatus   | Enum     |
| category      | String   |

### StockStatus Enum
| Value | Description  |
| ----- | ------------ |
| 0     | Out of Stock |
| 1     | In Stock     |
| 2     | Discontinued |

## <b> Cart Interface </b>
| Key        | Type       |
| ---------- | ---------- |
| userId     | ObjectId   |
| lines      | [LineItem] |
| totalPrice | Number     |

## <b> LineItem Interface </b>
| Key       | Type     |
| --------- | -------- |
| productId | ObjectId |
| quantity  | Number   |
| price     | Number   |
| subtotal  | Number   |

## <b> Order Interface </b>

| Key                          | Type     |
| ---------------------------- | -------- |
| userId                       | ObjectId |
| cart                         | Cart     |
| totalPrice                   | Number   |
| status                       | Enum     |
| shippingAddress              | Object   |
| shippingAddress.name         | String   |
| shippingAddress.surname      | String   |
| shippingAddress.addressLine1 | String   |
| shippingAddress.zipCode      | String   |
| shippingAddress.city         | String   |
| shippingAddress.country      | String   |

### Status Enum
| Value | Description   |
| ----- | ------------- |
| 0     | Order Created |
| 1     | Processing    |
| 2     | Packed        |
| 3     | Shipped       |
| 4     | Delivered     |
| 5     | Canceled      |

## <b> Decode Token Interface </b>
| Key | Type   |
| --- | ------ |
| id  | String |

# Project Tree
.      
├── ./Documentation  
│   ├── ./Documentation/auth  
│   │   ├── ./Documentation/auth/authInfo.rest  
│   │   ├── ./Documentation/auth/logIn.rest  
│   │   ├── ./Documentation/auth/logOut.rest  
│   │   ├── ./Documentation/auth/registerAdmin.rest  
│   │   └── ./Documentation/auth/registerUser.rest  
│   ├── ./Documentation/cart  
│   │   ├── ./Documentation/ca1rt/addProductToCart.rest  
│   │   ├── ./Documentation/cart/emptyUserCart.rest   
│   │   ├── ./Documentation/cart/removeProductFromCart.rest  
│   │   └── ./Documentation/cart/showUserCart.rest  
│   └── ./Documentation/product  
│       ├── ./Documentation/product/addProduct.rest  
│       ├── ./Documentation/product/deleteProduct.rest  
│       ├── ./Documentation/product/showProduct.rest  
│       ├── ./Documentation/product/showSpecificProduct.rest  
│       └── ./Documentation/product/updateProduct.rest  
├── ./src  
│   ├── ./src/controllers  
│   │   ├── ./src/controllers/cart.controller.ts  
│   │   ├── ./src/controllers/order.controller.ts  
│   │   ├── ./src/controllers/product.controller.ts  
│   │   └── ./src/controllers/user.controller.ts  
│   ├── ./src/middleware  
│   │   └── ./src/middleware/authMiddleware.ts  
│   ├── ./src/models  
│   │   ├── ./src/models/cart.model.ts  
│   │   ├── ./src/models/line.model.ts  
│   │   ├── ./src/models/login.model.ts  
│   │   ├── ./src/models/order.model.ts  
│   │   ├── ./src/models/product.model.ts  
│   │   └── ./src/models/user.model.ts  
│   ├── ./src/routes  
│   │   ├── ./src/routes/auth.routes.ts  
│   │   ├── ./src/routes/cart.routes.ts  
│   │   ├── ./src/routes/order.routes.ts  
│   │   └── ./src/routes/product.routes.ts  
│   ├── ./src/services  
│   │   ├── ./src/services/auth.service.ts  
│   │   ├── ./src/services/cart.service.ts  
│   │   ├── ./src/services/order.service.ts  
│   │   └── ./src/services/product.service.ts  
│   ├── ./src/utility  
│   │   ├── ./src/utility/commonAuthFunction.ts  
│   │   └── ./src/utility/env.ts  
│   ├── ./src/validation  
│   │   ├── ./src/validation/cart.validation.ts  
│   │   ├── ./src/validation/decodedToken.validation.ts  
│   │   ├── ./src/validation/order.validation.ts  
│   │   ├── ./src/validation/product.validation.ts  
│   │   └── ./src/validation/user.validation.ts  
│   ├── ./src/app.ts  
│   ├── ./src/environment.ts   
│   └── ./src/server.ts  
├── ./.env  
├── ./.gitignore  
├── ./README.md  
├── ./TODO  
├── ./package-lock.json  
├── ./package.json  
└── ./tsconfig.json  

# Credits

This development/educational scenario was coded and created by [Andrea Risiglione](https://github.com/Andrea-Risiglione), [Danilo Palmisano](https://github.com/danilopalmisano) and [Giada Napoli](https://github.com/GiadaNapoli). The objective of this repository it's as practical test of RESTful API's with TypeScript, node.js, express, mongoose and zod.