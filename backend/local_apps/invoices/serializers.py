from rest_framework import serializers
from .models import *
from django.apps import apps
from django.core.exceptions import AppRegistryNotReady


class CustomerListSerialzier(serializers.ModelSerializer):
    """
    Serializer for listing customer information(id,name), specifically used for creating new invoices.
    """

    class Meta:
        model = Customer
        fields = ['id', 'name']


def create_dynamic_serializer(model_name, app_label='invoices', depth=None):
    """
        Dynamically creates a ModelSerializer based on the provided model name and app label.

        Parameters:
            model_name (str): The name of the model for which the serializer is to be created.
            app_label (str): The label of the Django app containing the model. Default is 'invoices'.
    """

    try:
        model = apps.get_model(app_label=app_label, model_name=model_name)
    except AppRegistryNotReady:
        raise AppRegistryNotReady(
            "Django app registry is not ready. Are you sure your models are loaded?")

    DynamicModelSerializer = type(
        'DynamicModelSerializer',
        (serializers.ModelSerializer,),
        {'Meta': type('Meta', (), {'model': model,
                      'fields': '__all__', "depth": depth, })}
    )

    return DynamicModelSerializer
