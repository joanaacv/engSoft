from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Condominiums, Users, Residents, ParkingSpots, Reports
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CondominiumsSerializer(serializers.ModelSerializer):
    class Meta:
        db_table = 'condominiums'
        model = Condominiums
        fields = '__all__'


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        db_table = 'users'
        model = Users
        fields = '__all__'


class ResidentsSerializer(serializers.ModelSerializer):
    user = UsersSerializer(read_only=True)
    class Meta:
        db_table = 'residents'
        model = Residents
        fields = '__all__'


class ParkingSpotsSerializer(serializers.ModelSerializer):
    class Meta:
        db_table = 'parkingspots'
        model = ParkingSpots
        fields = '__all__'


class ReportsSerializer(serializers.ModelSerializer):
    class Meta:
        db_table = 'reports'
        model = Reports
        fields = '__all__'