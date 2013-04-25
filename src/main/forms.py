'''
Created on Apr 15, 2013

@author: mbianchini
'''
from django import forms
from main.models import Person

class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        
