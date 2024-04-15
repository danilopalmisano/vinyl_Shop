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
- [Used Technologies](#used-technologies)
- [Features](#features)
  - [ **Documentation** ](#-documentation-)
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
  - [ Decoded Token Interface ](#-decoded-token-interface-)
- [To be implemented](#to-be-implemented)
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

# Used Technologies
* Zod: a simple, lightweight and powerful schema validation library. Its main benefit is that it provides a very intuitive and easy to use API, making it straightforward to define complex validations.

* Zod-Validation-Error: a library that simplifies the process of handling validation errors thrown by Zod. It provides a more user-friendly way to deal with errors, making it easier to display them in the UI.
* Mongoose: a MongoDB object modeling tool that makes working with MongoDB easy and simple. One of its main benefits is that it provides a lot of built-in functionality that makes CRUD operations very easy, such as validation, pre/post hooks and more.
* Bcrypt: a password hashing library that provides a simple and secure way to store passwords in a database. Its main benefit is that it uses a slow and expensive hashing algorithm, making it more secure against brute-force attacks.

# Features

## <b> **Documentation** </b>
Please check the [Documentation](./Documentation/) for an example on how the API calls work; to use them you need to download [Rest client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) or launch VS Code Quick Open (Ctrl+P), paste the following command, and press enter.

    ext install humao.rest-client


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
| **Show Current User Cart**    | GET /api/cart               | &#10004; |   USER/ADMIN  |
| **Add one Item to a line**    | POST /api/cart/add/:id      | &#10004; |     USER      |
| **Remove one Item to a line** | DELETE /api/cart/remove/:id | &#10004; |     USER      |
| **Remove Cart**               | DELETE /api/cart/clear      | &#10004; |     USER      |

## <b> **Order API** </b>

| Feature                      |       Endpoint        |  Coded?  | PrivateRoutes |
| ---------------------------- | :-------------------: | :------: | :-----------: |
| **Show Current User Orders** |    GET /api/order     | &#10004; |  USER/ADMIN   |
| **Show a specific Order**    |  GET /api/order/:id   | &#10004; |  USER/ADMIN   |
| **Add an Order**             |    POST /api/order    | &#10004; |     USER      |
| **Edit an Order**            |  PUT /api/order/:id   | &#10004; |     ADMIN     |
| **Delete an Order**          | DELETE /api/order/:id | &#10004; |     ADMIN     |

# Interfaces

## <b> User Interface </b>

| Key      | Type            |
| -------- | --------------- |
| \_id     | ObjectId        |
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

| Key                         | Type     |
| --------------------------- | -------- |
| userId                      | ObjectId |
| cart                        | Cart     |
| totalPrice                  | Number   |
| status                      | Enum     |
| shippingAddress             | Object   |
| shippingAddress.name        | String   |
| shippingAddress.surname     | String   |
| shippingAddress.addressLine | String   |
| shippingAddress.zipCode     | String   |
| shippingAddress.city        | String   |
| shippingAddress.country     | String   |
| shippingAddress.state       | String   |

### Status Enum

| Value | Description   |
| ----- | ------------- |
| 0     | Order Created |
| 1     | Processing    |
| 2     | Packed        |
| 3     | Shipped       |
| 4     | Delivered     |
| 5     | Canceled      |

## <b> Decoded Token Interface </b>

| Key | Type   |
| --- | ------ |
| id  | String |

# To be implemented
* A system of jwt refresh token, since at the moment for pure testing reason token doesn't expire;
* whitelist to be a collection in the database, so the list can expand or shrink for the customer needs.
* known bug: at the moment it's possible to make an order with the same product for only a customer; it will be fixed ASAP!

# Credits

This development/educational scenario was coded and created by [Andrea Risiglione](https://github.com/Andrea-Risiglione), [Danilo Palmisano](https://github.com/danilopalmisano) and [Giada Napoli](https://github.com/GiadaNapoli). The objective of this repository it's as practical test of RESTful API's with TypeScript, node.js, express, mongoose and zod.
