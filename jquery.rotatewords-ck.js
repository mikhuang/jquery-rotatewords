/*!
 * jQuery rotatewords plugin
 * Based on jQuery lightweight plugin boilerplate
 * Author: Michael Huang (@mikhuang)
 * Licensed under the MIT license
 */// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
(function(e,t,n,r){function o(t,n){this.element=t;this.options=e.extend({},s,n);this._defaults=s;this._name=i;this.init()}var i="rotatewords",s={delim:",",interval:1e3};o.prototype={init:function(){},yourOtherFunction:function(e,t){}};e.fn[i]=function(t){var n=arguments;if(t===r||typeof t=="object")return this.each(function(){e.data(this,"plugin_"+i)||e.data(this,"plugin_"+i,new o(this,t))});if(typeof t=="string"&&t[0]!=="_"&&t!=="init")return this.each(function(){var r=e.data(this,"plugin_"+i);r instanceof Plugin&&typeof r[t]=="function"&&r[t].apply(r,Array.prototype.slice.call(n,1))})}})(jQuery,window,document);