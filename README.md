# Match My Word

Welcome to the small Python/Flask project. This application has been created under the strong influence of the [Wordle](https://www.nytimes.com/games/wordle) game.
This application does not try to repeat or replace the original application. But it does the opposite: __Match My Word__ helps you find a match using your input. 

## Usage

Access hosted or local application you should as on the screenshot below.
Type part of a word you have, and it will offer you matching combinations. You can use __Space__ or __.__ (period) as a placeholder. 

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

If you prefer to run a local copy - pull the docker image and run it on your local system.

    docker run -p 127.0.0.1:80:5000 docker.io/mikhailidim/match-my-word
    
Now the application should be available at http://127.0.0.1/. 

## Source Code

If you prefer to deal with the source code - clone this repository and configure the application for execution. 
It requires Python3 and PIP on your local system. I strongly recommend configuring a virtual environment as well. 
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

[Wordle](https://www.nytimes.com/games/wordle) - The overall idea, and UI inspiration. 

[English-Words](https://github.com/dwyl/english-words) - English nouns source.

[Russian-Nouns](https://github.com/Harrix/Russian-Nouns) - Russian nouns repository.
