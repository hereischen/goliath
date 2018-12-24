# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _


class Merchant(AbstractUser):
    """商户(user体系)信息."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=64, unique=True, verbose_name='商户名')
    address = models.CharField(max_length=128, null=True, blank=True,
                               verbose_name='地址')
    mobile = models.CharField(max_length=15, unique=True, verbose_name='手机号')
    dingding = models.CharField(max_length=15, null=True, blank=True,
                                verbose_name='钉钉')

    class Meta:
        verbose_name = _('共享商户')
        verbose_name_plural = verbose_name

    def __unicode__(self):
        return unicode("商户: %s." % self.name)
