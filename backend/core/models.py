from django.db import models
from django.contrib.auth.models import User

class Condominio(models.Model):
    nome = models.CharField(max_length=100)
    endereco = models.CharField(max_length=255)
    preco_por_hora = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.nome

class Vaga(models.Model):
    condominio = models.ForeignKey(Condominio, on_delete=models.CASCADE, related_name='vagas')
    locador = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vagas')
    identificacao = models.CharField(max_length=50)
    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()
    disponivel = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.identificacao} ({self.condominio.nome})'
