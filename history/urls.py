# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url
from django.contrib.auth.decorators import login_required

from .views import HistoryList

app_name = 'history'
urlpatterns = [
    # 查询 库存变动 history
    url(r'^histories', login_required(HistoryList.as_view()), name='history_list'),
]
