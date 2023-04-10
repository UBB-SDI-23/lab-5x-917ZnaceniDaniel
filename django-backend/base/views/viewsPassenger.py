from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import *
from base.models.PassengerModel import Passenger
from base.serializers import *
from django.db.models import Count, Avg


# ------------------------------------------------------------------------------------------PASSENGER
from base.serializers.PassengerSerializer import PassengerSerializer


@api_view(['GET'])  # to only allow a get response
def passengerHomePageView(request):
    api_url = {
        'List': '/list-passenger/',
        'Create': '/create-passenger/',
        'Read': '/read-passenger/pk/',
        'Update': '/update-passenger/pk/',
        'Delete': '/delete-passenger/pk/'
    }
    return Response(api_url)


# query the database, serialize the data and return it as a response
@api_view(['GET'])
def passengerList(request):
    list_of_passengers = Passenger.objects.all().values('id')
    return Response(list_of_passengers)


@api_view(['POST'])
def createPassenger(request):
    serializer = PassengerSerializer(data=request.data)
    if serializer.is_valid():  # if the item is valid, send it back to the database and save it
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def readPassenger(request, pk):
    try:
        passenger = Passenger.objects.get(id=pk)
        serializer = PassengerSerializer(passenger, many=False)
        return Response(serializer.data)
    except Passenger.DoesNotExist:
        return Response({"error": "Aircraft not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def updatePassenger(request, pk):
    passenger = Passenger.objects.get(id=pk)
    serializer = PassengerSerializer(instance=passenger, data=request.data)
    if serializer.is_valid():  # if the item is valid, send it back to the database and save it
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deletePassenger(request, pk):
    passenger = Passenger.objects.get(id=pk)
    passenger.delete()
    return Response("Passenger successfully deleted!")
