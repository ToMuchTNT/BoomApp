from django.urls import path 
from . import views


urlpatterns = [
    path('', views.home),
    path('room/', views.room),
    path('signup', views.signup),
    path('login', views.login),

    path('get_token/', views.getToken)
]