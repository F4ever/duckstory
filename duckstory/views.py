import json

from django.views.generic import TemplateView
from django.conf import settings

from shop.models import Section, Product
from shop.serializers import SectionSerializer, ProductSerializer


class IndexView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        init_data = {
            'SECTIONS': json.dumps(SectionSerializer(Section.objects.filter(is_active=True).prefetch_related('productsection_set'), many=True).data),
            'PRODUCTS': json.dumps(ProductSerializer(Product.objects.all(), many=True).data),
        }

        kwargs.update(init_data)

        return super(IndexView, self).get_context_data(**kwargs)
