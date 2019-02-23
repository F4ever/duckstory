from django.db import models
from django.conf import settings


class Image(models.Model):
    name = models.CharField(max_length=64)
    image = models.ImageField(upload_to='static/img')

    def __str__(self):
        return self.name


class Section(models.Model):
    name = models.CharField(max_length=64)
    order = models.PositiveSmallIntegerField()

    is_menu = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=256)
    item_details = models.CharField(max_length=256)

    main_image = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True, related_name='+')
    images = models.ManyToManyField(Image, related_name='+')

    sections = models.ManyToManyField(Section, through='ProductSection')

    price_usd = models.FloatField(null=True, blank=True)
    price_eur = models.FloatField(null=True, blank=True)
    price_byn = models.FloatField(null=True, blank=True)

    small_size = models.BooleanField(default=False)
    medium_size = models.BooleanField(default=False)
    large_size = models.BooleanField(default=False)
    extra_large_size = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class ProductSection(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)

    order = models.SmallIntegerField()

    class Meta:
        ordering = ('order',)
