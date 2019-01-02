# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .serializers import (UpdateInventorySerializer,)
from .forms import (BCMForm,
                    InventoryForm)
from .models import Inventory


@api_view(['GET'])
def bcmlist(request, bcm, bcm_id):
    """返回所有品牌Brand/品类Category/商品Merchandise信息."""
    form = BCMForm({'bcm': bcm, 'bcm_id': bcm_id})
    if form.is_valid():
        serializer = form.list_bcm()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def invlist(request, merchant):
    """返回所有库存Inventory信息."""
    form = InventoryForm({'merchant': merchant})
    if form.is_valid():
        serializer = form.list_inventory()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_inventory(request):
    """更新库存的view."""
    serializer = UpdateInventorySerializer(data=request.data)
    if serializer.is_valid():
        if not serializer.validated_data['deposit']:
            # 从库存借出, 减
            return Response(serializer.withdraw_from_inventory())

        if(Inventory.objects.filter(
            merchandise=serializer.validated_data['merchandise_id'],
            merchant=serializer.validated_data['current_merchant_id'])
                .exists()):
                # 库存项已存在, 增
                return Response(serializer.deposit_to_inventory())
        # 创建新的库存项
        return Response(serializer.create_new_inventory())
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
