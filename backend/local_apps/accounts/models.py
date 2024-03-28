import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from shortuuid.django_fields import ShortUUIDField

from .managers import CustomUserManager

class User(AbstractUser):
    """
    Custom user model extending AbstractUser.

    Attributes:
        id (UUIDField): Primary key with UUID.
        name (CharField, optional): User's name.
        phone (CharField, optional): User's phone number.
        email (EmailField): User's email address.
        address (TextField, optional): User's address.
        created_at (DateTimeField): Date and time when the user was created.
        updated_at (DateTimeField): Date and time when the user was last updated.

    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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




    
