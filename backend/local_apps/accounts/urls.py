from django.urls import path
from .views import *


urlpatterns = [
    path('v1/login',LoginView.as_view(),name='login'),
   
]