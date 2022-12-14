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
    przychod = models.BooleanField(default=False)
    class Meta:
        unique_together = ('user', 'nazwa')

class Dlug(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    nazwa_dluznika = models.CharField(max_length=200)
    cel = models.CharField(max_length=200, blank=True)
    kwota_do_splaty = models.DecimalField(max_digits=12, decimal_places=2)
    rachunek = models.ForeignKey(Rachunek, on_delete=models.CASCADE)
    splacony = models.BooleanField(default=False)
    def save(self, *args, **kwargs):
        self.rachunek.kwota -= self.kwota_do_splaty
        self.rachunek.save()
        super(Dlug, self).save(*args, **kwargs)
    def delete(self, *args, **kwargs):
        self.rachunek.kwota += self.kwota_do_splaty
        self.rachunek.save()
        super(Dlug, self).delete(*args, **kwargs)

class DlugSplata(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    dlug = models.ForeignKey(Dlug, on_delete=models.CASCADE)
    kwota = models.DecimalField(max_digits=12, decimal_places=2)
    data_splaty = models.DateField()
    def save(self, *args, **kwargs):
        self.dlug.rachunek.kwota += self.kwota
        self.dlug.rachunek.save()
        super(DlugSplata, self).save(*args, **kwargs)
    def delete(self, *args, **kwargs):
        self.dlug.rachunek.kwota -= self.kwota
        self.dlug.rachunek.save()
        super(DlugSplata, self).delete(*args, **kwargs)

class Transakcja(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    kwota = models.DecimalField(max_digits=12, decimal_places=2)
    data = models.DateField()
    rachunek = models.ForeignKey(Rachunek, on_delete=models.CASCADE)
    kategoria = models.ForeignKey(Kategoria, on_delete=models.CASCADE)
    przychod = models.BooleanField(default=False)
    opis = models.CharField(max_length=500, blank=True)
    def save(self, *args, **kwargs):
        if self.kategoria.przychod:
            self.rachunek.kwota += self.kwota
        else:
            self.rachunek.kwota -= self.kwota
        self.rachunek.save()
        super(Transakcja, self).save(*args, **kwargs)
    def delete(self, *args, **kwargs):
        if self.kategoria.przychod:
            self.rachunek.kwota -= self.kwota
        else:
            self.rachunek.kwota += self.kwota
        self.rachunek.save()
        super(Transakcja, self).delete(*args, **kwargs)