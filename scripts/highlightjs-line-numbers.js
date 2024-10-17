$(document).ready(function()
{
	if(hljs)
	{

		(function (w) {
			'use strict';

			var TABLE_NAME = 'hljs-ln',
				LINE_NAME = 'hljs-ln-line',
				CODE_BLOCK_NAME = 'hljs-ln-code',
				NUMBERS_BLOCK_NAME = 'hljs-ln-numbers',
				NUMBER_LINE_NAME = 'hljs-ln-n',
				DATA_ATTR_NAME = 'data-line-number';

			// https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript
			String.prototype.format = String.prototype.f = function () {
				var args = arguments;
				return this.replace(/\{(\d+)\}/g, function(m, n){
					return args[n] ? args[n] : m;
				});
			};

			if (typeof w.hljs === 'undefined') {
				console.error('highlight.js not detected!');
			} else {
				w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad;
				w.hljs.lineNumbersBlock = lineNumbersBlock;

				addStyles();
			}

			function addStyles () {
				var css = document.createElement('style');
				css.type = 'text/css';
				css.innerHTML = ('.{0}{border-collapse:collapse}' +
								'.{0} td{padding:0}' +
								'.{1}:before{content:attr({2})}').format(TABLE_NAME, NUMBER_LINE_NAME, DATA_ATTR_NAME);
				document.getElementsByTagName('head')[0].appendChild(css);
			}

			function initLineNumbersOnLoad () {
				if (document.readyState === 'complete') {
					documentReady();
				} else {
					w.addEventListener('load', documentReady);
				}
			}

			function toggleLineNumbers()
			{
				$(this).parent("pre").toggleClass("disableLineNumbers");
			}

			function disableLineNumbers(element)
			{
				$(element).parent("pre").addClass("disableLineNumbers");
			}

			function enableLineNumbers(element)
			{
				$(element).parent("pre").removeClass("disableLineNumbers");
			}

			function hasLineNumbersEnabled(element)
			{
				return false == $(element).parent("pre").hasClass("disableLineNumbers");
			}

			function clearSelection()
			{
				if (window.getSelection) window.getSelection().removeAllRanges();
				else if (document.selection) document.selection.empty();
			}

			function selectCode(element)
			{
				// for Internet Explorer
				if(document.body.createTextRange)
				{
					var range = document.body.createTextRange();
					range.moveToElementText(element);
					range.select();
				}
				else if(window.getSelection)
				{
					// other browsers
					var selection = window.getSelection();
					var range = document.createRange();
					range.selectNodeContents(element);
					selection.removeAllRanges();
					selection.addRange(range);
				}
			}

			function copyCode()
			{
				try
				{
					return document.execCommand('copy');
				}
				catch (err)
				{
					console.log('Unable to copy:');
					console.log(err);
					return false;
				}
			}

			function selectAndCopyCode()
			{
				var lnEnabled = hasLineNumbersEnabled(this);
				if(lnEnabled)
				{
					disableLineNumbers(this);
				}
				selectCode($("code.hljs", $(this).parent("pre")).get(0));
				copyCode();
				if(lnEnabled)
				{
					enableLineNumbers(this);
				}
				clearSelection();
			}

			function documentReady () {
				var $codeBlocks = $("pre.highlight");
				$codeBlocks.addClass("parsing");
				hljs.initHighlighting();
				try {
					var blocks = document.querySelectorAll('code.hljs');

					for (var i in blocks) {
						if (blocks.hasOwnProperty(i)) {
							lineNumbersBlock(blocks[i]);
						}
					}
				} catch (e) {
					console.error('LineNumbers error: ', e);
				}

				var $toggleLineNumbersElement = $("<div></div>")
					.addClass("toggleLineNumbers")
					.html('<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.25 3C9.25 3.69036 8.69036 4.25 8 4.25C7.30964 4.25 6.75 3.69036 6.75 3C6.75 2.30964 7.30964 1.75 8 1.75C8.69036 1.75 9.25 2.30964 9.25 3ZM9.25 13C9.25 13.6904 8.69036 14.25 8 14.25C7.30964 14.25 6.75 13.6904 6.75 13C6.75 12.3096 7.30964 11.75 8 11.75C8.69036 11.75 9.25 12.3096 9.25 13ZM8 9.25C8.69036 9.25 9.25 8.69036 9.25 8C9.25 7.30964 8.69036 6.75 8 6.75C7.30964 6.75 6.75 7.30964 6.75 8C6.75 8.69036 7.30964 9.25 8 9.25Z" fill="#0A1541"/></svg>')
					.attr("title", "Toggle line numbers")
					.click(toggleLineNumbers);
				var $copyCodeElement = $("<div></div>")
					.addClass("copyCode")
					.html('<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 2H3C2.44772 2 2 2.44772 2 3V10C2 10.5523 2.44772 11 3 11H4V12H3C1.89543 12 1 11.1046 1 10V3C1 1.89543 1.89543 1 3 1H9C10.1046 1 11 1.89543 11 3H10C10 2.44772 9.55229 2 9 2ZM6 6C6 5.44772 6.44772 5 7 5H13C13.5523 5 14 5.44772 14 6V13C14 13.5523 13.5523 14 13 14H7C6.44772 14 6 13.5523 6 13V6ZM5 6C5 4.89543 5.89543 4 7 4H13C14.1046 4 15 4.89543 15 6V13C15 14.1046 14.1046 15 13 15H7C5.89543 15 5 14.1046 5 13V6Z" fill="#0A1541"/></svg>')
					.attr("title", "Copy to clipboard")
					.click(selectAndCopyCode);
				
				$codeBlocks
					.removeClass("parsing")
					.prepend($toggleLineNumbersElement.clone(true))
					.prepend($copyCodeElement.clone(true));

			}

			function lineNumbersBlock (element) {
				if (typeof element !== 'object') return;

				var lines = getLines(element.innerHTML);

				if (lines.length > 1) {
					var html = '';

					for (var i = 0; i < lines.length; i++) {
						if(i == lines.length-1 && lines[i].length == 0)
							break;
						html += ('<tr><td class="{0}"><div class="{1} {2}" {3}="{5}"></div></td>' +
								'<td class="{4}"><div class="{1}">{6}</div></td></tr>').format(
									NUMBERS_BLOCK_NAME,
									LINE_NAME,
									NUMBER_LINE_NAME,
									DATA_ATTR_NAME,
									CODE_BLOCK_NAME,
									i + 1,
									lines[i].length > 0 ? lines[i] : ' ');
					}

					element.innerHTML = '<table role="presentation" class="{0}">{1}</table>'.format(TABLE_NAME, html);
				}
			}

			function getLines(text) {
				if (text.length === 0) return [];
				return text.split(/\r\n|\r|\n|<br data\-jekyll\-commonmark\-ghpages\=\"\"\>/g);
			}

		}(window));
		
		hljs.configure({languages: ["cs", "xml", "vbscript", "javascript"]});

		hljs.initLineNumbersOnLoad();

	}
})