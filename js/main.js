$(function(){

	var user = {
	  handle: '@bradwestfall',
	  img: 'images/brad.png'
	}

	tweet = $("#template-tweet").html();
	tweetTemplate = Handlebars.compile(tweet);

	thread = $("#template-thread").html();
	threadTemplate = Handlebars.compile(thread);

	compose = $("#template-compose").html();
	composeTemplate = Handlebars.compile(compose);

	$('body').on('focusin', 'form', function(){
		$(this).addClass('expand');
	})

	$('body').on('focusout', 'form', function(){
		$(this).removeClass('expand');
	})

	$('body').on('click', '.tweet', function(){
		$(this).parent().toggleClass('expand');
	})

	$('body').on('keyup', 'textarea', function(){
		$wordCount = $(this).parent().find('.count');
		$charCount = $(this).val().length;
		count = 140 - $charCount;
		$wordCount.text(count);
		if(count == 0){
			$(this).attr('maxlength','140');
		}
	})

	var mainButton = $('header').find('button');
	mainButton.on('click', function(event){
		event.preventDefault();
		tweet = $("#template-tweet").html();
		tweetTemplate = Handlebars.compile(tweet);

		thread = $("#template-thread").html();
		threadTemplate = Handlebars.compile(thread);

		compose = $("#template-compose").html();
		composeTemplate = Handlebars.compile(compose);

		var headMessage = $('header').find('textarea').val();

		var handle = user.handle;
		var img = user.img;

		var tweetContext = {message: headMessage, handle: handle, img: img};

		var tweetHtml = tweetTemplate(tweetContext);

		var composeHtml = composeTemplate();

		var threadContext = {tweet: tweetHtml, compose: composeHtml};

		var threadHtml = threadTemplate();

		if(headMessage.length >= 1){
			$('.tweets').append(threadHtml);

			$('.thread:last').prepend(tweetHtml);
			$('.thread:last .replies').append(composeHtml);
		}

		$('header').find('textarea').val("");

		$(this).parent().siblings().text("140");
		$(this).parent().parent().removeClass('expand');
	});


	$('body').on('click', '.replies button', function(event){
		event.preventDefault();
		tweet = $("#template-tweet").html();
		tweetTemplate = Handlebars.compile(tweet);

		compose = $("#template-compose").html();
		composeTemplate = Handlebars.compile(compose);

		var replyMessage = $(this).parent().siblings('textarea').val();

		var handle = user.handle;
		var img = user.img;

		var tweetContext = {message: replyMessage, handle: handle, img: img};

		var replyTweet = tweetTemplate(tweetContext);

		if (replyMessage.length >= 1 ){
			$(this).parent().parent().parent().append(replyTweet);
		}

		$(this).parent().siblings('textarea').val("");

		$(this).parent().parent().removeClass('expand');

	})

});
