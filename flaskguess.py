#!flask/bin/python
from flask import Flask, jsonify, send_from_directory
from urllib.request import *
import sys
import re
import os
en_source = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt'
ru_source = 'https://raw.githubusercontent.com/Harrix/Russian-Nouns/main/dist/russian_nouns.txt'

en_words = []
ru_words = []

#kwargs = {}
#kwargs['ensure_ascii'] = False

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        JSON_AS_ASCII = False,
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    blob = urlopen(en_source).read()
    en_words = blob.decode('utf-8').split('\n')
    app.logger.info(f"Loaded {len(en_words)} English words.")
    app.logger.debug(f"Test word[1]: {en_words[1].strip()}")

    blob = urlopen(ru_source).read()
    ru_words = blob.decode('utf-8').split('\n')
    app.logger.info(f"Загружено {len(ru_words)} слов.")
    app.logger.debug(f"Тест слово[1]: {ru_words[1].strip()}")

    @app.route('/')
    def serve_index():
        # Haven't used the secure way to send files yet
        return send_from_directory('static','index.html')

    @app.route('/<path:file>', defaults={'file': 'index.html'})
    def serve_results(file):
        # Haven't used the secure way to send files yet
        return send_from_directory('static',file)

    @app.route('/guess/api/v1.0/en/<string:mask>', methods=['GET'])
    def en_guess(mask):   
        app.logger.debug('%s: Received %s','EN',mask)
        rs = match(mask,en_words)

        app.logger.debug('%s: Found %d  matches.','EN',len(rs['Matches']))    
        return jsonify(rs)

    @app.route('/guess/api/v1.0/ru/<string:mask>', methods=['GET','POST'])
    def ru_guess(mask):
        app.logger.debug('%s: Получено %s', 'RU',mask)
        rs = match(mask,ru_words) 
        app.logger.debug('%s: Найдено %d совпадений.','RU',len(rs['Matches']))   
        return jsonify(rs)

    def match(mask,dict):
        # To lower case 
        nm = mask.lower().translate({ord(c): "." for c in "\"\'!@#$%^&*()[]{};:,/<>?\|`~-=_+"})
        r = re.compile("^"+nm+"$")
        app.logger.debug('Search predicate:  %s',r)
        result = {}
        result['Mask'] = nm
        result['Matches'] = list(map(str.strip,filter(r.match,dict)))
        return result
    
    return app
    
if __name__ == '__main__':
    app=create_app()
    app.run(debug=True)

