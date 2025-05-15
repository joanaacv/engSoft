from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import UserViewSet, CondominioViewSet, VagaViewSet, LocacaoViewSet, RelatorioViewSet, SimpleAuthView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'condominios', CondominioViewSet)
router.register(r'vagas', VagaViewSet)
router.register(r'locacoes', LocacaoViewSet)
router.register(r'relatorios', RelatorioViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', SimpleAuthView.as_view(), name='simple_auth'),  # sua view customizada
]