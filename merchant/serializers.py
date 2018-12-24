# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import serializers

from .models import Merchant


class MerchantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Merchant
        fields = ('id', 'name', 'address', 'email', 'mobile', 'dingding')
