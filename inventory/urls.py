# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf.urls import url

from .views import (bcmlist,
                    invlist,
                    update_inventory)

app_name = 'inventory'
urlpatterns = [
    # 列出全部/某个 品牌brand/ 品类category/ 商品merchandise
    url(r'^(?P<bcm>(brands)|(categories)|(merchandise))/(?P<bcm_id>[0-9]+)/$',
        bcmlist, name='bcmlist'),
    # 列出全部/某个merchant的 库存inventory
    # inventories/merchants/uuid
    url(r'^inventories/merchants/(?P<merchant>0|\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)/$',
        invlist, name='invlist'),
    # 修改库存, 新建,增,减
    url(r'inventories/update/$', update_inventory, name='update_inventory'),
]
