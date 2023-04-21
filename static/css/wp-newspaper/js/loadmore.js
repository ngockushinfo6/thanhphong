jQuery(function($){
	$('body').on('click', '.loadmore', function() {
 
		var button = $(this);
		var data = {
			'action': 'wp_newspaper_loadmore',
			'page' : wp_newspaper_loadmore_params.current_page,
			'cat' : wp_newspaper_loadmore_params.cat
		};
 
		$.ajax({
			url : wp_newspaper_loadmore_params.ajaxurl,
			data : data,
			type : 'POST',
			beforeSend : function ( xhr ) {
				button.text('Loading...');
			},
			success : function( data ) {
				if( data ) { 
					$( 'div.blog-list-block' ).append(data);
					button.text( 'More Posts' );
					wp_newspaper_loadmore_params.current_page++;
 
					if ( wp_newspaper_loadmore_params.current_page == wp_newspaper_loadmore_params.max_page ) { 
						button.remove();
					}
				} else {
					button.remove();
				}
			}
		});
	});
});