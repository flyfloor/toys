$(document).ready(function(){
	$("#input").editor();
});


var $toolbar = $('<div>'+
										'<a href="#" data-action="bold" class="editor-bold"><i class="fa fa-bold" title="Bold"></i></a>'+
										'<a href="#" data-action="italic" class="editor-italic"><i class="fa fa-italic" title="Italic"></i></a>'+
										'<a href="#" data-action="underline" class="editor-underline"><i class="fa fa-underline" title="Underline"></i></a>'+
										'<a href="#" data-action="strikethrough" class="editor-strikethrough"><i class="fa fa-strikethrough" title="Strikethrough"></i></a>'+
										'<span class="separator"></span>'+
										'<a href="#" data-action="insertorderedlist" class="editor-ol"><i class="fa fa-list-ol" title="Ordered list"></i></a> '+
										'<a href="#" data-action="insertorderedlist" class="editor-ol"><i class="fa fa-list-ol" title="Ordered list"></i></a> '+
									  '<a href="#" data-action="insertunorderedlist" class="editor-ul"><i class="fa fa-list-ul" title="Unordered list"></i></a> '+
									  '<a href="#" data-action="indent" class="editor-indent"><i class="fa fa-indent" title="Indent"></i></a> '+
									  '<a href="#" data-action="outdent" class="editor-outdent"><i class="fa fa-outdent" title="Outdent"></i></a> '+
										'<span class="separator"></span>'+
									  '<a href="#" data-action="blockquote" class="editor-blq"><i class="fa fa-quote-left" title="Blockquote"></i></a> '+
									  '<a href="#" data-action="pre" class="editor-pre"><i class="fa fa-code" title="Pre"></i></a> '+
									  '<a href="#" data-action="createLink" class="editor-link"><i class="fa fa-link" title="Link"></i></a> '+
									  '<a href="#" data-action="insertimage" class="editor-image"><i class="fa fa-picture-o" title="Image"></i></a>'+
									  '<a href="#" data-action="undo" class="editor-undo"><i class="fa fa-undo" title="Undo"></i></a>'+
									'</div>').addClass("toobar-item"),
	$editor_context = $("<div></div>").addClass("editor_content")
																 .attr("contentEditable", true);


var Editor = {
	exec : function(cmd, value){
		document.execCommand(cmd, false, null);
		// console.log(cmd);
	},
	available: function(cmd){
		return document.queryCommandState(cmd) === true
	},
	state : function(element){

	},
	presentNode: function(){
		var node =	window.getSelection().anchorNode;
		if (node.nodeType === 3) {
			node = node.parentNode;
		};
		console.log(node);
		return node;		
	}
}

$.fn.extend({
	editor: function(){
		var $element = $(this);
		$toolbar.find("a[data-action]").on("click", function(){
			Editor.exec($(this).data("action"), null);
		});

		$editor_context.on("keypress", function(event){
			if (event.keyCode === 13) {
				// document.execCommand('defaultParagraphSeparator', false, 'p');
				
				// p.html().getSelection();
				event.stopPropagation();
				return false;
			};
		});

		$element.after($toolbar, $editor_context);
	}
});

