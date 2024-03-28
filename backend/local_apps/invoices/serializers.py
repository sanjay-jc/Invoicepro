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
    customer_name = serializers.SerializerMethodField(method_name="get_customer_name")

    def get_customer_name(self,obj):
        return obj.customer.name if obj.customer else "No Name"
    
    class Meta:
        model = Invoice
        fields = ["id","invoice_id","customer","date","amount","status","customer_name"]




class CustomerListSerialzier(serializers.ModelSerializer):
    """
    Serializer for listing customer information(id,name), specifically used for creating new invoices.
    """

    class Meta:
        model = Customer
        fields = ['id','name']
