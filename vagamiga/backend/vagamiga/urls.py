from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import UsersViewSet, CondominiumsViewSet, ParkingSpotsViewSet, ReportsViewSet, ResidentsViewSet, SimpleAuthView

router = DefaultRouter()
router.register(r'user', UsersViewSet)
router.register(r'condominium', CondominiumsViewSet)
router.register(r'parkingspot', ParkingSpotsViewSet)
router.register(r'resident', ResidentsViewSet)
router.register(r'report', ReportsViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', SimpleAuthView.as_view(), name='simple_auth'),  # sua view customizada
]