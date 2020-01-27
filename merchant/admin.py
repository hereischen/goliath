# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Merchant


class MerchantAdmin(UserAdmin):
    """商户+User的admin页"""
    model = Merchant

    fieldsets = (
        ("商户详细信息", {'fields': ('name', 'address', 'mobile', 'dingding', 'show_price')}),
    ) + UserAdmin.fieldsets

    list_display = ('username', 'name', 'mobile', 'address', 'is_active', 'show_price')

    def has_delete_permission(self, request, obj=None):
        return False


admin.site.register(Merchant, MerchantAdmin)
