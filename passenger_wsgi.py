"""
WSGI config for bso_nsk project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/wsgi/
"""

import os
import sys

sys.path.insert(0, '/var/www/u1625612/data/www/bso-nsk.ru/bso_nsk')
sys.path.insert(1, '/var/www/u1625612/data/bso/lib/python3.8/site-packages')

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bso_nsk.settings.local')

application = get_wsgi_application()
