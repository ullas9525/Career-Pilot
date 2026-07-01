# Request/Response Examples

This document provides exact JSON examples for critical API endpoints to ensure frontend-backend contract alignment.

## 1. POST `/api/auth/login`
**Request Payload:**
```json
{
  "email": "student@mit.edu",
  "password": "securepassword123"
}
```
**Response Payload (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "id": "a1b2c3d4-...",
    "role": "STUDENT",
    "university_id": "99887766-..."
  }
}
```

## 2. GET `/api/interviews/:id/results`
**Request:** HTTP GET with `Authorization: Bearer <token>`
**Response Payload (200 OK):**
```json
{
  "interview_id": "f5e4d3c2-...",
  "status": "COMPLETED",
  "career_readiness_score": 7.4,
  "score_breakdown": {
    "dimensions": [
      {
        "name": "System Design",
        "score": 6,
        "justification": "Candidate failed to mention load balancers or database sharding when asked to scale to 1M users.",
        "ideal_answer": "To scale to 1M users, I would introduce an NGINX load balancer, utilize Redis for caching hot data, and implement horizontal sharding on the Neon PostgreSQL database."
      },
      {
        "name": "Code Quality",
        "score": 8,
        "justification": "Candidate clearly articulated the time and space complexity of the sorting algorithm.",
        "ideal_answer": "N/A"
      }
    ]
  },
  "transcript": [
    {
      "speaker": "AI",
      "text": "Welcome. Let's discuss your project on microservices. Why did you choose Docker?",
      "timestamp": "2023-10-27T10:00:00Z"
    },
    {
      "speaker": "STUDENT",
      "text": "I used Docker to ensure environment consistency across development and production.",
      "timestamp": "2023-10-27T10:00:15Z"
    }
  ]
}
```
