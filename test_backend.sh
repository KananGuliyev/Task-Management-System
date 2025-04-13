#!/bin/bash

# === Register user ===
echo "📤 Registering user..."
curl -s -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"samantha", "email":"samantha@example.com", "password":"secure123"}'
echo -e "\n✅ Registration attempt complete"

# === Login user ===
echo "🔐 Logging in..."
TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"samantha", "password":"secure123"}' | jq -r '.token')
echo "🔑 Token received: $TOKEN"

# === Invalid Login ===
echo "🚫 Attempting login with wrong password..."
curl -s -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"samantha", "password":"wrongpass"}'
echo -e "\n✅ Invalid login test complete"

# === Unauthorized Access ===
echo "🚫 Attempting task list fetch without token..."
curl -s -X GET http://localhost:8080/api/tasks
echo -e "\n✅ Unauthorized access test complete"

# === Invalid Token Access ===
echo "🚫 Attempting task fetch with invalid token..."
curl -s -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer fake.invalid.token"
echo -e "\n✅ Invalid token test complete"

# === Create task (valid) ===
echo "📝 Creating task..."
curl -s -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Finish Backend",
    "description": "Implement all endpoints and JWT auth",
    "status": "In Progress",
    "dueDate": "2025-04-15"
  }'
echo -e "\n✅ Task created"

# === Create task (missing fields) ===
echo "⚠️ Creating task with missing fields..."
curl -s -X POST http://localhost:8080/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
echo -e "\n✅ Missing field validation test complete"

# === 404 Handling - Get/Delete non-existent task ===
echo "🔍 Getting non-existent task..."
curl -s -X GET http://localhost:8080/api/tasks/9999 \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n✅ Get 404 test complete"

echo "🗑️ Deleting non-existent task..."
curl -s -X DELETE http://localhost:8080/api/tasks/9999 \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n✅ Delete 404 test complete"

# === Final list ===
echo "📋 Listing current tasks..."
curl -s -X GET http://localhost:8080/api/tasks \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n✅ Final list complete"

