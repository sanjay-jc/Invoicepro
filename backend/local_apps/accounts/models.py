import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuid.django_fields import ShortUUIDField

from .managers import CustomUserManager

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account_id = ShortUUIDField(length=16,max_length=40,prefix="CUST_",alphabet="abcdefghijklmnopqrstuvwxyz1234567890",)
    name = models.CharField(max_length=255,null=True)
    phone = models.CharField(max_length=20, unique=True, blank=True, null=True,error_messages={'unique': "A user with that mobile already exists.",})
    email = models.EmailField(unique=True, blank=False, max_length=200,error_messages={'unique': "A user with that email already exists.",})
    address = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.first_name} {self.last_name}" if (self.first_name and self.last_name) else "No Name"

    objects = CustomUserManager()

    class Meta:
        ordering = ["-created_at", "-updated_at"]
        verbose_name = "Account"
        verbose_name_plural = "Accounts"




    
