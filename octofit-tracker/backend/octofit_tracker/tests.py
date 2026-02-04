from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import User, Team, Activity, Leaderboard, Workout


class UserModelTest(TestCase):
    """Test cases for User model."""
    
    def setUp(self):
        self.user = User.objects.create(
            name='Test Hero',
            email='test@hero.com',
            team='Test Team'
        )
    
    def test_user_creation(self):
        """Test user creation."""
        self.assertEqual(self.user.name, 'Test Hero')
        self.assertEqual(self.user.email, 'test@hero.com')
        self.assertEqual(self.user.team, 'Test Team')
    
    def test_user_str(self):
        """Test user string representation."""
        self.assertEqual(str(self.user), 'Test Hero')


class TeamModelTest(TestCase):
    """Test cases for Team model."""
    
    def setUp(self):
        self.team = Team.objects.create(
            name='Test Team',
            description='A test team',
            members_count=5,
            total_points=1000
        )
    
    def test_team_creation(self):
        """Test team creation."""
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(self.team.members_count, 5)
        self.assertEqual(self.team.total_points, 1000)
    
    def test_team_str(self):
        """Test team string representation."""
        self.assertEqual(str(self.team), 'Test Team')


class ActivityModelTest(TestCase):
    """Test cases for Activity model."""
    
    def setUp(self):
        self.activity = Activity.objects.create(
            user_email='test@hero.com',
            user_name='Test Hero',
            team='Test Team',
            activity_type='Running',
            duration=30,
            calories_burned=300,
            points_earned=30
        )
    
    def test_activity_creation(self):
        """Test activity creation."""
        self.assertEqual(self.activity.user_name, 'Test Hero')
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30)
    
    def test_activity_str(self):
        """Test activity string representation."""
        self.assertEqual(str(self.activity), 'Test Hero - Running')


class UserAPITest(APITestCase):
    """Test cases for User API endpoints."""
    
    def setUp(self):
        self.user_data = {
            'name': 'API Hero',
            'email': 'api@hero.com',
            'team': 'API Team'
        }
        self.user = User.objects.create(**self.user_data)
    
    def test_get_users(self):
        """Test retrieving users list."""
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_user(self):
        """Test creating a new user."""
        url = reverse('user-list')
        new_user_data = {
            'name': 'New Hero',
            'email': 'new@hero.com',
            'team': 'New Team'
        }
        response = self.client.post(url, new_user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)


class TeamAPITest(APITestCase):
    """Test cases for Team API endpoints."""
    
    def setUp(self):
        self.team = Team.objects.create(
            name='API Team',
            description='Test team',
            members_count=0,
            total_points=0
        )
    
    def test_get_teams(self):
        """Test retrieving teams list."""
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_create_team(self):
        """Test creating a new team."""
        url = reverse('team-list')
        team_data = {
            'name': 'New API Team',
            'description': 'Another test team',
            'members_count': 0,
            'total_points': 0
        }
        response = self.client.post(url, team_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class ActivityAPITest(APITestCase):
    """Test cases for Activity API endpoints."""
    
    def setUp(self):
        self.activity = Activity.objects.create(
            user_email='test@hero.com',
            user_name='Test Hero',
            team='Test Team',
            activity_type='Running',
            duration=30,
            calories_burned=300,
            points_earned=30
        )
    
    def test_get_activities(self):
        """Test retrieving activities list."""
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_filter_activities_by_user(self):
        """Test filtering activities by user email."""
        url = reverse('activity-list')
        response = self.client.get(url, {'user_email': 'test@hero.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaderboardAPITest(APITestCase):
    """Test cases for Leaderboard API endpoints."""
    
    def setUp(self):
        self.entry = Leaderboard.objects.create(
            user_name='Test Hero',
            user_email='test@hero.com',
            team='Test Team',
            total_points=100,
            total_activities=5,
            rank=1
        )
    
    def test_get_leaderboard(self):
        """Test retrieving leaderboard."""
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkoutAPITest(APITestCase):
    """Test cases for Workout API endpoints."""
    
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='A test workout',
            activity_type='Running',
            difficulty='Intermediate',
            duration=30,
            calories_per_session=300,
            recommended_for='Everyone'
        )
    
    def test_get_workouts(self):
        """Test retrieving workouts list."""
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_filter_workouts_by_difficulty(self):
        """Test filtering workouts by difficulty."""
        url = reverse('workout-list')
        response = self.client.get(url, {'difficulty': 'Intermediate'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class APIRootTest(APITestCase):
    """Test cases for API root endpoint."""
    
    def test_api_root(self):
        """Test API root returns proper links."""
        url = reverse('api-root')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)
