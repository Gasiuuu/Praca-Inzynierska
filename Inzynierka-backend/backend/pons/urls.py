from django.urls import path
from .views import proxy

urlpatterns = [
    path("", proxy, name="proxy"),
]