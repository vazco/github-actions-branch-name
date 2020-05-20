import { setFailed, debug, error, setOutput, info } from '@actions/core';
import { context, } from '@actions/github';

try {
  let branch: string;
  if (context.eventName === 'pull_request') {
    // The docs say that this variable is set only for forked repositories
    // but it seems to work just fine with a PR.
    // https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables
    branch = process.env.GITHUB_HEAD_REF.replace('/', '_');
  } else {
    // Other events where we have to extract branch from the ref
    // Ref example: refs/heads/master
    const branchParts = context.ref.split('/');
    branch = branchParts.slice(2).join('_');
  }

  debug(`Extracted branch name: ${branch}`);
  setOutput('branch_name', branch);
} catch (error) {
  setFailed(error.message);
}
