'''
Created on Apr 25, 2013

@author: mbianchini
'''
from django.test.client import Client
from django.utils.unittest import TestCase
from main.models import Person

class PersonTests(TestCase):

    def test_get_team(self):
        c = Client()
        malkin = Person.objects.create(first_name="Evgeni", last_name="Malkin", team="PENGUINS")
        neal = Person.objects.create(first_name="James", last_name="Neil", team="PENGUINS")
        walker = Person.objects.create(first_name="Neil", last_name="Walker", team="PIRATES")
        
        response = c.post('/main/team/PENGUINS')
        a = response.content.decode('ascii')
        self.assertTrue(a.find(malkin.last_name) >= 0)
        self.assertTrue(a.find(neal.last_name) >= 0)
        self.assertTrue(a.find(walker.last_name) == -1)
        
    def test_add_player(self):
        c = Client()
        response = c.post('/main/player/add', {'first_name': 'Brendon', 'last_name': 'Sutter', 'team' : 'PENGUINS'})
        
        a = response.content.decode('ascii')
        self.assertTrue(a.find('errors') == -1)
        
        self.assertTrue(a.find('Sutter') >= 0)
        self.assertTrue(a.find("Walker") == -1)