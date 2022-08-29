from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from .views import RachunekViewSet
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('api/user/', views.UserListCreate.as_view()),
    path('api/register', views.UserCreate.as_view()),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/bills', views.RachunekViewSet.as_view()),
    path('api/bills/update/<int:pk>', views.RachunekViewSet.as_view()),
    path('api/bills/delete/<int:pk>', views.RachunekViewSet.as_view()),
]
