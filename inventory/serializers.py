# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

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
