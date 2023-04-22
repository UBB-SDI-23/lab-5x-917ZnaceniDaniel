from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import *
from base.models.AircraftModel import Aircraft
from base.serializers import *
from django.db.models import Count, Avg


# -----------------------------------------------------------------------------------------------AIRCRAFT
from base.serializers.AircraftSerializer import AircraftSerializer


@api_view(['GET'])  # to only allow a get response
def aircraftHomePageView(request):
    api_url = {
        'List': '/list-aircraft/',
        'Create': '/create-aircraft/',
        'Read': '/read-aircraft/pk/',
        'Update': '/update-aircraft/pk/',
        'Delete': '/delete-aircraft/pk/'
    }
    return Response(api_url)


# query the database, serialize the data and return it as a response
@api_view(['GET'])  # to only allow a get response
def aircraftList(request):
    list_of_aircraft = Aircraft.objects.all().values('id')[:100]
    # serializer = AircraftSerializer(list_of_aircraft, many=True)
    return Response(list_of_aircraft)


@api_view(['POST'])
def createAircraft(request):
    serializer = AircraftSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):  # if the item is valid, send it back to the database and save it
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def readAircraft(request, pk):
    try:
        aircraft = Aircraft.objects.get(id=pk)
        serializer = AircraftSerializer(aircraft, many=False)
        return Response(serializer.data)
    except Aircraft.DoesNotExist:
        return Response({"error": "Aircraft not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def updateAircraft(request, pk):
    aircraft = Aircraft.objects.get(id=pk)
    serializer = AircraftSerializer(instance=aircraft, data=request.data)
    if serializer.is_valid():  # if the item is valid, send it back to the database and save it
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteAircraft(request, pk):
    aircraft = Aircraft.objects.get(id=pk)
    aircraft.delete()
    return Response("Aircraft successfully deleted!")
