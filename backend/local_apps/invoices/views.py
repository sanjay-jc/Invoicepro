from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from .models import *
from .serializers import *


class CustomerList(generics.ListAPIView):
    """
    View to list only the id and name of the customer
    used for listing the name of customer in Invoice create and edit 
    """

    permission_classes = [IsAuthenticated]
    serializer_class = CustomerListSerialzier
    queryset = User.objects.all().values("id","name")

class CreateCustomerInvoice(APIView):
    """
    API endpoint to create a new customer or invoice.
    """
    permission_classes = [IsAuthenticated]

    def post(self,request,*args,**kwargs):
        """
        Handles POST requests to create a new customer or invoice.
        """
        try:

            # Check if data for customer creation is provided
            if "customer" in request.data:
                customer_serializer = CustomerSerializer(data=request.data.pop("customer"))\
                
                if customer_serializer.is_valid():
                    customer_serializer.save()  # Save the customer
                    return Response({"success":"Customer creation successfull"},status=status.HTTP_201_CREATED)
                
                else:
                    return Response({"error":customer_serializer.errors},status=status.HTTP_400_BAD_REQUEST)
                
            # Check if data for invoice creation is provided
            if "invoice" in request.data:
                invoice_serializer = InvoiceSerializer(data=request.data.pop('invoice'))

                if invoice_serializer.is_valid():
                    invoice_serializer.save()   # Save the invoice
                    return Response({"success":" Invoice creation successfull"},status=status.HTTP_201_CREATED)
                
                else:
                    return Response({"error":invoice_serializer.errors},status=status.HTTP_400_BAD_REQUEST)
                
            else:
                return Response({"error":"Invalid data"},status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:

            # Handle any unexpected exceptions
            return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)
        
class ListCustomerInvoice(APIView,LimitOffsetPagination):
    """
    APIs to list either customers or invoices based on the provided url parameter.

    Parameters:
    - query (str): Specifies whether to list customers or invoices. Should be either 'customer' or 'invoice'.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests to list either customers or invoices based on the provided query parameter.
        """

        try:

            query = self.kwargs.get('query')
            if query == "customers":
                 # Fetch all customer instances and serialize customer data
                
                customer_instances = Customer.objects.all()
                customer_pages = self.paginate_queryset(customer_instances,request) # implementing pagination

                if customer_pages is not None:
                    data = CustomerSerializer(customer_pages, many=True).data 
                    return self.get_paginated_response(data)  
                
            elif query == 'invoices':
                 # Fetch all invoice instances and serialize invoice data
                
                invoice_instances = Invoice.objects.all() 
                invoice_pages = self.paginate_queryset(invoice_instances,request)

                if invoice_pages is not None:
                    data = InvoiceSerializer(invoice_pages,many=True).data    
                    return self.get_paginated_response(data)
                
            else:
                # Return error if unexpected query
                return Response({"error":"Invalid query parameter"},status=status.HTTP_400_BAD_REQUEST) 
               
            return Response(data, status=status.HTTP_200_OK)  # Return serializer data
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UpdateCustomer(generics.UpdateAPIView):
    """
    Updates customer information
    """

    permission_classes = [IsAuthenticated]  # Only authenticated users can access this endpoint
    serializer_class = CustomerSerializer   # Serializer for handling customer data
    queryset = User.objects.all()           # Queryset to retrieve the customer object to be updated


class UpdateInvoice(generics.UpdateAPIView):
    """
    Updates Invoice information
    """

    permission_classes = [IsAuthenticated]  # Only authenticated users can access this endpoint
    serializer_class  = InvoiceSerializer   # Serializer for handling Invoice data
    queryset = Invoice.objects.all()        # Queryset to retrieve the invoice object to be updated
