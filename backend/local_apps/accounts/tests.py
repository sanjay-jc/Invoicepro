from django.test import TestCase

from django.test import TestCase
from .models import User
from django.core.exceptions import ValidationError
from django.db import IntegrityError
import uuid

class UserModelTestCase(TestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create(
            username="Test User",
            phone="1234567890",
            email="test@example.com",
            address="Test Address"
        )

    def test_user_creation(self):
        # Check if the user was created successfully
        self.assertEqual(User.objects.count(), 1)
        saved_user = User.objects.get(email="test@example.com")
        self.assertEqual(saved_user.username, "Test User")
        self.assertEqual(saved_user.phone, "1234567890")
        self.assertEqual(saved_user.address, "Test Address")

    def test_unique_phone(self):
        try:
            # Attempt to create another user with the same phone number
            with self.assertRaises(ValidationError) as context:
                User.objects.create(
                    name="Another User",
                    phone="1234567890",  # Same phone number as the existing user
                    email="another@example.com",
                    address="Another Address"
                )
        except IntegrityError:
            print("Unique constraint working")
    

    def test_unique_email(self):
        try:
            # Attempt to create a user with the same email address
            with self.assertRaises(ValidationError):
                User.objects.create(
                    name="Another User",
                    phone="9876543210",
                    email="test@example.com",  # Same email as the existing user
                    address="Another Address"
                )
        except IntegrityError:
            print("Unique constraint for email working ")

    def test_id_generation(self):

        # Check if UUID is generated for the user
        user = User.objects.create(
            name="UUID Test User",
            phone="9876543210",
            email="uuid@example.com",
            address="UUID Test Address"
        )
        self.assertIsNotNone(user.id)
        self.assertIsInstance(user.id, uuid.UUID)


    def test_blank_address(self):
        # Attempt to create a user with blank address (should be allowed)
        user = User.objects.create(
            name="Blank Address User",
            phone="9876543210",
            email="blank@example.com",
            address=""  # Blank address
        )
        self.assertEqual(user.address, "")

