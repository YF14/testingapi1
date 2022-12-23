# Backend Task


## Installation

Use the ```npm``` i to install dependencies

```bash
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^8.5.1",
    "nodemon": "^2.0.20",
    "sqlite3": "^5.1.4"
```

## Nots

```python
use 'npm run runSeed' for migration file
use 'npm start' for start the server 
I used 2 databass first for posts and second for login user 
dont forget to use Bearer before token and postman header called Authorization in posts routes 
```
## End ponts
```python
/posts post for new data
/posts get for get all data
/auth/signin for sign in 
/auth/signup for sign up 
```
## .env sample
```
JWT_SECRET_KEY='yourkey'
APP_PORT=3000
ENVIRONMENT=development
```
## Contributing

Pull requests are welcome.
