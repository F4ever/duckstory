from django.urls import path
from .views import *


urlpatterns = [
    path('sections/', SectionViewSet.as_view({'get': 'list'}), name='sections-info'),
    path('products/', ProductViewSet.as_view({'get': 'list'}), name='products-info'),
]