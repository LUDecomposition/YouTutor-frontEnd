import sys
import os
from flask import json
from flask import Flask
from flask import request
from faker import Faker
import random
from datetime import date
import datetime
import time
import uuid
fake = Faker()
app = Flask(__name__)

print(sys.path)

path = '/Users/syeehyn/Desktop/spring2020/coms6998/final/YouTutor-frontEnd/dev'

degrees = ['B.S', 'B.A', 'PhD', 'M.E', 'M.F.A', 'M.S', 'M.A', 'K12',
'Others']
schools = ['Columbia University', 'Stanford University', 'UCSD']
genders = ['F', 'M']
tutors = [True, False]
tags = ['CS', 'Math', 'Art', 'Algorithm', 'Finance', 'ML', 'DL',
'Stats', 'English', 'France', 'Chinese', 'Japanese']
weekdays = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']
college_major = json.load(open(os.path.join(path, 'collage_major.json')))
grad_major = json.load(open(os.path.join(path,'grad_major.json')))

hours = range(8, 20, 1)
appt_length = range(1, 4)
num_links = range(5)
@app.route('/')
def home():
    # etc etc, flask app code
    return
@app.route('/user/get_user')
def get_user():
    user_id = request.headers.get('user_id')
    datum = {
                'user_id': user_id,
                'last_name': fake.last_name(),
                'first_name': fake.first_name(),
                'photo_url': None,
                'gender': random.choice(genders),
                'tutor': random.choice(tutors),
                'degree': random.choice(degrees),
                'school': random.choice(schools),
                'tags': list(set(random.choices(tags, k=random.randint(0,5)))),
                'introduction': fake.text(),
                'picture': 'https://cdn.icon-icons.com/icons2/2248/PNG/512/cat_icon_138789.png'
                }
    if datum['degree'] == 'K12':
        datum['major'] = None
        datum['age'] = random.choice(range(13, 18))
    elif datum['degree'] in ['B.S', 'B.A']:
        datum['major'] = random.choice(college_major)
        datum['age'] = random.choice(range(17, 17+6))
    else:
        datum['major'] = random.choice(grad_major)
        datum['age'] = random.choice(range(20, 31))
    phone = str(random.randint(1e9, 1e10-1))
    phone = f'({phone[:3]})-{phone[3:6]}-{phone[6:]}'
    if datum['tutor']:
        availability = []
        for _ in range(random.randint(0, 5)):
            time_stamp = sorted(random.choices(hours, k=2))
            while len(set(time_stamp)) == 1:
                time_stamp = sorted(random.choices(hours, k=2))
            time_stamp = '-'.join([str(i)+':00' for i in time_stamp])
            time_stamp = time_stamp + ',' + fake.day_of_week()
            availability.append(time_stamp)
        datum['availability'] = availability
    response = app.response_class(
        response = json.dumps(datum),
        status=200,
        mimetype='application/json'
    )
    return  response

@app.route('/user/recom_users')
def recom_users():
    n = request.headers.get('page')
    CONST = 10
    body = []
    for _ in range(CONST):
        datum = {
                'user_id': fake.email(),
                'last_name': fake.last_name(),
                'first_name': fake.first_name(),
                'photo_url': None,
                'gender': random.choice(genders),
                'tutor': random.choice(tutors),
                'degree': random.choice(degrees),
                'school': random.choice(schools),
                'tags': list(set(random.choices(tags, k=random.randint(0,5)))),
                'introduction': fake.text(),
                'picture': 'https://cdn.dribbble.com/users/1900827/screenshots/5354476/icon.png?compress=1&resize=800x600'
                }
        if datum['degree'] == 'K12':
            datum['major'] = None
            datum['age'] = random.choice(range(13, 18))
        elif datum['degree'] in ['B.S', 'B.A']:
            datum['major'] = random.choice(college_major)
            datum['age'] = random.choice(range(17, 17+6))
        else:
            datum['major'] = random.choice(grad_major)
            datum['age'] = random.choice(range(20, 31))
        phone = str(random.randint(1e9, 1e10-1))
        phone = f'({phone[:3]})-{phone[3:6]}-{phone[6:]}'
        if datum['tutor']:
            availability = []
            for _ in range(random.randint(0, 5)):
                time_stamp = sorted(random.choices(hours, k=2))
                while len(set(time_stamp)) == 1:
                    time_stamp = sorted(random.choices(hours, k=2))
                time_stamp = '-'.join([str(i) for i in time_stamp])
                time_stamp = time_stamp + ',' + fake.day_of_week()
                availability.append(time_stamp)
            datum['availability'] = availability
        body.append(
            datum
        )
    response = app.response_class(
        response = json.dumps(body),
        status=200,
        mimetype='application/json'
    )
    return  response
@app.route('/user/recom_questions')
def recom_questions():
    n = request.headers.get('page')
    CONST = 10
    body = []
    for _ in range(CONST):
        datum = {}
        datum['tutor'] = None
        datum['user_id'] = fake.email()
        datum['user'] = fake.name()
        datum['status'] = 'posted'
        datum['title'] = 'What is ' + fake.text().split(' ')[0]
        datum['tags'] = list(set(random.choices(tags, k=random.randint(0,5))))
        datum['detail'] = fake.text()
        datum['question_id'] = str(uuid.uuid1())
        datum['attachment'] = random.choice(num_links)
        datum['user_picture'] = 'https://cdn.icon-icons.com/icons2/2248/PNG/512/cat_icon_138789.png'
        datum['tutor_picture'] = None
        body.append(datum)
    response = app.response_class(
        response = json.dumps(body),
        status=200,
        mimetype='application/json'
    )
    return  response


@app.route('/user/questions')
def get_questions():
    n = request.headers.get('page')
    CONST = 10
    email = request.headers.get('user_id')
    first_name = request.headers.get('first_name')
    last_name = request.headers.get('last_name')
    body = []
    for _ in range(CONST):
        datum = {}
        validator = random.choice([0, 1])
        if validator:
            datum['user'] = first_name + ' ' + last_name
            datum['tutor'] = random.choice([fake.name(), None])
            if datum['tutor']:
                datum['status'] = random.choice(['accepted', 'confirmed'])
            else:
                datum['status'] = random.choice(['posted', 'canceled'])
        else:
            datum['user'] = fake.name()
            datum['tutor'] = first_name + ' ' + last_name
            datum['status'] = 'confirmed'
        datum['title'] = 'What is ' + fake.text().split(' ')[0]
        fake_date = fake.date_between_dates(date_start=date(2021, 3, 26), date_end=date(2021, 4, 5))
        fake_time = fake.time().split(':')
        datum['appointment_time'] = datetime.datetime(fake_date.year, fake_date.month, 
                        fake_date.day, random.choice(hours) , 0)
        datum['appointment_length'] = random.choice(appt_length)
        datum['tags'] = list(set(random.choices(tags, k=random.randint(0,5))))
        datum['detail'] = fake.text()
        datum['question_id'] = str(uuid.uuid1())
        datum['attachment'] = fake.url()
        datum['user_picture'] = 'https://cdn.icon-icons.com/icons2/2248/PNG/512/cat_icon_138789.png'
        datum['tutor_picture'] = 'https://cdn.dribbble.com/users/1900827/screenshots/5354476/icon.png?compress=1&resize=800x600'
        body.append(datum)
    body = sorted(body, key=lambda x: x['appointment_time'], reverse=True)

    for b in body:
        if datetime.datetime.now() > (b['appointment_time'] + datetime.timedelta(hours = b['appointment_length'])):
            if b['status'] == 'confirmed':
                b['status'] = 'finished'
        start_hour = b['appointment_time'].strftime("%H:%M") 
        end_hour = (b['appointment_time'] + datetime.timedelta(hours=b['appointment_length'])).strftime("%H:%M")
        day = b['appointment_time'].strftime('%D')
        b['time'] = f'{start_hour}-{end_hour} {day}'
    body = list(filter(lambda x: x['status']!='finished', body)) + \
            list(filter(lambda x: x['status']=='finished', body))
    response = app.response_class(
        response = json.dumps(body),
        status=200,
        mimetype='application/json'
    )
    return  response

if __name__ == '__main__':
    app.run(host='127.0.0.1',port=8080,debug=True)