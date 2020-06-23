/* eslint-disable strict */
'use script';

const spawn = require('react-dev-utils/crossSpawn');

module.exports.triggerScript = (script, nodeArgs = [], scriptArgs = []) => {
  if (['build', 'eject', 'start', 'test'].includes(script)) {
    const spawnArgs = nodeArgs
      .concat(require.resolve('./scripts/' + script))
      .concat(scriptArgs);
    const result = spawn.sync('node', spawnArgs, { stdio: 'inherit' });
    if (result.signal) {
      if (result.signal === 'SIGKILL') {
        console.log(
          'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
        );
      } else if (result.signal === 'SIGTERM') {
        console.log(
          'The build failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
        );
      }
      return 1;
    }
    return result.status;
  } else {
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update react-scripts?');
    console.log(
      'See: https://facebook.github.io/create-react-app/docs/updating-to-new-releases'
    );
  }
};
