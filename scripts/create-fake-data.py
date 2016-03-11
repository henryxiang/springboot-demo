#!/usr/bin/env python

from faker import Faker

fake = Faker()

sql = "insert into user(user_name, first_name, last_name, birthday) values('%s', '%s', '%s', '%s');"

for _ in range(10):
  userName = fake.user_name()
  firstName = fake.first_name()
  firstName.replace("'", "''")
  lastName = fake.last_name()
  lastName.replace("'", "''")
  birthday = fake.date_time_between('-80y', '-10y').strftime('%Y-%m-%d')
  print(sql % (userName, firstName, lastName, birthday))
