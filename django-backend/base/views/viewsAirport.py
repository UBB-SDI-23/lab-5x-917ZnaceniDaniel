from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import *
from base.models.AirportModel import Airport
from base.serializers import *
from django.db.models import Count, Avg

from base.serializers.AirportSerializer import AirportSerializer


@api_view(['GET'])  # to only allow a get response
def HomePageView(request):
    api_url = {
        'Airport': '/airport/',
        'Airline': '/airline/',
        'Aircraft': '/aircraft'
    }
    return Response(api_url)


# --------------------------------------------------------------------------------------------AIRPORT
@api_view(['GET'])  # to only allow a get response
def airportHomePageView(request):
    api_url = {
        'List': '/list-airport/',
        'Create': '/create-airport/',
        'Read': '/read-airport/pk/',
        'Update': '/update-airport/pk/',
        'Delete': '/delete-airport/pk/'
    }
    return Response(api_url)


# query the database, serialize the data and return it as a response
@api_view(['GET'])  # to only allow a get response
def airportList(request):
    list_of_airports = Airport.objects.all()[:100]
    serializer = AirportSerializer(list_of_airports, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createAirport(request):
    serializer = AirportSerializer(data=request.data)
    if serializer.is_valid():  # if the item is valid, send it back to the database and save it
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def readAirport(request, pk):
    try:
        airport = Airport.objects.get(id=pk)
        serializer = AirportSerializer(airport, many=False)
        return Response(serializer.data)
    except Airport.DoesNotExist:
        return Response({"error": "Airport not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def updateAirport(request, pk):
    airport = Airport.objects.get(id=pk)
    serializer = AirportSerializer(instance=airport, data=request.data)
    if serializer.is_valid():  # if the item is valid, send it back to the database and save it
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteAirport(request, pk):
    airport = Airport.objects.get(id=pk)
    airport.delete()
    return Response("Airport successfully deleted!")


@api_view(['GET'])
def filter_airport(request, pk):
    list_of_airports = Airport.objects.filter(noTerminals__gt=pk).values()
    serializer = AirportSerializer(list_of_airports, many=True)
    return Response(serializer.data)
