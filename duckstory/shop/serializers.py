from rest_framework import serializers

from .models import *


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = serializers.ALL_FIELDS


class ProductSectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductSection
        fields = ('product',)


class SectionSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    def get_products(self, obj):
        return [x.product_id for x in obj.productsection_set.all()]

    class Meta:
        model = Section
        fields = serializers.ALL_FIELDS
