/* 
 * Caesar cipher，凯撒密码，移位密码
 * 
 * 基于HTML和JS实现
 * 
 * 
 */


/* Part 1:
 * 获取html中的引用,并存储在var中
 * 
 */
//偏移量文本框引用
var shift = document.getElementById("shift");
//加密encrypt按钮引用
var btn_encrypt = document.getElementById("encrypt");
//解密decrypt按钮引用
var btn_decrypt = document.getElementById("decrypt");


/* Part 2:
 * function声明和实现
 * 
 */


/* 
- function doCrypt()为加解密操作
- 
*/
function doCrypt(isDecrypt) {
	var shiftText = document.getElementById("shift").value;
	//用正则表达式检查偏移量shift的输入
	var patt = new RegExp(/^\d+$/);
	if (!patt.test(shiftText)) {
		alert("Shift is not an integer, the range is 0 to 25");
		return;
	}
	//将偏移量shift中的字符串转换为base为10的int
	var shift = parseInt(shiftText, 10);
	//字母表长度为26，位移在[0,26)才有意义
	if (shift < 0 || shift >= 26) {
		alert("Shift is out of range");
		return;
	}
	//解密时改变偏移量shift，向前移位，与向后移位效果一样。
	//向前移位和向后移位占用内存一样，具体看caesarShift()，因为都是存储于一个变量中。
	//取模%运算可以在一段范围(例如0 to 26)中模拟向后移动
	if (isDecrypt)
		shift = (26 - shift) % 26;
	//获取文本区域的引用，同时作为输入输出框
	var textElem = document.getElementById("text");
	//调用凯撒加密算法改文本区域的值
	textElem.value = caesarShift(textElem.value, shift);
}


/* 
 - function caesarShift()为凯撒移位算法，大小写敏感，case-sensitive
 - 
 - 现代ROT13算法是凯撒算法的变种，shift为13，ROT13(ROT13(x)) = ROT26(x) = x
 - 
 - 两个连续的ROT13恢复原始文字（在数学上，称之为对合（involution）；在密码学上，这叫做对等加密（reciprocalcipher）
 - 
 */
function caesarShift(text, shift) {
	var result = "";
	for (var i = 0; i < text.length; i++) {
		//获取指定位置的Unicode字符编码, ASCII is a subset of Unicode
		var c = text.charCodeAt(i);
		//每个字符编码在码表上位移后再转换成字符串(只包含一个字符)，再拼接成完整的字符串
		if (65 <= c && c <= 90) result += String.fromCharCode((c - 65 + shift) % 26 + 65); // 大写，Uppercase
		else if (97 <= c && c <= 122) result += String.fromCharCode((c - 97 + shift) % 26 + 97); // 小写，Lowercase
		else result += text.charAt(i); //不是字母a-z的不转换，保留原字符
	}
	return result;
}

//function pop is for testing Listeners working or not
function pop() {
	alert("test");
}

/* Part 3:
 * 为引用添加监听器,响应相关事件的发生
 * 
 */

//加密按钮监听器
btn_encrypt.addEventListener("click", function () {
	//flag
	isDecrypt = false;
	doCrypt(isDecrypt);
});

//解密按钮监听器
btn_decrypt.addEventListener("click", function () {
	//flag
	isDecrypt = true;
	doCrypt(isDecrypt);
});