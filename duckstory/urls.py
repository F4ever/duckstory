from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include

from .views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('shop.urls')),
    url(r'^.*$', IndexView.as_view(), name='index'),
]
