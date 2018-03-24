


## Django ReactJs Boiler plate - With Hot reload

**NPM :**

    npm install # Installs dependencies from package.json

**Dependencies :**

    babel-cli
    babel-core
    babel-loader
    babel-preset-env
    babel-preset-react
    react
    react-dom
    react-hot-loader
    uglifyjs-webpack-plugin
    webpack
    webpack-bundle-tracker
    webpack-cli
    webpack-dev-server

**Entry Component :**

./assets/js/index.js - - - Renders React Component App.js

**Development Builds :**

./assets/bundles

**Production Builds :**

./assets/dist

**DJango :**

    pip install django-webpack-loader
    pip install whitenoise

**Django root template config :**

    {% load render_bundle from webpack_loader %} 	#Imports webpack loader
    
    <div  id="react-app"></div> #DOM root element to render
    
    {% render_bundle 'main' %} 	#Import build template

 
**Django settings config :**


    # Django's collectstatic copies bundles to the STATIC_ROOT 
    STATICFILES_DIRS = (
        os.path.join(BASE_DIR, 'assets/'),  
        )
    
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    STATIC_URL = '/static/'
        
    # Added webpackloader to INSTALLED_APPS
    INSTALLED_APPS.append('webpack_loader')

    # Configuring Django whitenoise to serve static files in production
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    MIDDLEWARE.append('whitenoise.middleware.WhiteNoiseMiddleware')

    # Used by loader in development mode and hot reload
    WEBPACK_LOADER = {
	    'DEFAULT': {
	    'BUNDLE_DIR_NAME': 'bundles/',
	    'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
	    }
    }

    # Used by loader in production mode. ie, DEBUG = False
    if not DEBUG:
	    WEBPACK_LOADER = {
		    'DEFAULT': {
		    'BUNDLE_DIR_NAME': 'dist/',
		    'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-prod.json')
		    }
	    }
    
**App WSGI file configuration for serving static files in production**
app/wsgi.py
    
    from whitenoise.django import DjangoWhiteNoise
    
    application = DjangoWhiteNoise(get_wsgi_application())

**Building app bundles**

    npm run build  # Build development bundle in assets/bundle
    npm run watch  # Build development bundle and serves it to django application with hot reload
    npm run build-prod  # Build production bundle in assets/dist


**For Production**

Set `DEBUG = False` and run `python manage.py collectstatic` to copy static files
