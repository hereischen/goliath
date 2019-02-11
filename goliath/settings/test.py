try:
    from configparser import ConfigParser
except ImportError:
    from ConfigParser import ConfigParser

import os

from .base import *

DEBUG = False

ALLOWED_HOSTS = ['*']

SERVER_ALIAS = 'test'

# glance ini file path
INI_DIR = os.path.dirname(BASE_DIR)
STATIC_ROOT = '/project/resources/goliath/static/'
# instantiate
config = ConfigParser()

config.read(os.path.join(INI_DIR, 'goliath.ini'))

# test SECRET_KEY
SECRET_KEY = config.get('test', 'SECRET_KEY')
# for default db
default_db_user = config.get('test', 'default_db_user')
default_db_password = config.get('test', 'default_db_password')
default_db_host = config.get('test', 'default_db_host')
default_db_port = config.get('test', 'default_db_port')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'goliath',
        'USER': default_db_user,
        'PASSWORD': default_db_password,
        'HOST': default_db_host,
        'PORT': default_db_port,
    },
}
