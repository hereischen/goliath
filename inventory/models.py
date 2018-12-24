# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils.translation import ugettext_lazy as _


class Brand(models.Model):
    """商品品牌"""

    brand = models.CharField(max_length=64, unique=True, verbose_name='品牌')
    in_stock = models.BooleanField(default=True, verbose_name='是否上架')
    created_date = models.DateTimeField(auto_now_add=True,
                                        verbose_name='创建时间')
    modified_date = models.DateTimeField(auto_now=True,
                                         verbose_name='修改时间')

    class Meta:
        verbose_name = _('品牌')
        verbose_name_plural = _('品牌')

    def __unicode__(self):
        return unicode("品牌: %s." % self.brand)


class Category(models.Model):
    """商品品类."""

    category = models.CharField(max_length=64, unique=True, verbose_name='品类')
    in_stock = models.BooleanField(default=True, verbose_name='是否上架')
    created_date = models.DateTimeField(auto_now_add=True,
                                        verbose_name='创建时间')
    modified_date = models.DateTimeField(auto_now=True,
                                         verbose_name='修改时间')

    class Meta:
        verbose_name = _('品类')
        verbose_name_plural = verbose_name

    def __unicode__(self):
        return unicode("品类: %s." % self.category)


class Merchandise(models.Model):
    """商品."""
    brand = models.ForeignKey(Brand, verbose_name='品牌')
    category = models.ForeignKey(Category, verbose_name='品类')
    code = models.CharField(max_length=24, unique=True, verbose_name='商品编码')
    in_stock = models.BooleanField(default=True, verbose_name='是否上架')
    remarks = models.TextField(null=True, blank=True, verbose_name='备注')
    created_date = models.DateTimeField(auto_now_add=True,
                                        verbose_name='创建时间')
    modified_date = models.DateTimeField(auto_now=True,
                                         verbose_name='修改时间')

    class Meta:
        verbose_name = _('商品')
        verbose_name_plural = verbose_name

    def __unicode__(self):
        return unicode("商品: %s." % self.code)


class Inventory(models.Model):
    """库存."""
    merchandise = models.ForeignKey(Merchandise, verbose_name='商品')
    merchant = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name='商户')
    price = models.DecimalField(max_digits=11, decimal_places=2,
                                verbose_name='标价')
    quantity = models.PositiveIntegerField(default=0, verbose_name='数量')
    remarks = models.TextField(null=True, blank=True, verbose_name='备注')
    remarks_json = JSONField(null=True, blank=True, verbose_name='JSON备注')
    created_date = models.DateTimeField(auto_now_add=True,
                                        verbose_name='创建时间')
    modified_date = models.DateTimeField(auto_now=True,
                                         verbose_name='修改时间')

    class Meta:
        verbose_name = _('库存')
        verbose_name_plural = verbose_name

    def __unicode__(self):
        return unicode("库存: %s %s 标价：%s 数量：%s." % (
            self.merchant, self.merchandise, self.price, self.quantity))
