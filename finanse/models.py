from django.db import models

# Create your models here.
    
class Rachunek(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    nazwa = models.CharField(max_length=200)
    kwota = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    data_utworzenia = models.DateTimeField(auto_now_add=True)
    data_modyfikacji = models.DateTimeField(auto_now=True)
    kategoria = models.CharField(max_length=200, blank=True)