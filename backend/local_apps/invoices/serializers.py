from rest_framework import serializers
from .models import *


class CustomerSerializer(serializers.ModelSerializer):
    """
    Serializer for the Customer model.

    This serializer is used to serialize and deserialize Customer objects.

    """
    name = serializers.CharField(required=True)
    class Meta:
        model = Customer
        fields = ["id","customer_id","name","phone","email","address"]


class InvoiceSerializer(serializers.ModelSerializer):
    """
    Serializer for the Invoice model.

    This serializer is used to serialize and deserialize Invoice objects.

    """
    
    class Meta:
        model = Invoice
        fields = ["id","invoice_id","customer","date","amount","status"]


class CustomerListSerialzier(serializers.ModelSerializer):
    """
    Serializer for listing customer information(id,name), specifically used for creating new invoices.
    """

    class Meta:
        model = Customer
        fields = ['id','name']
