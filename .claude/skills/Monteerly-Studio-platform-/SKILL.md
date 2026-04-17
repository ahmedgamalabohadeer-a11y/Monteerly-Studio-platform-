```markdown
# Monteerly-Studio-platform- Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill provides a comprehensive guide to the development patterns, coding conventions, and common workflows used in the Monteerly-Studio-platform- repository. The codebase is built with JavaScript using the Next.js framework, and it employs specific conventions for file naming, imports, exports, and testing. This guide also details the main workflows for maintaining build artifacts, managing dependencies, and updating the `.gitignore` file, along with suggested commands for automation.

## Coding Conventions

### File Naming
- **Style:** camelCase
- **Example:**  
  ```
  userProfile.js
  mainLayout.js
  ```

### Import Style
- **Style:** Alias imports (using path aliases as configured in Next.js or jsconfig/tsconfig)
- **Example:**
  ```javascript
  import Button from '@/components/Button'
  import { fetchData } from '@/utils/api'
  ```

### Export Style
- **Style:** Default exports
- **Example:**
  ```javascript
  // In userProfile.js
  const UserProfile = () => { /* ... */ }
  export default UserProfile
  ```

## Workflows

### nextjs-build-artifacts-refresh
**Trigger:** When code, configuration, or dependencies change and a new Next.js build is required.  
**Command:** `/refresh-nextjs-build`

1. Modify source code or dependencies as needed.
2. Run the Next.js build process:
   ```bash
   npm run build
   ```
3. Verify that build artifacts in the `.next/` directory are updated, including files such as:
   - `.next/BUILD_ID`
   - `.next/build-manifest.json`
   - `.next/server/app/**/*.js`
   - `.next/static/chunks/**/*.js`
   - `.next/static/css/*.css`
4. Commit any relevant changes if build artifacts are tracked (usually they are not, but check project policy).

---

### update-gitignore
**Trigger:** When new files/directories should be ignored by git or existing ignore rules need modification.  
**Command:** `/update-gitignore`

1. Edit or create the `.gitignore` file to add or update ignore patterns.
   ```gitignore
   # Ignore build artifacts
   .next/
   node_modules/
   ```
2. Commit the changes:
   ```bash
   git add .gitignore
   git commit -m "Update .gitignore to ignore build artifacts"
   ```

---

### npm-dependency-update
**Trigger:** When dependencies are added, removed, or updated, or when fixing dependency issues.  
**Command:** `/update-dependencies`

1. Modify `package.json` to add, remove, or update dependencies.
   ```bash
   npm install some-package
   npm uninstall old-package
   ```
2. Ensure lock files are updated, such as `node_modules/.package-lock.json`.
3. Commit the updated lock files:
   ```bash
   git add package.json package-lock.json
   git commit -m "Update npm dependencies"
   ```

## Testing Patterns

- **Test Framework:** Unknown (not detected), but test files follow the pattern `*.test.js`.
- **Test File Example:**
  ```
  components/
    button.test.js
  ```
- **Typical Test Command:**
  ```bash
  npm test
  ```
  *(Adjust based on actual test framework and scripts defined in `package.json`.)*

## Commands

| Command                 | Purpose                                                      |
|-------------------------|--------------------------------------------------------------|
| /refresh-nextjs-build   | Refresh Next.js build artifacts after code/dependency changes|
| /update-gitignore       | Add or update .gitignore rules                               |
| /update-dependencies    | Update npm dependencies and lock files                       |
```
