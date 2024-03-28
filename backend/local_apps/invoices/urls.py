from django.urls import path
from .views import *


urlpatterns = [
    path('v1/create-customer-invoice',CreateCustomerInvoice.as_view(),name='create_customer_invoice'),
    path('v1/list-customer-invoice/<str:query>',ListCustomerInvoice.as_view(),name='list_customer_invoice'),
    path('v1/list-customers',CustomerList.as_view(),name='customer_list'),
    path('v1/update-customer/<uuid:pk>',UpdateCustomer.as_view(),name='update_customer'),
    path('v1/update-invoice/<uuid:pk>',UpdateInvoice.as_view(),name='update_invoice'),
]
