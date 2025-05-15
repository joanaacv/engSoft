from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('admin', 'Administrador'),
        ('locador', 'Locador'),
        ('locatario', 'Locatário'),
    )

    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='locatario')
    cpf = models.CharField(max_length=11, unique=True, null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    pix_key = models.CharField(max_length=100, null=True, blank=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    # Evita conflito com o auth.User padrão
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

    def __str__(self):
        return self.username


class Condominio(models.Model):
    nome = models.CharField(max_length=100)
    endereco = models.TextField()
    preco_por_hora = models.DecimalField(max_digits=6, decimal_places=2)
    administradores = models.ManyToManyField(User, related_name='condominios_admin')
    moradores = models.ManyToManyField(User, related_name='condominios_morador')
    codigo_convite = models.CharField(max_length=20, unique=True, null=True, blank=True)

    def __str__(self):
        return self.nome


class Vaga(models.Model):
    condominio = models.ForeignKey(Condominio, on_delete=models.CASCADE, related_name='vagas')
    numero = models.CharField(max_length=10)
    proprietario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='vagas_proprietario')
    disponivel = models.BooleanField(default=True)

    def __str__(self):
        return f"Vaga {self.numero} - {self.condominio.nome}"


class Locacao(models.Model):
    vaga = models.ForeignKey(Vaga, on_delete=models.CASCADE, related_name='locacoes')
    locador = models.ForeignKey(User, on_delete=models.CASCADE, related_name='locacoes_feitas')
    locatario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='locacoes_recebidas')
    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()
    valor_total = models.DecimalField(max_digits=8, decimal_places=2)
    pago = models.BooleanField(default=False)
    relatorio_gerado = models.BooleanField(default=False)

    def __str__(self):
        return f"Locação {self.vaga.numero} - {self.locatario.username}"


class Relatorio(models.Model):
    locacao = models.OneToOneField(Locacao, on_delete=models.CASCADE, related_name='relatorio')
    data_geracao = models.DateTimeField(auto_now_add=True)
    conteudo = models.TextField()

    def __str__(self):
        return f"Relatório {self.locacao.id}"
