Package.describe({
    name: 'ellisonleao:sharerjs',
    version: '0.2.5',
    summary: 'Create your own social share buttons',
    git: 'git://github.com/ellisonleao/sharer.js',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.addFiles(['sharer.min.js'], 'client');
});
