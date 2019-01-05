# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.pagination import PageNumberPagination


class StandardPagination(PageNumberPagination):
    page_size = 20
    # allow client to override, using `?page_size=xxx`
    page_size_query_param = 'page_size'
    # maximum limit allowed when using `?page_size=xxx`
    max_page_size = 1000
