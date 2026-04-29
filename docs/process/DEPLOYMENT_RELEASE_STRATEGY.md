# Ocean Wave Deployment and Release Strategy

Updated: 2026-04-26

## 1. Deployment Principle

Ocean Wave uses an intentional manual deployment model.

The core rule is simple: deploy only when the maintainer explicitly wants to deploy.

CI passing means the code is validated. It does not mean a Docker image should be published automatically.

## 2. Workflow Roles

### CI

- Runs validation for pushes, pull requests, and manual CI checks.
- Confirms the repository is in a buildable and testable state.
- Must not publish deployment artifacts.

### BUILD IMAGE

- Builds and pushes the Docker image.
- Must be triggered manually with GitHub Actions `Run workflow`.
- Must not run automatically after CI success.
- Must not use `push`, `workflow_run`, or scheduled triggers unless this deployment strategy is intentionally changed.

## 3. Manual Deployment Flow

1. Merge the intended changes into `main`.
2. Confirm CI passes on `main`.
3. Open GitHub Actions.
4. Select `BUILD IMAGE`.
5. Run the workflow manually.
6. Confirm `baealex/ocean-wave:latest` was built and pushed.

## 4. Release Impact

Docker image publishing updates the runtime artifact used by deployments.

Any change to the Docker build path, Docker image tag, deployment workflow, or runtime startup behavior is release-impacting and must be called out in PR notes.

