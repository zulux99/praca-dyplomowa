from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('register/', views.index),
    path('login/', views.index),
    path('income/', views.index),
    path('konta/', views.index),
    path('przychody/', views.index),
    path('wydatki/', views.index),
    path('dluznicy/', views.index),
    path ('kategorie/', views.index),
]
