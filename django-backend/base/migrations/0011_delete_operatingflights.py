# Generated by Django 4.1.7 on 2023-04-23 14:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_flight_operating_aircraft'),
    ]

    operations = [
        migrations.DeleteModel(
            name='OperatingFlights',
        ),
    ]
