from django.contrib import admin
from .models import Rachunek, Kategoria, Dlug, DlugSplata, Transakcja

# Register your models here.

admin.site.register(Rachunek)
admin.site.register(Kategoria)
admin.site.register(Dlug)
admin.site.register(DlugSplata)
admin.site.register(Transakcja)