function initializeLunrSearch(event) {
    let searchInput = document.getElementById('search-input')
    let searchResults = document.getElementById('search-results')
    let documents = []
    let idx
    if (!searchInput || !searchResults) {
        return
    }

    // request previously generated index
    fetch('/posts/index.json', {
        method: 'get'
    }).then(
        res => res.json()
    ).then(
        res => {
            // index document
            idx = lunr(function () {
                this.ref('url')
                // More weight to title field
                this.field('title', { 'boost': 'fieldBoost' })
                this.field('content')
                res.forEach(function (doc) {
                    this.add(doc)
                    documents[doc.url] = {
                        'title': doc.title,
                        'content': doc.content,
                    }
                }, this)
            })
            // when data is registered, handle register 
            registerSearchHandler(searchInput)
            searchInput.focus()
        }
    ).catch(
        err => {
            // if couldn't fetch show error
            let error = document.createElement('p')
            error.appendChild(document.createTextNode(`${err}`))
            searchResults.appendChild(error)
        }
    )

    function registerSearchHandler() {
        // register on input event
        searchInput.oninput = handleInput
        // set focus on search input and remove loading placeholder
        searchInput.placeholder = '{{i18n "searchInputPlaceholder"}}'
        searchInput.disabled = false
    }

    function handleInput(event) {
        // remove search results if the user empties the search input field
        if (event.target.value.length === 0) {
            removeAllChildren(searchResults)
        } else {
            // get input value
            let searchTerm = event.target.value
            // fuzzy search
            let results = idx.search(searchTerm + '*')
            // render results
            renderSearchResults(results)
        }
    }

    function removeAllChildren(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    function renderSearchResults(results) {

        if (results.length > 0) {
            // Limit results to 10
            if (results.length > 9) {
                results = results.slice(0, 10)
            }

            // empty search Results
            removeAllChildren(searchResults)

            results.forEach(result => {
                // append and article 
                let article = document.createElement('article')
                let titleLink = document.createElement('a')
                let summaryLink = document.createElement('a')
                let summary = document.createElement('p')
                let heading = document.createElement('h3')

                // prepare title link
                titleLink.href = summaryLink.href = result.ref
                titleLink.classList.add("search-item-title")

                // prepare summary link
                summaryLink.classList.add("search-item-summary")
                summaryLink.appendChild(document.createTextNode(`${documents[result.ref].content.slice(0, 200)}...`))

                // create heading content
                heading.appendChild(document.createTextNode(documents[result.ref].title))

                // add class to anchor
                titleLink.appendChild(heading)
                summary.appendChild(summaryLink)

                // append article components 
                article.appendChild(titleLink)
                article.appendChild(summary)

                searchResults.appendChild(article)
            })

            // empty results
        } else {
            removeAllChildren(searchResults)
            let notFound = document.createElement('p')
            notFound.appendChild(document.createTextNode('{{i18n "searchNotFound"}}'))
            searchResults.appendChild(notFound)
        }
    }
}


document.addEventListener("turbolinks:load", initializeLunrSearch)