import os
import datetime
import logging
import random

ORDER = 999
POSTS = []

from django.template import Context
from django.template.loader import get_template
from django.template.loader_tags import BlockNode, ExtendsNode

POSTS_PATH = ''


def preBuildPage(site, page, context, data):
    """
    Add the list of posts to every page context so we can
    access them from wherever on the site.
    """
    context['posters'] = os.listdir('./static/img/posters')[:-6]
    context['extras'] = os.listdir('./static/img/posters')[-6:]

    return context, data
