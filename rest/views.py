import os
from django.http import HttpResponse
from rest_framework.views import View
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from rest.serializers import UserSerializer
from rest.serializers import RachunekSerializer
from rest.serializers import KategoriaSerializer
from rest.serializers import DlugSerializer
from rest.serializers import DlugSplataSerializer
from rest.serializers import TransakcjaSerializer
from .models import Rachunek
from .models import Kategoria
from .models import Dlug
from .models import DlugSplata
from .models import Transakcja
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.pagination import PageNumberPagination

# Create your views here.

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50

class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """
    def get(self, request):
        try:
            with open(os.path.join('frontend', 'build', 'index.html')) as file:
                return HttpResponse(file.read())
        except:
            return HttpResponse(
                """
                Dotarłeś do serwera API, miłego dnia!
                """,
                status=501,
            )



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
    permission_classes = [IsAuthenticated]
    def get(self, request):
        users = User.objects.filter(id=request.user.id)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)



class UserCreate(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDelete(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def delete(self, request, pk):
        user = User.objects.get(pk=pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class UserViewSet(APIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]



class RachunekViewSet(APIView):
    queryset = Rachunek.objects.all()
    serializer_class = RachunekSerializer
    permission_classes = [IsAuthenticated]
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
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        rachunek = Rachunek.objects.get(pk=pk)
        rachunek.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        


class KategoriaViewSet(APIView):
    queryset = Kategoria.objects.all()
    serializer_class = KategoriaSerializer
    permission_classes = [IsAuthenticated]
    def get(self, request):
        if 'incomes' in request.query_params:
            kategorie = Kategoria.objects.filter(user=request.user.id, przychod=True)
        elif 'expenses' in request.query_params:
            kategorie = Kategoria.objects.filter(user=request.user.id, przychod=False)
        else:
            kategorie = Kategoria.objects.filter(user=request.user.id)
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
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        kategoria = Kategoria.objects.get(pk=pk)
        kategoria.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class DlugViewSet(APIView):
    queryset = Dlug.objects.all()
    serializer_class = DlugSerializer
    permission_classes = [IsAuthenticated]
    def get(self, request):
        dlugi = Dlug.objects.filter(user=request.user.id)
        serializer = DlugSerializer(dlugi, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = DlugSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, pk):
        dlug = Dlug.objects.get(pk=pk)
        serializer = DlugSerializer(dlug, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        dlug = Dlug.objects.get(pk=pk)
        dlug.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class DlugSplataViewSet(APIView):
    queryset = DlugSplata.objects.all()
    serializer_class = DlugSplataSerializer
    permission_classes = [IsAuthenticated]
    def get(self, request):
        splaty = DlugSplata.objects.filter(user=request.user.id)
        serializer = DlugSplataSerializer(splaty, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = DlugSplataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, pk):
        splata = DlugSplata.objects.get(pk=pk)
        serializer = DlugSplataSerializer(splata, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        splata = DlugSplata.objects.get(pk=pk)
        splata.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TransakcjaViewSet(GenericAPIView):
    queryset = Transakcja.objects.all().order_by('data', 'id').reverse()
    serializer_class = TransakcjaSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    def get(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(user=request.user.id)
        if 'category' in request.query_params:
            categories = request.query_params['category'].split(',')
            queryset = queryset.filter(kategoria__in=categories)
        if 'account' in request.query_params:
            queryset = queryset.filter(konto=request.query_params['account'])
        if 'date_from' in request.query_params:
            queryset = queryset.filter(data__gte=request.query_params['date_from'])
        if 'date_to' in request.query_params:
            queryset = queryset.filter(data__lte=request.query_params['date_to'])
        if 'bill' in request.query_params:
            queryset = queryset.filter(rachunek=request.query_params['bill'])
        if 'expenses' in request.query_params:
            queryset = queryset.filter(przychod=False)
        if 'incomes' in request.query_params:
            queryset = queryset.filter(przychod=True)
        if 'no_pagination' in request.query_params:
            serializer = TransakcjaSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TransakcjaSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = TransakcjaSerializer(queryset, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = TransakcjaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, pk):
        transakcja = Transakcja.objects.get(pk=pk)
        serializer = TransakcjaSerializer(transakcja, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, pk):
        transakcja = Transakcja.objects.get(pk=pk)
        transakcja.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TransakcjaFromDateToDateViewSet(APIView):
    queryset = Transakcja.objects.all()
    serializer_class = TransakcjaSerializer
    permission_classes = [IsAuthenticated]
    def get(self, request, date_from, date_to):
        transakcje = Transakcja.objects.filter(user=request.user.id, data__range=[date_from, date_to])
        serializer = TransakcjaSerializer(transakcje, many=True)
        return Response(serializer.data)


class PrzychodViewSet(GenericAPIView):
    queryset = Transakcja.objects.filter(przychod=True).order_by('data', 'id').reverse()
    serializer_class = TransakcjaSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    def get(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(user=request.user.id)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TransakcjaSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = TransakcjaSerializer(queryset, many=True)
        return Response(serializer.data)

class PrzychodFromDateToDateViewSet(APIView):
    queryset = Transakcja.objects.filter(przychod=True)
    serializer_class = TransakcjaSerializer
    permission_classes = [IsAuthenticated]
    def get(self, request, date_from, date_to):
        przychody = Transakcja.objects.filter(user=request.user.id, przychod=True, data__range=[date_from, date_to])
        serializer = TransakcjaSerializer(przychody, many=True)
        return Response(serializer.data)

class WydatekViewSet(GenericAPIView):
    queryset = Transakcja.objects.filter(przychod=True).order_by('data', 'id').reverse()
    serializer_class = TransakcjaSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    def get(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = queryset.filter(user=request.user.id)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TransakcjaSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = TransakcjaSerializer(queryset, many=True)
        return Response(serializer.data)

class WydatekFromDateToDateViewSet(APIView):
    queryset = Transakcja.objects.filter(przychod=False)
    serializer_class = TransakcjaSerializer
    permission_classes = [IsAuthenticated]
    def get(self, request, date_from, date_to):
        wydatki = Transakcja.objects.filter(user=request.user.id, przychod=False, data__range=[date_from, date_to])
        serializer = TransakcjaSerializer(wydatki, many=True)
        return Response(serializer.data)
