from django.contrib import admin
from .models import *

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["customer_id","name","email","phone","address"]


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ["invoice_id","customer","date","currency","amount","status"]