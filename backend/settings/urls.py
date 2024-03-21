from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenBlacklistView,
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path('account/',include("local_apps.accounts.urls")),
    path("api/token/", TokenObtainPairView.as_view(), name="login"),
    path("api/token/blacklist/", TokenBlacklistView.as_view(), name="token_blacklist"),
]
