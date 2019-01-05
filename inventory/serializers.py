# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from merchant.models import Merchant
from merchant.serializers import MerchantSerializer
from .models import (Brand,
                     Category,
                     Merchandise,
                     Inventory)


class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = ('id', 'brand', 'in_stock')


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('id', 'category', 'in_stock')


class MerchandiseSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(many=False, read_only=True)
    category = CategorySerializer(many=False, read_only=True)

    class Meta:
        model = Merchandise
        fields = ('id', 'brand', 'category',
                  'in_stock', 'code', 'remarks')


class InventorySerializer(serializers.ModelSerializer):
    merchandise = MerchandiseSerializer(many=False, read_only=True)
    merchant = MerchantSerializer(many=False, read_only=True)

    class Meta:
        model = Inventory
        fields = ('id', 'merchant', 'quantity', 'merchandise', 'modified_date')


class UpdateInventorySerializer(serializers.Serializer):
    """更新库存的serializer."""
    current_merchant_id = serializers.CharField(required=True)
    merchandise_id = serializers.IntegerField(required=True)
    quantity = serializers.IntegerField(required=True)
    # optional
    price = serializers.DecimalField(required=False,
                                     max_digits=11, decimal_places=2)
    deposit = serializers.BooleanField(default=True)
    remarks = serializers.CharField(required=False)
    withdraw_from = serializers.JSONField(required=False)

    def create_new_inventory(self):
        try:
            md = Merchandise.objects.get(
                id=self.validated_data['merchandise_id'])
            cm = Merchant.objects.get(
                id=self.validated_data['current_merchant_id'])
        except ObjectDoesNotExist:
            return {"result": "fail"}
        if not self.validated_data.get("price"):
            return {"result": "fail"}
        Inventory.objects.create(merchandise=md,
                                 merchant=cm,
                                 quantity=self.validated_data['quantity'],
                                 price=self.validated_data['price'],
                                 remarks=self.validated_data.get('remarks')
                                 )
        return {"result": "create"}

    def deposit_to_inventory(self):
        try:
            inv = Inventory.objects.get(
                merchandise=self.validated_data['merchandise_id'],
                merchant=self.validated_data['current_merchant_id'])
        except ObjectDoesNotExist:
            return {"result": "fail"}
        if self.validated_data.get("price"):
            inv.price = self.validated_data['price']
        inv.quantity += self.validated_data['quantity']
        remarks = self.validated_data.get('remarks')
        if remarks:
            inv.remarks += ("=>" + remarks)
        inv.save()
        return {"result": "success"}

    def withdraw_from_inventory(self):
        try:
            current_inv = Inventory.objects.get(
                merchandise=self.validated_data['merchandise_id'],
                merchant=self.validated_data['current_merchant_id'])
        except ObjectDoesNotExist:
            return {"result": "fail", "details": "找不到您的库存"}

        if self.validated_data['quantity'] > current_inv.quantity:
            return {"result": "fail", "details": "您的库存不足"}

        for item in self.validated_data.get('withdraw_from'):
            try:
                withdraw_inv = Inventory.objects.get(
                    merchandise=self.validated_data['merchandise_id'],
                    merchant=item['merchant'])
            except ObjectDoesNotExist:
                return {"result": "fail", "details": "找不到对应商户的库存"}
            if int(item['quantity']) > withdraw_inv.quantity:
                return {"result": "fail", "details": "对应商户的库存不足"}
            withdraw_inv.quantity -= int(item['quantity'])
            remarks = item.get('remarks')
            if remarks:
                withdraw_inv.remarks += ("=>" + remarks)
            withdraw_inv.save()
        return {"result": "success"}
