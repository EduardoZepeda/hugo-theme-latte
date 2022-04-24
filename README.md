# hugo-theme-latte

A hugo theme with the following features out of the box:

- scroll up button

- dark and light theme

- search based on [lunr](https://lunrjs.com/)

- table of contents

- related content at bottom

- mailchimp newsletter form

- social media icons obtained from Font Awesome

- SPA, feel like, using live reload by [turbolinks](https://github.com/turbolinks/turbolinks)

  
## Installation

To install the theme follow theme you can add a submodule using git or clone the repo inside the themes folder at the root of your project.

### Using git submodule

```bash
git submodule add https://github.com/EduardoZepeda/hugo-theme-latte themes/hugo-theme-latte
```

### Cloning the theme inside themes

```bash
cd themes/
mkdir hugo-theme-latte
git clone https://github.com/EduardoZepeda/hugo-theme-latte themes/hugo-theme-latte
```

### Download the required javascript files

As stated before, this theme relies on turbolinks for the page refresh and lunr to construct the search index. After installing the theme, make sure to install the required libraries using npm

```bash
cd themes/hugo-theme-latte/
npm install
```

That's all. 

## Theme configuration

You can tweak the theme using some variables in your *config.toml* file

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

### description

The site description that appears below the site's name.

### toc

If true, renders a table of contents before each post, remember that the toc can be customized using hugo default configuration.

### disable search

When true, renders a magnifier glass at the top right of the screen. For it to work, youll need to create a custom section in your project, with a file called *_index.md* place there all the content you want to appear at the search screen as if it was a normal markdown file.

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

### mailchimp susbscribe form

For the mailchimp form to render you'll need at least the *mailchimphiddenfield* and *mailchimpurl* variables. If one of those is not set, the form won't render. 

The other two variables: *subscribetitle* and *subscribedescription*, refer to the title and the description of the form, respectively.
