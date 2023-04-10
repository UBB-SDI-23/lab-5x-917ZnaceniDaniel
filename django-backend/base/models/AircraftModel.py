

# Create your models here.
from django.db import models
from django.db.models import Avg, Count, Sum
from rest_framework.exceptions import ValidationError

from base.models.AirlineModel import Airline


class Aircraft(models.Model):
    def clean(self):
        if self.seatingCapacity <= 0:
            raise ValidationError(
                'Aircraft seating capacity should be greater than or equal to the number of seats available on the flight.')

    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    maxSpeed = models.IntegerField()
    seatingCapacity = models.IntegerField()
    fuelCapacity = models.IntegerField()
    wingSpan = models.IntegerField()
    length = models.IntegerField()
    noEngines = models.IntegerField()
    # flights = models.ManyToManyField('Flight')
    airlineName = models.ForeignKey(Airline, on_delete=models.CASCADE, default=None)
