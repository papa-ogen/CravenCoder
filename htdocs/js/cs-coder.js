/**
 * CravenCoder is built on native JavaScript
 * Current Supported Languages: HTML, CSS, JavaScript, SQL, PHP, C#, PowerShell, XML
 *
 * LICENSE: OSL
 *
 * @author     Jörgen Thelin <thelin.jorgen@gmail.com>
 * @copyright  2014 -
 * @license    http://en.wikipedia.org/wiki/Open_Software_License
 * @version    0.1
 * @link       http://craven-studio.com/Projects/CravenCoder
 * @see        http://codepen.io/Craven/pen/fLgBk
 */

(function( CravenCoder, undefined ) {
     
  CravenCoder.init = function(obj) {
    // init
    var ccData = document.querySelectorAll(".CravenCoder");
    var parent = document.getElementById("lineNrs");
    
    for (var i = 0, length = ccData.length; i < length; i++) {
      parser(ccData[i]);
      
      // Create Elements
      /*
      var node = document.createElement("div");
        node.className = "CravenCoderContainer";
      var lineNumbers = document.createElement("div");
        lineNumbers.className = "lineNumbers";
        node.appendChild(lineNumbers);
      var lineNrs = document.createElement("pre");
        lineNrs.ID = "lineNrs";    
      lineNumbers.appendChild(lineNrs);      
      
      node.insertBefore(ccData[i]);
      */
      lineNumbers(parent, ccData[i]);
    }
  }
    
    function parser(obj) {
      if (obj.classList.contains('xml')) {
        parseXML(obj);
        codeHeader(obj, "XML");
      } else if (obj.classList.contains('csharp')) {
        parseCSharp(obj);
        codeHeader(obj, "C#");
      } else if (obj.classList.contains('css')) {
        parseCSS(obj);
        codeHeader(obj, "CSS");
      } else if (obj.classList.contains('php')) {
        parsePHP(obj);
        codeHeader(obj, "PHP");
      } else if (obj.classList.contains('ps')) {
        parsePowerShell(obj);
        codeHeader(obj, "PowerShell");
      } else if (obj.classList.contains("sql"))  {
        parseSQL(obj);       
        codeHeader(obj, "SQL");
      } else if (obj.classList.contains("js"))  {
        parseJS(obj);       
        codeHeader(obj, "JS");
      } else {
        parseHTML(obj);
        codeHeader(obj, "HTML");
      }
    }
  
  function countLines(str){
   return (str.split(/\r?\n|\r/).length);
  }
 
  function lineNumbers(parent, obj) {
      var nrOfRows = countLines(obj.innerHTML);
      for(var j=0; j < nrOfRows; j++) {
          var row = j + 1;
        parent.innerHTML = parent.innerHTML + row + ".\n";
      }  
  }
  
  function codeHeader(obj, lang) {
    var node = document.createElement("div");
        node.className = "ccHeader";
    var textnode = document.createTextNode('Language: ' + lang);
    node.appendChild(textnode);
    obj.appendChild(node);
  }
  
function parseJS(obj) {
    var data = obj.innerHTML;
    var pattern = /((&lt;\/?script&gt;)|function\s?(\([a-z0-9]*\))?\s?({})?|(\s|\r)+if|else|null|this|var\s|false|return|try|catch)/ig;
    var quotesPattern = /(("[<>a-z0-9\.\?=-\s#,:]*")|('[<>a-z0-9\.\?=-\s#,]*')|(\+\s?[a-z\.\[\]0-9]+\s?\+?)|(\/.*\/\w*;))/ig;
    var commentsPattern = /((\/\*[\s\S]+?(\*\/))|\/\/.+)/ig;
    newString = data.replace(quotesPattern, JSQuotesReplace);  
    newString = newString.replace(pattern, JSReplace);
    newString = newString.replace(commentsPattern, JSCommentsReplace);
    obj.innerHTML = newString; 
	}
  
  function JSCommentsReplace(match, p1, offset, string){
    var p1 ='<span class="color4">'+p1+'</span>';
     return p1;
  }; 
  
  function JSQuotesReplace(match, p1, offset, string){
    var p1 ='<span class="color1">'+p1+'</span>';
     return p1;
  }; 
  
  function JSReplace(match, p1, offset, string){
    var p1 ='<span class="color2">'+p1+'</span>';
     return p1;
  }; 
  
	function parseHTML(obj) {
    var data = obj.innerHTML;
    var pattern = /(&lt;(!|\/?)[^-]{2}.+\w*&gt;)/ig;
    var classPattern = /(\w+=)("|')(.[^"']*)("|')/ig;
    var commentPattern = /(&lt;!--[\s\S]*--&gt;)/ig;
    newString = data.replace(classPattern, HTMLClassReplace);
    newString = newString.replace(pattern, HTMLReplace);
    newString = newString.replace(commentPattern, HTMLCommentReplace);
    obj.innerHTML = newString;  
	  }
  
  function HTMLCommentReplace(match, p1, offset, string){
    var p1 ='<span class="color4">'+p1+'</span>';
     return p1;
  }; 
  
  function HTMLClassReplace(match, p1, p2, p3, p4, offset, string){
    var p1 ='<span class="color1">'+p1+'</span>';
    var p3 ='<span class="color2">'+p3+'</span>';  
     return p1 + p2 + p3 + p4;
  }; 
  
  function HTMLReplace(match, p1, offset, string){
    var p1 ='<span class="color3">'+p1+'</span>';
     return p1;
  }; 
  
  function parseSQL(obj) {
    var data = obj.innerHTML;
    var pattern = /(\s|\n|\r|^|\()(from|on|and|or|alter table|drop table|as|between|create database|create table|create index|create view|delete|drop database|drop index|drop table|group by|having|in\s|insert into|join|inner join|left join|right join|full join|like|order by|select|select \*|select distinct|select into|select top|trunctate table|union|union all|update|where|create unique index|function|if|else|end if|exit\s|end function|for|to|dim|error|goto)/ig;
    var functPattern = /(\w+\()(.[^)]*)(\))/ig;
    var commentPattern = /('\s?.[^\)]*'?)/ig;
    newString = data.replace(commentPattern, SQLCommentReplace);   
    newString = newString.replace(pattern, SQLReplace); 
    newString = newString.replace(functPattern, SQLFuncReplace); 
    obj.innerHTML = newString;       
  };
  
  function SQLCommentReplace(match, p1, offset, string){
    var p1 ='<span class="color1">'+p1+'</span>';
     return p1;
  }; 
  
  function SQLFuncReplace(match, p1, p2, p3, offset, string){
    var p1 = '<span class="color2">'+p1+'</span>';
    var p2 = '<span class="color3">'+p2+'</span>';
    var p3 = '<span class="color4">'+p3+'</span>';
     return p1 + p2 + p3;
  };  
  
  function SQLReplace(match, p1, p2, offset, string){
    var p1 = p1;
    var p2 = '<span class="color2">'+p2+'</span>';
     return p1 + p2;
  };  
  
  function parsePowerShell(obj) {
    var newString;
		var data = obj.innerHTML;
    var pattern = /((\s\w*-\w+)|(\[\w+\]))/ig;   
    var varPattern = /((\$[a-z0-9-\.,=_]+)|(".[^"]*"))/ig;
    var commentPattern = /((#.*)|(&lt;#[\s\S]*#&gt;))/ig
    var reservedPattern = /(Begin|Exit|Process\s|Break|Filter|Return|Catch|Finally|Sequence|Class\s|For\s|Switch|Continue|ForEach|Throw|Data\s|From|Trap|Define|Function|Try|Do\s|If|Until|DynamicParam|In\s|Using|Else|InlineScript|Var|ElseIf|\sParallel|While|End|Param|Workflow)/ig;
    newString = data.replace(varPattern, PowerShellVarReplace); 
    newString = newString.replace(reservedPattern, PowerShellReservedReplace);  
    newString = newString.replace(pattern, PowerShellReplace); 
    newString = newString.replace(commentPattern, PowerShellCommentReplace);  
    obj.innerHTML = newString;
  };  
  
  function PowerShellReservedReplace(match, p1, offset, string){
    var p1 = '<span class="color1">'+p1+'</span>';
     return p1;
  };  

  function PowerShellCommentReplace(match, p1, offset, string){
    var p1 = '<span class="color4">'+p1+'</span>';
     return p1;
  };   
  
  function PowerShellVarReplace(match, p1, offset, string){
    var p1 = '<span class="color3">'+p1+'</span>';
     return p1;
  };   
  
  function PowerShellReplace(match, p1, offset, string){
    var p1 = '<span class="color2">'+p1+'</span>';
     return p1;
  }; 
  
 function parsePHP(obj) {
		    var data = obj.innerHTML;
    var pattern = /(&lt;\?[ph]{0,3})([\s\S]*)(\?&gt;)/ig;
    var funcPattern = /((\$\w+\s?[^-=)]) |mysqli_connect|mysqli_error|mysqli_select_db|mysqli_query|mysqli_fetch_array| mysqli_connect_errno|mysqli_connect_error|mysqli_close|mysqli|intval|if|die|echo|while|new|curl_init|curl_setopt|curl_close|curl_exec)/ig;
    var quotesPattern = /((?!\.)("|')(?!\.).[^"']*("|'))/ig;
    var commentPattern = /(#|\/\/\s?.*)/ig;
    newString = data.replace(quotesPattern, PHPQuoteReplace); 
		    newString = newString.replace(pattern, PHPReplace); 
    newString = newString.replace(funcPattern, PHPFunctionsReplace); 
    newString = newString.replace(commentPattern, PHPCommentReplace);     
    obj.innerHTML = newString;    
  }
  
  function PHPCommentReplace(match, p1, offset, string){
    var p1 = '<span class="color4">'+p1+'</span>';
     return p1;
  };
  
  
  function PHPQuoteReplace(match, p1, offset, string){
    var p1 = '<span class="color2">'+p1+'</span>';
     return p1;
  };
  
  function PHPFunctionsReplace(match, p1, offset, string){
    var p1 = '<span class="color1">'+p1+'</span>';
     return p1;
  };  
  
  function PHPReplace(match, p1, p2, p3, offset, string){
    var p1 = '<span class="color3">'+p1+'</span>';
    var p2 = p2;
    var p3 = '<span class="color3">'+p3+'</span>';
     return p1 + p2 + p3;
  };  
  
   function parseCSS(obj) {
		var data = obj.innerHTML;
    var pattern = /(.[^{]*)({[^}]*})/ig;
    var cssCommentPattern = /(\/\*[\s\S]*?\*\/)/ig;
		newString = data.replace(pattern, CSSreplace); 
    newString = newString.replace(cssCommentPattern, cssCommentReplace);
    obj.innerHTML = newString;   
  }
  
  function CSSreplace(match, p1, p2, offset, string){
    var cssAttrPattern = /([^;{].[^:]+)(:\s?)(.[^;}]+)/ig;   
    var cssClassPattern = /(.[^,]*)/ig;
    p1 = p1.replace(cssClassPattern, cssClassReplace);
    p2 = p2.replace(cssAttrPattern, cssAttrReplace);
    return p1 + p2;
  };
  
  function cssClassReplace(match, p1, offset, string){
    var p1 = '<span class="color1">'+p1+'</span>';
     return p1;
  };
  function cssCommentReplace(match, p1, offset, string){
    var p1 = '<span class="color4">'+p1+'</span>';
     return p1;
  };
  
  function cssAttrReplace(match, p1, p2, p3, offset, string){
    var p1 = '<span class="color2">'+p1+'</span>';
    var p2 = p2;
    var p3 = '<span class="color3">'+p3+'</span>';
     return p1 + p2 + p3;
  };
  
	function parseXML(obj) {
    var newString, newStringWComments;
		var data = obj.innerHTML;
    var pattern = /(&lt;\??\/?)(\w+)(.+[^\/\?])(\??\/?&gt;)/ig;
    var commentPattern = /(&lt;!--[a-z0-9\/\\\.:-_-\s"]*--&gt;)/ig;

		newString = data.replace(pattern, xmlReplace); 
    newStringWComments = newString.replace(commentPattern, commentsReplace); 
    obj.innerHTML = newStringWComments;
	};
  
  function commentsReplace(match, p1, offset, string){
    var p1 = '<span class="color4">'+p1+'</span>';
    return p1;
  };
  
  function xmlReplace(match, p1, p2, p3, p4, offset, string) {
    var attrPattern = /([a-z0-9\.:]+[^=])(="[a-z0-9\/\\\.:-_-\s]*")/ig;
    var xmlAttr = p3.replace(attrPattern, xmlAttrReplace);
    var p1 = '<span>'+p1+'</span>';
    var p2 = '<span class="color2">'+p2+'</span>';
    var p3 = xmlAttr;
    var p4 = '<span class="color2">'+p4+'</span>';
    return p1 + p2 + p3 + p4;
  };
  
  function xmlAttrReplace (match, p1, p2, offset, string){
    var p1 = '<span class="color3">'+p1+'</span>';
    var p2 = '<span class="color1">'+p2+'</span>';
    return p1 + p2;
  };
  
  function parseCSharp(obj) {
    var data = obj.innerHTML;
    var quotesPattern = /(("|').*("|'))/ig;   
    var commonPattern = /(using|namespace|\spublic|class\s|void\s|\sstring\.?|override\s|if\s|else\s|foreach\s|\sfor\s|\snull|\sin\s|\sas\s|\sprotected\s|partial|\stry|object|from|where|\sout|\sselect\s|new|\strue|\sfalse|\scatch|\sthrow|\sreturn|\sthis|\sget|\sset(\s|;))/ig;
    var commentsPattern = /(\/\/\/?)(.*\n)/ig;
    quotes = data.replace(quotesPattern, cSharpQuotesReplace);
    common = quotes.replace(commonPattern, cSharpCommonReplace); 
    comments = common.replace(commentsPattern, cSharpCommentsReplace); 
    obj.innerHTML = comments;
	  };
	
  function cSharpCommonReplace (match, p1, offset, string) {
    var p1 = '<span class="color1">'+p1+'</span>';
    return p1;    
  };
  
  function cSharpCommentsReplace (match, p1, p2, offset, string) {
//    var cleanComments = p2.replace(/</ig, p2);
    var p1 = '<span class="color4">'+p1+'</span>';
    var p2 = '<span class="color5">'+p2+'</span>';
    return p1 + p2;    
  }; 
  
   function cSharpQuotesReplace (match, p1, offset, string) {
    var p1 = '<span class="color2">'+p1+'</span>';
    return p1;    
  };
	
}( window.CravenCoder = window.CravenCoder || {}));

try {
  CravenCoder.init();
} catch( e ) {
  console.log( e.message );
}

/* Todo
* Code refactor
* Bug fixes
* NoOfRows()
*/