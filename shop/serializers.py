from rest_framework import serializers

from .models import *


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = serializers.ALL_FIELDS


class ProductSerializer(serializers.ModelSerializer):
    main_image = ImageSerializer()
    images = ImageSerializer(many=True)

    def get_main_img(self):
        return

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
