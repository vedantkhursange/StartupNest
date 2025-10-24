# StartupNest API Documentation

## Base URL
\`\`\`
http://localhost:8080/api
\`\`\`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

## User Endpoints

### Register User
\`\`\`
POST /user/signup
Content-Type: application/json

{
  "userName": "string (required, unique)",
  "email": "string (required, unique)",
  "mobile": "string (required, unique, 10 digits)",
  "password": "string (required, 8+ chars)",
  "role": "Entrepreneur | Mentor (required)"
}

Response (200):
{
  "message": "User created successfully",
  "user": {
    "_id": "ObjectId",
    "userName": "string",
    "email": "string",
    "role": "string"
  }
}
\`\`\`

### Login User
\`\`\`
POST /user/login
Content-Type: application/json

{
  "email": "string (required)",
  "password": "string (required)"
}

Response (200):
{
  "token": "JWT token",
  "userName": "string",
  "role": "Entrepreneur | Mentor",
  "userId": "ObjectId"
}
\`\`\`

## Startup Profile Endpoints

### Get All Startup Profiles
\`\`\`
GET /startupProfile/getAllStartupProfiles

Response (200):
[
  {
    "_id": "ObjectId",
    "mentorId": "ObjectId",
    "category": "string",
    "description": "string",
    "fundingLimit": "number",
    "avgEquityExpectation": "number",
    "targetIndustry": "string",
    "preferredStage": "idea | MVP | pre-revenue | scaling | established",
    "createdAt": "Date"
  }
]
\`\`\`

### Get Startup Profile by ID
\`\`\`
GET /startupProfile/getStartupProfileById/:id

Response (200):
{
  "_id": "ObjectId",
  "mentorId": "ObjectId",
  "category": "string",
  "description": "string",
  "fundingLimit": "number",
  "avgEquityExpectation": "number",
  "targetIndustry": "string",
  "preferredStage": "string",
  "createdAt": "Date"
}
\`\`\`

### Get Profiles by Mentor ID
\`\`\`
GET /startupProfile/getStartupProfilesByMentorId/:mentorId

Response (200):
[
  {
    "_id": "ObjectId",
    "mentorId": "ObjectId",
    "category": "string",
    ...
  }
]
\`\`\`

### Add Startup Profile
\`\`\`
POST /startupProfile/addStartupProfile
Authorization: Bearer <token>
Content-Type: application/json

{
  "mentorId": "ObjectId (required)",
  "category": "string (required)",
  "description": "string (required)",
  "fundingLimit": "number (required)",
  "avgEquityExpectation": "number (required)",
  "targetIndustry": "string (required)",
  "preferredStage": "idea | MVP | pre-revenue | scaling | established (required)"
}

Response (200):
{
  "message": "Profile created successfully",
  "profile": { ... }
}
\`\`\`

### Update Startup Profile
\`\`\`
PUT /startupProfile/updateStartupProfile/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "category": "string",
  "description": "string",
  "fundingLimit": "number",
  "avgEquityExpectation": "number",
  "targetIndustry": "string",
  "preferredStage": "string"
}

Response (200):
{
  "message": "Profile updated successfully",
  "profile": { ... }
}
\`\`\`

### Delete Startup Profile
\`\`\`
DELETE /startupProfile/deleteStartupProfile/:id
Authorization: Bearer <token>

Response (200):
{
  "message": "Profile deleted successfully"
}
\`\`\`

## Startup Submission Endpoints

### Add Startup Submission
\`\`\`
POST /startupSubmission/addStartupSubmission
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "ObjectId (required)",
  "userName": "string (required)",
  "startupProfileId": "ObjectId (required)",
  "marketPotential": "number (required, 1-10)",
  "launchYear": "Date (required)",
  "expectedFunding": "number (required)",
  "address": "string (required)",
  "pitchDeckFile": "string (required, file path)"
}

Response (200):
{
  "message": "Submission created successfully",
  "submission": { ... }
}
\`\`\`

### Get All Startup Submissions
\`\`\`
POST /startupSubmission/getAllStartupSubmissions
Authorization: Bearer <token>
Content-Type: application/json

{
  "page": "number (optional, default: 1)",
  "pageSize": "number (optional, default: 10)",
  "searchValue": "string (optional, search by userName)",
  "sortBy": "string (optional, field to sort)",
  "sortValue": "1 | -1 (optional, 1 for asc, -1 for desc)",
  "status": "number (optional, 1: Submitted, 2: Shortlisted, 3: Rejected)"
}

Response (200):
{
  "submissions": [ ... ],
  "totalCount": "number"
}
\`\`\`

### Get Submissions by User ID
\`\`\`
GET /startupSubmission/getSubmissionsByUserId/:userId
Authorization: Bearer <token>

Response (200):
[
  {
    "_id": "ObjectId",
    "userId": "ObjectId",
    "userName": "string",
    "startupProfileId": "ObjectId",
    "submissionDate": "Date",
    "marketPotential": "number",
    "launchYear": "Date",
    "expectedFunding": "number",
    "status": "number",
    "address": "string",
    "pitchDeckFile": "string"
  }
]
\`\`\`

### Get Submission by ID
\`\`\`
GET /startupSubmission/getStartupSubmissionById/:id
Authorization: Bearer <token>

Response (200):
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "userName": "string",
  "startupProfileId": "ObjectId",
  "submissionDate": "Date",
  "marketPotential": "number",
  "launchYear": "Date",
  "expectedFunding": "number",
  "status": "number",
  "address": "string",
  "pitchDeckFile": "string"
}
\`\`\`

### Update Submission
\`\`\`
PUT /startupSubmission/updateStartupSubmission/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "number (1: Submitted, 2: Shortlisted, 3: Rejected)"
}

Response (200):
{
  "message": "Submission updated successfully",
  "submission": { ... }
}
\`\`\`

### Delete Submission
\`\`\`
DELETE /startupSubmission/deleteStartupSubmission/:id
Authorization: Bearer <token>

Response (200):
{
  "message": "Submission deleted successfully"
}
\`\`\`

## Error Responses

### 400 Bad Request
\`\`\`json
{
  "message": "Validation error or missing required fields"
}
\`\`\`

### 401 Unauthorized
\`\`\`json
{
  "message": "Authentication failed"
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "message": "Resource not found"
}
\`\`\`

### 500 Internal Server Error
\`\`\`json
{
  "message": "Internal server error"
}
\`\`\`

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

## Submission Status Codes

| Code | Status |
|------|--------|
| 1 | Submitted |
| 2 | Shortlisted |
| 3 | Rejected |

## Preferred Stage Options

- `idea` - Idea stage
- `MVP` - Minimum Viable Product
- `pre-revenue` - Pre-revenue stage
- `scaling` - Scaling stage
- `established` - Established business

---

**API Base URL:** `http://localhost:8080/api`
**Authentication:** JWT Bearer Token
**Content-Type:** application/json
