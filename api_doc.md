# PreOwned API Documentation

## Models

### User

```md
- username: string
- email : string, required
- password : string, required
```

### Post

```md
- name : string, required
- price : string, required
- location : string, required
- condition : string, required
- imageUrl : string
- CategoryId : integer, required
- UserId : integer, required
```

### Category

```md
- name : string, required
```

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `POST /posts`
- `GET /posts`
- `GET /posts/:id`
- `GET /myposts`
- `GET /categories`

Routes below need authentication & authorization:

- `PUT /posts/:id`
- `DELETE /posts/:id`

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "email": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is Required"
}
OR
{
  "message": "Email Must be Email Format"
}
```

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is Required"
}
OR
{
  "message": "Password is Required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
OR
{
  "message": "Invalid token"
}
```

## 3. GET /posts

Fetch all posts from database

Request:

- headers:

```json
{
  "authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
  {
    "name": "iPhone 15 Pro Max",
    "price": "28000000",
    "location": "DKI Jakarta",
    "condition": "Good",
    "imageUrl": "https://media.karousell.com/media/photos/products/2023/12/2/iphone_15_pro_max_256gb_second_1701502967_750c1eba_progressive.jpg",
    "CategoryId": 1,
    "UserId": 1
  },
  {
    "name": "Samsung Z Fold 5",
    "price": "25000000",
    "location": "Bandung",
    "condition": "Good",
    "imageUrl": "https://media.karousell.com/media/photos/products/2023/8/25/samsung_z_fold_5_5g_12gb_512gb_1692955030_d97280f7_progressive",
    "CategoryId": 1,
    "UserId": 1
  },
  {
    "name": "MSI GF63",
    "price": "18000000",
    "location": "Surabaya",
    "condition": "Good",
    "imageUrl": "https://media.karousell.com/media/photos/products/2023/7/13/msi_gf63_thin_gaming_laptop_1689250604_ded846a0.jpg",
    "CategoryId": 2,
    "UserId": 1
  },
  ...,
]
```

## 4. GET /posts/:id

Add new posts

Request:

- headers:

```json
{
  "authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "UserId": "integer"
}
```

Response (201 - Created)

```json
{
  "name": "Macbook Pro M2",
  "price": "28000000",
  "location": "DKI Jakarta",
  "condition": "Good",
  "imageUrl": "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/25/9f7f0126-b88b-4ed2-8a2e-8e78850adf81.jpg",
  "CategoryId": 2,
  "UserId": 1
}
```

Response (400 - Bad Request)

```json
{
  "message": "Name is Required"
}
OR
{
  "message": "Price is Required"
}
OR
{
  "message": "Location is Required"
}
OR
{
  "message": "Condition is Required"
}
OR
{
  "message": "CategoryId is Required"
}
OR
{
  "message": "UserId is Required"
}
```

Response (404 - Not Found)

```json
{
  "message": "Post not found"
}
```

## 5. GET /sell

Sell Post

Response (200 - OK)

```json
[
  {
    "id": 8,
    "name": "Samsung Galaxy Z Flip 5 5g 256gb Second Lengkap Garansi Panjang",
    "price": 12600000,
    "location": "Yogyakarta",
    "condition": "Good",
    "imageUrl": "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/10/25/5aa421b5-d6bd-4f9e-adea-9bd9512899c0.jpg",
    "CategoryId": 1,
    "UserId": 2,
    "createdAt": "2023-12-20T06:58:07.875Z",
    "updatedAt": "2023-12-20T06:58:07.875Z",
    "Category": {
      "id": 1,
      "name": "Handphone",
      "createdAt": "2023-12-19T17:55:15.448Z",
      "updatedAt": "2023-12-19T17:55:15.448Z"
    },
    "User": {
      "id": 2,
      "username": null,
      "email": "admin2@mail.com",
      "password": "$2b$10$.M7wpfI3W8KOLUPh1tcZ6uLBUeCIi1TCBNg4k0gj6npdFevYE5UBO",
      "createdAt": "2023-12-20T06:14:12.151Z",
      "updatedAt": "2023-12-20T06:14:12.151Z"
    }
  }
]
```

## 6. GET /myposts

Get current user favourites

Request:

- headers:

```json
{
  "authorization": "Bearer <string token>"
}
```

Response (200 - OK)

```json
[
    {
    "name": "iPhone 15 Pro Max",
    "price": "28000000",
    "location": "DKI Jakarta",
    "condition": "Good",
    "imageUrl": "https://media.karousell.com/media/photos/products/2023/12/2/iphone_15_pro_max_256gb_second_1701502967_750c1eba_progressive.jpg",
    "CategoryId": 1,
    "UserId": 1
  },
  ...,
]
```

## 7. PUT /posts/:id

- Update posts

Request:

- headers:

```json
{
  "authorization": "Bearer <string token>"
}
```

- params:

```json
{
  "id": "integer"
}
```

- body:

```json
{
  "name": "iPhone 15 Pro Max",
  "price": "28000000",
  "location": "DKI Jakarta",
  "condition": "Good",
  "imageUrl": "https://media.karousell.com/media/photos/products/2023/12/2/iphone_15_pro_max_256gb_second_1701502967_750c1eba_progressive.jpg",
  "CategoryId": 1,
  "UserId": 1
}
```

Response (200 - OK)

```json
{
  "message": "Post has been updated"
}
```

Response (404 - Not Found)

```json
{
  "message": "Post not found"
}
```

## 8. GET /categories

Response (200 - OK)

```json
[
  {
    "id": 1,
    "name": "Handphone",
    "createdAt": "2023-12-19T17:06:10.451Z",
    "updatedAt": "2023-12-19T17:06:10.451Z"
  },
  {
    "id": 2,
    "name": "Laptop",
    "createdAt": "2023-12-19T17:06:10.451Z",
    "updatedAt": "2023-12-19T17:06:10.451Z"
  },
  {
    "id": 3,
    "name": "Tablet",
    "createdAt": "2023-12-19T17:06:10.451Z",
    "updatedAt": "2023-12-19T17:06:10.451Z"
  }
]
```

## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
