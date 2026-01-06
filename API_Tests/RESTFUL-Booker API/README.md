## 📘 Restful Booker API Testing Project

This project was made to practice API testing skills in Postman. The API includes CRUD operations for managing bookings and has built-in authentication, making it ideal for learning and automation.

### Project Overview
API Name: Restful-Booker
Base URL: https://restful-booker.herokuapp.com/
Documentation: https://restful-booker.herokuapp.com/apidoc/index.html

---

### ✅ API 1: Create Authentication Token
- API URL: https://restful-booker.herokuapp.com/auth
- Description: Creates a new auth token to use for access to the PUT and DELETE /booking
- Request Method: POST
- Response Code: 200
- Response JSON: token

### ✅ API 2: Get All Booking Ids
- API URL: https://restful-booker.herokuapp.com/booking
- Description: Returns the ids of all the bookings that exist within the API. Can take optional query strings to search and return a subset of booking ids.
- Request Method: GET
- Response Code: 200

### ✅ API 3: Get A Specific Booking
- API URL: https://restful-booker.herokuapp.com/booking/:id
- Description: Returns a specific booking based upon the booking id provided.
- Request Method: GET
- Response Code: 200

### ✅ API 4: Create New Booking
- API URL: https://restful-booker.herokuapp.com/booking
- Description: Creates a new booking in the API.
- Request Method: POST
- Response Code: 200

### ✅ API 5: Update Booking
- API URL: https://restful-booker.herokuapp.com/booking/:id
- Description: Updates a current booking.
- Request Method: PUT
- Response Code: 200

### ✅ API 6: Partial Update Booking
- API URL: https://restful-booker.herokuapp.com/booking/:id
- Description: Updates a current booking with a partial payload.
- Request Method: PATCH
- Response Code: 200

### ✅ API 7: Delete Booking
- API URL: https://restful-booker.herokuapp.com/booking/:id
- Description: Deletes a booking from the API. Requires an authorization token to be set in the header or a Basic auth header.
- Request Method: DELETE
- Response Code: 201 Created

### ✅ API 8: Ping - Health Check
- API URL: https://restful-booker.herokuapp.com/ping
- Description: A simple health check endpoint to confirm whether the API is up and running.
- Request Method: GET
- Response Code: 201 Created
