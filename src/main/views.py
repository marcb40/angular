from django.core import serializers
from django.http.response import HttpResponse
from django.utils import simplejson
from main.models import Person

def team(request, team_name):
    people =  Person.objects.filter(team=team_name)
    data = serializers.serialize('json', people)
    
    return HttpResponse(data, mimetype='application/json')

def simple_data(request):
    some_data = {
       'some_var_1': 'foo',
       'some_var_2': 'bar',
    }
    data = simplejson.dumps(some_data)
    return data
