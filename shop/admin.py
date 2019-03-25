from django.contrib import admin
from django.contrib.admin.options import InlineModelAdmin, TabularInline

from shop.models import *


class ProductSectionInline(TabularInline):
    model = ProductSection


class SectionAdmin(admin.ModelAdmin):
    inlines = (ProductSectionInline, )


class ProductAdmin(admin.ModelAdmin):
    inlines = (ProductSectionInline, )

    fieldsets = (
        ('Base settings', {
            'fields': ('name', 'description', 'item_details', 'main_image', 'images', 'colors')
        }),
        ('Price', {
            'fields': ('price_usd', 'price_eur', 'price_byn')
        }),
        ('Size', {
            'fields': (('small_size', 'medium_size', 'large_size', 'extra_large_size'),)
        })
    )

    filter_horizontal = ('colors', 'images')


admin.site.register(Product, ProductAdmin)
admin.site.register(Section, SectionAdmin)
admin.site.register(Image)
admin.site.register(Color)
