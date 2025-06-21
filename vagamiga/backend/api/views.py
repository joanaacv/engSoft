from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from .models import Condominiums, Users, Residents, ParkingSpots, Reports
from .serializers import CondominiumsSerializer, UsersSerializer, ResidentsSerializer, ParkingSpotsSerializer, ReportsSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

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
        email = request.data.get('username')
        password = request.data.get('password')
        User = get_user_model()
        try:
            user_obj = User.objects.get(email=email)
            user = authenticate(username=user_obj.username, password=password)
        except User.DoesNotExist:
            user = None
        if user is not None:
            return Response(UserSerializer(user).data)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


"""
User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class CondominioViewSet(viewsets.ModelViewSet):
    queryset = Condominio.objects.all()
    serializer_class = CondominioSerializer
    # permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def add_admin(self, request, pk=None):
        condominio = self.get_object()
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            condominio.administradores.add(user)
            return Response({'status': 'admin added'})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def invite_resident(self, request, pk=None):
        condominio = self.get_object()
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            condominio.moradores.add(user)
            return Response({'status': 'resident added'})
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class VagaViewSet(viewsets.ModelViewSet):
    queryset = Vaga.objects.all()
    serializer_class = VagaSerializer
    # permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def claim(self, request, pk=None):
        vaga = self.get_object()
        if vaga.proprietario is None:
            vaga.proprietario = request.user
            vaga.save()
            return Response({'status': 'vaga claimed'})
        return Response({'error': 'Vaga já possui proprietário'}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(detail=True, methods=['patch'])
    def update_availability(self, request, pk=None):
        vaga = self.get_object()
        disponivel = request.data.get('disponivel')
        if disponivel is not None:
            vaga.disponivel = disponivel
            # Se confirmar (disponivel == False), torna indisponível
            if disponivel is False or disponivel == 'false' or disponivel == 0 or disponivel == '0':
                vaga.disponivel = False
            vaga.save()
            return Response({'status': 'vaga availability updated'})
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

class LocacaoViewSet(viewsets.ModelViewSet):
    queryset = Locacao.objects.all()
    serializer_class = LocacaoSerializer
    # permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        locacao = serializer.save()
        
        # Gerar relatório
        relatorio_content = f"Locacao de vaga {locacao.vaga.numero} por {locacao.locatario.username} de {locacao.data_inicio} a {locacao.data_fim}"
        Relatorio.objects.create(locacao=locacao, conteudo=relatorio_content)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        locacao = self.get_object()
        if locacao.pago:
            return Response({'error': 'Locação já paga'}, status=status.HTTP_400_BAD_REQUEST)
        
        locacao.pago = True
        locacao.save()
        
        # Transferir valor para o locador
        locador = locacao.locador
        locador.balance += locacao.valor_total
        locador.save()
        
        return Response({'status': 'payment processed'})

class RelatorioViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Relatorio.objects.all()
    serializer_class = RelatorioSerializer
    # permission_classes = [IsAuthenticated]


"""