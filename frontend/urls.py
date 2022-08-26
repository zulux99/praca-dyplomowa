from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('income/', views.index),
    path('register/', views.index),
    path('login/', views.index),
    path('materialui/', views.index),
    path('rachunki/', views.index),
]
