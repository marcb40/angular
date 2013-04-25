from django.core import serializers
from django.http.response import HttpResponse
from django.utils import simplejson
from main.forms import PersonForm
from main.models import Person
import json

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

def add_player(request):
    form = PersonForm(request.POST) # A form bound to the POST data
        
    if (form.is_valid()):
        person_instance = form.save()
        data = serializers.serialize('json', [person_instance,])
        struct = json.loads(data)
        data = json.dumps(struct[0])
        return HttpResponse(data, mimetype='application/json')

    errors = {'errors' : form.errors}

    return HttpResponse(simplejson.dumps(errors), mimetype='application/json')
            
