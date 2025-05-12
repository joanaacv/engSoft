from rest_framework import viewsets, filters
from .models import Vaga, Condominio
from .serializers import VagaSerializer, CondominioSerializer
from django_filters.rest_framework import DjangoFilterBackend

class CondominioViewSet(viewsets.ModelViewSet):
    queryset = Condominio.objects.all()
    serializer_class = CondominioSerializer

class VagaViewSet(viewsets.ModelViewSet):
    queryset = Vaga.objects.all()
    serializer_class = VagaSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['disponivel', 'condominio']
    search_fields = ['identificacao']
