# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import Sum
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.generics import ListAPIView

from goliath.pagination import StandardPagination
from .models import (Brand,
                     Category,
                     Merchandise,
                     Inventory)
from .serializers import (BrandSerializer,
                          CategorySerializer,
                          MerchandiseSerializer,
                          InventorySerializer,
                          UpdateInventorySerializer,)


class BrandList(ListAPIView):
    """返回所有品牌信息."""
    pagination_class = StandardPagination
    serializer_class = BrandSerializer

    def get_queryset(self):
        queryset = Brand.objects.all()
        _id = self.request.query_params.get('id')
        if _id is not None:
            queryset = queryset.filter(id=_id)
        return queryset


class CategoryList(ListAPIView):
    """返回所有品类信息."""
    pagination_class = StandardPagination
    serializer_class = CategorySerializer

    def get_queryset(self):
        queryset = Category.objects.all()
        _id = self.request.query_params.get('id')
        if _id is not None:
            queryset = queryset.filter(id=_id)
        return queryset


class MerchandiseList(ListAPIView):
    """返回所有商品信息."""
    pagination_class = StandardPagination
    serializer_class = MerchandiseSerializer

    def get_queryset(self):
        queryset = Category.objects.all()
        _id = self.request.query_params.get('id')
        if _id is not None:
            queryset = queryset.filter(id=_id)
        return queryset


class InventoryList(ListAPIView):
    """返回所有压缩后的库存信息."""
    pagination_class = StandardPagination
    serializer_class = InventorySerializer

    def get_queryset(self):
        zipped = (Inventory.objects.values('merchandise')
                                   .annotate(quantity=Sum('quantity')))
        for item in zipped:
            item['merchandise'] = Merchandise.objects.get(
                id=item['merchandise'])
        return zipped


class MerchantInventoryList(ListAPIView):
    """返回某商户的库存详细信息."""
    pagination_class = StandardPagination
    serializer_class = InventorySerializer

    def get_queryset(self):
        _id = self.request.query_params.get('id')
        queryset = Inventory.objects.all().filter(merchant=_id)
        return queryset


class MerchandiseInventoryList(ListAPIView):
    """返回某商商品的库存详细信息."""
    pagination_class = StandardPagination
    serializer_class = InventorySerializer

    def get_queryset(self):
        _id = self.request.query_params.get('id')
        queryset = Inventory.objects.all().filter(merchandise=_id)
        return queryset


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
