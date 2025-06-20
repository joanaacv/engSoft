from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import UserViewSet, CondominiumViewSet, ParkingSpotViewSet, ReportViewSet, ResidentViewSet, SimpleAuthView

router = DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'condominium', CondominiumViewSet)
router.register(r'parkingspot', ParkingSpotViewSet)
router.register(r'resident', ResidentViewSet)
router.register(r'report', ReportViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', SimpleAuthView.as_view(), name='simple_auth'),  # sua view customizada
]