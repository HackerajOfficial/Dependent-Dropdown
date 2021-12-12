"""dependentdropdown URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import main_view, get_json_car_data, get_json_model_data, create_order

urlpatterns = [
    path('', main_view, name='main-view'),
    path('cars-json/', get_json_car_data, name='cars-json'),
    path('cars-json/<str:car>/', get_json_model_data, name='models-json'),
    path('create/', create_order, name='create-order'),
    
]

