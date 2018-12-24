# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpResponseBadRequest

# from .models import (Brand,
#                      Category,
#                      Merchandise,
#                      Inventory)
# from .serializers import (BrandSerializer,
#                           CategorySerializer,)
from .forms import (BCMForm,
                    InventoryForm)


@api_view(['GET'])
def bcmlist(request, bcm, bcm_id):
    """返回所有品牌Brand/品类Category/商品Merchandise信息."""
    form = BCMForm({'bcm': bcm, 'bcm_id': bcm_id})
    if form.is_valid():
        serializer = form.list_bcm()
        return Response(serializer.data)
    return HttpResponseBadRequest('Invalid BCM Request')


@api_view(['GET'])
def invlist(request, merchant):
    """返回所有库存Inventory信息."""
    form = InventoryForm({'merchant': merchant})
    if form.is_valid():
        serializer = form.list_inventory()
        return Response(serializer.data)
    return HttpResponseBadRequest('Invalid Inventory Request')
