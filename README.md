# IPL Players Management API

A RESTful API for managing IPL players built with Node.js, Express, and MongoDB.

## Features

- List all IPL players with pagination, filtering, sorting, and searching
- Create new players
- Update existing players
- Delete players
- Get detailed player descriptions

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/iplapi
   ```
4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### 1. List All Players
```
GET /players
```
Query Parameters:
- `page`: Page number for pagination (default: 1)
- `limit`: Number of results per page (default: 10)
- `team`: Filter players by team
- `search`: Search players by name
- `sort`: Sort by runs or salary (use `-runs` or `-salary` for descending order)

### 2. Create Player
```
POST /players
```
Request Body:
```json
{
  "name": "New Player Name",
  "team": "New Team",
  "country": "New Country",
  "runs": 5000,
  "image": "https://linktoimage.com/newplayer.jpg",
  "role": "All-rounder",
  "salary": 200000000
}
```

### 3. Update Player
```
PATCH /players/:id
```
Request Body:
```json
{
  "name": "Updated Player Name",
  "team": "Updated Team Name",
  "country": "Updated Country",
  "runs": 3000,
  "image": "https://linktoimage.com/updatedplayer.jpg",
  "role": "Batsman",
  "salary": 100000000
}
```

### 4. Delete Player
```
DELETE /players/:id
```

### 5. Get Player Description
```
GET /players/:id/description
```

## Validation

The API validates all inputs using Joi. Required fields include:
- `name`: String, required
- `team`: String, required
- `country`: String, required
- `runs`: Integer, required
- `image`: String, required
- `role`: String, must be one of: Batsman, Bowler, All-rounder
- `salary`: Number, positive, required

## Running in Production

To run the application in production:
```
npm start
``` 