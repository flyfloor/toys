var $editor = $("<div>").addClass("editor"),
	$toolbar = $('<div>'+
										'<a href="javascript:void(0);" data-action="bold" class="editor-bold"><i class="fa fa-bold" title="Bold"></i></a>'+
										'<a href="javascript:void(0);" data-action="italic" class="editor-italic"><i class="fa fa-italic" title="Italic"></i></a>'+
										'<a href="javascript:void(0);" data-action="underline" class="editor-underline"><i class="fa fa-underline" title="Underline"></i></a>'+
										'<a href="javascript:void(0);" data-action="strikethrough" class="editor-strikethrough"><i class="fa fa-strikethrough" title="Strikethrough"></i></a>'+
										'<span class="separator"></span>'+
										'<a href="javascript:void(0);" data-action="h1" class="editor-h1"><strong style="font-size:16px;">h1</strong></a>'+
										'<a href="javascript:void(0);" data-action="h3" class="editor-h3"><strong>h3</strong></a>'+
										'<a href="javascript:void(0);" data-action="h5" class="editor-h5"><strong style="font-size:14px;">h5</strong></a>'+
										'<a href="javascript:void(0);" data-action="p" class="editor-p"><span>P</span></a>'+
										'<a href="javascript:void(0);" data-action="insertorderedlist" class="editor-ol"><i class="fa fa-list-ol" title="Ordered list"></i></a> '+
									  '<a href="javascript:void(0);" data-action="insertunorderedlist" class="editor-ul"><i class="fa fa-list-ul" title="Unordered list"></i></a> '+
									  '<a href="javascript:void(0);" data-action="indent" class="editor-indent"><i class="fa fa-indent" title="Indent"></i></a> '+
									  '<a href="javascript:void(0);" data-action="outdent" class="editor-outdent"><i class="fa fa-outdent" title="Outdent"></i></a> '+
										'<span class="separator"></span>'+
									  '<a href="javascript:void(0);" data-action="blockquote" class="editor-blq"><i class="fa fa-quote-left" title="Blockquote"></i></a> '+
									  '<a href="javascript:void(0);" data-action="pre" class="editor-code"><i class="fa fa-code" title="Code"></i></a> '+
									  '<a href="javascript:void(0);" data-action="createLink" class="editor-link"><i class="fa fa-link" title="Link"></i></a> '+
									  '<a href="javascript:void(0);" data-action="insertImage" class="editor-image"><i class="fa fa-picture-o" title="Image"></i></a>'+
									  '<a href="javascript:void(0);" data-action="undo" class="editor-undo"><i class="fa fa-undo" title="Undo"></i></a>'+
									'</div>').addClass("toolbar-item"),
	$editor_content = $("<div></div>").addClass("editor-content").attr("contentEditable", true),
	select_items = ['bold', 'italic', 'underline', 'strikethrough', 'insertunorderedlist', 'insertorderedlist'],
	$placeHolder = $("<p>输入内容...</p>").addClass("editor-pholder"),
	formatCmds = ['pre', 'blockquote', 'h1', 'h3', 'h5', 'p'];
			

var Editor = {
	mozilla: function(){return this.support("contentReadOnly")},
	microsoft: function(){return this.support("editMode");},
	exec : function(cmd){
		var tag = false;
		for(var i in formatCmds){
			if (cmd === formatCmds[i]) {
				tag = true;
				if (this.microsoft())  cmd = "<" + cmd + ">";
				document.execCommand("formatBlock", false, cmd);
				break;
			}else{
				continue;
			}
		}

		if (!tag) {
			var aVal = null; 
			//simpler way to handle img and link insert
			if (cmd === "createLink" || cmd === "insertImage") {
				if (cmd === "createLink") {
					aVal = prompt("链接地址");
				}else {
					aVal = prompt("图片地址:");
				}

				if (!aVal || aVal.trim().length == 0) {
					return false;
				}
			}
			document.execCommand(cmd, false, aVal);
		}
	},

	//command whether been supported
	support: function(cmd){
		return document.queryCommandSupported(cmd);
	},

	//command state for trigger
	state: function(cmd){
		return document.queryCommandState(cmd) === true
	},

	//current container node 
	container: function(){
		var node =	window.getSelection().anchorNode;
		if (node.nodeType === 3) {
			node = node.parentNode;
		};

		return node;
	},

	// short for method to get node name
	nodeName: function(node){
		return node.nodeName.toLowerCase();		
	},

	// short for active state, use as native
	on: function($element){
		$element.addClass("toolbar-active");
	},

	// short for off state, use as native
	off: function($element){
		$element.removeClass("toolbar-active")
	},

	// make selection state
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
	editor: function(id){
		var $textArea = $(this);
		if (id) {
			$editor.attr("id", id);
		}
		//initialize value of content view
		$editor_content.html($textArea.val());
		if (!$textArea.val()) {
			$editor_content.append($placeHolder);
		}

		//placeHolder
		$editor_content.on("focus", function(){
			$placeHolder.remove();
		}).on("blur", function(){
			if(!$(this).html()){
				$editor_content.append($placeHolder);
			}
		})

		//toolbar click handler
		$toolbar.find("a[data-action]").click(function(){
			$editor_content.focus();
			var node = Editor.container(),
					nodeName = Editor.nodeName(node);
					action = $(this).data("action");

			//mozilla wrap problem
			if (Editor.mozilla()){
				//mozilla blockquote nested
				if (action == "blockquote" & (nodeName == "blockquote" || $(node).parents("blockquote").length)) {
					return false;
				}

				if (action == "indent" || action == "outdent") {
					document.execCommand("styleWithCSS", false);
				}
			}

			Editor.exec(action);
			Editor.select();			
			$editor_content.focus();
		});

		//judge the toolbar item's selection state
		$editor_content.click(function(event){
			Editor.select();
		});

		//editor content keypress handler, specially Enter key press
		$editor_content.keydown(function(event){
    	Editor.select();
    	var	cNode = Editor.container(),
    			type = Editor.nodeName(cNode);

			if (event.keyCode == 13 & !event.shiftKey) {
				if(type == "div") type = "p";
				if (type == "p" || type == "blockquote" || type == "pre" 
						|| $(cNode).parents("blockquote").length || $(cNode).parents("pre").length) {
					event.stopPropagation();
					console.log($(cNode).parents("blockquote").length);
					if (Editor.mozilla()) {
						//mozilla insertParagraph problem
						document.execCommand("insertHTML", false, "<p></p>");
						document.execCommand("outdent", false);
					}else{
						document.execCommand("insertParagraph", false, "p");
						document.execCommand("outdent", false);
						document.execCommand("formatBlock", false, "p");
					}
					return false;
				}else {
        	Editor.exec(type);
				}
	    }

		});

		//textarea val change with editor's content change
		$editor_content.on("input", function(){
			$textArea.val($editor_content.html());
		});

		//add editor near after textarea
		$(this).after($editor);
		$editor.append($toolbar, $editor_content);
	}
});

