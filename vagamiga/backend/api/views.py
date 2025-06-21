from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Condominiums, Users, Residents, ParkingSpots, Reports
from .serializers import CondominiumsSerializer, UsersSerializer, ResidentsSerializer, ParkingSpotsSerializer, ReportsSerializer
from rest_framework.views import APIView

class CondominiumsViewSet(viewsets.ModelViewSet):
    queryset = Condominiums.objects.all()
    serializer_class = CondominiumsSerializer


class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer


class ResidentsViewSet(viewsets.ModelViewSet):
    queryset = Residents.objects.all()
    serializer_class = ResidentsSerializer


class ParkingSpotsViewSet(viewsets.ModelViewSet):
    queryset = ParkingSpots.objects.all()
    serializer_class = ParkingSpotsSerializer


class ReportsViewSet(viewsets.ModelViewSet):
    queryset = Reports.objects.all()
    serializer_class = ReportsSerializer

class SimpleAuthView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = Users.objects.get(email=email, password=password)
            return Response(UsersSerializer(user).data)
        except Users.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

