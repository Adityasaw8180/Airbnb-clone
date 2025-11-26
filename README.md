# 🚀 Airbnb Clone 🏠💻

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-000000?logo=EJS&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-34E1B6?logo=passport.js&logoColor=white)


A full-stack clone of the Airbnb platform built using Node.js, Express, MongoDB, and **EJS** templating to replicate its core features and provide a seamless user experience.

---

📖 Description

The Airbnb Clone project is a full-stack web application built using Node.js, Express, MongoDB, and **EJS** templating. It replicates the core functionalities of the Airbnb platform — including user authentication, listing management, reviews, and filtering — with a clean, responsive, and intuitive interface.

This Airbnb Clone replicates core features of the original **Airbnb platform**.
The project follows the MVC architecture, features robust authentication using Passport.js, secure image uploading using Cloudinary, and dynamic server-side rendering using EJS templates.

This project showcases server-side rendering using **EJS**, combined with Express.js backend logic and MongoDB. It integrates Passport.js for authentication and Cloudinary for image storage, offering a production-ready structure for scalable apps.

The Airbnb Clone demonstrates **MVC** architecture, routing, middleware handling, and secure authentication.

This project is ideal for learning:
    1.Backend structures (routes, controllers, middleware)

    2.Server-side rendering with EJS

    3.Database modeling with Mongoose

    4.Authentication & session management

    5.Data validation & error handling

    6.Cloudinary file uploads

    7.RESTful APIs

✨ Features

User Authentication –
    1.Register & Login using Passport.js
    2.Secure password hashing
    3.Session-based authentication with Express Sessions

Listing Management – 
    1.Create / View / Edit / Delete Listings
    2.Add price, location, coordinates, description
    3.Upload multiple images (Cloudinary integration)

Reviews System – 
    1.Add & delete reviews with rating + comments
    2.Linked with user & listing models

Image Upload – 
    1.Cloudinary image storage
    2.Multer middleware integration

Filtering & Categories –
    -Filter listings by:
        1.Category
        2.Price
        3.Amenities
        4.Location

Error Handling –
    1.Centralized custom error handler (ExpressError)
    2.Async wrapper to reduce try–catch (wrapAsync.js)

Responsive UI –
    -Modular EJS templates for:
        1.Navbar
        2.Footer
        3.Flash messages

    -Clean & responsive CSS

Data Validation – 
    1.Ensures consistent and valid user input using schema-based validation

🧰 Tech Stack

| Layer          | Technology              |
| -------------- | ----------------------- |
| Frontend       | EJS + Custom CSS        |
| Backend        | Node.js + Express.js    |
| Database       | MongoDB (Mongoose ORM)  |
| Authentication | Passport.js             |
| Image Upload   | Cloudinary + Multer     |
| Validation     | Schema validation (Joi) |
| Architecture   | MVC Pattern             |

---

⚙️ How to Run

Clone the repository:

git clone [https://github.com/Adityasaw8180/Airbnb-clone.git](https://github.com/Adityasaw8180/Airbnb-clone.git)

cd Airbnb-clone

Install dependencies:

npm install

Set up environment variables:

CLOUDINARY_CLOUD_NAME=your_cloud_name CLOUDINARY_KEY=your_api_key CLOUDINARY_SECRET=your_api_secret ATLASDB_URL=your_mongodb_connection_url **SECRET**=your_session_secret

Run the application:

🧪 Testing Instructions

Launch the app using npm start

Open [http://localhost:**8080**](http://localhost:**8080**)

Register and log in using Passport authentication

Create, view, edit, and delete listings

Upload images using Cloudinary integration

Add reviews and test category filters

Check validation and error handling

📦 **API** Overview
Method	Endpoint	Description
**GET**	/listings	Display all listings
**POST**	/listings	Create a new listing
**GET**	/listings/:id	Show a specific listing
**PUT**	/listings/:id	Update an existing listing
**DELETE**	/listings/:id	Delete a listing
**POST**	/reviews	Add a review
**GET**	/reviews/:id	Get reviews for a listing

👤 Author : Aditya Sawant 🙋‍♂️

---

📸 Screenshots
![Sign Up Page](screenshots/signup.png)
![Login Page](screenshots/login.png)
![Home Page](screenshots/home.png)
![add new Listing Page](screenshots/newListing.png)
![Show Listing](screenshots/show.png)
![Reviews Listing](screenshots/reviews.png)
![Map Listing](screenshots/map.png)

## 📁 Project Structure
```📁 Project Structure
├── 📁 controllers/
│   ├── 📄 listings.js
│   ├── 📄 reviews.js
│   └── 📄 users.js
├── 📁 init/
│   ├── 📄 data.js
│   └── 📄 index.js
├── 📁 models/
│   ├── 📄 listing.js
│   ├── 📄 review.js
│   └── 📄 user.js  
├── 📁 public/
│   ├── 📁 css/
│   │   ├── rating.css
│   │   └── style.css
│   ├── 📁 images/
│   │   └── airbnb.png
│   └── 📁 js/
│       └── script.js
├── 📁 routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── 📁screenshots/ 
├── 📁 utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── 📁 views/
│   ├── 📁 includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── 📁 layouts/
│   │   └── boilerplate.ejs
│   ├── 📁 listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   ├── 📁 users/
│   │   ├── userLogin.ejs
│   │   └── userSignUp.ejs
│   └── error.ejs
├── 📄 .env
├── 📄 .gitignore
├── 📄 cloudConfig.js
├── 📄 middlewares.js
├── 📄 schemaValidation.js
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 README.md
└── 📄 server.js

GitHub: Adityasaw8180
