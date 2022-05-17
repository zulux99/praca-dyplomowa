from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=100)
    email = models.EmailField()
    description = models.CharField(max_length=1000)
    join_date = models.DateTimeField(auto_now_add=True)