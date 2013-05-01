'''
Created on Apr 11, 2013

@author: mbianchini
'''
from django.conf.urls import patterns, url
urlpatterns = patterns('',
    url(r'^team/(?P<team_name>.+)$', 'main.views.team', name='team'),
    url(r'^player/(?P<player_id>\d+)$', 'main.views.player', name='player'),
)