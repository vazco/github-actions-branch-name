import { setFailed, debug, error, setOutput, info } from '@actions/core';
import { context, } from '@actions/github';

try {
  const allParts = context.ref.split('/');
  debug('tesssst');
  info('tesssst');
  error('tesssst');
  debug(context.ref);
  info(context.ref);
  error(context.ref);
  let branchParts: string[];
  if (context.ref === 'pull_request') {
    // Pull request refs are formatted differently like and have an additional part in them
    // So they need to be handled accordingly
    branchParts = allParts.slice(3);
  } else {
    branchParts = allParts.slice(2);
  }

  const branch = branchParts.join('_');
  error(branch);
  setOutput('branch_name', branch);
} catch (error) {
  setFailed(error.message);
}
