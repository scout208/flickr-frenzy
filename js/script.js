// JavaScript Document
// Connor Early

$(document).on('click', function() 
{
	//gets and stores which radio button was selected
    var buttonSelect;
	buttonSelect = $('search[name=radio]:checked').val();

	//Checks if the All radio Button was selected
	//Splits the setence by the spaces so words can
	//be individually searched on Flickr
	if($('#all').is(':checked'))
	{
        var search = $('#tags').val();
        var item = search.split(" ");
        mode = "all";
    }

    //Checks if the Any radio Button was selected
    else if($('#any').is(':checked'))
	{
        var search = $('#tags').val();
        var item = search.split(" ");
        mode = "any";
    }

    // if the search field isn't empty, then the tag mode
	//gets passed and the photos are returned. 
	//Additionally h2 is updated on the HTML file. 
    if (item != "")
	{
        $('#keyword').fadeOut();

        var flickrAjax = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" + item + "&tagmode=" + mode + "&format=json&jsoncallback=?";

        $.getJSON(flickrAjax, function(data) 
		{
			
            $('h2').text(data.title.toLowerCase());
		   
            $.each(data.items, function(i, photo) 
			{
                var stylePhoto = '<span class="image">';
                stylePhoto += '<a href="' + photo.link + '">';
                stylePhoto += '<img src="' + photo.media.m.replace('_m', '_m') + '"></a>';
                $('#photos').append(stylePhoto);
				
            });
        });
    }
}); // end click