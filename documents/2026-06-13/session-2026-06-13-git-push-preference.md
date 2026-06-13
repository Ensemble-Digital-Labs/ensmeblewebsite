# Session log – 2026-06-13 (git push preference)

## Summary
User asked to record a default: when they say “push to git”, push only to **Ensemble Digital Labs / ensmeblewebsite** on **`staging`** — not the personal fork unless they ask.

## Changes
- Updated `.cursor/rules/git-remotes.mdc` — `alwaysApply: true`, default `git push ensemble staging` only

## Notes
- Team staging: https://github.com/Ensemble-Digital-Labs/ensmeblewebsite/tree/staging
- Fork (`origin`) is optional backup only
