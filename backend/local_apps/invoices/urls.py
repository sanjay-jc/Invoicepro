from django.urls import path
from .views import *


urlpatterns = [
    path('v1/list-customers', CustomerList.as_view(), name='customer_list'),
    path('v1/create-customer-invoice/<str:type>',
         CreateCustomerInvoice.as_view(), name='create_customer_invoice'),
    path('v1/list-customer-invoice/<str:query>',
         ListCustomerInvoice.as_view(), name='list_customer_invoice'),
    path('v1/update-customer-invoice/<str:type>/<uuid:pk>',
         UpdateCustomerInvoice.as_view(), name='update_customer'),]
