//	DokuWikiのWikiスタイル書体補完スクリプト
//		Wiki-Style Script
//		hGcl_Wiki_Style.js
//			version 2.1
//			2019 / 01 / 11
//
//	2019 ひぃ(Hir)/ワタアメ
//	Twitter : @Hir_gca
//
//	使用方法
//	htmlファイルの<head>～</head>内に
//	このスクリプトファイルを呼び出す構文を書いてください。
//	下記の関数は読み込みが完了した時に実行されます。
//	※補足（この行の文責：HokkaidoPerson[北海道ゆっくり放送]）：このプラグインでは何もしなくてもスクリプトが自動的に読み込まれます。
//
//	\//と入力すると「//」と出力します。
//	://は変換されません
//
//	**太字**、//斜体//、__下線付き__、''等幅''がご利用頂けます
//
//
//	$[hdcolor $\HTMLの色コード$\$]～$[/hdcolor$]は<font color="HTMLの色コード">～</font>と同じ働きをします。
//		(<textarea>～</textarea>間と<pre>～</pre>間には適用されません)
// 		※補足（この行の文責：HokkaidoPerson[北海道ゆっくり放送]）：上記に加え、クラス「wss-nowiki-section」「diff」、及び<form>～</form>間にも適用されません。
//
//
//	利用規約
//	・本条文は日本語のもと解釈されます。
//	・著作者(ひぃ(Hir)/ワタアメ)は予告なく本条文を変更できるものとします。
//	・本スクリプトを使用した際に起こった損害につきましては、当方では一切責任をとりかねます。
//	・権利詐称、無断転載、無断販売については厳禁です。
//	・改変しての二次配布につきましては、この文章を含めた上記の文すべてを説明書または本スクリプトファイルに
//	　必ず記述してください。
//
//
//	[Translated and supplemented by HokkaidoPerson]
//	The script to complement DokuWiki syntax
//		Wiki-Style Script
//		hGcl_Wiki_Style.js
//			version 2.1
//			2019 / 01 / 11
//
//	2019 Hir/wataame
//	Twitter : @Hir_gca
//
//	How to Use
//	Call this script in <head>-</head> of html files.
//	The following functions will be run when the browser completed loading pages.
//	* In this plugin, the script will be loaded without doing anything special.
//
//	"\// " will be "//"
//	"://" won't be converted.
//
//	**Bold**, //italic//, __underlined__, ''monospaced'' characters available.
//
//
//	$[hdcolor $\HTML color code$\$]～$[/hdcolor$] equals to <font color="HTML color code">～</font>
//		(Unavailable in <textarea>-</textarea>, <pre>-</pre>, <form>～</form>, and the class "wss-nowiki-section" and "diff")
//
//
//	The license
//	・This license is interpreted in Japanese above.
//	・An author of this script, Hir/wataame, can change this license without notice.
//	・The author won't foot the bill for your loss when you use this script.
//	・Fabricating the rights of this script, and unauthorized copying and selling this script are strictly prohibited.
//	・When you'll distribute forks of this script, you must write all these sentences including this license on manuals or the script files you'll distribute.
//
//

//	自動実行用 / To run the functions automatically
document.addEventListener("DOMContentLoaded", wikiStyle);


//	変換用テーブル / Tables for converting
var StyleArray = new Array(
	'//',		//	斜体 / Italic
	'**',		//	太字 / Bold
	'__',		//	下線 / Underlined
	'\'\''		//	等幅 / Monospaced
);
var ConvertArray = new Array(
	'em',		//	斜体 / Italic
	'strong',	//	太字 / Bold
	'u',		//	下線 / Underlined
	'code'		//	等幅 / Monospaced
);

function wikiStyle(){
	var bodyInnerHTML	= document.body.innerHTML;
	var HeaderSplit;
	var result;
	var k;

	//	textareaタグのデータを保持する / Preserve datas in <textarea>
	var TextareaBoxs	= document.getElementsByTagName('textarea');
	var TextareaStrs	= new Array(TextareaBoxs.length);

	for(k=0;k<TextareaBoxs.length;k++){
		TextareaStrs[k] = TextareaBoxs[k].innerHTML;
	}

	//	preタグのデータを保持する / Preserve datas in <pre>
	var PreBoxs	= document.getElementsByTagName('pre');
	var PreStrs	= new Array(PreBoxs.length);

	for(k=0;k<PreBoxs.length;k++){
		PreStrs[k] = PreBoxs[k].innerHTML;
	}

	//	wss-nowiki-selectionクラスのデータを保持する  / Preserve datas in the class "wss-nowiki-section"
	var WSSNoWikiBoxs	= document.getElementsByClassName('wss-nowiki-section');
	var WSSNoWikiStrs	= new Array(WSSNoWikiBoxs.length);

	for(k=0;k<WSSNoWikiBoxs.length;k++){
		WSSNoWikiStrs[k] = WSSNoWikiBoxs[k].innerHTML;
	}

	//	diffクラスのデータを保持する / Preserve datas in the class "diff"
	var DiffBoxs	= document.getElementsByClassName('diff');
	var DiffStrs	= new Array(DiffBoxs.length);

	for(k=0;k<DiffBoxs.length;k++){
		DiffStrs[k] = DiffBoxs[k].innerHTML;
	}

	//	formタグのデータを保持する / Preserve datas in <form>
	var FormBoxs	= document.getElementsByTagName('form');
	var FormStrs	= new Array(FormBoxs.length);

	for(k=0;k<FormBoxs.length;k++){
		FormStrs[k] = FormBoxs[k].innerHTML;
	}

	//	とりあえずbody全体の$[、$]、$\を<、>、'に変換する / Well, let's convert $[, $], and $\ to <, >, and ' in the whole body tag
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

	//変換して生成された<hdcolor>、</hdcolor>を更に変換 / Then convert <hdcolor> and </hdcolor> generated by the script above
	HeaderSplit = bodyInnerHTML.split('<hdcolor');
	bodyInnerHTML = HeaderSplit[0];
	for(k=1;k<HeaderSplit.length;k++){
		bodyInnerHTML += '<font color=' + HeaderSplit[k];
	}
	HeaderSplit = bodyInnerHTML.split('</hdcolor');
	bodyInnerHTML = HeaderSplit[0];
	for(k=1;k<HeaderSplit.length;k++){
		bodyInnerHTML += '</font' + HeaderSplit[k];
	}

	HeaderSplit = bodyInnerHTML.split('://');
	bodyInnerHTML = HeaderSplit[0];
	for(k=1;k<HeaderSplit.length;k++){
		bodyInnerHTML += ':\\//' + HeaderSplit[k];
	}

	bodyInnerHTML = bodyInnerHTML.replace("/\".+__.+\"/g","\0001\0001");
	for(i=0;i<StyleArray.length;i++){
		if(i == 2) continue;
		HeaderSplit = bodyInnerHTML.split('\\' + StyleArray[i]);
		bodyInnerHTML = HeaderSplit[0];
		for(k=1;k<HeaderSplit.length;k++){
			bodyInnerHTML += '&#x2065;&#x2065;' + HeaderSplit[k];
		}

		HeaderSplit = bodyInnerHTML.split(StyleArray[i]);
		result = HeaderSplit[0];

		for(k=1;k<HeaderSplit.length;k++){
			result += '<' + (k%2==0?'/':'') + ConvertArray[i] + '>' + HeaderSplit[k];
		}
		bodyInnerHTML = result;

		HeaderSplit = bodyInnerHTML.split('&#x2065;&#x2065;');
		bodyInnerHTML = HeaderSplit[0];
		for(k=1;k<HeaderSplit.length;k++){
			bodyInnerHTML += StyleArray[i] + HeaderSplit[k];
		}
	}

	document.body.innerHTML = bodyInnerHTML;

	TagsUnder();

	//	textareaタグのデータを戻す / Restore datas in <textarea>
	for(k=0;k<TextareaBoxs.length;k++){
		TextareaBoxs[k].innerHTML = TextareaStrs[k];
	}

	//	preタグのデータを戻す / Restore datas in <pre>
	for(k=0;k<PreBoxs.length;k++){
		PreBoxs[k].innerHTML = PreStrs[k];
	}

	//	wss-nowiki-selectionクラスのデータを戻す / Restore datas in the class "wss-nowiki-section"
	for(k=0;k<WSSNoWikiBoxs.length;k++){
		WSSNoWikiBoxs[k].innerHTML = WSSNoWikiStrs[k];
	}

	//	diffクラスのデータを戻す / Restore datas in the class "diff"
	for(k=0;k<DiffBoxs.length;k++){
		DiffBoxs[k].innerHTML = DiffStrs[k];
	}

	//	formタグのデータを戻す / Restore datas in <form>
	for(k=0;k<FormBoxs.length;k++){
		FormBoxs[k].innerHTML = FormStrs[k];
	}
}

function TagsUnder(){
	var bodyInnerHTML	= document.body.innerHTML;
	var Headers;
	var i;
	var j;
	var k;
	var HeaderSplit;
	var result;

	for(i=1;i<=6;i++){
		Headers = document.getElementsByTagName('h' + i);
		for(j=0;j<Headers.length;j++){
			result = Headers[j].innerHTML;

			HeaderSplit = result.split(StyleArray[2]);
			result = HeaderSplit[0];

			for(k=1;k<HeaderSplit.length;k++){
				result += '<' + (k%2==0?'/':'') + ConvertArray[2] + '>' + HeaderSplit[k];
			}

			Headers[j].innerHTML = result;
		}
		Headers = document.getElementsByClassName('level' + i);
		for(j=0;j<Headers.length;j++){
			result = Headers[j].innerHTML;

			HeaderSplit = result.split(StyleArray[2]);
			result = HeaderSplit[0];

			for(k=1;k<HeaderSplit.length;k++){
				result += '<' + (k%2==0?'/':'') + ConvertArray[2] + '>' + HeaderSplit[k];
			}

			Headers[j].innerHTML = result;
		}
	}
	Headers = document.getElementsByTagName('p');
	for(j=0;j<Headers.length;j++){
		result = Headers[j].innerHTML;

		HeaderSplit = result.split(StyleArray[2]);
		result = HeaderSplit[0];

		for(k=1;k<HeaderSplit.length;k++){
			result += '<' + (k%2==0?'/':'') + ConvertArray[2] + '>' + HeaderSplit[k];
		}

		Headers[j].innerHTML = result;
	}
}
