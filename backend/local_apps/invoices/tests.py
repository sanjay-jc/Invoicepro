from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase,force_authenticate
from django.urls import reverse
from .models import Customer, Invoice
from .serializers import *

# # testing models 
class CustomerModelTestCase(TestCase):
    def setUp(self):
        self.customer1 = Customer.objects.create(
            name="Customer 1",
            phone="1234567890",
            email="customer1@example.com",
            address="Address 1"
        )
        self.customer2 = Customer.objects.create(
            name="Customer 2",
            phone="9876543210",
            email="customer2@example.com",
            address="Address 2"
        )

    def test_customer_creation(self):
        """
        Test to ensure that the customer is created correctly.
        """
        self.assertEqual(self.customer1.name, "Customer 1")
        self.assertEqual(self.customer1.phone, "1234567890")
        self.assertEqual(self.customer1.email, "customer1@example.com")
        self.assertEqual(self.customer1.address, "Address 1")

    def test_customer_string_representation(self):
        """
        Test to ensure that the string representation of the customer is correct.
        """
        self.assertEqual(str(self.customer1), "Customer 1")

    def test_customer_ordering(self):
        """
        Test to ensure that customers are ordered correctly based on the 'created_at' field.
        """
        customers = Customer.objects.all()
        self.assertEqual(customers[0], self.customer2)
        self.assertEqual(customers[1], self.customer1)

class InvoiceModelTestCase(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create(
            name="Test Customer",
            phone="1234567890",
            email="testcustomer@example.com",
            address="Test Address"
        )
        self.invoice1 = Invoice.objects.create(
            customer=self.customer,
            amount="100.00",
            status="Unpaid"
        )
        self.invoice2 = Invoice.objects.create(
            customer=self.customer,
            amount="200.00",
            status="Paid"
        )

    def test_invoice_creation(self):
        """
        Test to ensure that the invoice is created correctly.
        """
        self.assertEqual(self.invoice1.customer, self.customer)
        self.assertEqual(self.invoice1.amount, "100.00")
        self.assertEqual(self.invoice1.status, "Unpaid")

    def test_invoice_string_representation(self):
        """
        Test to ensure that the string representation of the invoice is correct.
        """
        self.assertEqual(str(self.invoice1), str(self.invoice1.invoice_id))

    def test_invoice_ordering(self):
        """
        Test to ensure that invoices are ordered correctly based on the 'created_at' field.
        """
        invoices = Invoice.objects.all()
        self.assertEqual(invoices[0], self.invoice2)
        self.assertEqual(invoices[1], self.invoice1)


# #   testing APIs 
        
class CreateCustomerInvoiceTestCase(APITestCase):
    def setUp(self):
        # Create test users
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.user.save()

    def test_create_customer(self):
        """
        Test creating a new customer via POST request.
        """

        # Authenticate user
        self.client.force_authenticate(user=self.user)

        url = reverse('create_customer_invoice')  # Assuming you have a URL named 'create-customer-invoice' defined in your URL conf
        data = {
            "customer": {
                "name": "Test Customer",
                "phone": "1234567890",
                "email": "test@example.com",
                "address": "Test Address"
            }
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Customer.objects.count(), 1)
        self.assertEqual(Customer.objects.get().name, 'Test Customer')

    def test_create_invoice(self):
        """
        Test creating a new invoice via POST request.
        """

        # Authenticate user
        self.client.force_authenticate(user=self.user)
        # First, create a customer to associate with the invoice
        customer = Customer.objects.create(
            name="Test Customer",
            phone="1234567890",
            email="test@example.com",
            address="Test Address"
        )

        url = reverse('create_customer_invoice')  # Assuming you have a URL named 'create-customer-invoice' defined in your URL conf
        data = {
            "invoice": {
                "customer": customer.id,
                "amount": "100.00",
                "status": "Unpaid"
            }
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Invoice.objects.count(), 1)
        self.assertEqual(Invoice.objects.get().amount, '100.00')



class UpdateCustomerTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.customer = Customer.objects.create(name='customer1', email='customer@example.com')  # Create a sample customer

    def test_update_customer(self):
        url = reverse('update_customer', kwargs={'pk': self.customer.pk})  # Use the correct URL name and provide the customer's pk
        data = {'name': 'Updated Name',"email":'update@gmail.com'}  # Sample data for updating customer
        serializer = CustomerSerializer(instance=self.customer, data=data, partial=True)  # Create serializer instance
        
        # Check if data is valid and update customer
        if serializer.is_valid():
            response = self.client.put(url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            updated_customer = Customer.objects.get(pk=self.customer.pk)
            self.assertEqual(updated_customer.name, 'Updated Name')
            self.assertEqual(updated_customer.email, 'update@gmail.com')
        else:
            self.fail("Serializer is not valid.")

   
    def test_update_customer_unauthorized(self):
        self.client.logout()  # Logout the authenticated user
        url = reverse('update_customer', kwargs={'pk': self.customer.pk})
        data = {'name': 'Updated Name'}  
        serializer = CustomerSerializer(instance=self.customer, data=data, partial=True)
        
        if serializer.is_valid():
            response = self.client.put(url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        else:
            self.fail("Serializer is not valid.")

    def tearDown(self):
        self.client.logout()
    

class UpdateInvoiceTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)
        self.customer = Customer.objects.create(name='Test Customer', email='customer@example.com')
        self.invoice = Invoice.objects.create(customer=self.customer, amount='100', status='Unpaid')  # Create a sample invoice

    def test_update_invoice_valid_data(self):
        url = reverse('update_invoice', kwargs={'pk': self.invoice.pk})
        data = {'customer':self.customer.id,'amount': '200', 'status': 'Paid'}  # Updated data including amount and status
        serializer = InvoiceSerializer(instance=self.invoice, data=data, partial=True)
        
        if serializer.is_valid():
            print(data,',,,,,,')
            response = self.client.put(url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            updated_invoice = Invoice.objects.get(pk=self.invoice.pk)
            self.assertEqual(updated_invoice.amount, '200')
            self.assertEqual(updated_invoice.status, 'Paid')
        else:
            self.fail("Serializer is not valid.")

    def test_update_invoice_unauthorized(self):
        self.client.logout()  # Logout the authenticated user
        url = reverse('update_invoice', kwargs={'pk': self.invoice.pk})
        data = {'amount': '200'}  
        serializer = InvoiceSerializer(instance=self.invoice, data=data, partial=True)
        
        if serializer.is_valid():
            response = self.client.put(url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        else:
            self.fail("Serializer is not valid.")

    def tearDown(self):
        self.client.logout()



class ListCustomerInvoiceTestCase(APITestCase):
    def setUp(self):
        # Create test users
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.user.save()

        # Create test customers
        self.customer1 = Customer.objects.create(name="Customer 1", email="customer1@example.com")
        self.customer2 = Customer.objects.create(name="Customer 2", email="customer2@example.com")

        # Create test invoices
        self.invoice1 = Invoice.objects.create(customer=self.customer1, amount=100)
        self.invoice2 = Invoice.objects.create(customer=self.customer2, amount=200)

    def test_list_customers(self):
        # Authenticate user
        self.client.force_authenticate(user=self.user)

        # Make GET request to list customers
        url = reverse('list_customer_invoice', kwargs={'query': 'customers'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Assert correct number of customers in response
        self.assertEqual(dict(response.data).get("count"), 2)

        # Add more assertions as needed

    def test_list_invoices(self):
        # Authenticate user
        self.client.force_authenticate(user=self.user)

        # Make GET request to list invoices
        url = reverse('list_customer_invoice', kwargs={'query': 'invoices'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Assert correct number of invoices in response
        self.assertEqual(dict(response.data).get("count"), 2)

        # Add more assertions as needed

    def test_invalid_query_parameter(self):
        # Authenticate user
        self.client.force_authenticate(user=self.user)

        # Make GET request with invalid query parameter
        url = reverse('list_customer_invoice', kwargs={'query': 'invalid'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Assert error message in response
        self.assertEqual(response.data, {"error": "Invalid query parameter"})