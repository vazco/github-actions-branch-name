import { setFailed, debug, error, setOutput, info } from '@actions/core';
import { context, } from '@actions/github';

try {
  debug('ref: ' + context.ref);
  debug('action: ' + context.action);
  debug('eventName: ' + context.eventName);
  debug('BASE BRANCH: ' + process.env.BASE_BRANCH);
  debug('GITHUB_HEAD_REF: ' + process.env.GITHUB_HEAD_REF);
  debug('GITHUB_BASE_REF: ' + process.env.GITHUB_BASE_REF);
  debug(context.payload.pull_request.html_url);
  debug(context.payload.pull_request.body);
  debug(context.payload.pull_request.number.toString());
  debug(context.payload.action);
  debug(context.issue.repo);
  debug(context.issue.number.toString());
  debug(context.sha);
  debug(context.workflow);
  debug(context.actor);

  let branch: string;
  if (context.eventName === 'pull_request') {
    // The docs say that this variable is set only for forked repositories
    // but it seems to work just fine with a PR.
    // https://help.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables
    branch = process.env.GITHUB_HEAD_REF;
  } else {
    branch = process.env.BASE_BRANCH;
  }

  debug(`Extracted branch name: ${branch}`);
  // Replace all slashes with downscores
  setOutput('branch_name', branch.replace('/', '_'));
} catch (error) {
  setFailed(error.message);
}
