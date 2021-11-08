const cpx = require('cpx');

cpx.copy('src/assets/**/*', 'lib/assets/', {});
cpx.copy('src/styles/**/*', 'lib/styles/', {});
cpx.copy('src/components/**/*.scss', 'lib/components/', {});
