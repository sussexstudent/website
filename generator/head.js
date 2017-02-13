const branding = `<link rel="apple-touch-icon" sizes="180x180" href="/stylesheet/union/apple-touch-icon.png">
<link rel="icon" type="image/png" href="/stylesheet/union/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="/stylesheet/union/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="/stylesheet/union/manifest.json">
<link rel="mask-icon" href="/stylesheet/union/safari-pinned-tab.svg" color="#1db8a4">
<meta name="apple-mobile-web-app-title" content="Students' Union">
<meta name="application-name" content="Students' Union">
<meta name="theme-color" content="#ffffff">`;


export const headContent = (assets, ...more) => `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="${assets.productionFonts.css}" rel="stylesheet" />
<link href="${assets.main.css}" rel="stylesheet" />
${branding}
${more.join('')}
<MSL:JsonUserInfo />
{head_content}
`;

const legacyScripts = `
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/twitter-bootstrap/2.0.4/js/bootstrap.min.js"></script>
{head_content}
`;

export const headContentLegacy = assets => headContent(assets, legacyScripts);
