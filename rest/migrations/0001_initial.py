# Generated by Django 4.0.2 on 2022-11-30 14:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Dlug',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nazwa_dluznika', models.CharField(max_length=200)),
                ('cel', models.CharField(blank=True, max_length=200)),
                ('kwota_do_splaty', models.DecimalField(decimal_places=2, max_digits=12)),
                ('splacony', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Rachunek',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nazwa', models.CharField(max_length=200)),
                ('kwota', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('data_utworzenia', models.DateTimeField(auto_now_add=True)),
                ('data_modyfikacji', models.DateTimeField(auto_now=True)),
                ('domyslne', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DlugSplata',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kwota', models.DecimalField(decimal_places=2, max_digits=12)),
                ('data_splaty', models.DateField()),
                ('dlug', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest.dlug')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='dlug',
            name='rachunek',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rest.rachunek'),
        ),
        migrations.AddField(
            model_name='dlug',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Kategoria',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nazwa', models.CharField(max_length=200)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'nazwa')},
            },
        ),
    ]