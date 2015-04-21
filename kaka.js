/*!
 * kaka v0.0.1
 * @author alexander hansson
 * @twitter @hejhansson
 * @website http://hnssn.se
 * 
 * kaka.create('name', 'value', days);
 * kaka.find('name'); returns value or null
 * kaka.remove('name');
 * kaka.find('name');
 *
 */


(function(window) {

    'use strict';


    var create, find, remove, update;

    /**
    * Create a cookie with name, value and 
    * expiring date in days. 
    *
    * @param {string} name
    *   Name of the cookie.
    *  
    * @param {string} value
    *   Value of the cookie.
    *  
    * @param {integer} days
    *   Expiring date of the cookie in days.
    *  
    */
    create = function(name, value, days) {
      var expires;

      if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
      }

      else {
        expires = "";
      }

      document.cookie = name+"="+value+expires+"; path=/";
    };

    /**
    * Find a cookie by name and returns its value.
    *
    * @param {string} name
    *   Name of the cookie.
    *
    * @return 
    *   Null or value of the found cookie.  
    *  
    */
    find = function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');

      for(var i=0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    };

    /**
    * Remove cookie by name.
    *
    * @param {string} name
    *   Name of the cookie.
    *
    */
    remove = function(name) {
      if(find(name)) {
        create(name, "", -1);
      }
      else {
        console.warn('Could not find a cookie to remove.');
      }
    };

    /**
    * Update a cookie by name with a new value.
    * WARNING: an update will remove your
    * expiring date so the date will be changed
    * to 7 days if you're not setting a new one. 
    *
    * @param {string} name
    *   Name of the cookie.
    *
    * @param {string} value
    *   Value of the cookie.
    *
    * @param {integer} days
    *   Expiring date of the cookie in days. 
    *   Default is 7 if not set.
    *
    */
    update = function(name, value, days) {
      if(find(name)) {
        (days) ? create(name, value, days) : create(name, value, 7);
      }
      else {
        console.warn('Could not find a cookie to change.');
      }
    };

    var kaka = {
      create: create,
      find: find,
      remove: remove,
      update: update,
    };

    window.kaka = kaka;

})(window);
