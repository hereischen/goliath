# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from merchant.serializers import MerchantSerializer
from inventory.serializers import InventorySerializer
from history.models import History


class HistorySerializer(serializers.ModelSerializer):
    inventory = InventorySerializer(many=False, read_only=True)
    initiator = MerchantSerializer(many=False, read_only=True)

    class Meta:
        model = History
        fields = ('id', 'type', 'prev_quantity', 'quantity', 'price',
                  'deal_price', 'remarks', 'created_date',
                  'inventory', 'initiator')
