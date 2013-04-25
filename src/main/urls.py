'''
Created on Apr 11, 2013

@author: mbianchini
'''
from django.conf.urls import patterns, url
urlpatterns = patterns('',
    url(r'^penguins/$', 'main.views.penguins', name='penguins'),
    url(r'^pirates/$', 'main.views.pirates', name='pirates'),
    url(r'^steelers/$', 'main.views.steelers', name='steelers'),
)