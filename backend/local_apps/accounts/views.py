from django.shortcuts import render
from django.contrib.auth import authenticate, login,logout
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from .models import *
from .serializers import *

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            user = authenticate(request, username=username, password=password)
            print(user,'user is df ')
            if user is not None:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)
                return Response({
                    'detail': 'Login successful!',
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "error":"Invalid username or password"
                },status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)



class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            logout(request)
            return Response({"detail": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)
        


class CustomerList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerSerializer
    queryset = User.objects.all().values("id","account_id","name","phone","email","address")