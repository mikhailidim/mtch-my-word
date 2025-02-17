FROM python:3.8-alpine
LABEL maintainer="mm@chronicler.tech"
WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "waitress-serve","--port=5000","wsgi:application"]