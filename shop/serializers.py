from rest_framework import serializers

from .models import *


class ImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return '/' + obj.image.name

    class Meta:
        model = Image
        fields = ('name', 'image')


class ColorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Color
        fields = ('name', 'color')


class ProductSerializer(serializers.ModelSerializer):
    main_image = ImageSerializer()
    images = ImageSerializer(many=True)
    colors = ColorSerializer(many=True)

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
