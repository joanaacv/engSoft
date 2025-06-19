from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Condominium, User, Resident, ParkingSpot, Report


class CondominiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condominium
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ResidentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Resident
        fields = '__all__'


class ParkingSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSpot
        fields = '__all__'


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'