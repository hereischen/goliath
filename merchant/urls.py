# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url

from .views import (LoginView,
                    LogoutView,
                    RegisterView)

app_name = 'merchant'
urlpatterns = [
    # 登录
    url(r'^login/', LoginView.as_view(), name='login'),
    # 登出
    url(r'^logout/', LogoutView.as_view(), name='logout'),
    # 注册
    url(r'^register/', RegisterView.as_view(), name='register'),
]
