
import os

#ADD below code to the end of your settings file BASE_DIR will be defined in settings file 



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