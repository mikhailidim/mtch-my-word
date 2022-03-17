# Match My Word

Welcome to the tiny Python/Flask project. This application has been created under the strong ifluence of the [Wordle](https://www.nytimes.com/games/wordle) game.
This application does not try to repeat or replace the original application. In fact it does complete opposite, __Match My Word__ helps you find a match using your input. 

## Usage

Open application in your browser and you would see the application page as on screenshot below.
Type part of a word you have and it will offer you a matching combinations. You can use __Space__ or __.__ (period) as placeholder. 

![Match My Word start Page](https://user-images.githubusercontent.com/10143072/158813911-c6bda072-0f9d-4f5e-84fd-69ff6220a7e3.png)

Additional controls are: 

| Button | Description |
|---|---|
| __EN/RU__ | Switches search between English and Russian dictionaries | 
| __-__/__+__ | decrease or increase word length | 
| __?__ | Quick reference card | 


### Internet Access
The latest application version is available on my website - (__TODO__)

### Local Container

If you want to run it locally - pull the docker image and un it on your local system.

    docker run -p 127.0.0.1:80:5000 docker.io/mikhailidim/match-my-word
    
Now application sould be available at http://127.0.0.1/ 

## Source Code

If you prefer to deal with the source code - clone this repository and configure application for the execution. 
It requires Python3 and PIP on your local system. I stronly recommend use virtual environment as well. 
```bash
# Prepare code and environment 
git clone git@github.com:mikhailidim/match-my-word.git
virtualenv match-my-word
cd match-my-word
. bin/activate
pip install -r requirements.txt 
    
# Run the application 
waitress-serve --port=5000 wsgi:application
```
## Credits 

 
