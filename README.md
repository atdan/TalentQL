<h1 align="center">TalentQL Application</h1>


> This is a RESTful API that supports the posts functionality of Facebook.


### 🏠 [API Documentation](https://documenter.getpostman.com/view/15213147/TzY4eZmf)


## Install
To install clone the repo on your local machine then in the root directory run

```sh
npm install
```

## Documentation
- Postman Documentation can be found here: https://documenter.getpostman.com/view/15213147/TzY4eZmf

## Technologies Used
- Node
- Express
- Cloudinary
- Sendgrid
- Mongoose
- Redis

## Usage

> To get this project running pefectly on your local, ensure you follow the instructions below.

1. Create a .env file in the root directory.
2. In the .env file ensure you have the following setup. (An example has been provided in the .env.example file)

```
PORT=YOUR PREFERRED PORT
MONGODB_URL=YOUR MONGO DB URL
USER_SECRET=YOUR TOKEN SECRET, IT COULD BE ANY RANDOM WORDS
JWT_EXPIRATION=THE TIME IT WILL TAKE FOR THE JTW TO EXPIRE i.e 1d
SENDGRID_API_KEY=YOUR SENDGRID API KEY
EMAIL=THE EMAIL ATTACHED OF YOUR SENDGRID 
CLOUDINARY_NAME=THE NAME OF YOUR CLOUDINARY 
CLOUDINARY_API_KEY=YOUR CLOUDINARY API KEY
CLOUDINARY_SECRET=YOUR CLOUDINARY SECRET KEY
```

3. Run the npm command below

```sh
npm run dev
```

4. Refer to the docs located at https://documenter.getpostman.com/view/15213147/TzY4eZmf 


## Run tests

```sh
npm run test
```

## Author

👤 **Daniel Atuma**

- Github: [@atdan](https://github.com/atdan)
- LinkedIn: [@daniel_atuma](https://www.linkedin.com/in/daniel-atuma-a4496714a/)
