from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from finanse.serializers import UserSerializer
from finanse.serializers import RachunekSerializer
from finanse.serializers import KategoriaSerializer
from .models import Rachunek
from .models import Kategoria
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCreate(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class RachunekViewSet(APIView):
    queryset = Rachunek.objects.all()
    serializer_class = RachunekSerializer
    def get(self, request):
        rachunki = Rachunek.objects.filter(user=request.user.id)
        serializer = RachunekSerializer(rachunki, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = RachunekSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, pk):
        rachunek = Rachunek.objects.get(pk=pk)
        serializer = RachunekSerializer(rachunek, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        rachunek = Rachunek.objects.get(pk=pk)
        rachunek.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
class KategoriaViewSet(APIView):
    queryset = Kategoria.objects.all()
    serializer_class = KategoriaSerializer
    def get(self, request):
        kategorie = Kategoria.objects.filter(public=True)
        serializer = KategoriaSerializer(kategorie, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = KategoriaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, pk):
        kategoria = Kategoria.objects.get(pk=pk)
        serializer = KategoriaSerializer(kategoria, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        kategoria = Kategoria.objects.get(pk=pk)
        kategoria.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)