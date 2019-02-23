from rest_framework import viewsets, mixins

from shop.serializers import *


class SectionViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = SectionSerializer
    queryset = Section.objects.prefetch_related('productsection_set')
    authentication_classes = ()


class ProductViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    authentication_classes = ()
