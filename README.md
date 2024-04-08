# InvoicePro
InvoicePro is a web application simplifying invoice creation and customer management for businesses. It enables easy customer profile setup and efficient invoice generation, improving workflow and financial tracking.

## Key Features:

- **User Authentication**: Admin user can login and obtain JWT tokens for secure API access.
- **Customer**: Create, retrieve, update customers effortlessly.
- **Authorization**: Ensure that only authorized users can access and manipulate their tasks.
- **User-Friendly**: Provides a user-friendly interface for seamless management.
  
## Technologies and tools used

- **Server**: Django
- **Primary database**: SQLite3
- **Authentication**: JWT
- **API Framework**: Django REST Framework (DRF)

## Authentication API

- **Login API**: Users can authenticate and obtain a JWT (JSON Web Token).
- **Refresh API**: Refreshes the JWT token and provides a new token to the user.

## CRUD APIs

- **Create API**: Allows users to create a new todo by providing the title and description.
- **List API**: List the details of the todos, including their title, description, and status, of the logged-in user.
- **Update API**: Allows users to update the information of an existing todo. The API returns the updated snippet details as a response.
# Installation and Setup

To run the InvoicePro locally, follow these steps:

### Clone the GitHub repository:

     https://github.com/sanjay-jc/Invoicepro.git

### Navigate to the project directory
## Steps to start the server

     cd Invoicepro/backend

### Create a virtual environment:

     virtualenv venv

### Activate the virtual environment:

     source venv/bin/activate

### Install the required dependencies:

     pip install -r requirements.txt

### Apply the database migrations:

     python manage.py makemigrations

### Apply the database migrations:

     python manage.py migrate

### Start the development server:

     python manage.py runserver

### Running Tests

     python manage.py test local_apps.invoices.tests

## Running Frontend
### Install the required dependencies:

     npm install

### Start the development server:

     npm start

## Postman Collections

- [Postman Collections](https://github.com/sanjay-jc/Invoicepro/blob/main/InvoicePro.postman_collection.json)
