# hugo-theme-latte

An elegant and responsive hugo theme. Here is a [demo](https://coffeebytes.dev). It has the following features out of the box:

- scroll up button

- dark and light theme

- search based on [lunr](https://lunrjs.com/)

- table of contents

- related content at bottom

- mailchimp newsletter form

- social media icons obtained from Font Awesome

- SPA feel like, using live reload functionality by [turbolinks](https://github.com/turbolinks/turbolinks)

  
## Installation

To install the theme follow the basic hugo instructions for any theme. I summarize them below.

You can add a submodule using *git submodule* 

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

### Download the required javascript files

As stated before, this theme relies on turbolinks for the page refresh functionality and lunr to construct and process the search index. Therefore, after installing the theme, make sure to install the required libraries, at the root of the theme, using npm.

```bash
cd themes/hugo-theme-latte/
npm install
```

Remember to return to your project's root directory afterwards.

And... that's all. 

## Theme configuration

You can customize this theme setting some variables in your *config.toml* file.

```bash
[params]
  [params.latte]
    author = "Author name"
    description = "Site description, below the title"
    seodescription = "Seo description for root page"
    toc = true
    disablesearch = false
    mailchimpurl = "https://dev.us.list-manage.com/subscribe/post?u=user&amp;id=id"
    mailchimphiddenfield = "hidden_field"
    subscribedescription = "Mailchimp form description"
    subscribetitle = "Mailchimp form title"
```

### description

Your site description, the one that shows below the main title at the top of the screen.

### author

The author's default name in case you didn't set one in your mark down files.

```bash
---
title: "title"
author: "this author has preference"
---
```

### toc

If true, renders a table of contents before each post, remember that the toc can be customized using hugo default configuration.

### disable search

Search is disabled by default, when set to false, renders a magnifier glass at the top right of the screen. For it to work, you'll need two things: 

* Create a section called search, and its corresponding *_index.md* file
* Enable JSON output

#### Creating a markdown file

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
