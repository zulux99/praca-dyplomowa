from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from finanse.models import Rachunek

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
    class Meta:
        model = Rachunek
        fields = ('id', 'user', 'nazwa', 'kwota', 'data_utworzenia', 'data_modyfikacji', 'kategoria')
        read_only_fields = ('data_utworzenia')
    def create(self, validated_data):
        return super(RachunekSerializer, self).create(validated_data)
    def update(self, instance, validated_data):
        return super(RachunekSerializer, self).update(instance, validated_data)
    def delete(self, instance):
        return super(RachunekSerializer, self).delete(instance)
    
