from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import (
    UserSerializer, TeamSerializer, ActivitySerializer,
    LeaderboardSerializer, WorkoutSerializer
)


@api_view(['GET'])
def api_root(request, format=None):
    """
    API root endpoint providing links to all available endpoints.
    """
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'teams': reverse('team-list', request=request, format=format),
        'activities': reverse('activity-list', request=request, format=format),
        'leaderboard': reverse('leaderboard-list', request=request, format=format),
        'workouts': reverse('workout-list', request=request, format=format),
    })


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing users.
    
    Provides CRUD operations for user records.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_queryset(self):
        """
        Optionally filter users by team.
        """
        queryset = User.objects.all()
        team = self.request.query_params.get('team', None)
        if team is not None:
            queryset = queryset.filter(team=team)
        return queryset


class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing teams.
    
    Provides CRUD operations for team records.
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing activities.
    
    Provides CRUD operations for activity records.
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    
    def get_queryset(self):
        """
        Optionally filter activities by user email or team.
        """
        queryset = Activity.objects.all()
        user_email = self.request.query_params.get('user_email', None)
        team = self.request.query_params.get('team', None)
        
        if user_email is not None:
            queryset = queryset.filter(user_email=user_email)
        if team is not None:
            queryset = queryset.filter(team=team)
        
        return queryset.order_by('-date')


class LeaderboardViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing leaderboard.
    
    Provides CRUD operations for leaderboard records.
    """
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer
    
    def get_queryset(self):
        """
        Return leaderboard ordered by rank.
        Optionally filter by team.
        """
        queryset = Leaderboard.objects.all()
        team = self.request.query_params.get('team', None)
        
        if team is not None:
            queryset = queryset.filter(team=team)
        
        return queryset.order_by('rank')


class WorkoutViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing workouts.
    
    Provides CRUD operations for workout records.
    """
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    
    def get_queryset(self):
        """
        Optionally filter workouts by activity type or difficulty.
        """
        queryset = Workout.objects.all()
        activity_type = self.request.query_params.get('activity_type', None)
        difficulty = self.request.query_params.get('difficulty', None)
        
        if activity_type is not None:
            queryset = queryset.filter(activity_type=activity_type)
        if difficulty is not None:
            queryset = queryset.filter(difficulty=difficulty)
        
        return queryset
