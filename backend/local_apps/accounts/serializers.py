from rest_framework import serializers
from .models import *



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","account_id","name","phone","email","address"]