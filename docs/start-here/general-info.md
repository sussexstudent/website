---
title: General information
root: '/docs/start-here'
parents: ['Start here']
---

## Important links and access

- Main website: <https://www.sussexstudent.com/>

- Website and other products repositories: <https://github.com/sussexstudent/>

- Falmer API platform: <https://falmer.sussexstudent.com/>

	* Wagtail CMS: <https://falmer.sussexstudent.com/cms/>

	* Django admin: <https://falmer.sussexstudent.com/admin/>

- MSL admin: <https://www.sussexstudent.com/msl>

- Website Support Portal: <http://ussu.mojohelpdesk.com/> (new platform) or <http://helpdesk.sussexstudent.com/> (old platform)

- Website Documentation: <https://docs.sussexstudent.com/>

- Website Storybook: <https://style.sussexstudent.com/>

- Internal Knowledge Base Information: <https://www.sussexstudent.com/services/staff/>

## Other access

- Mailchimp

- Google Analytics / Data Studio

- Basecamp

## More information

### Website repositories (<https://github.com/sussexstudent/>)

- **falmer**
Django-powered API for services and content.

- **website**
frontend + falmer admin + app

- **msl-deploy**
Automate deployment of your MSL templates


### Falmer API platform (<https://falmer.sussexstudent.com/>)

Our additional services API and CMS (wagtail)

 -  **Content (Wagtail CMS) (<https://falmer.sussexstudent.com/cms/>)**
Some pages content are powered by Wagtail, a Django-based CMS. Wagtail uses a tree for page structure but page types are defined as code translating to actual database tables.
You can look at this [page](https://github.com/sussexstudent/website/blob/master/packages/website/src/routes.ts) to see which files and paths are built on Wagtail and not MSL.

-  **Django Admin (<https://falmer.sussexstudent.com/admin/>)**
This is the Djando administration site. Out API uses the Django framework, that it's built in this admin panel.

- **Featured Areas (<https://falmer.sussexstudent.com/featured-areas>)**
Here you can add or modify the homepage banner. Tutorial on how to do that in [here](https://www.sussexstudent.com/services/staff/content/adding-new-banner-homepage/).

All the other sections are not important or not useful for the moment (Events, Groups, Images)

### MSL Admin (<https://www.sussexstudent.com/msl>)
You need to ask for access to this platform. Is used for managing MSL memberships, access and editing rights to the website content built with MSL, which is everything else that is not built on Wagtail.
