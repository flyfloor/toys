$(document).ready(function(){
	$("#input").editor();
});


var $toolbar = $('<div>'+
										'<a href="#" data-action="bold" class="editor-bold"><i class="fa fa-bold" title="Bold"></i></a>'+
										'<a href="#" data-action="italic" class="editor-italic"><i class="fa fa-italic" title="Italic"></i></a>'+
										'<a href="#" data-action="underline" class="editor-underline"><i class="fa fa-underline" title="Underline"></i></a>'+
										'<a href="#" data-action="strikethrough" class="editor-strikethrough"><i class="fa fa-strikethrough" title="Strikethrough"></i></a>'+
										'<span class="separator"></span>'+
										'<a href="#" data-action="h1" class="editor-h1"><span style="font-size:16px;">H1</span></a>'+
										'<a href="#" data-action="h3" class="editor-h3"><span style="font-size:15px;">H3</span></a>'+
										'<a href="#" data-action="p" class="editor-p"><span>P</span></a>'+
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
	$editor_content = $("<div></div>").addClass("editor_content")
																 .attr("contentEditable", true),
	cmd_items = ['bold', 'italic', 'underline', 'strikethrough', 'insertunorderedlist', 'insertorderedlist', 'blockquote', 'pre'];


var Editor = {
	exec : function(cmd, value, element){
		document.execCommand(cmd, false, null);
		// console.log(cmd);
	},
	available: function(cmd){
		return document.queryCommandState(cmd) === true
	},
	presentNode: function(){
		var node =	window.getSelection().anchorNode;
		if (node.nodeType === 3) {
			node = node.parentNode;
		};

		return node;		
	},
	on: function($element){
		$element.addClass("editor-active");
	},

	off: function($element){
		$element.removeClass("editor-active")
	},
	state : function(content){
		$toolbar.find("a").each(function(){
			Editor.off($(this));
		});
		for(var i in cmd_items){
			if (Editor.available(cmd_items[i])) {
				Editor.on($toolbar.find('a[data-action="'+cmd_items[i]+'"]'));
			}
		}
		if (content) {};
	}
}

$.fn.extend({
	editor: function(){
		var $element = $(this);
		$editor_content.focus();
		$toolbar.find("a[data-action]").on("click", function(){
			var action = $(this).data("action");
			Editor.exec(action, null);

			Editor.state($editor_content);
			
			$editor_content.focus();
		});

		var cursorHandler = function(){
			var nodeName = Editor.presentNode().nodeName.toLowerCase();
			// Editor.on($('a[data-action="'+nodeName'"]'))
			// if (node.) {};
			Editor.state($editor_content);
		}

		$editor_content.on("click", function(event){
			cursorHandler();
		});

		$editor_content.on("keyup", function(event){
			if (event.keyCode == 13) {
				var nodeName = Editor.presentNode().nodeName.toLowerCase() || 'p';
				console.log(nodeName);
				if (nodeName == "p" || nodeName == "div") {
					document.execCommand('formatBlock', false, 'p');
				}
	    }
		});

		$element.after($toolbar, $editor_content);
	}
});

