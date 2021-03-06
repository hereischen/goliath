# -*- coding: utf-8 -*-
"""goliath URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from __future__ import unicode_literals

from django.conf.urls import url, include
from django.contrib import admin

from .views import index

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^_nimda/', admin.site.urls),
    # 商户(user)体系
    url(r'^merchant/', include('merchant.urls', namespace='merchant')),
    # 库存体系
    url(r'^inventory/', include('inventory.urls', namespace='inventory')),
    # 库存历史记录
    url(r'^history/', include('history.urls', namespace='history')),
    # 验证码
    url(r'^captcha/', include('captcha.urls')),
]
