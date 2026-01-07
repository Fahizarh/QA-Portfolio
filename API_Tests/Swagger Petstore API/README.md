## 📘 Swagger Petstore API Testing Project

This project was made to practice API testing skills in Postman. This is an API with a Swagger UI frontend simulating a pet store.

### Project Overview
API Name: Swagger Petstore

Base URL: https://petstore.swagger.io/v2

Documentation: https://petstore.swagger.io/


### ✅ API 1: Add new pet to store
- Endpoint: /pet
- Description: Adds a new pet to the store
- Request Method: POST
- Response Code: 200

### ✅ API 2: Find pets by status
- Endpoint: /pet/findByStatus
- Description: Returns all pets with the status provided. Takes in status as a query parameter.
- Request Method: GET
- Response Code: 200

### ✅ API 3: Find pet by ID
- Endpoint: /pet/{petId}
- Description: Returns the pet with the ID provided. Takes in petId as a path variable.
- Request Method: GET
- Response Code: 200

### ✅ API 4: Update a pet in store with form data
- Endpoint: /pet/{petId}
- Description: Updates a pet that already exists in the store using form data. Takes in petId as a path variable, and name and status as formData.
- Request Method: POST
- Response Code: 200

### ✅ API 5: Update an existing pet
- Endpoint: /pet
- Description: Updates an existing pet in the store.
- Request Method: PUT
- Response Code: 200

### ✅ API 6: Access pet inventory by status
- Endpoint: /store/inventory
- Description: Returns a map of status codes to quantities.
- Request Method: GET
- Response Code: 200

### ✅ API 7: Place an order for a pet
- Endpoint: /store/order
- Description: Place an order to purchase a pet.
- Request Method: POST
- Response Code: 200

### ✅ API 8: Find purchase order by ID
- Endpoint: /store/order/{orderId}
- Description: Finds a purchase order with the specified ID.  Takes in the orderId as a path variable.
- Request Method: GET
- Response Code: 200

### ✅ API 9: Delete purchase order by ID
- Endpoint: /store/order/{orderId}
- Description: Delete a purchase order with the specified ID.  Takes in the orderId as a path variable.
- Request Method: DELETE
- Response Code: 200

### ✅ API 10: Create a list of users
- Endpoint: /user/createWithList
- Description: Creates a list of users with the given input array.
- Request Method: POST
- Response Code: 200

### ✅ API 11: Get user
- Endpoint: /user/{username}
- Description: Finds a user by their username. Takes in username as a path variable.
- Request Method: GET
- Response Code: 200

### ✅ API 12: Update a user
- Endpoint: /user/{username}
- Description: Updates a user by their username. Takes in username as a path variable.
- Request Method: PUT
- Response Code: 200

### ✅ API 13: Log user into the system
- Endpoint: /user/login
- Description: Log the user into the system. Takes in username and password as query parameters.
- Request Method: GET    
- Response Code: 200

### ✅ API 14: Log out user
- Endpoint: /user/logout
- Description: Logs out the current logged-in user session.
- Request Method: GET
- Response Code: 200
