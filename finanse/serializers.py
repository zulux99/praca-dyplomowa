from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from finanse.models import Rachunek
from finanse.models import Kategoria

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=0, write_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)

class RachunekSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    nazwa = serializers.CharField(max_length=200)
    class Meta:
        model = Rachunek
        fields = ('id', 'nazwa', 'user', 'data_utworzenia', 'data_modyfikacji', 'kwota', 'kategoria', 'domyslne')
    def create(self, validated_data):
        return super(RachunekSerializer, self).create(validated_data)
    def update(self, instance, validated_data):
        return super(RachunekSerializer, self).update(instance, validated_data)
    def delete(self, instance):
        return super(RachunekSerializer, self).delete(instance)

class KategoriaSerializer(serializers.ModelSerializer):
    nazwa = serializers.CharField(max_length=200)
    public = serializers.BooleanField(default=False)
    class Meta:
        model = Kategoria
        fields = ('id', 'nazwa', 'public')
    def create(self, validated_data):
        return super(KategoriaSerializer, self).create(validated_data)
    def update(self, instance, validated_data):
        return super(KategoriaSerializer, self).update(instance, validated_data)
    def delete(self, instance):
        return super(KategoriaSerializer, self).delete(instance)