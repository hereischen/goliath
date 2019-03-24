# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import History


@admin.register(History)
class HistoryAdmin(admin.ModelAdmin):
    list_display = [field.name for field in History._meta.get_fields()]
    readonly_fields = ('created_date', 'modified_date')

    def has_delete_permission(self, request, obj=None):
        return False
