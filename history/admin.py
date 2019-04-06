# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import History


@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    list_display = ('type', 'inventory', 'initiator', 'price', 'deal_price',
                    'quantity', 'remarks', 'created_date', 'modified_date')
    readonly_fields = list_display

    def has_delete_permission(self, request, obj=None):
        return False
