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
    queryset = Customer.objects.all().values("id", "name")


class ListCustomerInvoice(APIView, LimitOffsetPagination):
    """
    APIs to list either customers or invoices based on the provided url parameter.

    Parameters:
    - query (str): Specifies whether to list customers or invoices.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests to list either customers or invoices based on the provided query parameter.
        """

        query = self.kwargs.get('query', None)    # get the query
        try:

            # Dynamically create serializer based on the query parameter
            dynamic_serializer = create_dynamic_serializer(query, depth=1)

            # Get all objects from the model
            queryset = dynamic_serializer.Meta.model.objects.all()

            paginator = self.paginate_queryset(queryset, request)

            # Serialize data
            serializer = dynamic_serializer(paginator, many=True)
            # Return serializer data
            return self.get_paginated_response(serializer.data)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CreateCustomerInvoice(APIView):
    """
    API endpoint to create a new customer or invoice.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests to create a new customer or invoice.
        """
        model = kwargs.get("type", None)
        try:
            if model:
                dynamic_serializer = create_dynamic_serializer(model)
                serializer = dynamic_serializer(
                    data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"success": f"{model} creation successfull"})
                else:
                    return Response({"errorss": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"errors`": "Expected a model type "})

        except Exception as e:
            # Handle any unexpected exceptions
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UpdateCustomerInvoice(generics.UpdateAPIView):
    """
    Updates customer information
    """

    # Only authenticated users can access this endpoint
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        model = kwargs.get("type", None)
        pk = kwargs.get("pk", None)

        if model and pk:
            try:
                dynamic_serializer = create_dynamic_serializer(model)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

            try:
                # Get instance of the model
                model_instance = dynamic_serializer.Meta.model.objects.get(
                    pk=pk)
                serializer = dynamic_serializer(
                    model_instance, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response({"success": f"{model} instance updated successfully"}, status=status.HTTP_200_OK)
                else:
                    return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            except dynamic_serializer.Meta.model.DoesNotExist:
                return Response({"error": f"{model} Object does not exist"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Either type or pk not present"}, status=status.HTTP_400_BAD_REQUEST)
