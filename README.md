## vazco/github-actions-branch-name

**[Deprecated] This project is no longer maintained.**

### Description
A simple github action for extracting the branch/tag name that triggered this action.

### Why
Most actions and scripts in the marketplace do not work for pull requests. 
Github handles `push` and `pull_request` events differently and the branch name
has to be extracted from a different environment variable.

### Example usage
```yaml
steps:
  - uses: actions/checkout@v2
  - name: Extract branch name
    uses: vazco/github-actions-branch-name@v1
    id: branch
  - name: Echo branch name
    run: echo "${{ steps.branch.outputs.branch_name }}"
```

### Note
As of this commit, this action only explicitly accounts for `pull_request` and `push` events.
If other events do not behave like those, this action has to be extended.

### Development
Clone the repo and install dependencies with `npm ci`.
The action can be debugged by making/using the existing workflow in this repo (`.github/workflows/debug.yml`).
After making changes build the action by running `npm run build`.
The generated output has to be pushed to the repository too.
