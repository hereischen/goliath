# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2019-03-18 17:13
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Merchant',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=64, unique=True, verbose_name='\u5546\u6237\u540d')),
                ('address', models.CharField(blank=True, max_length=128, null=True, verbose_name='\u5730\u5740')),
                ('mobile', models.CharField(max_length=15, unique=True, verbose_name='\u624b\u673a\u53f7')),
                ('dingding', models.CharField(blank=True, max_length=15, null=True, verbose_name='\u9489\u9489')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': '\u5171\u4eab\u5546\u6237',
                'verbose_name_plural': '\u5171\u4eab\u5546\u6237',
            },
        ),
    ]
