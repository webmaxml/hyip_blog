class Page {

	setQueryParams() {
		let pageParamIndex = location.href.search( /\/page\/\d+\// );

		if ( ~pageParamIndex ) {
			console.log( location.href.substring( pageParamIndex ) );
		}

	}

}

export default Page;