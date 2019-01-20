# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import logging

from django.db.models import Sum
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, filters
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
                          MerchantInventorySerializer,
                          UpdateInventorySerializer,)

logger = logging.getLogger(__name__)


class BrandList(ListAPIView):
    """返回所有品牌信息."""
    pagination_class = StandardPagination
    serializer_class = BrandSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('brand',)
    ordering_fields = ('brand', 'modified_date')
    ordering = ('brand',)

    def get_queryset(self):
        logger.info('[BrandList] Received data : %s' %
                    self.request.query_params)
        queryset = Brand.objects.all()
        _id = self.request.query_params.get('id')
        if _id is not None:
            queryset = queryset.filter(id=_id)
        return queryset


class CategoryList(ListAPIView):
    """返回所有品类信息."""
    pagination_class = StandardPagination
    serializer_class = CategorySerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('category',)
    ordering_fields = ('category', 'modified_date')
    ordering = ('category',)

    def get_queryset(self):
        logger.info('[CategoryList] Received data : %s' %
                    self.request.query_params)
        queryset = Category.objects.all()
        _id = self.request.query_params.get('id')
        if _id is not None:
            queryset = queryset.filter(id=_id)
        return queryset


class MerchandiseList(ListAPIView):
    """返回所有商品信息."""
    pagination_class = StandardPagination
    serializer_class = MerchandiseSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('^code',)
    ordering_fields = ('code', 'modified_date')
    ordering = ('code',)

    def get_queryset(self):
        logger.info('[MerchandiseList] Received data : %s' %
                    self.request.query_params)
        queryset = Merchandise.objects.all()
        _id = self.request.query_params.get('id')
        if _id is not None:
            queryset = queryset.filter(id=_id)
        return queryset


class InventoryList(ListAPIView):
    """返回所有压缩后的库存信息."""
    pagination_class = StandardPagination
    serializer_class = InventorySerializer
    # FIXME: search does not work
    # after zip it is not a model queryset anymore
    # filter_backends = (filters.SearchFilter,)
    # search_fields = ('merchandise__code',)

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
    serializer_class = MerchantInventorySerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('^merchandise__code',)
    ordering_fields = ('merchandise__code', 'modified_date')
    ordering = ('merchandise__code',)

    def get_queryset(self):
        logger.info('[MerchantInventoryList] Received data : %s' %
                    self.request.query_params)
        _id = self.request.query_params.get('id')
        queryset = Inventory.objects.all().filter(merchant=_id)
        return queryset


class MerchandiseInventoryList(ListAPIView):
    """返回某商商品的库存详细信息."""
    pagination_class = StandardPagination
    serializer_class = InventorySerializer
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('merchandise__code', 'modified_date')
    ordering = ('merchandise__code',)

    def get_queryset(self):
        logger.info('[MerchantInventoryList] Received data : %s' %
                    self.request.data)
        _id = self.request.query_params.get('id')
        queryset = Inventory.objects.all().filter(merchandise=_id)
        return queryset


@api_view(['POST'])
def update_inventory(request):
    """更新库存的view."""
    logger.info('[update_inventory] Received data : %s' % request.data)
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
