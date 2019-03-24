# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import (Brand,
                     Category,
                     Merchandise,
                     Inventory)


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Brand._meta.get_fields()]
    readonly_fields = ('created_date', 'modified_date')

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Category._meta.get_fields()]
    readonly_fields = ('created_date', 'modified_date')

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Merchandise)
class MerchandiseAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Merchandise._meta.get_fields()]
    readonly_fields = ('created_date', 'modified_date')

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Inventory._meta.get_fields()]
    readonly_fields = ('created_date', 'modified_date')

    def has_delete_permission(self, request, obj=None):
        return False
