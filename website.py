import bottle


@bottle.route('/')
def index():
    return bottle.redirect('/index.html')

@bottle.route('/<filepath:path>')
def server_static(filepath):
    return bottle.static_file(filepath, root='.')


bottle.debug(True)
bottle.run(host='localhost', port=8000)
