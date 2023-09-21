# 🌳 Sitecore JSS Component Props Tree Shaking

Sample repo to demonstrate issue where [component-level data fetching functions](https://doc.sitecore.com/xp/en/developers/hd/21/sitecore-headless-development/component-level-data-fetching-in-jss-next-js-apps.html) and their dependencies are included in client-side bundles [as described in the JSS repo](https://github.com/Sitecore/jss/issues/1615).

## 🏃 Steps to Reproduce

### ✅ Observe Page-level `getStaticProps`

1. Check out commit `9e94d3b2ac9a1e224ff6da007f10a81b45c48702`.
2. Run the app.
3. Open <http://localhost:3000/_next/static/chunks/pages/[[...path]].js>.
4. Observe that `page-level-static-props` is absent from the client-side bundle (✅ expected).
5. Open the Next.js Bundle Analyzer report for the server at `/analyze/nodejs.html`. Switch to `stat` treemap sizes.
6. Observe that `server-data.json` is included in the server-side bundle (✅ expected).
7. Open the Next.js Bundle Analyzer report for the client at `/.next/analyze/client.html`. Switch to `stat` treemap sizes.
8. Observe that `server-data.json` is excluded from the client-side bundle (✅ expected).

### ❌ Observe Component-level `getStaticProps`

1. Check out commit `8e63b89d793da12bf350b187297913a58581deb3`.
2. Run the app.
3. Open <http://localhost:3000/_next/static/chunks/pages/[[...path]].js>.
4. Observe that `component-level-static-props` is present in the client-side bundle (❌ unexpected).
5. Open the Next.js Bundle Analyzer report for the server at `/analyze/nodejs.html`. Switch to `stat` treemap sizes.
6. Observe that `server-data.json` is included in the server-side bundle (✅ expected).
7. Open the Next.js Bundle Analyzer report for the client at `/.next/analyze/client.html`. Switch to `stat` treemap sizes.
8. Observe that `server-data.json` is included in the client-side bundle (❌ unexpected).

### 🔨 Implement Workaround

1. Check out commit `a46bd69f535abcef94572a12afdc677f3aeac1ac`.
2. Run the app.
3. Open <http://localhost:3000/_next/static/chunks/pages/[[...path]].js>.
4. Observe that `component-level-static-props` is absent from the client-side bundle (✅ nice).
5. Open the Next.js Bundle Analyzer report for the server at `/analyze/nodejs.html`. Switch to `stat` treemap sizes.
6. Observe that `server-data.json` is included in the server-side bundle (✅ expected).
7. Open the Next.js Bundle Analyzer report for the client at `/.next/analyze/client.html`. Switch to `stat` treemap sizes.
8. Observe that `server-data.json` is excluded from the client-side bundle (✅ nice).
