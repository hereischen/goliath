# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2019-03-25 22:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0004_auto_20190324_2335'),
    ]

    operations = [
        migrations.AlterField(
            model_name='merchandise',
            name='after_sales',
            field=models.SmallIntegerField(default=1, help_text='\u5e74', verbose_name='\u552e\u540e\u670d\u52a1'),
        ),
        migrations.AlterField(
            model_name='merchandise',
            name='delivery_time',
            field=models.SmallIntegerField(default=3, help_text='\u5929', verbose_name='\u914d\u9001\u65f6\u95f4'),
        ),
    ]
