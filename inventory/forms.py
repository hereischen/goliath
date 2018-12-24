# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django import forms
from django.db.models import Sum

from .models import (Brand,
                     Category,
                     Merchandise,
                     Inventory)
from .serializers import (BrandSerializer,
                          CategorySerializer,
                          MerchandiseSerializer,
                          InventorySerializer)


class BCMForm(forms.Form):
    """url bcmlist 品牌Brand/品类Category/商品Merchandise 的form."""
    bcm = forms.CharField()
    bcm_id = forms.IntegerField()

    def list_bcm(self):
        """列出所有BCM项"""
        BCM_MAP = {'brands': (Brand, BrandSerializer),
                   'categories': (Category, CategorySerializer),
                   'merchandise': (Merchandise, MerchandiseSerializer)}
        bcm = self.cleaned_data['bcm']
        all_bcm = BCM_MAP[bcm][0].objects.all()
        bcm_id = self.cleaned_data['bcm_id']
        if bcm_id == 0:
            return BCM_MAP[bcm][1](all_bcm, many=True)
        return BCM_MAP[bcm][1](all_bcm.filter(id=bcm_id), many=True)


class InventoryForm(forms.Form):
    """url Invlist 库存Inventory 的form."""
    merchant = forms.CharField()

    def list_inventory(self):
        """根据商户(user)"""
        merchant = self.cleaned_data['merchant']
        if merchant == '0':
            # 将相同商品数相加压缩成一个inventory项
            zipped = Inventory.objects.values(
                'merchandise').annotate(quantity=Sum('quantity'))
            for item in zipped:
                item['merchandise'] = Merchandise.objects.get(
                    id=item['merchandise'])
            return InventorySerializer(zipped, many=True)
        return InventorySerializer(
            Inventory.objects.all()
                             .filter(merchant_id=merchant), many=True)
