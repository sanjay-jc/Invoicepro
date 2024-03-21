from django.urls import path
from .views import *


urlpatterns = [
    path('',LoginView.as_view(),name='login'),
    path('customer-list',CustomerList.as_view(),name='customer_list'),
]