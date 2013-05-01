from django.core import serializers
from django.http.response import HttpResponse
from django.shortcuts import redirect
from django.utils import simplejson
from main.forms import PersonForm
from main.models import Person
import json

def team(request, team_name):
    team_name = team_name.upper()
    if (team_name == 'ALL'):
        people = Person.objects.all()
    else:
        people =  Person.objects.filter(team=team_name)
    data = serializers.serialize('json', people)
    
    return HttpResponse(data, mimetype='application/json')

def player(request, player_id):
   
    if request.method == 'POST':
        #save a player
        form = PersonForm(request.POST) 
        
        if (form.is_valid()):
            person_instance = form.save()
            return redirect('main:team', person_instance.team,)
    
        errors = {'errors' : form.errors} #TODO this is not good enough for error handling.. need a way to let the client know we are passing and error
    
        return HttpResponse(simplejson.dumps(errors), mimetype='application/json')
    else :
        #get a player
        player =  Person.objects.get(pk=player_id)
        data = serializers.serialize('json', [player])
        struct = json.loads(data)
        data = json.dumps(struct[0])
        #data = simplejson.dumps(player)
        return HttpResponse(data, mimetype='application/json')

def simple_data(request):
    some_data = {
       'some_var_1': 'foo',
       'some_var_2': 'bar',
    }
    data = simplejson.dumps(some_data)
    return data
            