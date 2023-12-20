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

## 4. POST /posts/:id

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

Response (404 - Not Found)

```json
{
  "message": "Post not found"
}
```

## 5. GET /myposts

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

## 6. PUT /posts/:id

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
