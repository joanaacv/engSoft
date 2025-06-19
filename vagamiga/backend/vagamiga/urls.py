from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import UserViewSet, CondominiumViewSet, ParkingSpotViewSet, ReportViewSet, ResidentViewSet, SimpleAuthView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'condominiums', CondominiumViewSet)
router.register(r'parkingspots', ParkingSpotViewSet)
router.register(r'residents', ResidentViewSet)
router.register(r'reports', ReportViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', SimpleAuthView.as_view(), name='simple_auth'),  # sua view customizada
]