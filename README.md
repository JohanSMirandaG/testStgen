# Backend Order API

This is a simple Node.js backend API that handles orders for sandwiches and extras (like fries and soft drinks). It allows for listing items, creating orders, updating, and deleting them, with support for discounts based on the selected extras.

## Features
- List all available items (sandwiches and extras).
- Create an order with selected sandwich and extras.
- Apply discounts based on selected extras.
- List all orders.
- Update and delete orders.

## API Endpoints

### 1. `GET /items`
- Description: List all available items (sandwiches and extras).
- Response:
```json
  {
    "sandwiches": [
      { "id": 1, "name": "X Burger", "price": 5.0 },
      { "id": 2, "name": "X Egg", "price": 4.5 },
      { "id": 3, "name": "X Bacon", "price": 7.0 }
    ],
    "extras": [
      { "id": 1, "name": "Fries", "price": 2.0 },
      { "id": 2, "name": "Soft drink", "price": 2.5 }
    ]
  }
```

### 2. `GET /items/sandwiches`
- Description: List all available sandwiches.
- Response: A list of sandwich objects.
```json
[
    {
        "id": 1,
        "name": "X Burger",
        "price": 5
    },
    {
        "id": 2,
        "name": "X Egg",
        "price": 4.5
    },
    {
        "id": 3,
        "name": "X Bacon",
        "price": 7
    }
]
```

### 3. `GET /items/extras`
- Description: List all available extras.
- Response: A list of extra objects.
```json
[
    {
        "id": 1,
        "name": "Fries",
        "price": 2
    },
    {
        "id": 2,
        "name": "Soft drink",
        "price": 2.5
    }
]
```

### 4. `POST /orders`
- Description: Create an order with selected sandwich and extras.
- Request Body:
```json
  {
    "sandwichId": 1,
    "extras": [1, 2]
  }
```

- Response:
```json
  {
    "id": 1,
    "sandwich": { "id": 1, "name": "X Burger", "price": 5.0 },
    "extras": [
      { "id": 1, "name": "Fries", "price": 2.0 },
      { "id": 2, "name": "Soft drink", "price": 2.5 }
    ],
    "totalPrice": 9.5
  }
```

- Discounts:
  - 20% off if both extras are selected.
  - 15% off if "Soft drink" is selected.
  - 10% off if "Fries" is selected.

### 5. `GET /orders`
- Description: List all created orders.
- Response: A list of order objects.
```json
[
    {
        "id": 1,
        "sandwich": {
            "id": 1,
            "name": "X Burger",
            "price": 5
        },
        "extras": [
            {
                "id": 2,
                "name": "Soft drink",
                "price": 2.5
            }
        ],
        "totalPrice": 6.375
    }
]
```

### 6. `PUT /orders/:id`
- Description: Update an existing order.
- Request Body:
```json
  {
    "sandwichId": 2,
    "extras": [1]
  }
```

- Response:
```json
  {
    "id": 1,
    "sandwich": { "id": 2, "name": "X Egg", "price": 4.5 },
    "extras": [
      { "id": 1, "name": "Fries", "price": 2.0 }
    ],
    "totalPrice": 6.5
  }
```

### 7. `DELETE /orders/:id`
- Description: Delete an order.
- Response: 204 No Content on success.

## How to Run with Docker

1. Build the Docker image:

```bash
docker build -t backend-order-api .
```

2. Run the Docker container:

```bash
docker run -p 3000:3000 backend-order-api
```

3. The server will be running on `http://localhost:3000`.

## Discount Logic
- If two extras are selected, a 20% discount is applied to the total price.
- If only a soft drink is selected, a 15% discount is applied.
- If only fries are selected, a 10% discount is applied.
