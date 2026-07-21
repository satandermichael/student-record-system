# Contributing to Student Record System

Thanks for helping out! This guide walks through the exact workflow we use so everyone stays in sync.

## 1. Find or create an issue

Before writing code, check the **Issues** tab:

- If an issue already describes the task, comment on it to say you're picking it up.
- If not, open a new issue using the appropriate template (Bug Report or Feature Request) and describe what needs to be done.

This keeps everyone aware of who is working on what, and avoids duplicate work.

## 2. Create a branch

Never commit directly to `main`. Create a new branch from the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b <type>/<short-description>
```

Branch naming convention:

| Type       | Example                          |
|------------|-----------------------------------|
| Feature    | `feature/add-student-search`      |
| Bug fix    | `fix/duplicate-email-bug`         |
| Docs       | `docs/update-readme`              |
| Refactor   | `refactor/simplify-routes`        |

## 3. Make your changes

- Keep changes focused on the issue you're solving — avoid unrelated edits in the same branch.
- Test your changes locally by running `npm start` and checking the app in the browser.
- Follow the existing code style (simple, readable, commented where non-obvious).

## 4. Commit your work

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "Add search by course to student list"
```

Good commit messages describe *what* changed and *why*, not just "fix stuff."

## 5. Push and open a Pull Request

```bash
git push origin <your-branch-name>
```

Then open a Pull Request (PR) on GitHub:

- Fill out the PR template (what changed, which issue it closes, how you tested it).
- Link the issue using `Closes #<issue-number>` in the PR description — this auto-closes the issue when the PR merges.
- Request a review from at least one teammate.

## 6. Code review

- Reviewers should check out the branch locally or review the diff on GitHub.
- Leave comments on specific lines if changes are needed.
- The PR author addresses feedback with new commits (no need to force-push for small fixes).
- Once approved, the PR can be merged by the author or the reviewer, depending on your team's agreement.

## 7. After merging

- Delete the merged branch (GitHub usually offers a button for this).
- Pull the latest `main` before starting your next branch:

```bash
git checkout main
git pull origin main
```

---

## Quick Reference

```bash
# Start a new task
git checkout main
git pull origin main
git checkout -b feature/my-task

# Save work
git add .
git commit -m "Clear description of change"
git push origin feature/my-task

# Open PR on GitHub, get it reviewed, then merge.
```

Happy coding! 🎉
