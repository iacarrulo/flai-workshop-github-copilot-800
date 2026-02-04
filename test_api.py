#!/usr/bin/env python3
import requests
import json

BASE_URL = "http://localhost:8000"

print("Testing OctoFit Tracker API Endpoints\n" + "="*50)

# Test API Root
print("\n1. Testing API Root (/)...")
try:
    response = requests.get(f"{BASE_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")

# Test Users endpoint
print("\n2. Testing Users API (/api/users/)...")
try:
    response = requests.get(f"{BASE_URL}/api/users/")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Total users: {len(data)}")
    if data:
        print(f"Sample user: {json.dumps(data[0], indent=2)}")
except Exception as e:
    print(f"Error: {e}")

# Test Teams endpoint
print("\n3. Testing Teams API (/api/teams/)...")
try:
    response = requests.get(f"{BASE_URL}/api/teams/")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Total teams: {len(data)}")
    if data:
        print(f"Teams: {[team['name'] for team in data]}")
except Exception as e:
    print(f"Error: {e}")

# Test Activities endpoint
print("\n4. Testing Activities API (/api/activities/)...")
try:
    response = requests.get(f"{BASE_URL}/api/activities/?limit=5")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Sample activities count: {len(data)}")
except Exception as e:
    print(f"Error: {e}")

# Test Leaderboard endpoint
print("\n5. Testing Leaderboard API (/api/leaderboard/)...")
try:
    response = requests.get(f"{BASE_URL}/api/leaderboard/")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Total entries: {len(data)}")
    if data:
        print(f"Top 3:")
        for i, entry in enumerate(data[:3], 1):
            print(f"  {i}. {entry['user_name']} - {entry['total_points']} pts")
except Exception as e:
    print(f"Error: {e}")

# Test Workouts endpoint
print("\n6. Testing Workouts API (/api/workouts/)...")
try:
    response = requests.get(f"{BASE_URL}/api/workouts/")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Total workouts: {len(data)}")
    if data:
        print(f"Sample workout: {data[0]['name']}")
except Exception as e:
    print(f"Error: {e}")

print("\n" + "="*50)
print("API Testing Complete!")
