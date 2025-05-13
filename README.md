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
   MONGODB_URI=
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

#### Search Functionality

The search feature allows you to find players by their name using partial matching (case-insensitive):

```
GET /players?search=kohli
```

This will return all players whose names contain "kohli", for example "Virat Kohli".

#### Examples:

1. **Basic listing with default pagination**:
   ```
   GET /players
   ```

2. **Custom pagination**:
   ```
   GET /players?page=2&limit=5
   ```

3. **Filter by team**:
   ```
   GET /players?team=Royal Challengers Banglore 
   ```

4. **Search by name**:
   ```
   GET /players?search=dhoni
   ```

5. **Sort by runs (ascending)**:
   ```
   GET /players?sort=runs
   ```

6. **Sort by salary (descending)**:
   ```
   GET /players?sort=-salary
   ```

7. **Combined filters**:
   ```
   GET /players?team=Mumbai Indians&search=ro&sort=-runs&page=1&limit=10
   ```
   This searches for players in Mumbai Indians whose names contain "ro" (e.g., "Rohit Sharma"), sorted by highest runs, showing the first 10 results.

#### Response Format:
```json
{
  "page": 1,
  "limit": 10,
  "total": 45,
  "players": [
    {
      "id": "unique-id",
      "name": "Player Name",
      "image": "https://example.com/player.jpg",
      "role": "Batsman",
      "team": "Team Name"
    },
    // More players...
  ]
}
```

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

**Example Response:**
```json
{
  "message": "Player created successfully"
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

You can update individual fields by including only the fields you want to change:
```json
{
  "runs": 3500,
  "salary": 120000000
}
```

**Example Response:**
```json
{
  "message": "Player updated successfully"
}
```

### 4. Delete Player
```
DELETE /players/:id
```

**Example Response:**
```json
{
  "message": "Player deleted successfully"
}
```

### 5. Get Player Description
```
GET /players/:id/description
```

**Example Response:**
```json
{
  "name": "Virat Kohli",
  "team": "Royal Challengers Banglore",
  "country": "India",
  "runs": 27000,
  "image": "https://example.com/virat.jpg",
  "role": "Batsman",
  "salary": 170000000
}
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

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400**: Bad Request - Invalid input data
- **404**: Not Found - Player not found
- **500**: Internal Server Error - Server issues

## Running in Production

To run the application in production:
```
npm start
``` 
