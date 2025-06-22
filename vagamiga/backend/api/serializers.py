from rest_framework import serializers
from .models import Condominiums, Users, Residents, ParkingSpots, Reports

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
    tenant = ResidentsSerializer()
    landlord = ResidentsSerializer()
    spot = ParkingSpotsSerializer()

    class Meta:
        db_table = 'reports'
        model = Reports
        fields = '__all__'