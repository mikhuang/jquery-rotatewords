/*!
 * jQuery rotatewords plugin
 * Based on jQuery lightweight plugin boilerplate
 * Author: Michael Huang (@mikhuang)
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

  // undefined is used here as the undefined global
  // variable in ECMAScript 3 and is mutable (i.e. it can
  // be changed by someone else). undefined isn't really
  // being passed in so we can ensure that its value is
  // truly undefined. In ES5, undefined can no longer be
  // modified.

  // window and document are passed through as local
  // variables rather than as globals, because this (slightly)
  // quickens the resolution process and can be more
  // efficiently minified (especially when both are
  // regularly referenced in your plugin).

  // Create the defaults once
  var pluginName = 'rotatewords',
    defaults = {
      delim: ",",
      interval: 2000,
    };

  // The actual plugin constructor
  function rotatewords( element, options ) {
    this.element = element;

    // jQuery has an extend method that merges the
    // contents of two or more objects, storing the
    // result in the first object. The first object
    // is generally empty because we don't want to alter
    // the default options for future instances of the plugin
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  rotatewords.prototype = {

    init: function() {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.options
      // you can add more functions like the one below and
      // call them like so: this.yourOtherFunction(this.element, this.options).

      this.getInlineAttr();
      if (this.splitText()) {
        this.setDimensions();
        this.startAnimation();
      }
    },

    getInlineAttr: function() {
      var $element = $(this.element);
      var attrs = ['delim', 'interval'];

      for (var i = 0; i < attrs.length; i++) {
        // check for attribute settings
        if ($element.attr('data-' + attrs[i])) {
          this.options[attrs[i]] = $element.attr('data-' + attrs[i]);
        }
      }
    },

    splitText: function() {
      var $element = $(this.element);
      var contents = $element.text();
      var array = contents.split(this.options.delim);

      // if only one element, don't do it.
      if (array.length === 1) {
        return false;
      }

      // clear contents of text container
      $element.html('');

      // create <span>s, first one active
      for (var i = 0; i < array.length; i++) {
        var html = "<span>" + $.trim(array[i]) + "</span>";
        $element.append(html);
      }

      return true;
    },

    setDimensions: function() {
      var $element = $(this.element);

      // calculate max width/height
      var max_w = 0;
      var max_h = 0;
      var $spans = $element.find('span');

      $spans.css({
        'display': 'block',
        'white-space': 'nowrap',
        'position': 'absolute'
      });

      // determine largest dimensions
      $spans.each(function(){
        var w = $(this).width();
        var h = $(this).height();
        if (w > max_w) { max_w = w; }
        if (h > max_h) { max_h = h; }
        $(this).removeAttr('style');
      });

      // assign width to parent
      $element.width(max_w);
      $element.height(max_h);

      // assign active etc
      $spans.first().addClass('active');
      this.assignClasses();
    },

    startAnimation: function() {
      var dis = this;
      this.interval = setInterval(
        function(){
          dis.assignClasses();
        },
        this.options.interval
      );
    },

    assignClasses: function(){
      var $element = $(this.element);
      var $spans = $element.find('span');
      var $active = $element.find('.active');
      var i = $active.index();

      // add class for active
      $active.removeClass('active');
      var active_i = nextI(i, $spans.length);
      $spans.eq(active_i).addClass('active');

      // add classes for next and prev
      var next_i = nextI(active_i, $spans.length);
      $spans.removeClass('next prev');
      $spans.eq(next_i).addClass('next');
      $spans.eq(i).addClass('prev');
    }

  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations and allowing any
  // public function (ie. a function whose name doesn't start
  // with an underscore) to be called via the jQuery plugin,
  // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
  $.fn[pluginName] = function ( options ) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      return this.each(function () {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new rotatewords( this, options ));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (instance instanceof Plugin && typeof instance[options] === 'function') {
          instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
        }
      });
    }
  }

  // returns next index given length and current i
  function nextI(i, length) {
    if (length === i + 1) { return 0; } // loop to start
    return i + 1;
  }

})( jQuery, window, document );