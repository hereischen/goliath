# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from merchant.models import Merchant
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

    class Meta:
        model = Inventory
        fields = ('id', 'quantity', 'merchandise', 'modified_date')


class UpdateInventorySerializer(serializers.Serializer):
    """更新库存的serializer."""
    current_merchant_id = serializers.CharField(required=True)
    merchandise_id = serializers.IntegerField(required=True)
    quantity = serializers.IntegerField(required=True)
    price = serializers.DecimalField(required=True,
                                     max_digits=11, decimal_places=2)

    add = serializers.BooleanField(default=True)
    remarks = serializers.CharField(required=False)

    def create_new_inventory(self):
        try:
            md = Merchandise.objects.get(
                id=self.validated_data['merchandise_id'])
            cm = Merchant.objects.get(
                id=self.validated_data['current_merchant_id'])
        except ObjectDoesNotExist:
            return {"result": "fail"}
        Inventory.objects.create(merchandise=md,
                                 merchant=cm,
                                 quantity=self.validated_data['quantity'],
                                 price=self.validated_data['price'],
                                 remarks=self.validated_data.get('remarks')
                                 )
        return {"result": "create"}

    def add_to_inventory(self):
        try:
            inv = Inventory.objects.get(
                merchandise=self.validated_data['merchandise_id'],
                merchant=self.validated_data['current_merchant_id'])
        except ObjectDoesNotExist:
            return {"result": "fail"}
        inv.price = self.validated_data['price']
        inv.quantity += self.validated_data['quantity']
        inv.remarks = self.validated_data.get('remarks')
        inv.save()
        return {"result": "success"}

    def borrow_from_inventory(self):
        return {"result": "success"}
