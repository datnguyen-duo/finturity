//SITE SPECIFIC FUNCTIONS


/////////////////////////////////////////////////////////////////////////////////////////////////
//GENERAL FUNCTIONS

function Trim(nStr){
	return nStr.replace(/(^\s*)|(\s*$)/g,"");
}
function checkEmail(obj){
	var exp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if (!exp.test(obj.value)){
		alert("Please enter a valid Email.");
		obj.focus();
		return true;
	}
	else
		return false;
}
function notZipcode(obj,msg){
	exp = /[a-zA-Z|\d]-{1}/;
	if (!exp.test(obj.value)){
		alert("Please enter valid "+msg);
		obj.focus();
		return true;
	}else
		return false;
}
function isNull(obj,msg){
	if(msg!="Password")
		obj1=Trim(obj.value);
	else
		obj1=obj.value;
	if (obj1=="" || obj1=="<br>"){
		if(obj.type!="select-one" && obj.type!="file")
			alert("Please enter the " +msg+".");
		else
			alert("Please select the " +msg+".");
		obj.focus();
		return true;
	}
	else {
		if(msg=="Email")
			return checkEmail(obj);
		else if(msg=="Password")
			return fnChkPassword(obj)
		else if(msg=="Username")
			return fnChkUser(obj)	
		else
			return false;
	}
}
function checkAll(obj,arg){
	if(obj) {
		if(obj.length){
			for(i=0;i<obj.length;i++){
				obj[i].checked=arg;
			}
		}
		else obj.checked=arg;
	}
}
function notChecked(obj,msg){
	checked = false;
	if(obj) {
		if(obj.length){
			for(i=0;i<obj.length;i++){
				if(obj[i].checked){
					checked = true;
					break;
				}
			}
		}
		else if(obj.checked)
			checked = true;
		if(!(checked)){
			alert("Please select the "+msg+".");
			if(obj.length)
				obj[0].focus();
			else
				obj.focus();
			if(document.getElementById('Action'))
				document.getElementById('Action').value="";
			return true;
		}
	}
}
function fnChkNum(obj){
	exp = /^[\d]/;
	if (!exp.test(obj.value)){
		alert("Please enter only numeric values.");
		obj.focus();
		return true;
	}
	else
		return false;
}
function fnChkAlpha(obj){
	exp = (/(^([a-z]|[A-Z]|["."]|[\s])*$)/);
	if (!exp.test(obj.value))
	{
		alert("Please enter only alphabets.");
		obj.focus();
		return true;
	}
	else
		return false;
}	
function fnChkAlphaNumeric(obj){
	exp = (/(^([a-z]|[A-Z]|[0-9])*$)/);
	if (!exp.test(obj.value)){
		alert("Please enter only alphabets and numbers.");
		obj.focus();
		return true;
	}
	else
		return false;
}


function fnChkPhone(obj){
	exp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	if (!exp.test(obj.value)){
		alert("Please enter valid phone number.");
		obj.focus();
		return true;
	}
	else
		return false;
}


  


function fnShow(arg)
{
	document.getElementById(arg).style.display="block";
}
function fnHide(arg)
{
	document.getElementById(arg).style.display="none";
}

function notChecked(obj,msg){
	checked = false;
	if(obj) {
		if(obj.length){
			for(i=0;i<obj.length;i++){
				if(obj[i].checked){
					checked = true;
					break;
				}
			}
		}
		else if(obj.checked)
			checked = true;
		if(!(checked)){
			alert("Please select the "+msg+".");
			if(obj.length)
				obj[0].focus();
			else
				obj.focus();
			if(document.getElementById('Action'))
				document.getElementById('Action').value="";
			return true;
		}
	}
}


function numberAlone(e) {
	var iKeyCode = 0;
	if (window.event)
		iKeyCode = window.event.keyCode
	else if (e)
		iKeyCode = e.which;
	
	if (iKeyCode > 47 && iKeyCode < 58 || iKeyCode == 0 || iKeyCode == 8)
		return true
	else
		return false;
	
}

function AllowNumeric(e)
	{
		var iKeyCode = 0;
		if (window.event)
		iKeyCode = window.event.keyCode
		
		else if (e)
		iKeyCode = e.which;
		
		if (iKeyCode > 47 && iKeyCode < 58 || iKeyCode == 46 || iKeyCode == 0 || iKeyCode == 8)
		return true
		else
		return false;
	}
function fnChkPassword(obj)   
{   
	var passw=  /^[A-Za-z]\w{3,16}$/;
	if(!obj.value.match(passw))	{   
		alert('Password must be 3 to 16 letters with the combination of characters, numeric digits, underscore and first character must be a letter...')  
		return true;  
	} else {   		
		return false;  
	}  
}  
function fnChkUser(obj)   
{ 
	var uservalue=obj.value;
	var userRegex = /^(?=.*[a-z])[a-z0-9]{4,10}$/;
	if(!uservalue.match(userRegex))	{
		jQuery("#user_avail").html('Invalid Username. Capital letters and special charecters are not allowed. Username must have minimum 4 characters and must start with alphabet.');
		alert('Invalid Username. Capital letters and special charecters are not allowed. Username must have minimum 4 characters and must start with alphabet.')
		return true;
	} else {   		
		return false;  
	}  
}
function fnConfirmEmail(obj1,obj2) {
        var email = obj1.value;
        var confemail = obj2.value;
        if(email != confemail) {
            alert('Email Not Matching!');
			obj2.focus();
			return true;
        }
		else
			return false;
}
function fnConfirmPassword(obj1,obj2) {
        var email = obj1.value;
        var confemail = obj2.value;
        if(email != confemail) {
            alert('Passwords Not Matching!');
			obj2.focus();
			return true;
        }
		else
			return false;
}