$(document).ready(function(){
	$("#input").editor();
});


var $editor = $("<div>").addClass("editor"),
	$toolbar = $('<div>'+
										'<a href="#" data-action="bold" class="editor-bold"><i class="fa fa-bold" title="Bold"></i></a>'+
										'<a href="#" data-action="italic" class="editor-italic"><i class="fa fa-italic" title="Italic"></i></a>'+
										'<a href="#" data-action="underline" class="editor-underline"><i class="fa fa-underline" title="Underline"></i></a>'+
										'<a href="#" data-action="strikethrough" class="editor-strikethrough"><i class="fa fa-strikethrough" title="Strikethrough"></i></a>'+
										'<span class="separator"></span>'+
										'<a href="#" data-action="h1" class="editor-h1"><strong style="font-size:16px;">h1</strong></a>'+
										'<a href="#" data-action="h3" class="editor-h3"><strong>h3</strong></a>'+
										'<a href="#" data-action="h5" class="editor-h5"><strong style="font-size:14px;">h5</strong></a>'+
										'<a href="#" data-action="p" class="editor-p"><span>P</span></a>'+
										'<a href="#" data-action="insertorderedlist" class="editor-ol"><i class="fa fa-list-ol" title="Ordered list"></i></a> '+
									  '<a href="#" data-action="insertunorderedlist" class="editor-ul"><i class="fa fa-list-ul" title="Unordered list"></i></a> '+
									  '<a href="#" data-action="indent" class="editor-indent"><i class="fa fa-indent" title="Indent"></i></a> '+
									  '<a href="#" data-action="outdent" class="editor-outdent"><i class="fa fa-outdent" title="Outdent"></i></a> '+
										'<span class="separator"></span>'+
									  '<a href="#" data-action="blockquote" class="editor-blq"><i class="fa fa-quote-left" title="Blockquote"></i></a> '+
									  '<a href="#" data-action="pre" class="editor-code"><i class="fa fa-code" title="Code"></i></a> '+
									  '<a href="#" data-action="createLink" class="editor-link"><i class="fa fa-link" title="Link"></i></a> '+
									  '<a href="#" data-action="insertimage" class="editor-image"><i class="fa fa-picture-o" title="Image"></i></a>'+
									  '<a href="#" data-action="undo" class="editor-undo"><i class="fa fa-undo" title="Undo"></i></a>'+
									'</div>').addClass("toobar-item"),
	$editor_content = $("<div></div>").addClass("editor-content").attr("contentEditable", true),
	select_items = ['bold', 'italic', 'underline', 'strikethrough', 'insertunorderedlist', 'insertorderedlist'],
	$hintMsg = $("<span></span>").addClass("editor-hint").text("shift+enter在元素内换行");


var Editor = {
	exec : function(cmd){
		if(cmd == "pre" || cmd == "blockquote" || cmd == "h1" || cmd == "h3" || cmd == "h5" || cmd == "p") {
			document.execCommand("formatBlock", false, cmd);
		}else {
			document.execCommand(cmd, false, null);
		}
	},
	support: function(cmd){
		return document.queryCommandSupported(cmd);
	},
	state: function(cmd){
		return document.queryCommandState(cmd) === true
	},
	container: function(){
		var node =	window.getSelection().anchorNode;
		if (node.nodeType === 3) {
			node = node.parentNode;
		};

		return node;
	},
	nodeName: function(node){
		return node.nodeName.toLowerCase();		
	},

	on: function($element){
		$element.addClass("editor-active");
	},

	off: function($element){
		$element.removeClass("editor-active")
	},
	select : function(){
		$toolbar.find("a").each(function(){
			Editor.off($(this));
		});
		for(var i in select_items){
			if (Editor.state(select_items[i])) {
				Editor.on($toolbar.find('a[data-action="'+select_items[i]+'"]'));
			}
		}
	}
}


$.fn.extend({
	editor: function(){
		var mozilla = Editor.support("insertBrOnReturn"),
				$textArea = $(this);

		$editor_content.focus();
		$toolbar.find("a[data-action]").on("click", function(){
			var node = Editor.container(),
					nodeName = Editor.nodeName(node);
					action = $(this).data("action");

			//mozilla blockquote nested
			if (mozilla & action == "blockquote" & (nodeName == "blockquote" || $(node).parents("blockquote").length)) {
				$editor_content.focus();
				return false;
			}

			Editor.exec(action);
			Editor.select();			
			$editor_content.focus();
		});

		$editor_content.on("click", function(event){
			Editor.select();
		});

		$editor_content.on("keydown", function(event){
    	Editor.select();
    	var nodeName = Editor.nodeName(Editor.container()),
					parentName = Editor.nodeName(Editor.container().parentNode);

			if (event.keyCode == 13 & !event.shiftKey) {
				if (nodeName == "div") {
					nodeName = "p";
				}
				
				if (nodeName == "blockquote" || nodeName == "pre" || parentName == "blockquote") {
					event.stopPropagation();

					//mozilla insertParagraph problem
					if (mozilla) {
						document.execCommand("insertHTML", false, "<p></p>");
					}else {
						document.execCommand("insertParagraph", false, null);
						document.execCommand("outdent", false);
						document.execCommand("formatBlock", false, "p");
					}
					document.execCommand("outdent", false);
					return false;
				}else {
        	Editor.exec(nodeName);
				}
	    }

		});

		$editor_content.on("input", function(){
			$textArea.val($editor_content.html());
		});

		$(this).after($editor);
		$editor.append($toolbar, $editor_content);
	}
});

