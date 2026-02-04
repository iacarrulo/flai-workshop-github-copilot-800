from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['_id', 'name', 'email', 'team', 'created_at']
        read_only_fields = ['_id', 'created_at']


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['_id', 'name', 'description', 'members_count', 'total_points', 'created_at']
        read_only_fields = ['_id', 'created_at']


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['_id', 'user_email', 'user_name', 'team', 'activity_type', 
                  'duration', 'calories_burned', 'points_earned', 'date']
        read_only_fields = ['_id', 'date']


class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = ['_id', 'user_name', 'user_email', 'team', 'total_points', 
                  'total_activities', 'rank', 'last_updated']
        read_only_fields = ['_id', 'last_updated']


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description', 'activity_type', 'difficulty', 
                  'duration', 'calories_per_session', 'recommended_for', 'created_at']
        read_only_fields = ['_id', 'created_at']
