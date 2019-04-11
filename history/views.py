# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import logging

from rest_framework.generics import ListAPIView
from rest_framework import filters
from django.db.models import Q
from django.http import Http404

from goliath.pagination import StandardPagination
from .models import History
from .serializers import HistorySerializer


logger = logging.getLogger(__name__)


class HistoryList(ListAPIView):
    """返回库存历史信息."""
    pagination_class = StandardPagination
    serializer_class = HistorySerializer
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('created_date',)
    ordering = ('created_date',)

    def get_queryset(self):
        logger.info('[HistoryList] Received data : %s' %
                    self.request.query_params)
        _id = self.request.query_params.get('current_merchant_id')
        if _id is None:
            logger.info('[HistoryList] Missing required parameter '
                        'current_merchant_id')
            raise Http404()
        queryset = History.objects.all().filter(
            Q(initiator=_id) | Q(inventory__merchant=_id))

        _type = int(self.request.query_params.get('type', -1))
        if _type not in (0, 1, 2):
            return queryset
        queryset = queryset.filter(type=_type)
        return queryset
