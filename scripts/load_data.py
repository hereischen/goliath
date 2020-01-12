# -*- coding: utf-8 -*-
import pandas


from inventory.models import (Brand,
                              Category,
                              Merchandise)


def load_data(xlsx):
    print('loading %s' % xlsx)
    df = pandas.read_excel(xlsx)
    for row in df.iterrows():
        print(row[1]['C'])
        b, _ = Brand.objects.get_or_create(brand=row[1]['A'])
        c, _ = Category.objects.get_or_create(category=row[1]['B'])
        m, _ = Merchandise.objects.get_or_create(brand=b,
                                                 category=c,
                                                 code=row[1]['C'],
                                                 model=row[1]['D'],
                                                 certification=row[1]['E'],
                                                 spare_parts=row[1]['F'])


load_data('./scripts/henan-2020-01-11.xlsx')
