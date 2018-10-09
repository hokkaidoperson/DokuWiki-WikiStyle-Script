//     ja / en (Translated and supplemented by HokkaidoPerson)
//
//	DokuWikiのWikiスタイル書体補完 / The script to complement DokuWiki syntax
//		hGcl_Wiki_Style.js
//			version 1.5
//			2018 / 10 / 08
//	
//	2018 ひぃ(Hir)/ワタアメ / Hir/wataame
//	Twitter : @Hir_gca
//	
//	使用方法 / How to Use
//	htmlファイルの<head>～</head>内に
//	このスクリプトファイルを呼び出す構文を書いてください。（このプラグイン上では、何もしなくても自動的に読み込まれます。）
//	下記の関数は読み込みが完了した時に実行されます。
//     Call this script in <head>-</head> of html files (In this plugin, the script will be loaded without doing anything special).
//     The following functions will be run when the browser completed loading pages.
//	
//	\//と入力すると「//」と出力します。
//	://は変換されません
//     "\// " will be "//"
//     "://" won't be converted.
//	
//	**太字**、//斜体//、__下線付き__、''等幅''がご利用頂けます / **Bold**, //italic//, __underlined__, ''monospaced'' characters available.
//	
//	
//	$[hdcolor $\HTMLの色コード$\$]～$[/hdcolor$]は<font color="HTMLの色コード">～</font>と同じ働きをします。
//		(<textarea>～</textarea>間と<pre>～</pre>間と、クラス「wss-nowiki-section」内には適用されません)
//     $[hdcolor $\HTML color code$\$]～$[/hdcolor$] equals to <font color="HTML color code">～</font>
//		(Unavailable in <textarea>-</textarea>, <pre>-</pre> and the class "wss-nowiki-section")
//	
//	
//	利用規約
//	・本条文は日本語のもと解釈されます。
//	・著作者は予告なく本条文を変更できるものとします。
//	・本スクリプトを使用した際に起こった損害につきましては、当方では一切責任をとりかねます。
//	・権利詐称、無断転載、無断販売については厳禁です。
//	・改変しての二次配布につきましては、この文章を含めた上記の文すべてを説明書または本スクリプトファイルに
//	　必ず記述してください。
//     The license
//     ・This license is interpreted in Japanese above.
//     ・An author of this script can change this license without notice.
//     ・I won't foot the bill for your loss when you use this script.
//     ・Fabricating the rights of this script, and unauthorized copying and selling this script are strictly prohibited.
//     ・When you'll distribute forks of this script, you must write all these sentences including this license on manuals or the script files you'll distribute.
//	
//	

//	自動実行用 / To run the functions automatically
document.addEventListener("DOMContentLoaded", wikiStyle);

//	本体 / Units


//	変換用テーブル / Tables for converting
var StyleArray = new Array(
	'//',		//	斜体 / Italic
	'**',		//	太字 / Bold
	'__',		//	下線 / Underlined
	'\'\''		//	等幅 / Monospaced
);
var ConvertArray = new Array(
	'em',	//	斜体 / Italic
	'strong',	//	太字 / Bold
	'u',		//	下線 / Underlined
	'code'	//	等幅 / Monospaced
);

function wikiStyle(){
	var bodyInnerHTML	= document.body.innerHTML;
	var Headers;
	var HeaderInnerHTML;
	var HeaderMix;
	var HeaderSplit;
	var result;
	var k;
	
	//	textareaタグのデータを保持する / Don't change datas in <textarea>
	var TextareaBoxs	= document.getElementsByTagName('textarea');
	var TextareaStrs	= new Array(TextareaBoxs.length);
	
	for(k=0;k<TextareaBoxs.length;k++){
		TextareaStrs[k] = TextareaBoxs[k].innerHTML;
	}
	
	//	preタグのデータを保持する / Don't change datas in <pre>
	var PreBoxs	= document.getElementsByTagName('pre');
	var PreStrs	= new Array(PreBoxs.length);
	
	for(k=0;k<PreBoxs.length;k++){
		PreStrs[k] = PreBoxs[k].innerHTML;
	}
	
	//	wss-nowiki-sectionクラスのデータを保持する / Don't change datas in the class "wss-nowiki-section"
	var WSSNoWikiBoxs	= document.getElementsByClassName('wss-nowiki-section');
	var WSSNoWikiStrs	= new Array(WSSNoWikiBoxs.length);
	
	for(k=0;k<WSSNoWikiBoxs.length;k++){
		WSSNoWikiStrs[k] = WSSNoWikiBoxs[k].innerHTML;
	}
	
	//	とりあえずbody全体の$[、$]、$\を<、>、'に変換する / Well, let's convert $[, $], and $\ to <, >, and ' in the whole body tag.
	HeaderSplit = bodyInnerHTML.split('$\\');
	bodyInnerHTML = HeaderSplit[0];
	for(k=1;k<HeaderSplit.length;k++){
		bodyInnerHTML += '\'' + HeaderSplit[k];
	}
	HeaderSplit = bodyInnerHTML.split('$[');
	bodyInnerHTML = HeaderSplit[0];
	for(k=1;k<HeaderSplit.length;k++){
		bodyInnerHTML += '<' + HeaderSplit[k];
	}
	HeaderSplit = bodyInnerHTML.split('$]');
	bodyInnerHTML = HeaderSplit[0];
	for(k=1;k<HeaderSplit.length;k++){
		bodyInnerHTML += '>' + HeaderSplit[k];
	}
	
	document.body.innerHTML = bodyInnerHTML;
	
	
	//	見出しの書式変換 / Wiki syntax in headers
	for(var l=0;l<StyleArray.length;l++){
		for(var i=1;i<=6;i++){
			Headers = document.getElementsByTagName('h' + i);
			
			for(var j=0;j<Headers.length;j++){
				HeaderInnerHTML = Headers[j].innerHTML;
				
				HeaderMix = HeaderInnerHTML.replace('\\' + StyleArray[l],"\0001\0001");
				if(StyleArray[l] == '//'){
					HeaderMix = HeaderMix.replace('://',"\0002\0002");
				}
				
				HeaderSplit = HeaderMix.split(StyleArray[l]);
				
				result = HeaderSplit[0];
				
				for(k=1;k<HeaderSplit.length;k++){
					result += '<' + (k%2==0?'/':'') + ConvertArray[l] + '>' + HeaderSplit[k];
				}
				result = result.replace('\0001\0001',StyleArray[l]);
				if(StyleArray[l] == '//'){
					result = result.replace('\0002\0002',"://");
				}
				
				//		「<hdcolor "～">」の適用 / Apply <hdcolor "-">
				HeaderSplit = result.split('<hdcolor');
				result = HeaderSplit[0];
				for(k=1;k<HeaderSplit.length;k++){
					result += '<font color=' + HeaderSplit[k];
				}
				
				//		「</hdcolor ～>」の適用 / Apply </hdcolor>
				HeaderSplit = result.split('</hdcolor');
				result = HeaderSplit[0];
				for(k=1;k<HeaderSplit.length;k++){
					result += '</font' + HeaderSplit[k];
				}
				
				//		文書の変更の適用 / Apply changes
				Headers[j].innerHTML = result;
			}
		}
	}
	wikiStyleIndex();
	
	
	//	textareaタグのデータを戻す / Restore datas in <textarea>
	for(k=0;k<TextareaBoxs.length;k++){
		TextareaBoxs[k].innerHTML = TextareaStrs[k];
	}
	
	//	preタグのデータを戻す / Restore datas in <pre>
	for(k=0;k<PreBoxs.length;k++){
		PreBoxs[k].innerHTML = PreStrs[k];
	}
	
	//	wss-nowiki-sectionクラスのデータを戻す / Restore datas in the class "wss-nowiki-section"
	for(k=0;k<WSSNoWikiBoxs.length;k++){
		WSSNoWikiBoxs[k].innerHTML = WSSNoWikiStrs[k];
	}
}

function wikiStyleIndex(){
	var bodyInnerHTML	= document.body.innerHTML;
	var Headers;
	var HeaderInnerHTML;
	var HeaderMix;
	var HeaderSplit;
	var result;
	var k;
	
	Headers = document.getElementsByClassName('level1');
	
	for(var j=0;j<Headers.length;j++){
		HeaderInnerHTML = Headers[j].innerHTML;
		
		HeaderMix = HeaderInnerHTML.replace('\\//',"\0001\0001");
		HeaderMix = HeaderMix.replace('://',"\0002\0002");
		
		HeaderSplit = HeaderMix.split('//');
		
		result = HeaderSplit[0];
		
		for(k=1;k<HeaderSplit.length;k++){
			result += '<' + (k%2==0?'/':'') + 'i>' + HeaderSplit[k];
		}
		result = result.replace('\0001\0001',"//");
		result = result.replace('\0002\0002',"://");
		
		//		「<hdcolor "～">」の適用 / Apply <hdcolor "-">
		HeaderSplit = result.split('<hdcolor');
		result = HeaderSplit[0];
		for(k=1;k<HeaderSplit.length;k++){
			result += '<font color=' + HeaderSplit[k];
		}
		
		//		「</hdcolor ～>」の適用 / Apply </hdcolor>
		HeaderSplit = result.split('</hdcolor');
		result = HeaderSplit[0];
		for(k=1;k<HeaderSplit.length;k++){
			result += '</font' + HeaderSplit[k];
		}
		
		//	文書の変更を適用 / Apply changes
		Headers[j].innerHTML = result;
	}
}