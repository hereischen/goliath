# -*- coding: utf-8 -*-
import pandas
df = pandas.read_excel('henan.xlsx')
#print the column names
print df.columns
#get the values for a given column
values = df[u'品牌'].values
print len(values)

# for v in values:
#   print v.encode('utf-8')
# #get a data frame with selected columns
# FORMAT = ['Arm_id', 'DSPName', 'Pincode']
# df_selected = df[FORMAT]

