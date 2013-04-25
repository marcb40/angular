from django.db import models

TEAM = (
    ('PENGUINS','Penguins'),
    ('PIRATES', 'Pirates'),
    ('STEELERS', 'Steelers'),
)

class Person(models.Model):
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    team =  models.CharField(max_length=50, blank=False, choices=TEAM)
    email = models.EmailField(max_length=60, blank=True)
    
    class Meta:
        app_label = 'main'
        
    def __unicode__(self):
        return self.first_name
    
    def __str__(self):
        return self.first_name