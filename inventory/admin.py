# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import (Brand,
                     Category,
                     Merchandise,
                     Inventory)


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('brand', 'in_stock', 'created_date', 'modified_date')
    readonly_fields = ('created_date', 'modified_date')

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category', 'in_stock', 'created_date', 'modified_date')
    readonly_fields = ('created_date', 'modified_date')

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Merchandise)
class MerchandiseAdmin(admin.ModelAdmin):
    list_display = ('brand', 'category', 'code', 'in_stock', 'remarks',
                    'created_date', 'modified_date')
    readonly_fields = ('created_date', 'modified_date')

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('merchandise', 'merchant', 'price', 'quantity',
                    'remarks', 'remarks_json', 'created_date', 'modified_date')
    readonly_fields = ('created_date', 'modified_date')

    def has_delete_permission(self, request, obj=None):
        return False
