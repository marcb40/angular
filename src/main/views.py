from django.core import serializers
from django.http.response import HttpResponse
from django.utils import simplejson
from main.models import Person
def penguins(request):
    pens =  Person.objects.filter(team="PENGUINS")
    data = serializers.serialize('json', pens)
    
    return HttpResponse(data, mimetype='application/json')

def pirates(request):
    pirates =  Person.objects.filter(team="PIRATES")
    data = serializers.serialize('json', pirates)
    
    return HttpResponse(data, mimetype='application/json')

def steelers(request):
    steelers =  Person.objects.filter(team="STEELERS")
    data = serializers.serialize('json', steelers)
    
    return HttpResponse(data, mimetype='application/json')

def simple_data(request):
    some_data = {
       'some_var_1': 'foo',
       'some_var_2': 'bar',
    }
    data = simplejson.dumps(some_data)
    return data
