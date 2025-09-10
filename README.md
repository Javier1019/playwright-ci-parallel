# Playwright CI Parallel

A complete setup for running Playwright tests in parallel across multiple browsers using GitHub Actions.

## Features

- **Parallel Test Execution**: Tests run simultaneously across multiple browsers
- **Multi-Browser Support**: Chromium, Firefox, WebKit, Chrome, Edge, and mobile browsers
- **GitHub Actions Integration**: Automated CI/CD pipeline
- **Comprehensive Reporting**: HTML, JSON, and JUnit test reports
- **Artifact Storage**: Test reports and screenshots saved for 30 days

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd playwright-ci-parallel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npm run install:browsers
   ```

## Running Tests

### Local Development

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

### Specific Browser Testing

```bash
# Test specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Test mobile browsers
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"

# Test branded browsers
npx playwright test --project="Google Chrome"
npx playwright test --project="Microsoft Edge"
```

## Configuration

### Playwright Configuration (`playwright.config.js`)

The configuration includes:
- **Parallel execution**: `fullyParallel: true`
- **Retry logic**: 2 retries on CI, 0 locally
- **Multiple reporters**: HTML, JSON, and JUnit
- **Screenshots and videos**: On failure only
- **Trace collection**: On first retry

### Supported Browsers

- **Desktop**: Chromium, Firefox, WebKit, Chrome, Edge
- **Mobile**: Chrome (Pixel 5), Safari (iPhone 12)

## GitHub Actions Workflow

The CI pipeline (`/.github/workflows/playwright.yml`) includes:

### Jobs

1. **test**: Runs tests on Chromium, Firefox, and WebKit in parallel
2. **mobile-test**: Runs tests on mobile browsers
3. **branded-browser-test**: Runs tests on Chrome and Edge
4. **test-results**: Merges and uploads all test reports

### Triggers

- **Push**: Runs on every commit to `main` or `master` branches
- **Pull Request**: Runs on every PR to `main` or `master` branches

### Features

- **Matrix Strategy**: Parallel execution across browsers
- **Artifact Storage**: Test reports saved for 30 days
- **Timeout Protection**: 60-minute timeout per job
- **Node.js Caching**: Faster dependency installation

## Test Reports

After running tests, you'll find:

- **HTML Report**: Interactive test results with screenshots and videos
- **JSON Report**: Machine-readable test results
- **JUnit Report**: CI/CD integration format
- **Artifacts**: Available in GitHub Actions for 30 days

## Project Structure

```
playwright-ci-parallel/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions workflow
├── tests/
│   ├── example.spec.js             # Sample web tests
│   └── api.spec.js                 # Sample API tests
├── playwright.config.js            # Playwright configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## Sample Tests

The repository includes sample tests demonstrating:

- **Web Testing**: Page navigation, element interaction, responsive design
- **API Testing**: HTTP requests, response validation, error handling
- **Cross-Browser**: Tests that work across all supported browsers

## Debugging

### Local Debugging

```bash
# Debug specific test
npx playwright test tests/example.spec.js --debug

# Debug with specific browser
npx playwright test --project=chromium --debug
```

### CI Debugging

- Check GitHub Actions logs for detailed error information
- Download test artifacts to view screenshots and videos
- Review HTML reports for interactive debugging

## Getting Started

1. **Push to GitHub**: Once you push this repository to GitHub, the CI pipeline will automatically run on every commit.

2. **Monitor Results**: Check the "Actions" tab in your GitHub repository to see test results.

3. **Download Reports**: Click on any workflow run to download test artifacts and reports.

## Customization

### Adding New Tests

1. Create new test files in the `tests/` directory
2. Use the `.spec.js` extension
3. Follow the existing test patterns

### Modifying Browser Configuration

Edit `playwright.config.js` to:
- Add/remove browsers
- Change test directories
- Modify retry settings
- Update reporters

### Customizing CI Pipeline

Edit `.github/workflows/playwright.yml` to:
- Add new test jobs
- Modify browser matrix
- Change artifact retention
- Add deployment steps

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests
4. Push and create a pull request
5. The CI pipeline will automatically test your changes

## License

MIT License - feel free to use this setup in your own projects.
