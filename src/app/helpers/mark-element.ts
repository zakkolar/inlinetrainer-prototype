export const MarkElement=function(element,attr,value){
  let $ = require('jquery');
  $(element).attr(attr,value);
}
export const UnmarkElement=function(element,attr){
  let $ = require('jquery');
  $(element).removeAttr(attr);
}
export const CheckElementForMark=function(element,attr,value){
  let $ = require('jquery');
  return $(element).attr(attr)===value;
}
