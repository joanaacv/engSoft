# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Condominiums(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    hourly_rate = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'condominiums'


class ParkingSpots(models.Model):
    spot_name = models.CharField(max_length=10, blank=True, null=True)
    condominium = models.ForeignKey(Condominiums, models.DO_NOTHING, blank=True, null=True)
    for_rent = models.BooleanField(blank=True, null=True)
    owner = models.ForeignKey('Residents', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'parkingspots'


class Reports(models.Model):
    landlord = models.ForeignKey('Residents', models.DO_NOTHING, blank=True, null=True)
    tenant = models.ForeignKey('Residents', models.DO_NOTHING, related_name='reports_tenant_set', blank=True, null=True)
    spot = models.ForeignKey(ParkingSpots, models.DO_NOTHING, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    payment_confirmed = models.BooleanField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reports'


class Residents(models.Model):
    balance = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    user = models.ForeignKey('Users', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'residents'


class Users(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=255)
    condominium = models.ForeignKey(Condominiums, models.DO_NOTHING, blank=True, null=True)
    is_admin = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
