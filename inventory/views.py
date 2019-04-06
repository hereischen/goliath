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
                          MerchandiseInventorySerializer,
                          CreateNewInvtSerializer,
                          DepositToInvtSerializer,
                          WithdrawFromInvtSerializer,
                          WithdrawFromOthersInvtSerializer,)

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
    serializer_class = MerchandiseInventorySerializer
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('modified_date',)
    ordering = ('modified_date',)

    def get_queryset(self):
        logger.info('[MerchantInventoryList] Received data : %s' %
                    self.request.data)
        _id = self.request.query_params.get('id')
        queryset = Inventory.objects.all().filter(merchandise=_id)
        return queryset


@api_view(['POST'])
def create_inventory(request):
    """创建新库存."""
    logger.info('[create_inventory] Received data : %s' % request.data)
    serializer = CreateNewInvtSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.create())
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def deposit_to_inventory(request):
    """自增库存."""
    logger.info('[deposit_to_inventory] Received data : %s' %
                request.data)
    serializer = DepositToInvtSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.deposit())
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def withdraw_from_inventory(request):
    """自减库存."""
    logger.info('[withdraw_from_inventory] Received data : %s' % request.data)
    serializer = WithdrawFromInvtSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.withdraw())
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def withdraw_from_others_inventory(request):
    """取用他人库存."""
    logger.info('[withdraw_from_others_inventory] Received data : %s' %
                request.data)
    serializer = WithdrawFromOthersInvtSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.withdraw())
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
