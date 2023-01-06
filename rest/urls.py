from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('api/user/', views.UserListCreate.as_view()),
    path('api/register/', views.UserCreate.as_view()),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/bills/', views.RachunekViewSet.as_view()),
    path('api/bills/update/<int:pk>/', views.RachunekViewSet.as_view()),
    path('api/bills/delete/<int:pk>/', views.RachunekViewSet.as_view()),
    path("api/categories/", views.KategoriaViewSet.as_view()),
    path("api/categories/<int:pk>/", views.KategoriaViewSet.as_view()),
    path("api/debts/", views.DlugViewSet.as_view()),
    path("api/debts/update/<int:pk>/", views.DlugViewSet.as_view()),
    path("api/debts/<int:pk>/", views.DlugViewSet.as_view()),
    path("api/debts/payments/", views.DlugSplataViewSet.as_view()),
    path("api/debts/payments/<int:pk>/", views.DlugSplataViewSet.as_view()),
    path("api/transactions/", views.TransakcjaViewSet.as_view()),
    path("api/transactions/<int:pk>/", views.TransakcjaViewSet.as_view()),
    path("api/transactions/<str:date_from>/<str:date_to>/", views.TransakcjaFromDateToDateViewSet.as_view()),
    path("api/incomes/", views.PrzychodViewSet.as_view()),
    path("api/incomes/<str:date_from>/<str:date_to>/", views.PrzychodFromDateToDateViewSet.as_view()),
    path("api/expenses/", views.WydatekViewSet.as_view()),
    path("api/expenses/<str:date_from>/<str:date_to>/", views.WydatekFromDateToDateViewSet.as_view()),
]
