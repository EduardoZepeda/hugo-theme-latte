# hugo-theme-latte

An elegant and responsive hugo theme. Here is a [demo](https://coffeebytes.dev). It has the following features out of the box:

- SPA feel like, using live reload functionality by [turbolinks](https://github.com/turbolinks/turbolinks)

- Seo friendly

- Multilanguage (en, es)

- Show up Mailchimp newsletter form

- search based on [lunr](https://lunrjs.com/)

- scroll up button

- dark and light theme

- table of contents

- related content at bottom

- social media icons obtained from Font Awesome



## Installation

To install the theme follow the basic hugo instructions for any theme. I summarize them below.

You can add a submodule to your project using *git submodule* 

### Using git submodule

```bash
git submodule add https://github.com/EduardoZepeda/hugo-theme-latte themes/hugo-theme-latte
```

It's also possible to clone the repo and place the content in a folder named *hugo-theme-latte*, inside the themes folder at the root of your project. 

### Cloning the theme

```bash
cd themes/
mkdir hugo-theme-latte
git clone https://github.com/EduardoZepeda/hugo-theme-latte themes/hugo-theme-latte
```

In case you don't know how to use git, just unzip the code directly in *<your-project>/themes/hugo-theme-latte*

### Add the theme to your config.toml

```bash
theme = "hugo-theme-latte"
```

## Customize hugo post and site

### author

Author for each post can be specified in the file setting an author directive, this name will be used to populate SEO meta tags.

```bash
---
author: "If this field is empty, it will take the *params.author* in config.toml"
---
```

If there is no author, the default author in *config.toml* will be used

```bash
[params]
  author = "author"
```
## Add a cover Image

Every post can have a featured image, that will appear in mobile and desktop layouts, the cover image can be set for each post in the following way. Credits are optional and I recommend a size of 1200x630 (Average social media cards default's size).

```bash
---
coverImage: "images/image_location.jpg"
coverImageCredits: "Optional credits"
---
```

### description

The description that will be used to populate SEO tags. If there is no description .Summary will be used instead

```bash
---
description: "This description goes into meta tag description and og:description tag" 
---
```

### Site description

You can set the default description that will appear in the blog header and in home SEO tags.

```bash
[params]
  description = "Site description"
```

Default to none.

### copyright

Default's Hugo copyright value will appear at at the bottom of the page inside the footer tag.

```bash
copyright = "Your copyright legend"
```

Default to: © `<current-year>`. All rights reserved `<author>`.

## hugo-theme-latte configuration

You can customize this theme setting some variables in your *config.toml* file.

```bash
[params]
  [params.latte]
    seodescription = "Seo description for root page"
    toc = true
    disablesearch = false
    mailchimpurl = "https://dev.us.list-manage.com/subscribe/post?u=user&amp;id=id"
    mailchimphiddenfield = "hidden_field"
    subscribedescription = "Mailchimp form description"
    subscribetitle = "Mailchimp form title"
    subscribebannertext = "Show up modal subscription text"
```

### seodescription

Override SEO meta tag's description.

### toc

If set to true, renders a table of contents before each post, remember that the toc can be customized using Hugo, check [hugo toc documentation.](https://gohugo.io/content-management/toc/).

### Enable search

Search is disabled by default, when set to false, renders a magnifier glass at the top right of the screen. For it to work, you'll need two things: 

* Create a section called search, and its corresponding *_index.md* file
* Enable JSON output

#### Creating a search markdown file

Create a custom section in your project, with a file called *_index.md* place there all the content you want to appear at the search screen as if it was a normal markdown file.

```bash
├── pages
├── posts
└── search
    └── _index.md
```

For example:  

```bash
---
title: "search"
date: "2021-07-22"
---

# My search title
My search description
```

#### Enable JSON output

Lunr uses Hugo's included JSON output to create a JSON index using posts, but we should explicitly indicate it in the config file. To do so, just  add the following lines to your *config.toml* file

```bash
[outputs]
    section = ["JSON", "HTML"]
```

### mailchimp susbscribe form

Requires some text variables to be set

* modalcountdown (The time in seconds for the banner to showup at the bottom of the screen). Set it to 0 to prevent it from showing up.
* subscribebannertext (The banner at the bottom of the screen)
* mailchimphiddenfield (Mailchimp hidden field, provided by mailchimp)
* mailchimpurl (Mailchimp url, provided by mailchimp)
* subscribetitle (The title of the subscription form)
* subscribedescription (The subscription form description)

For the mailchimp form to render, right after each post, you'll need at least the *mailchimphiddenfield* and *mailchimpurl* variables. If one of those is not set, the form won't render. 

The other two variables: *subscribetitle* and *subscribedescription*, refer to the title and the description of the form, respectively.

### Adding social media

Add as many social media menu items inside the menu directive.

```bash
[menu]
  [[menu.social]]
    name = "Name"
    pre = "icon-name"
    url = "Your-full-url"
    weight = 3
  [[menu.social]]
    name = "Linkedin"
    pre = "linkedin-in"
    url = "https://linkedin.com/in/youruser"
    weight = 3
```

#### Available icons

The following icons are available

- airbnb
- behance
- codewars
- digg
- discord
- facebook
- facebook-messenger
- github-alt
- instagram
- linkedin-in
- reddit-alien
- telegram-plane
- tiktok
- tumblr
- twitter
- whatsapp
- youtube

## Show your support

Please give a star if this project helped you!