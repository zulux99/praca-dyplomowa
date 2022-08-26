from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from .views import RachunekCreate
from .views import RachunekUpdate
from .views import RachunekDelete
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('api/user/', views.UserListCreate.as_view()),
    path('api/register', views.UserCreate.as_view()),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/rachunek/create', views.RachunekCreate.as_view()),
    path('api/rachunek/update/<int:pk>', views.RachunekUpdate.as_view()),
    path('api/rachunek/delete/<int:pk>', views.RachunekDelete.as_view()),
]
