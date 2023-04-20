from rest_framework import serializers
from base.models.AirlineModel import Airline


class AirlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airline
        fields = '__all__'