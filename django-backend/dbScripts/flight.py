from datetime import timedelta

import psycopg2
from faker import Faker
from psycopg2 import sql
from django.utils import timezone
import random
import pytz

fake = Faker()

conn = psycopg2.connect(
    host="ec2-16-170-35-243.eu-north-1.compute.amazonaws.com",
    port="5432",
    database="airport_management",
    user="db_user",
    password="db_pass"
)
cur = conn.cursor()

# delete all the existing records
cur.execute('TRUNCATE TABLE base_flight RESTART IDENTITY CASCADE;')

# generate new records to insert
batch_size = 1000
num_batches = 1000
total_records = batch_size * num_batches

# get a list of airport ids up to 1000000
cur.execute('SELECT id FROM base_airport;')
airport_ids = [row[0] for row in cur.fetchall()]

# set the timezone to use
tz = pytz.timezone('Europe/London')

for i in range(num_batches):
    print(f'Generating batch {i + 1}/{num_batches}')

    values = []
    for j in range(batch_size):
        # generate fake data for flight fields
        departure_airport_id = random.choice(airport_ids)
        arrival_airport_id = random.choice(airport_ids)
        while arrival_airport_id == departure_airport_id:
            arrival_airport_id = random.choice(airport_ids)
        departure_time = fake.date_time_between(start_date='+1d', end_date='+2y', tzinfo=tz)
        arrival_time = fake.date_time_between(start_date=departure_time + timedelta(hours=1),
                                              end_date=departure_time + timedelta(hours=24), tzinfo=tz)
        duration = arrival_time - departure_time

        status = fake.random_element(elements=('Scheduled', 'On Time', 'Delayed', 'Cancelled'))
        price = round(random.uniform(50, 1000), 2)
        seats_available = fake.random_int(min=0, max=300)

        # escape any special characters or quotes in the data
        values.append(
            sql.SQL("({}, {}, {}, {}, {}, {}, {}, {})").format(
                sql.Literal(departure_airport_id),
                sql.Literal(arrival_airport_id),
                sql.Literal(departure_time),
                sql.Literal(arrival_time),
                sql.Literal(duration),
                sql.Literal(status),
                sql.Literal(price),
                sql.Literal(seats_available),
            )
        )

    # join the values and generate the SQL statement
    sql_statement = sql.SQL(
        "INSERT INTO base_flight (departure_airport_id, arrival_airport_id, departure_time, arrival_time, duration, status, price, seats_available) VALUES {}").format(
        sql.SQL(", ").join(values)
    )

    # execute the SQL statement
    cur.execute(sql_statement)

# commit the changes and close the cursor and connection
conn.commit()
cur.close()
conn.close()
