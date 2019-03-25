# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils.translation import ugettext_lazy as _

from inventory.models import Inventory


TYPES = (
    (0, _("存入")),
    (1, _("自取出")),
    (2, _("调配")),
)


class History(models.Model):
    """历史记录"""
    type = models.IntegerField(choices=TYPES, default=0, verbose_name='变动类型')
    inventory = models.ForeignKey(Inventory, verbose_name='变动库存')
    initiator = models.UUIDField(verbose_name='发起商户')
    quantity = models.PositiveIntegerField(default=0, verbose_name='变动数量')
    price = models.DecimalField(max_digits=11, decimal_places=2,
                                verbose_name='时价')
    deal_price = models.DecimalField(max_digits=11, decimal_places=2,
                                     verbose_name='成交价')
    remarks = models.TextField(null=True, blank=True, verbose_name='备注')
    created_date = models.DateTimeField(auto_now_add=True,
                                        verbose_name='创建时间')
    modified_date = models.DateTimeField(auto_now=True,
                                         verbose_name='修改时间')

    class Meta:
        verbose_name = _('库存记录')
        verbose_name_plural = _('库存记录')

    def __unicode__(self):
        return unicode("记录%s: 发起人%s." % (self.id, self.initiator))

    def save(self, *args, **kwargs):
        # 自增减库存成交价等于时价
        if self.type in (0, 1):
            self.deal_price = self.price
        super(Inventory, self).save(*args, **kwargs)
