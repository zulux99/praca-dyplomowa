# Generated by Django 4.0.2 on 2022-11-22 17:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('finanse', '0017_dlugsplata_rachunek_dlugsplata_user_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dlugsplata',
            name='rachunek',
        ),
    ]