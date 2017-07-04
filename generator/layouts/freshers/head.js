const branding = `<link rel="apple-touch-icon" sizes="180x180" href="https://du9l8eemj97rm.cloudfront.net/branding/apple-touch-icon.png">
<link rel="icon" type="image/png" href="https://du9l8eemj97rm.cloudfront.net/branding/favicon-32x32.png" sizes="32x32">
<link rel="icon" type="image/png" href="https://du9l8eemj97rm.cloudfront.net/branding/favicon-16x16.png" sizes="16x16">
<link rel="manifest" href="https://du9l8eemj97rm.cloudfront.net/branding/manifest.json">
<link rel="mask-icon" href="https://du9l8eemj97rm.cloudfront.net/branding/safari-pinned-tab.svg" color="#1db8a4">
<meta name="apple-mobile-web-app-title" content="Students' Union">
<meta name="application-name" content="Students' Union">
<meta name="theme-color" content="#ffffff">`;

function manifestHandler(assets) {
  if (Object.hasOwnProperty.call(assets, 'manifest')) {
    return `
      window['chunkManifest'] = ${JSON.stringify(assets.manifest)};
    `;
  }

  // For development, simple chunk naming proxy
  return '';
}

export const headContent = (assets, ...more) => `
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge" >
<link rel="dns-prefetch" href="//falmer.sussexstudent.com">
<meta name="viewport" content="width=device-width, initial-scale=1">
${assets.manifest
  ? `<link href="${assets.productionFonts.css}" rel="stylesheet" />
<link href="${assets.freshers.css}" rel="stylesheet" />`
  : ''}
${branding}
${more.join('')}
<MSL:JsonUserInfo />
{head_content}
<script type="text/javascript">
  ${manifestHandler(assets)}
  window.releaseMetadata = {gitRev: "${assets.gitRev || 'dev'}"};
</script>
`;