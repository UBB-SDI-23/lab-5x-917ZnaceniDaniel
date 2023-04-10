from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import *
from base.models.TicketModel import Ticket
from base.serializers import *
from django.db.models import Count, Avg


# --------------------------------------------------------------------------------------------------------TICKET
from base.serializers.TicketSerializer import TicketSerializer


@api_view(['GET'])  # to only allow a get response
def ticketHomePageView(request):
    api_url = {
        'List': '/list-ticket/',
        'Create': '/create-ticket/',
        'Read': '/read-ticket/pk/',
        'Update': '/update-ticket/pk/',
        'Delete': '/delete-ticket/pk/'
    }
    return Response(api_url)


# query the database, serialize the data and return it as a response
@api_view(['GET'])
def ticketList(request):
    list_of_tickets = Ticket.objects.all().values('id')
    return Response(list_of_tickets)


@api_view(['POST'])
def createTicket(request):
    serializer = TicketSerializer(data=request.data)
    if serializer.is_valid():  # if the item is valid, send it back to the database and save it
        serializer.save()
    return Response(serializer.data)


@api_view(['GET'])
def readTicket(request, pk):
    try:
        ticket = Ticket.objects.get(id=pk)
        serializer = TicketSerializer(ticket, many=False)
        return Response(serializer.data)
    except Ticket.DoesNotExist:
        return Response({"error": "Ticket not found."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def updateTicket(request, pk):
    ticket = Ticket.objects.get(id=pk)
    serializer = TicketSerializer(instance=ticket, data=request.data)
    if serializer.is_valid():  # if the item is valid, send it back to the database and save it
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteTicket(request, pk):
    ticket = Ticket.objects.get(id=pk)
    ticket.delete()
    return Response("Ticket successfully deleted!")
