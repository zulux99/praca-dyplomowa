# Generated by Django 4.0.2 on 2022-11-05 13:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('finanse', '0011_kategoria_kategoriauser'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='kategoria',
            name='public',
        ),
        migrations.RemoveField(
            model_name='rachunek',
            name='kategoria',
        ),
    ]
