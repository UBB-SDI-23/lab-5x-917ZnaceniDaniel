
# Create your models here.
from django.db import models
from django.db.models import Avg, Count, Sum
from rest_framework.exceptions import ValidationError


class Airline(models.Model):
    name = models.CharField(max_length=100)
    # logo = models.ImageField(upload_to='airlineLogos')
    headquarters = models.CharField(max_length=100)
    website = models.URLField()
    establishedDate = models.DateField()
    revenue = models.IntegerField()
    numEmployees = models.IntegerField()
