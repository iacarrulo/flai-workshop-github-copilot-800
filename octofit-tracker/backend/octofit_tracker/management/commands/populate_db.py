from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        self.stdout.write('Clearing existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Avengers assemble! A team of super heroes fighting for fitness and glory.',
            members_count=0,
            total_points=0
        )
        
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League united! Heroes dedicated to health and wellness.',
            members_count=0,
            total_points=0
        )
        
        # Create Users (Super Heroes)
        self.stdout.write('Creating super hero users...')
        marvel_heroes = [
            {'name': 'Iron Man', 'email': 'tony.stark@marvel.com'},
            {'name': 'Captain America', 'email': 'steve.rogers@marvel.com'},
            {'name': 'Thor', 'email': 'thor.odinson@marvel.com'},
            {'name': 'Black Widow', 'email': 'natasha.romanoff@marvel.com'},
            {'name': 'Hulk', 'email': 'bruce.banner@marvel.com'},
            {'name': 'Spider-Man', 'email': 'peter.parker@marvel.com'},
            {'name': 'Black Panther', 'email': 'tchalla@marvel.com'},
            {'name': 'Doctor Strange', 'email': 'stephen.strange@marvel.com'},
        ]
        
        dc_heroes = [
            {'name': 'Superman', 'email': 'clark.kent@dc.com'},
            {'name': 'Batman', 'email': 'bruce.wayne@dc.com'},
            {'name': 'Wonder Woman', 'email': 'diana.prince@dc.com'},
            {'name': 'Flash', 'email': 'barry.allen@dc.com'},
            {'name': 'Aquaman', 'email': 'arthur.curry@dc.com'},
            {'name': 'Green Lantern', 'email': 'hal.jordan@dc.com'},
            {'name': 'Cyborg', 'email': 'victor.stone@dc.com'},
            {'name': 'Shazam', 'email': 'billy.batson@dc.com'},
        ]
        
        users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team Marvel'
            )
            users.append(user)
        
        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team DC'
            )
            users.append(user)
        
        # Update team member counts
        team_marvel.members_count = len(marvel_heroes)
        team_marvel.save()
        team_dc.members_count = len(dc_heroes)
        team_dc.save()
        
        # Create Workouts
        self.stdout.write('Creating workout plans...')
        workouts_data = [
            {
                'name': 'Super Soldier Strength Training',
                'description': 'Build strength like Captain America with this intense weightlifting routine.',
                'activity_type': 'Strength Training',
                'difficulty': 'Advanced',
                'duration': 60,
                'calories_per_session': 400,
                'recommended_for': 'All heroes looking to build muscle'
            },
            {
                'name': 'Speed Force Cardio',
                'description': 'High-intensity interval training to boost your speed and endurance.',
                'activity_type': 'Running',
                'difficulty': 'Intermediate',
                'duration': 45,
                'calories_per_session': 500,
                'recommended_for': 'Speedsters and cardio enthusiasts'
            },
            {
                'name': 'Asgardian Hammer Workout',
                'description': 'Power training inspired by Thor\'s legendary strength.',
                'activity_type': 'CrossFit',
                'difficulty': 'Advanced',
                'duration': 50,
                'calories_per_session': 550,
                'recommended_for': 'Warriors seeking ultimate power'
            },
            {
                'name': 'Web-Slinger Flexibility Flow',
                'description': 'Yoga and flexibility training for agile heroes.',
                'activity_type': 'Yoga',
                'difficulty': 'Beginner',
                'duration': 30,
                'calories_per_session': 200,
                'recommended_for': 'Heroes needing flexibility and balance'
            },
            {
                'name': 'Batcave Circuit Training',
                'description': 'Batman\'s secret workout routine combining strength and cardio.',
                'activity_type': 'Circuit Training',
                'difficulty': 'Advanced',
                'duration': 55,
                'calories_per_session': 600,
                'recommended_for': 'Dark knights and vigilantes'
            },
            {
                'name': 'Amazonian Warrior Bootcamp',
                'description': 'Wonder Woman\'s intensive combat training program.',
                'activity_type': 'Martial Arts',
                'difficulty': 'Advanced',
                'duration': 60,
                'calories_per_session': 650,
                'recommended_for': 'Warriors and fighters'
            },
            {
                'name': 'Underwater Atlantean Swim',
                'description': 'Build endurance with Aquaman\'s aquatic workout.',
                'activity_type': 'Swimming',
                'difficulty': 'Intermediate',
                'duration': 40,
                'calories_per_session': 450,
                'recommended_for': 'Water-based training enthusiasts'
            },
            {
                'name': 'Stark Industries Cycling',
                'description': 'High-tech cycling workout designed by Tony Stark.',
                'activity_type': 'Cycling',
                'difficulty': 'Intermediate',
                'duration': 45,
                'calories_per_session': 400,
                'recommended_for': 'Tech-savvy fitness enthusiasts'
            },
        ]
        
        for workout_data in workouts_data:
            Workout.objects.create(**workout_data)
        
        # Create Activities
        self.stdout.write('Creating activity logs...')
        activity_types = ['Running', 'Cycling', 'Swimming', 'Yoga', 'Strength Training', 
                          'CrossFit', 'Martial Arts', 'Circuit Training']
        
        for user in users:
            # Create 5-10 random activities per user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 90)
                calories_burned = duration * random.randint(6, 12)
                points_earned = calories_burned // 10
                
                # Create activity with a date in the past 30 days
                days_ago = random.randint(0, 30)
                activity_date = datetime.now() - timedelta(days=days_ago)
                
                Activity.objects.create(
                    user_email=user.email,
                    user_name=user.name,
                    team=user.team,
                    activity_type=activity_type,
                    duration=duration,
                    calories_burned=calories_burned,
                    points_earned=points_earned,
                    date=activity_date
                )
        
        # Create Leaderboard entries
        self.stdout.write('Creating leaderboard...')
        rank = 1
        for user in users:
            # Calculate total points and activities
            user_activities = Activity.objects.filter(user_email=user.email)
            total_points = sum([activity.points_earned for activity in user_activities])
            total_activities = user_activities.count()
            
            Leaderboard.objects.create(
                user_name=user.name,
                user_email=user.email,
                team=user.team,
                total_points=total_points,
                total_activities=total_activities,
                rank=rank
            )
            rank += 1
        
        # Update leaderboard ranks based on points
        leaderboard_entries = Leaderboard.objects.all().order_by('-total_points')
        for index, entry in enumerate(leaderboard_entries, start=1):
            entry.rank = index
            entry.save()
        
        # Update team total points
        marvel_points = sum([entry.total_points for entry in Leaderboard.objects.filter(team='Team Marvel')])
        dc_points = sum([entry.total_points for entry in Leaderboard.objects.filter(team='Team DC')])
        
        team_marvel.total_points = marvel_points
        team_marvel.save()
        team_dc.total_points = dc_points
        team_dc.save()
        
        self.stdout.write(self.style.SUCCESS('Successfully populated the database!'))
        self.stdout.write(f'Created {User.objects.count()} users')
        self.stdout.write(f'Created {Team.objects.count()} teams')
        self.stdout.write(f'Created {Activity.objects.count()} activities')
        self.stdout.write(f'Created {Leaderboard.objects.count()} leaderboard entries')
        self.stdout.write(f'Created {Workout.objects.count()} workout plans')
