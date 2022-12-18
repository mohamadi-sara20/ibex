/* This software is licensed under a BSD license; see the LICENSE file for details. */

// Check that the object namespace hasn't been polluted by monkey patching (we
// use objects as hashtables without conscience).
for (var _ in { }) {
    assert(false, "ERROR: The JavaScript object namespace has been polluted (perhaps by a library such as prototype.js?)");
  }
  
  // *** Added By Sara ***
  
  var backOrReloadPressed = false
  var serverURL = 'http://37.32.9.104:3001/api'
  // var serverURL = 'http://127.0.0.1:3001/api'
  
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.href);
    var script = document.createElement("script");
    script.innerHTML = backPress()
    document.head.appendChild(script);
    window.location.hash = "home"
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  
  function isRegistered(id) {
    if (!id) {
      throw "error";
    }
  
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": serverURL + "/is-registered?id=" + id.toString(),
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
      }
    }
  
    return new Promise((resolve, reject) => {
      $.ajax(settings).done(function (response) {
        var isRegistered = response.data;
        resolve(isRegistered)
      });
    })
  }
  
  
  function getCount(id) {
    if (!id) {
      throw "error";
    }
  
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": serverURL + "/count",
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
      }
    }
  
    return new Promise((resolve, reject) => {
      $.ajax(settings).done(function (response) {
        // var count = response.data;
        const count = response.data;
        resolve(count)
      });
    })
  }
  
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  function register(id) {
    var settings = {
      "url": serverURL + "/register",
      "method": "POST",
      "type": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({"id": id.toString()}),
    };
  
    return new Promise((resolve, reject) => {
      $.ajax(settings).done(function (response) {
        resolve(response);
      });
    })
  }
  
  
  function backPress(){
    window.onhashchange = function(url){
      window.location.reload("true")
      return  "Your work will be lost.";
    }
    window.onbeforeunload = function(url) {
      window.location.replace(url["oldURL"])
      return "Your work will be lost.";
    };
  }
  
  
  //
  
  $(document).ready(function () {
  
  // Preload chunks.
    var loadingMessage = null;
    var alreadyLoaded = false;
    setTimeout(function () {
      if (alreadyLoaded)
        return;
      loadingMessage = $("<p>").text(conf_loadingMessage);
      $("<body>").append(loadingMessage);
    }, 500);
  
    $.ajax({
      url: __server_py_script_name__ + '?allchunks=1',
      cache: false,
      dataType: 'text', // We're still trying to support IE 6 LOL
      success: function (data) {
        if (alreadyLoaded && loadingMessage)
          loadingMessage.remove();
        alreadyLoaded = true;
  
        var cs;
        try {
          var o = JSON.parse(data);
          if (typeof(o) != "object")
            throw "error";
          setChunks(o);
          var id = getUrlParameter("PROLIFIC_PID");
          if (!id) {
            $('body').append($('<p>', {
              text: conf_invalidUrl,
              style: "border-radius: 40px; background-color: #D3D3D3 !important; margin: 15rem; padding: 10rem; font-size: 1.2rem; text-align:center; font-family:Courier; font-weight: bold; background-color:white;"
            }));
          }
          isRegistered(id)
            .then(function(isRegistered) {
              if (isRegistered) {
                $('body').append($('<p>', {
                  text: conf_alreadyRegisteredErrorMessage,
                  style: "border-radius: 40px; background-color: #D3D3D3 !important; margin: 15rem; padding: 10rem; font-size: 1.2rem; text-align:center; font-family:Courier; font-weight: bold; background-color:white;"
                }));
              } else {
                startup();
              }
            })
        }
        catch (e) {
          $("<body>").append($("<p>").text(conf_loadingFatalErrorMessage));
        }
      },
      error: function () {
        if (loadingMessage)
          loadingMessage.remove()
        alreadyLoaded = true;
        $("<body>").append($("<p>").text(conf_loadingFatalErrorMessage));
      }
    });
  
  });
  
  function startup() {
  
    var practiceBox;
    var inner;
    var mainTable; // Only set if conf_centerItems.
  
    function createMainTable() {
      // Note that this statement sets the 'inner' var.
      var newt =
        $(document.createElement("table"))
          .attr('align', 'center') // IE sucks.
          .append($(document.createElement("tr"))
            .append(inner = $(document.createElement("td"))));
  
      if (mainTable) {
        mainTable.replaceWith(newt);
      } else {
        $("body").append(newt);
      }
      mainTable = newt;
    }
  
    function renewInner() {
      if ((!conf_centerItems) || conf_showOverview) {
        var newdiv = $(document.createElement("div")).addClass("lindent");
        newdiv.className = "lindent";
        if (inner) {
          inner.replaceWith(newdiv);
        } else {
          $("body").append(newdiv);
        }
        inner = newdiv;
      } else {
        // Have to recreate the entire table, or Firefox 2 will do weird
        // things.
        createMainTable();
      }
      inner.css('clear', "both");
      if ((!conf_showOverview) && conf_practiceItemTypes && conf_practiceItemTypes.length > 0)
        inner.append(practiceBox = $(document.createElement("p")).addClass("practice-box"));
    }
  
    renewInner();
  
    var counter = __counter_value_from_server__;
    if (typeof (counterOverride) != "undefined") {
      assert(!isNaN(parseInt(counterOverride)), "Bad value for 'counterOverride' config variable.");
      counter = parseInt(counterOverride);
    }
  
  // Convert the "defaults" variable to a hash.
    var ht_defaults = {};
    if (typeof (defaults) != "undefined") {
      assert_is_arraylike(defaults, "'defaults' variable must be set to an Array.");
      assert(defaults.length % 2 == 0, "'defaults' Array must have an even number of elements.");
  
      for (var i = 0; i < defaults.length; i += 2) {
        assert(typeof (defaults[i]) == "string", "Odd members of the 'defaults' array must be strings naming controllers.");
        assert_is_dict(defaults[i + 1], "Even members of the 'defaults' array must be dictionaries.");
        if (typeof (ht_defaults[defaults[i]]) != "undefined")
          assert(false, "Duplicate entry in 'defaults' for '" + defaults[i] + "'.");
        ht_defaults[defaults[i]] = defaults[i + 1];
      }
    }
  
    function Element(itemNumber, elementNumber, type, group, controller, options) {
      this.itemNumber = itemNumber;
      this.elementNumber = elementNumber;
      this.type = type;
      this.group = group;
      this.controller = controller;
      this.options = options;
    }
  
    var COUNTER_HAS_ALREADY_BEEN_UPDATED = false;
    $.widget("ui.__SetCounter__", {
      _init: function () {
        var q = 'inc-1'; // Default
        if (this.options.inc) {
          assert(typeof (this.options.inc) == "number", "Bad value for option 'inc' of __SetCounter__");
          q = 'inc-' + this.options.inc;
        } else if (this.options.set) {
          assert(typeof (this.options.set) == "number", "Bad value for option 'set' of __SetCounter__");
          q = this.options.set + '';
        }
  
        $.ajax({
          url: __server_py_script_name__ + '?setsquare=' + q,
          cache: false,
          success: function () {
            if (COUNTER_HAS_ALREADY_BEEN_UPDATED) {
              alert("WARNING: Have you used __SetCounter__ twice?");
            }
            COUNTER_HAS_ALREADY_BEEN_UPDATED = true;
          },
          error: function () {
            if (console.log) {
              console.log("WARNING: Error updating counter using __SetCounter__ controller");
            }
          }
        });
  
        this.options._finishedCallback();
      }
    });
    ibex_controller_set_properties("__SetCounter__", {
      obligatory: [],
      countsForProgressBar: false,
      htmlDescription: function () {
        return $("<div>").text("[SET COUNTER]");
      }
    });
  
    var columnNamesArray = ["Controller name", "Item number", "Element number", "Type", "Group"];
  // A list of result lines.
    var allResults = [];
  
    (function () {
      var RESULTS_HAVE_ALREADY_BEEN_SENT = false;
      $.widget("ui.__SendResults__", {
        _init: function () {
          if (RESULTS_HAVE_ALREADY_BEEN_SENT)
            alert("WARNING: Results have already been sent once. Did you forget to set the 'manualSendResults' config option?");
  
          var spinSpan;
          this.element.append($("<table>")
            .addClass("sending-results")
            .append($("<tr>")
              .append($("<td>").text(conf_sendingResultsMessage + " "))
              .append($("<td>").css('width', '1.5em').append(spinSpan = $("<span>").text("/")))));
  
          // Clear "practice" notice if it's still up.
          if (practiceBox)
            practiceBox.hide();
  
          var spinChars = ["\u2013", "\\", "|", "/"];
          var spinCharsPos = 0;
          var spinSpanShouldBeSpinning = true;
          var t = this;
  
          function timerCallback() {
            if (!spinSpanShouldBeSpinning) return;
  
            spinSpan.text(spinChars[spinCharsPos]);
            ++spinCharsPos;
            if (spinCharsPos == spinChars.length) spinCharsPos = 0;
            t.options._utils.setTimeout(timerCallback, 200);
          } // Note that this will be cleaned up automatically.
          t.options._utils.setTimeout(timerCallback, 200);
  
  
          function hopefullyUniqueMD5() {
            var id = readCookie("ibex_random_id");
            if (id) {
              return id;
            }
            var s = '';
            for (var i = 0; i < 20; ++i) {
              // Don't use '\0' just in case it triggers some weird edge cases.
              s += String.fromCharCode(1 + Math.random() * ((1 << 16) - 2));
            }
            var md5 = b64_md5(s);
            createCookie("ibex_random_id", md5, 7);
            return md5;
          }
          // Make a post request to a given address. Address may either be a domain
  // or an IP.
          function sendResults(resultsLines, success, failure) {
            // Prepare the post data.
            var data = JSON.stringify([false, // Now that we're not using cookies, it's never a random counter.
              counter,
              columnNamesArray,
              resultsLines,
              hopefullyUniqueMD5(),
              !COUNTER_HAS_ALREADY_BEEN_UPDATED]);
  
            $.ajax({
              url: __server_py_script_name__,
              cache: false,
              contentType: "text/html; charset=UTF-8",
              data: data,
              type: "POST",
              success: success,
              error: failure
            });
          }
  
          sendResults(allResults,
            function () {
              var id = getUrlParameter("PROLIFIC_PID");
              //todo handle error
              register(id)
                .then(function (payload) {
                  RESULTS_HAVE_ALREADY_BEEN_SENT = true;
                  spinSpanShouldBeSpinning = false;
                  t.element.empty().append($("<div>").addClass("sending-results").text(conf_completionMessage));
                  t.options._finishedCallback();
                  window.onbeforeunload = null
                  setTimeout(function() {
                    window.location.replace('https://app.prolific.co/submissions/');
                }, 5000);

                })
                .catch(function (err) {
                  $('body').append($('<p>', {
                    text: conf_resultSubmissionFailed,
                    style: "padding: 10px; font-size: 1.2rem;text-align:center; font-weight: bold;"
                  }));
                })
  
            },
            function () {
              spinSpanShouldBeSpinning = false;
              t.element.empty()
                .append($("<div>").addClass("sending-results").text(conf_completionErrorMessage + " ")
                  .append($("<span>")
                    .addClass("retry")
                    .text('Retry')
                    .click(function (e) {
                      e.preventDefault();
                      t.element.empty();
                      t._init();
                    })));
            });
        }
      });
    })();
    ibex_controller_set_properties("__SendResults__", {
      obligatory: [],
      countsForProgressBar: false,
      htmlDescription: function () {
        return $("<div>").text("[SEND RESULTS]");
      }
    });
  
  // Now create our initial list of item sets (lists of Elements), merging in default options.
    assert(typeof (items) != "undefined", "You must define the 'items' variable.");
    assert_is_arraylike(items, "The 'items' variable must be set to an Array.");
  
    function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(window.location.href);
      var script = document.createElement("script");
      document.head.appendChild(script);
      window.location.hash = "home"
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
  
    var id = getUrlParameter("PROLIFIC_PID");
    var count = -1;
    var userCountPromise = getCount(id)
  
  
    userCountPromise.then((value) => {
      count = value
      if (count > -1) {
        // if (count % 2 == 0) items = firstHalf.concat(items)
        // else items = secondHalf.concat(items)
        items = firstHalf.concat(items)
        // items = secondHalf.concat(items)
        // console.log("ITEMS >>>>>>>>>>>> ",items);
        var listOfElementSets = [];
        var itemNumber = 0;
        $.each(items, function (_, it) {
          assert_is_arraylike(it, "Every element in the 'items' Array must be an Array.");
  
          assert(((it.length - 1) % 2) == 0, "Following the item/group specifier, each element of the 'items' array must contain an even number of elements.")
          var typeAndGroup = it[0];
          var currentElementSet = [];
          for (var setIndex = 1, elementNumber = 0; setIndex < it.length; setIndex += 2, ++elementNumber) {
            var controller = it[setIndex];
            var options = it[setIndex + 1];
  
            var type;
            var group = null;
            assert(typeof (typeAndGroup) == "object" || typeof (typeAndGroup) == "number" || typeof (typeAndGroup) == "string",
              "Type and group specifier must be an Array, number or string");
            if (typeof (typeAndGroup) == "object") {
              assert(typeAndGroup.length == 2, "Type and group specifier must have two elements");
              type = typeAndGroup[0];
              group = typeAndGroup[1];
            } else {
              type = typeAndGroup;
            }
  
            var opts = ht_defaults[controller];
            opts = merge_dicts(opts, options);
  
            // Check that all obligatory options have been specified.
            if (ibex_controller_get_property(controller, "obligatory")) {
              assert_is_arraylike(ibex_controller_get_property(controller, "obligatory"), "The 'obligatory' option field must be an Array of strings.");
              $.each(ibex_controller_get_property(controller, "obligatory"), function (_, o) {
                assert(typeof (o) == "string", "All members of the Array value of the 'obligatory' option must be strings.");
                assert(opts[o] != undefined, "The obligatory option '" + o + "' was not specified for the controller" + controller);
              });
            }
  
            currentElementSet.push(new Element(itemNumber, elementNumber, type, group, controller, opts));
          }
          currentElementSet.type = type;
          currentElementSet.group = group;
          listOfElementSets.push(currentElementSet);
  
          ++itemNumber;
        });
  
        var runningOrder = runShuffleSequence(mungGroups(listOfElementSets, counter), conf_shuffleSequence);
        assert(runningOrder.length > 0 && runningOrder[0].length > 0,
          "There must be some items in the running order!");
  
  // Hook to allow manual manipulation of the running order in the data file.
        if (conf_modifyRunningOrder) {
          // We now can't share structure between element sets.
          for (var i = 0; i < runningOrder.length; ++i) {
            var l = new Array(runningOrder[i].length);
            for (var j = 0; j < l.length; ++j)
              l[j] = runningOrder[i][j];
            runningOrder[i] = l;
          }
  
          runningOrder = conf_modifyRunningOrder(runningOrder);
        }
  
  // Not necessary to set item/element numbers properly as the __SendResults__ controller
  // doesn't add any lines to the results file.
        if (!conf_manualSendResults)
          runningOrder.push([new Element(-1, -1, null, null, "__SendResults__", {})]);
  
        if (conf_showOverview) {
          var l = $(document.createElement("ol"));
          for (var i = 0; i < runningOrder.length; ++i) {
            var sl = $(document.createElement("ol"));
            for (var j = 0; j < runningOrder[i].length; ++j) {
              var li = $(document.createElement("li"));
              var b = $(document.createElement("b"));
              li.append(b.append(runningOrder[i][j]));
              var hd = ibex_controller_get_property(runningOrder[i][j].controller, "htmlDescription") ? ibex_controller_get_property(runningOrder[i][j].controller, "htmlDescription")(runningOrder[i][j].options) : null;
  
              if (hd) li.append(": ").append($(hd));
              sl.append(li);
            }
            l.append($(document.createElement("li")).append(sl));
          }
          inner.append(l);
        } else {
  
          function Utils(valuesFromPreviousElement) {
            this.timeoutIds = [];
  
            this.setTimeout = function (func, time) {
              var id = setTimeout(func, time);
              this.timeoutIds.push(id);
              return id;
            }
  
            this.clearTimeout = function (id) {
              // Check that this is an id from a timeout set with the
              // setTimeout method of this object.
              // COMMENTING THIS CHECK OUT FOR PERFORMANCE REASONS.
              /*var foundIt = false;
              for (i = 0; i < this.timeoutIds; ++i) {
                  if (this.timeoutIds[i] == id) {
                      foundIt = this.timeoutIds[i];
                      break;
                  }
              }
              if (foundIt == null)
                  assert(false, "Attempt to clear timer that wasn't set propetly");
              */
  
              clearTimeout(id);
  
              var newArray = [];
              for (var j = 0; j < this.timeoutIds.length; ++j) {
                if (this.timeoutIds[j] != id)
                  newArray.push(this.timeoutIds[j]);
              }
              this.timeoutIds = newArray;
            }
  
            this.gc = function () {
              for (var i = 0; i < this.timeoutIds.length; ++i) {
                clearTimeout(this.timeoutIds[i]);
              }
            }
  
            this.valuesForNextElement = {};
  
            this.setValueForNextElement = function (key, value) {
              assert(typeof (key) == "string", "First argument to 'setValueForNextElement' must be a string");
              this.valuesForNextElement[key] = value;
            }
  
            this.getValueFromPreviousElement = function (key) {
              return valuesFromPreviousElement[key];
            }
  
            this.getValuesFromPreviousElement = function () {
              return copy_dict(valuesFromPreviousElement);
            }
          }
  
          var progressBarHeight;
          var progressBarMaxWidth;
          var currentProgressBarWidth = 0.0;
          var showProgress;
          var barContainer;
          var bar;
          var nPoints = 0;
  
          if (conf_showProgressBar) {
            for (var i = 0; i < runningOrder.length; ++i) {
              for (var j = 0; j < runningOrder[i].length; ++j) {
                var currentElement = runningOrder[i][j];
                if (!(currentElement.options.countsForProgressBar !== undefined && !currentElement.options.countsForProgressBar)) {
                  if (ibex_controller_get_property(currentElement.controller, "countsForProgressBar") === undefined ||
                    ibex_controller_get_property(currentElement.controller, "countsForProgressBar")) {
                    ++nPoints;
                  }
                }
              }
            }
  
            progressBarHeight = "0.8em";
            progressBarMaxWidth = nPoints * 5 < 300 ? nPoints * 5 : 300;
  
            var thingToPrependToBody;
            if (conf_centerItems) {
              thingToPrependToBody =
                $(document.createElement("table"))
                  .attr('align', 'center')
                  .append($(document.createElement("tr"))
                    .append(showProgress = $(document.createElement("td"))));
            } else {
              thingToPrependToBody = showProgress =
                $(document.createElement("div")).css('margin-top', '2em').addClass("lindent");
            }
  
            var bar;
            barContainer =
              $(document.createElement("div"))
                .addClass("bar-container")
                .css('height', progressBarHeight)
                .css('width', progressBarMaxWidth)
                .append(bar = $(document.createElement("div"))
                  .addClass("bar")
                  .css('height', progressBarHeight)
                  .css('width', 0));
            var p =
              $(document.createElement("p"))
                .addClass("progress-text")
                .css('text-align', conf_centerItems ? "center" : "left")
                .text(conf_progressBarText);
  
            showProgress.append("<div class='practice-instruction'  style='margin-top:100px'><a target='_blank' href='http://37.32.9.104/'>Open Instructions in New Tab</a></div>");
  
            showProgress.append(barContainer).append(p);
            $("body").prepend(thingToPrependToBody);
          }
  
          function updateProgressBar() {
            if (conf_showProgressBar) {
              currentProgressBarWidth += progressBarMaxWidth / nPoints;
              bar.css('width', Math.round(currentProgressBarWidth) + "px");
            }
          }
  
          function hideProgressBar() {
            if (conf_showProgressBar) {
              showProgress.css('visibility', "hidden");
            }
          }
  
          function showProgressBar() {
            if (conf_showProgressBar) {
              showProgress.css('visibility', "visible");
            }
          }
  
  // Added by Sara - show instructions for the first practice question
  // var p_instruction = $(document.createElement("div"))
          // .addClass("practice-instruction")
          // .css('text-align', conf_centerItems ? "left" : "right")
          // .text("Press the space bar to start reading! Each key press reveals the next word in the sentence.");
  // $("body").append(p_instruction);
  
          var showInst = undefined;
  
  
          var posInRunningOrder = 0;
          var posInCurrentElementSet = 0;
          var currentUtilsInstance = null;
          var currentElementOptions = null;
  
  // Array for column names.
  
  
          function getColumnNameIndex(name) {
            assert(typeof (name) == "string", "Internal error: 'getColumnNameIndex(...)'");
            for (var i = 0; i < columnNamesArray.length; ++i) {
              if (columnNamesArray[i] == name)
                return i;
            }
            columnNamesArray.push(name);
            return columnNamesArray.length - 1;
          }
  
          function namesToIndices(results_line) {
            var na = [];
            for (var i = 0; i < results_line.length; ++i) {
              assert(results_line[i].length == 2, "Internal error");
              na.push([getColumnNameIndex(results_line[i][0]), results_line[i][1]]);
            }
            return na;
          }
  
          function finishedCallback(resultsLines) {
            var currentElement = runningOrder[posInRunningOrder][posInCurrentElementSet];
  
            if (resultsLines != null && !currentElement.hideResults) {
              for (var i = 0; i < resultsLines.length; ++i) {
                var group = currentElement.group;
                if (group && group.length)
                  group = group[0]
                var preamble = [[0, currentElement.controller ? currentElement.controller : "UNKNOWN"],
                  [1, (currentElement.itemNumber || currentElement.itemNumber == 0) ? currentElement.itemNumber : "DYNAMIC"],
                  [2, (currentElement.elementNumber || currentElement.elementNumber == 0) ? currentElement.elementNumber : "DYNAMIC"],
                  [3, (currentElement.type || currentElement.type == 0) ? currentElement.type : "DYNAMIC"],
                  [4, (group == null) ? ((currentElement.itemNumber || currentElement.itemNumber == 0) ? "NULL" : "DYNAMIC") : group]];
                resultsLines[i] = namesToIndices(resultsLines[i]);
                for (var j = 0; j < resultsLines[i].length; ++j) {
                  preamble.push(resultsLines[i][j]);
                }
                allResults.push(preamble);
              }
            }
  
            // Update progress bar if applicable.
            if (!(currentElementOptions.countsForProgressBar !== undefined && !currentElementOptions.countsForProgressBar)) {
              if (ibex_controller_get_property(currentElement.controller, "countsForProgressBar") === undefined ||
                ibex_controller_get_property(currentElement.controller, "countsForProgressBar")) {
                updateProgressBar();
              }
            }
            // Added by Sara - show instructions for the first practice question
            if (showInst === undefined) {
              // showInst = 1;
              var inst_box = $('.practice-instruction')
              inst_box.css("visibility", "visible")
  
            } else {
              var inst_box = $('.practice-instruction')
              inst_box.css("visibility", "hidden")
            }
            //
  
  
            ++posInCurrentElementSet;
            if (posInCurrentElementSet >= runningOrder[posInRunningOrder].length) {
              ++posInRunningOrder;
              if (posInRunningOrder >= runningOrder.length) {
                // We've finished the experiment.
                document.onkeydown = null; // Stop listening for keypresses.
                return;
              }
              posInCurrentElementSet = 0;
            }
  
            currentElement = runningOrder[posInRunningOrder][posInCurrentElementSet];
  
            var pForElement;
            if (dget(currentElementOptions, "displayMode", "overwrite") != "append") {
              renewInner();
            }
            pForElement = $(document.createElement("p")).css('clear', 'both');
            inner.append(pForElement);
            // Is this a practice item?
            if (practiceBox) {
  //        alert(currentItem.type + ":" + conf_practiceItemTypes);
              if (list_contains(runningOrder[posInRunningOrder].type, conf_practiceItemTypes)) {
  //            alert("PB2");
                practiceBox.text(conf_practiceMessage);
              } else {
                practiceBox.text("");
              }
            }
  
            currentUtilsInstance.gc();
            currentUtilsInstance = new Utils(currentUtilsInstance.valuesForNextElement);
            var os = currentElement.options;
            os._finishedCallback = finishedCallback;
            os._utils = currentUtilsInstance;
            os._cssPrefix = ibex_controller_name_to_css_prefix(currentElement.controller);
            os._controllerDefaults = ht_defaults;
            os._utilsClass = Utils;
            currentElementOptions = os;
            addSafeBindMethodPair(currentElement.controller);
            pForElement[currentElement.controller](os);
  
            // Should we show the progress bar with this item?
            if (currentElementOptions.hideProgressBar)
              hideProgressBar();
            else
              showProgressBar();
          }
  
          var pForElement = $(document.createElement("p")).css('clear', 'both');
          inner.append(pForElement);
          currentUtilsInstance = new Utils({});
          var os = runningOrder[0][0].options;
          os._finishedCallback = finishedCallback;
          os._utils = currentUtilsInstance;
          os._cssPrefix = runningOrder[0][0].controller + "-";
          os._controllerDefaults = ht_defaults;
          os._utilsClass = Utils;
          currentElementOptions = os;
          addSafeBindMethodPair(runningOrder[0][0].controller);
          pForElement[runningOrder[0][0].controller](os);
  // Should we show the progress bar with the first item?
          if (currentElementOptions.hideProgressBar)
            hideProgressBar();
  
        } // End of else for if (conf_showOverview).
  
      } // End function startup() {
  
      else throw "error"
  
    }).catch(err => alert("Failed to contact server"));
  }
  
  