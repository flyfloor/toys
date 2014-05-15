$(document).ready(function(){

});


var Toolbar_html = '<div class="toobar-item">'+
		'<a href="#" data-action="bold" class="editor-bold"><i class="fa fa-bold" title="Bold"></i></a>'+
		'<a href="#" data-action="italic" class="editor-italic"><i class="fa fa-italic" title="Italic"></i></a>'+
		'<a href="#" data-action="underline" class="editor-underline"><i class="fa fa-underline" title="Bold"></i></a>'+
		'<a href="#" data-action="strikethrough" class="editor-strikethrough"><i class="fa fa-strikethrough" title="Bold"></i></a>'+
		'<a href="#" data-action="bold" class="editor-bold"><i class="icon-bold" title="Bold"></i></a>'+
		'<a href="#" data-action="bold" class="editor-bold"><i class="icon-bold" title="Bold"></i></a>'+
		'<a href="#" data-action="bold" class="editor-bold"><i class="icon-bold" title="Bold"></i></a>'+
		'<span class="separator"></span>'+
		'<a href="#" data-action="insertorderedlist" class="editor-ol"><i class="fa fa-list-ol" title="Insert Ordered-list"></i></a> '+
	  '<a href="#" data-action="insertunorderedlist" class="editor-ul"><i class="fa fa-list-ul" title="Insert Unordered-list"></i></a> '+
	  '<a href="#" data-action="indent" class="editor-indent"><i class="fa fa-indent" title="Indent"></i></a> '+
	  '<a href="#" data-action="outdent" class="editor-outdent"><i class="fa fa-outdent" title="Outdent"></i></a> '+
		'<span class="separator"></span>'+
	  '<a href="#" data-action="blockquote" class="editor-blq"><i class="fa fa-quote-left" title="Blockquote"></i></a> '+
	  '<a href="#" data-action="pre" class="editor-pre"><i class="fa fa-code" title="Pre"></i></a> '+
	  '<a href="#" data-action="createLink" class="editor-link"><i class="fa fa-link" title="Create Link" title="Create Link"></i></a> '+
	  '<a href="#" data-action="insertimage" class="editor-image"><i class="fa fa-picture-o" title="Insert Image"></i></a>'+
	  '<a href="#" class="editor-full"><i class="fa fa-arrows-alt" title="Fullscreen"></i></a> '+
	'</div>';

var LEditor = {
	action : function(element, cmd, value){
		if (cmd === "") {};
	},
	available: function(cmd){
		return document.queryCommandState(cmd) === true
	}
}

