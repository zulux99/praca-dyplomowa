# Generated by Django 4.0.2 on 2022-08-26 15:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('finanse', '0003_user_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='Rachunek',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nazwa', models.CharField(max_length=200)),
                ('kwota', models.DecimalField(decimal_places=2, max_digits=10)),
                ('data_utworzenia', models.DateTimeField(auto_now_add=True)),
                ('data_modyfikacji', models.DateTimeField(auto_now=True)),
                ('kategoria', models.CharField(max_length=200)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
