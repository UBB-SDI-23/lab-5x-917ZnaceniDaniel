from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models.AirportModel import Airport
from base.serializers.AirportSerializer import AirportSerializer
from base.views.pagination import CustomPagination


@api_view(['GET'])
def HomePageView(request):
    api_url = {
        'Airport': '/airport/',
        'Airline': '/airline/',
        'Aircraft': '/aircraft'
    }
    return Response(api_url)


# --------------------------------------------------------------------------------------------AIRPORT
@api_view(['GET'])
def airportHomePageView(request):
    api_url = {
        'List': '/list-airport/',
        'Create': '/create-airport/',
        'Read': '/read-airport/pk/',
        'Update': '/update-airport/pk/',
        'Delete': '/delete-airport/pk/'
    }
    return Response(api_url)


@api_view(['GET'])
def airportList(request):
    paginator = CustomPagination()
    list_of_airports = Airport.objects.all()
    paginated_list_of_airports = paginator.paginate_queryset(list_of_airports, request)
    serializer = AirportSerializer(paginated_list_of_airports, many=True)
    return paginator.get_paginated_response(serializer.data)


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
    paginator = CustomPagination()
    list_of_airports = Airport.objects.filter(noTerminals__gt=pk).values()
    paginated_list_of_airports = paginator.paginate_queryset(list_of_airports, request)
    serializer = AirportSerializer(paginated_list_of_airports, many=True)
    return paginator.get_paginated_response(serializer.data)
