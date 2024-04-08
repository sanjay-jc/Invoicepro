from django.db import models
from local_apps.core.models import Main
from local_apps.accounts.models import User
from shortuuid.django_fields import ShortUUIDField

#   invoice status

INVOICE_STATUS = (
    ("Unpaid", "Unpaid"),
    ("Paid", "Paid"),
    ("Cancelled", "Cancelled"),
)

CURRENCY = (
    ("INR", "INR"),
    ("AED", "AED"),
)


class Customer(Main):
    """
    Represents a customer entity.

    Attributes:
        customer_id (ShortUUIDField): Unique identifier for the customer.
        name (CharField): Name of the customer.
        phone (CharField): Phone number of the customer (optional).
        email (EmailField): Email address of the customer (optional).
        address (TextField): Address of the customer (optional).
    """

    customer_id = ShortUUIDField(
        length=16, max_length=40, prefix="CUST_", alphabet="abcdefghijklmnopqrstuvwxyz1234567890",)
    name = models.CharField(max_length=256)
    phone = models.CharField(max_length=256, null=True,
                             blank=True, unique=True)
    email = models.EmailField(null=True, blank=True, unique=True)
    address = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name if self.name else "No Name"

    class Meta:
        ordering = ["-created_at", "-updated_at"]
        verbose_name = "Customer"
        verbose_name_plural = "Customers"


class Invoice(Main):
    """
    Invoice entity.

    Attributes:
        invoice_id (ShortUUIDField): Unique identifier.
        customer (ForeignKey): Reference to the customer associated with the invoice.
        date (DateField, optional): Date of the invoice.
        amount (CharField, optional): Invoice amount.
        status (CharField): Status of the invoice.
    """

    invoice_id = ShortUUIDField(
        length=16, max_length=40, prefix="INV_", alphabet="abcdefghijklmnopqrstuvwxyz1234567890",)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    date = models.DateField(null=True, blank=True,
                            help_text="Date format: YYYY-MM-DD")
    currency = models.CharField(
        choices=CURRENCY, default="INR", max_length=256)
    amount = models.CharField(null=True, blank=True, max_length=256)
    status = models.CharField(choices=INVOICE_STATUS,
                              default="Unpaid", max_length=256)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.invoice_id if self.invoice_id else "No Invoice Id"

    class Meta:
        ordering = ['-created_at', '-updated_at']
        verbose_name = "Invoice"
        verbose_name_plural = "Invoices"
