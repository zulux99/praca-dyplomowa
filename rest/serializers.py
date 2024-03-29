from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest.models import Rachunek
from rest.models import Kategoria
from rest.models import Dlug
from rest.models import DlugSplata
from rest.models import Transakcja

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=0, write_only=True)
    first_name = serializers.CharField(allow_blank=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name', 'date_joined', 'last_login')
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

class RachunekSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    nazwa = serializers.CharField(max_length=200)
    class Meta:
        model = Rachunek
        fields = ('id', 'nazwa', 'user', 'data_utworzenia', 'data_modyfikacji', 'kwota', 'domyslne')
    def create(self, validated_data):
        return super(RachunekSerializer, self).create(validated_data)
    def update(self, instance, validated_data):
        return super(RachunekSerializer, self).update(instance, validated_data)
    def delete(self, instance):
        return super(RachunekSerializer, self).delete(instance)

class KategoriaSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    nazwa = serializers.CharField(max_length=200)
    przychod = serializers.BooleanField(default=False)
    class Meta:
        model = Kategoria
        fields = ('id', 'user', 'nazwa', 'przychod')
    def create(self, validated_data):
        return super(KategoriaSerializer, self).create(validated_data)
    def update(self, instance, validated_data):
        return super(KategoriaSerializer, self).update(instance, validated_data)
    def delete(self, instance):
        return super(KategoriaSerializer, self).delete(instance)

class DlugSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    nazwa_dluznika = serializers.CharField(max_length=200)
    cel = serializers.CharField(max_length=200, allow_blank=True)
    kwota_do_splaty = serializers.DecimalField(max_digits=12, decimal_places=2)
    rachunek = serializers.PrimaryKeyRelatedField(queryset=Rachunek.objects.all())
    splacony = serializers.BooleanField(default=False)
    class Meta:
        model = Dlug
        fields = ('id', 'user', 'nazwa_dluznika', 'cel', 'kwota_do_splaty', 'rachunek', 'splacony')
    def create(self, validated_data):
        return super(DlugSerializer, self).create(validated_data)
    def update(self, instance, validated_data):
        return super(DlugSerializer, self).update(instance, validated_data)
    def delete(self, instance):
        return super(DlugSerializer, self).delete(instance)


class DlugSplataSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    dlug = serializers.PrimaryKeyRelatedField(queryset=Dlug.objects.all())
    kwota = serializers.DecimalField(max_digits=12, decimal_places=2)
    data_splaty = serializers.DateField()
    class Meta:
        model = DlugSplata
        fields = ('id', 'user', 'dlug', 'kwota', 'data_splaty')
    def validate(self, data):
        kwota = data['kwota']
        dlug = data['dlug']
        splaty = DlugSplata.objects.filter(dlug=dlug)
        kwota_splaty = 0
        if kwota == 0:
            raise serializers.ValidationError("Kwota musi być większa od 0")
        for splata in splaty:
            kwota_splaty += splata.kwota
        if kwota > dlug.kwota_do_splaty - kwota_splaty:
            raise serializers.ValidationError("Kwota nie może być większa niż kwota do spłaty")
        return data
    def create(self, validated_data):
        return super(DlugSplataSerializer, self).create(validated_data)
    def update(self, instance, validated_data):
        return super(DlugSplataSerializer, self).update(instance, validated_data)
    def delete(self, instance):
        return super(DlugSplataSerializer, self).delete(instance)

class TransakcjaSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    kwota = serializers.DecimalField(max_digits=12, decimal_places=2)
    data = serializers.DateField()
    rachunek = serializers.PrimaryKeyRelatedField(queryset=Rachunek.objects.all())
    kategoria = serializers.PrimaryKeyRelatedField(queryset=Kategoria.objects.all())
    przychod = serializers.BooleanField(default=False)
    opis = serializers.CharField(max_length=500, allow_blank=True)
    class Meta:
        model = Transakcja
        fields = ('id', 'user', 'kwota', 'data', 'rachunek', 'kategoria', 'przychod', 'opis')
    def create(self, validated_data):
        return super(TransakcjaSerializer, self).create(validated_data)
    def update(self, instance, validated_data):
        return super(TransakcjaSerializer, self).update(instance, validated_data)
    def delete(self, instance):
        return super(TransakcjaSerializer, self).delete(instance)

    