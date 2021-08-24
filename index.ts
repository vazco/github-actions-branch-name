import { setFailed, debug, setOutput } from '@actions/core';
import { context } from '@actions/github';

declare const process: {
  env: {
    GITHUB_HEAD_REF: string
  }
}

try {
  let branch: string;
  if (context.eventName === 'pull_request') {
    branch = process.env.GITHUB_HEAD_REF;
  } else {
    // Other events where we have to extract branch from the ref
    // Ref example: refs/heads/master, refs/tags/X
    const branchParts = context.ref.split('/');
    branch = branchParts.slice(2).join('/');
  }

  debug(`Extracted branch name: ${branch}`);
  setOutput('branch_name', branch);
} catch (error) {
  setFailed(error.message);
}
