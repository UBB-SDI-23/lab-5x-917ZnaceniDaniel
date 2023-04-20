from rest_framework import serializers
from base.models.AirportModel import Airport


class AirportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = '__all__'
