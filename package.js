Package.describe({
    name: 'ellisonleao:sharerjs',
    version: '0.2.0',
    summary: 'Create your own social share buttons',
    git: 'git://github.com/ellisonleao/sharer.js'
});

Package.onUse(function(api) {
    api.addFiles(['sharer.min.js'], 'client');
});
