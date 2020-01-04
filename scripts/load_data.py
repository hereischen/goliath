# -*- coding: utf-8 -*-
import pandas


from inventory.models import (Brand,
                              Category,
                              Merchandise)


def load_data(xlsx):
    print('loading %s' % xlsx)
    df = pandas.read_excel(xlsx)
    for row in df.iterrows():
        print(row[1][u'商品编码'])
        b, _ = Brand.objects.get_or_create(brand=row[1][u'品牌'])
        c, _ = Category.objects.get_or_create(category=row[1][u'品类'])
        m, _ = Merchandise.objects.get_or_create(brand=b,
                                                 category=c,
                                                 code=row[1][u'商品编码'],
                                                 model=row[1][u'商品型号'],
                                                 certification=row[1][u'认证'],
                                                 spare_parts=row[1][u'属性'])


load_data('./scripts/henan-2020-01-02.xlsx')
