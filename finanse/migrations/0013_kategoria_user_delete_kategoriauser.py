# Generated by Django 4.0.2 on 2022-11-05 14:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('finanse', '0012_remove_kategoria_public_remove_rachunek_kategoria'),
    ]

    operations = [
        migrations.AddField(
            model_name='kategoria',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='KategoriaUser',
        ),
    ]
