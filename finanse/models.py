from django.db import models

# Create your models here.
    
class Rachunek(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    nazwa = models.CharField(max_length=200)
    kwota = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    data_utworzenia = models.DateTimeField(auto_now_add=True)
    data_modyfikacji = models.DateTimeField(auto_now=True)
    domyslne = models.BooleanField(default=False)
    def save(self, *args, **kwargs):
        if self.domyslne:
            try:
                temp = Rachunek.objects.get(domyslne=True)
                if self != temp:
                    temp.domyslne = False
                    temp.save()
            except Rachunek.DoesNotExist:
                pass
        if not Rachunek.objects.filter(domyslne=True).exists():
            self.domyslne = True
        super(Rachunek, self).save(*args, **kwargs)

class Kategoria(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    nazwa = models.CharField(max_length=200)
    class Meta:
        unique_together = ('user', 'nazwa')
