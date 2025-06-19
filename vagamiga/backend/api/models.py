from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _

class Condominium(models.Model):
    name = models.CharField(max_length=100)
    adress = models.TextField()
    hourly_rate = models.DecimalField(max_digits=6, decimal_places=2)
    
    def __str__(self):
        return self.nome
    

class User(AbstractUser):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, max_length=100)
    password = models.CharField(max_length=255)  # Deve ser criptografada
    condominium = models.ForeignKey(Condominium, on_delete=models.SET_NULL, null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Evita conflito com o auth.User padrão
    """
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )
    """
    def __str__(self):
        return self.username


class Resident(models.Model):
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Resident: {self.user.name}"


class ParkingSpot(models.Model):
    spot_name = models.CharField(max_length=10)
    condominium = models.ForeignKey(Condominium, on_delete=models.CASCADE)
    for_rent = models.BooleanField(default=False)
    owner = models.ForeignKey(Resident, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Spot {self.spot_name} - Condo {self.condominium.name}"


class Report(models.Model):
    landlord = models.ForeignKey(Resident, related_name='landlord_reports', on_delete=models.CASCADE)
    tenant = models.ForeignKey(Resident, related_name='tenant_reports', on_delete=models.CASCADE)
    spot = models.ForeignKey(ParkingSpot, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    payment_confirmed = models.BooleanField(default=False)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Report for Spot {self.spot.spot_name} from {self.start_date} to {self.end_date}"