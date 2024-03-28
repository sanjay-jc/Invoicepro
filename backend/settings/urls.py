from django.contrib import admin
from django.urls import path,include,re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenBlacklistView,
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="login"),
    path("api/token/blacklist/", TokenBlacklistView.as_view(), name="token_blacklist"),
    path('account/',include("local_apps.accounts.urls")),
    path('invoice/',include("local_apps.invoices.urls")),
]
