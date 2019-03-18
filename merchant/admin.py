# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Merchant


@admin.register(Merchant)
class MerchantAdmin(admin.ModelAdmin):
    """商户信息的admin页"""
    model = Merchant

    fieldsets = (
        ("商户详细信息", {'fields': ('name', 'address', 'mobile', 'dingding')}),
    )

    list_display = ('name', 'mobile', 'address')

    def has_delete_permission(self, request, obj=None):
        return False
