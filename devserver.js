require('isomorphic-fetch');
const comp = require('@ussu/comp');
const express = require('express');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackHotMiddleware = require('webpack-hot-middleware');
const devWebpackConfig = require('./webpack.config');
process.on('unhandledRejection', r => console.log(r));
global.mslInject = {
  JsonUserInfo: `<script type="text/javascript">

//<![CDATA[
var mslUserInfo =
{"userinfo": {
  "FirstName": "Rose",
  "LastName": "Person",
  "UniqueId": "fdf26sd8-90a1-43g2-af0d-d945c5d441a0",
  "DataParameters": null
}}//]]>
  </script>`,
  Admin: `<div class="mslwidget">
<div id="msl_admin" class="msl_admin_menu">

    <h3>
	Admin
    </h3>



    <ul id="ulAdmin">
            <li><a href="/admin/adverts/" class="msl_admin">Adverts Admin</a></li>

            <li><a href="/admin/blogs/" class="msl_admin">Blog Admin</a></li>

            <li><a href="/admin/directory/" class="msl_admin">Directory Admin</a></li>

            <li><a href="/admin/elections/" class="msl_admin">Elections Admin</a></li>

            <li><a href="/admin/ents/" class="msl_admin">Events Admin</a></li>

            <li><a href="/admin/forums/" class="msl_admin">Forum Admin</a></li>

            <li><a href="/admin/ideas/" class="msl_admin">Ideas Admin</a></li>

            <li><a href="/admin/jobs/" class="msl_admin">Jobs Admin</a></li>

            <li><a href="/admin/livefeed/" class="msl_admin">LiveFeed Admin</a></li>

            <li><a href="/admin/marketplace/" class="msl_admin">Marketplace Admin</a></li>

            <li><a href="/admin/messaging/" class="msl_admin">Messaging Admin</a></li>

            <li><a href="/admin/news/" class="msl_admin">News Admin</a></li>

            <li><a href="/admin/poll/" class="msl_admin">Poll Admin</a></li>

            <li><a href="/admin/profile/" class="msl_admin">Profile Admin</a></li>

            <li><a href="/admin/referenda/" class="msl_admin">Referenda Admin</a></li>

            <li><a href="/admin/shop/" class="msl_admin">Shop Admin</a></li>

            <li><a href="/admin/surveys/" class="msl_admin">Survey Admin</a></li>

            <li><a href="/admin/surveyadmin/" class="msl_admin">Survey Admin (All surveys)</a></li>

            <li><a href="/admin/volunteering/" class="msl_admin">Volunteering Admin</a></li>

            <li><a href="/admin/portal/" class="msl_admin">Website Admin</a></li>
        </ul>

	<div id="ctl00_AdminPanel_pnlOrganisations">

        <h4>
	    <a id="ctl00_AdminPanel_lbOrganisations" href="javascript:__doPostBack('ctl00$AdminPanel$lbOrganisations','')">Organisations</a>
        </h4>

        <ul id="ulOrgs">
                <li><a href="/organisation/admin/6312/" class="msl_admin">Comedy</a></li>

                <li><a href="/organisation/admin/0/" class="msl_admin">MSL Membership System</a></li>
            </ul>

</div>

</div>
</div>`,
  ControlPanel: `<div id="controlpanel" class="sidepanel">
	<h3>Control Panel</h3>
	<ul id="ctl00_controlpanel_ulControlPanel"><li id="ctl00_controlpanel_organisationadminnews0" class="msl_edit"><a href="/organisation/admin/news/0/">Edit MSL Membership System News</a></li><li id="ctl00_controlpanel_editpagepagename" class="msl_edit"><a href="/edit/page/?page_name=/">Edit Page</a></li><li id="ctl00_controlpanel_editpagesnewpageparent" class="msl_add"><a href="/edit/pages/newpage/?parent=/">Add child page</a></li><li id="ctl00_controlpanel_adminents" class="msl_edit"><a href="/admin/ents/">Edit MSL Membership System events</a></li></ul>
</div>`,
  LoginButton: `<a id="ctl00_ctl09_btnLogout" class="msl-loginbutton msl-loggedin" href="javascript:__doPostBack('ctl00$ctl09$btnLogout','')">Log out</a>`,
};
const app = express();

const compiler = webpack(devWebpackConfig);

app.use(
  webpackMiddleware(compiler, {
    publicPath: '/assets/',
    stats: {
      colors: true,
    },
  })
);

app.use(webpackHotMiddleware(compiler));
app.use(comp.proxy());

app.listen(3002, () => {
  console.log('Serving on 3002');
});
