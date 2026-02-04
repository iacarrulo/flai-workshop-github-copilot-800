from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'team', 'created_at']
    list_filter = ['team', 'created_at']
    search_fields = ['name', 'email']
    ordering = ['name']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'members_count', 'total_points', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'description']
    ordering = ['-total_points']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'activity_type', 'duration', 'calories_burned', 
                    'points_earned', 'team', 'date']
    list_filter = ['activity_type', 'team', 'date']
    search_fields = ['user_name', 'user_email']
    ordering = ['-date']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['rank', 'user_name', 'team', 'total_points', 'total_activities', 
                    'last_updated']
    list_filter = ['team', 'last_updated']
    search_fields = ['user_name', 'user_email']
    ordering = ['rank']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'activity_type', 'difficulty', 'duration', 
                    'calories_per_session', 'created_at']
    list_filter = ['activity_type', 'difficulty', 'created_at']
    search_fields = ['name', 'description', 'recommended_for']
    ordering = ['name']
