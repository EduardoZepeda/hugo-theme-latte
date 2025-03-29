function initializeLunrSearch(event) {
	const searchInput = document.getElementById("search-input");
	const searchLoader = document.getElementById("search-loader");
	const searchResults = document.getElementById("search-results");
	const documents = [];
	let idx = 1;
	if (!searchInput || !searchResults) {
		return;
	}

	function getLanguageFromURI() {
		const uri = window.location.pathname;
		const parts = uri.split("/");
		const language = parts[1]; // Adjust index if needed
		return language;
	}

	// request previously generated index
	fetch(`/${getLanguageFromURI()}/posts/index.json`, {
		method: "get",
	})
		.then((res) => res.json())
		.then((res) => {
			// index document
			idx = lunr(function () {
				this.ref("url");
				// More weight to title field
				this.field("title");
				this.field("content");
				res.forEach(function (doc) {
					this.add(doc);
					documents[doc.url] = {
						title: doc.title,
						content: doc.content,
					};
				}, this);
			});
			// when data is registered, handle register
			registerSearchHandler(searchInput);
			searchInput.focus();
			checkForUrlQuery();
		})
		.catch((err) => {
			// if couldn't fetch show error
			const error = document.createElement("p");
			error.appendChild(document.createTextNode(`${err}`));
			searchResults.appendChild(error);
		});

	function checkForUrlQuery() {
		const urlParams = new URLSearchParams(window.location.search);
		const searchTerm = urlParams.get("q");

		if (searchTerm) {
			const results = idx.search(`${searchTerm}~2`);
			renderSearchResults(results);
		}
	}

	function registerSearchHandler() {
		// register on input event
		searchInput.oninput = handleInput;
		// set focus on search input and remove loading placeholder
		searchInput.placeholder = '{{i18n "searchInputPlaceholder"}}';
		searchInput.disabled = false;
		searchLoader.classList.toggle("loader");
	}

	function handleInput(event) {
		// remove search results if the user empties the search input field
		if (event.target.value.length === 0) {
			removeAllChildren(searchResults);
		} else {
			// get input value
			const searchTerm = event.target.value;
			// fuzzy search
			const results = idx.search(`${searchTerm}~2`);
			// render results
			renderSearchResults(results);
		}
	}

	function removeAllChildren(el) {
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}
	}

	function renderSearchResults(results) {
		let firstTenResults;
		if (results && results.length > 0) {
			// Limit results to 10
			firstTenResults = results.slice(0, 15);
			// empty search Results
			removeAllChildren(searchResults);

			for (const result of firstTenResults) {
				// append and article
				const article = document.createElement("article");
				const titleLink = document.createElement("a");
				const summaryLink = document.createElement("a");
				const summary = document.createElement("p");
				const heading = document.createElement("h3");

				// prepare title link
				titleLink.href = summaryLink.href = result.ref;
				titleLink.classList.add("search-item-title");

				// prepare summary link
				summaryLink.classList.add("search-item-summary");
				summaryLink.appendChild(
					document.createTextNode(
						`${documents[result.ref].content.slice(0, 200)}...`,
					),
				);

				// create heading content
				heading.appendChild(
					document.createTextNode(documents[result.ref].title),
				);

				// add class to anchor
				titleLink.appendChild(heading);
				summary.appendChild(summaryLink);

				// append article components
				article.appendChild(titleLink);
				article.appendChild(summary);

				searchResults.appendChild(article);
			}

			// empty results
		} else {
			removeAllChildren(searchResults);
			const notFound = document.createElement("p");
			notFound.appendChild(
				document.createTextNode('{{i18n "searchNotFound"}}'),
			);
			searchResults.appendChild(notFound);
		}
	}
}

["DOMContentLoaded", "htmx:afterSettle"].forEach(event => document.addEventListener(event, initializeLunrSearch))