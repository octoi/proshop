# PROSHOP 🛒

Ecommerce project using DJANGO & REACT JS.

Tutorial from <a href="https://www.udemy.com/course/django-with-react-an-ecommerce-website/">Django with React | An Ecommerce Website</a> .

<b><u>Features</u></b>

- Login / Register
- Cart
- Add Reviews
- Update Profile
- Checkout
- PayPal Payment
- Add Products [Admin]
- User Update [Admin]
- Orders [Admin]

## SETUP 👷‍♂️

<b><u>Backend</u></b>

```bash
# Install requirments
$ cd backend
$ pip3 install -r requirements.txt
# Migrations
$ python3 manage.py makemigrations
$ python3 manage.py migrate
# Run server
$ python3 manage.py runserver
```

<b><u>Frontend</u></b>

```bash
# Install requirments
$ cd frontend
$ npm install
## Or yarn
$ yarn install
```

Add PayPal client id to `.env.local`

```javascript
REACT_APP_CLIENT_ID = YOUR_PAYPAL_CLIENT_ID
```

Run server

> Make sure that backend server is running on port 8080
>
> If you happen to change backend please edit proxy in `package.json`

```bash
$ npm start
## Or yarn
$ yarn start
```



