from django.db import models
from local_apps.core.models import Main
from local_apps.accounts.models import User
from shortuuid.django_fields import ShortUUIDField


INVOICE_STATUS = (
    ("Unpaid","Unpaid"),
    ("Paid","Paid"),
    ("Cancelled","Cancelled"),
)
class Invoice(Main):
    invoice_id = ShortUUIDField(length=16,max_length=40,prefix="INV_",alphabet="abcdefghijklmnopqrstuvwxyz1234567890",)
    customer = models.ForeignKey(User,on_delete = models.CASCADE)
    date = models.DateField(null=True,blank=True)
    amount = models.CharField(null=True,blank=True,max_length=256)
    status = models.CharField(choices=INVOICE_STATUS,default="Unpaid",max_length=256)

    def __str__(self):
        return self.invoice_id if self.invoice_id else "No Invoice Id"
    
    class Meta:
        ordering = ['-created_at','-updated_at']
        verbose_name = "Invoice"
        verbose_name_plural = "Invoices"

    