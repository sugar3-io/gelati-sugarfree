/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function TitlePagination(url) {
  this.url = url;
  this.currSelector = "";
  this.newSelector = "";

  var that = this;

  this.nextprev = function (currSelector, newSelector) {
    this.currSelector = currSelector;
    this.newSelector = newSelector;
    w3.getHttpData(this.url, changeTitle);
  };

  function changeTitle(newDoc) {
    var parser = new DOMParser();
    var newDom = parser.parseFromString(newDoc, "text/html");
    var newElm = newDom.querySelector(that.newSelector);
    var currElm = document.querySelector(that.currSelector);

    if (newElm && currElm) {
      var title = newElm.getAttribute("title").trim();
      currElm.innerHTML = title;
      currElm.setAttribute("title", title);
    }
  }

  this.init = function () {};
}

function NumberedPagination(
  xomObjName,
  paginationPostFunc,
  postsPerPage,
  olderCaption,
  newerCaption,
  widgetName
) {
  /* b:comment: use only even numbers for numshowpage */
  var numshowpage = 2;
  var urlactivepage = location.href;
  var home_page = "/";

  var currnumber, type, postnumber, lblname1, prevnumber, nextnumber;

  var that = this;
  var thatName = xomObjName;
  var where = document.getElementById(thatName + "_script");
  postsPerPage = parseInt(postsPerPage) ? postsPerPage : 6;
  olderCaption = olderCaption ? olderCaption : "Older";
  newerCaption = newerCaption ? newerCaption : "Newer";
  var linkName = widgetName + "_blog-pager-";
  var callback = paginationPostFunc;

  function pagination(a) {
    var e = "";

    var leftnum, start, maximum, end;

    (leftnum = parseInt(numshowpage / 2)),
      leftnum == numshowpage - leftnum && (numshowpage = 2 * leftnum + 1),
      (start = postnumber - leftnum),
      start < 1 && (start = 1),
      (maximum = parseInt(a / postsPerPage) + 1),
      maximum - 1 == a / postsPerPage && (maximum -= 1),
      (end = start + numshowpage - 1),
      end > maximum && (end = maximum),
      (e += "");

    var s = parseInt(postnumber) - 1;

    /* b:comment: bugfix */
    if (maximum >= numshowpage) {
      var postnumberInt = parseInt(postnumber);
      var rightnum = maximum - postnumberInt - leftnum;

      /* b:comment: bugfix - add lower numbers when reaching given range) */
      if (rightnum < 0) {
        start += rightnum;
      }
    }
    if (maximum >= numshowpage + leftnum) {
      /* b:comment: bugfix - pad front or end numbers when within given range) */
      if (start == 1 || end == maximum) {
        if (start == 1) {
          end += 1;
        } else {
          start -= 1;
        }
      }
    }
    var startgap = "";
    var endgap = "";
    if (maximum >= numshowpage * 2) {
      startgap = postnumberInt - numshowpage > 0 ? " gap-left" : "";
      endgap = maximum - s - numshowpage > 0 ? " gap-right" : "";
    }

    postnumber > 1 &&
      (e +=
        2 == postnumber
          ? "page" == type
            ? '<span class="pager-item pager-item-alpha showpage pager-newer font-icon"><a id="' +
              linkName +
              'newer-link" href="' +
              home_page +
              '">' +
              newerCaption +
              "</a></span>"
            : '<span class="pager-item pager-item-alpha pagenumber pager-newer font-icon"><a id="' +
              linkName +
              'newer-link" href="/search/label/' +
              lblname1 +
              "?&max-results=" +
              postsPerPage +
              '">' +
              newerCaption +
              "</a></span>"
          : "page" == type
          ? '<span class="pager-item pager-item-alpha pagenumber pager-newer font-icon"><a id="' +
            linkName +
            'newer-link" href="#" onclick="' +
            thatName +
            ".redirectpage(" +
            s +
            ');return false">' +
            newerCaption +
            "</a></span>"
          : '<span class="pager-item pager-item-alpha pagenumber pager-newer font-icon"><a id="' +
            linkName +
            'newer-link" href="#" onclick="' +
            thatName +
            ".redirectlabel(" +
            s +
            ');return false">' +
            newerCaption +
            "</a></span>"),
      start > 1 &&
        (e +=
          "page" == type
            ? '<span class="pager-item pager-item-number pagenumber' +
              startgap +
              '"><a href="' +
              home_page +
              '">1</a></span>'
            : '<span class="pager-item pager-item-number pagenumber' +
              startgap +
              '"><a href="/search/label/' +
              lblname1 +
              "?&max-results=" +
              postsPerPage +
              '">1</a></span>'),
      start > 2 && (e += "");

    for (var r = start; r <= end; r++)
      e +=
        postnumber == r
          ? '<span class="pager-item pager-item-number current selected-item"><span>' +
            r +
            "</span></span>"
          : 1 == r
          ? "page" == type
            ? '<span class="pager-item pager-item-number pagenumber"><a href="' +
              home_page +
              '">1</a></span>'
            : '<span class="pager-item pager-item-number pagenumber"><a href="/search/label/' +
              lblname1 +
              "?&max-results=" +
              postsPerPage +
              '">1</a></span>'
          : "page" == type
          ? '<span class="pager-item pager-item-number pagenumber"><a href="#" onclick="' +
            thatName +
            ".redirectpage(" +
            r +
            ');return false">' +
            r +
            "</a></span>"
          : '<span class="pager-item pager-item-number pagenumber"><a href="#" onclick="' +
            thatName +
            ".redirectlabel(" +
            r +
            ');return false">' +
            r +
            "</a></span>";

    end < maximum - 1 && (e += ""),
      end < maximum &&
        (e +=
          "page" == type
            ? '<span class="pager-item pager-item-number pagenumber' +
              endgap +
              '"><a href="#" onclick="' +
              thatName +
              ".redirectpage(" +
              maximum +
              ');return false">' +
              maximum +
              "</a></span>"
            : '<span class="pager-item pager-item-number pagenumber' +
              endgap +
              '"><a href="#" onclick="' +
              thatName +
              ".redirectlabel(" +
              maximum +
              ');return false">' +
              maximum +
              "</a></span>");
    var n = parseInt(postnumber) + 1;

    postnumber < maximum &&
      (e +=
        "page" == type
          ? '<span class="pager-item pager-item-alpha pagenumber pager-older font-icon"><a id="' +
            linkName +
            'older-link" href="#" onclick="' +
            thatName +
            ".redirectpage(" +
            n +
            ');return false">' +
            olderCaption +
            "</a></span>"
          : '<span class="pager-item pager-item-alpha pagenumber pager-older font-icon"><a id="' +
            linkName +
            'older-link" href="#" onclick="' +
            thatName +
            ".redirectlabel(" +
            n +
            ');return false">' +
            olderCaption +
            "</a></span>");

    for (
      var t = document.getElementsByName("pageArea"),
        l = document.getElementById("blog-pager"),
        p = 0;
      p < t.length;
      p++
    )
      t[p].innerHTML = e;
    t && t.length > 0 && (e = ""), l && (l.innerHTML = e);

    if (maximum > leftnum || maximum == leftnum) {
      if (s == 0) {
        l.innerHTML =
          "page" == type
            ? '<span class="disabled-item pager-item pager-item-alpha pagenumber pager-newer font-icon"><span id="' +
              linkName +
              'newer-link">' +
              newerCaption +
              "</span></span>" +
              l.innerHTML
            : '<span class="disabled-item pager-item pager-item-alpha pagenumber pager-newer font-icon"><span id="' +
              linkName +
              'newer-link">' +
              newerCaption +
              "</span></span>" +
              l.innerHTML;
      }
      if ((s != 0 && r == n) || maximum == leftnum) {
        l.innerHTML +=
          "page" == type
            ? '<span class="disabled-item pager-item pager-item-alpha pagenumber pager-older font-icon"><span id="' +
              linkName +
              'older-link">' +
              olderCaption +
              "</span></span>"
            : '<span class="disabled-item pager-item pager-item-alpha pagenumber pager-older font-icon"><span id="' +
              linkName +
              'older-link">' +
              olderCaption +
              "</span></span>";
      }
    }

    /* b:comment: */
    nextnumber = s;
    prevnumber = n;
    var labelpath = type == "label" ? "/-/" + lblname1 : "";
    var nextstart = (s - 1) * postsPerPage;
    var prevstart = (n - 1) * postsPerPage;

    if (n >= 2) {
      if (nextstart > 0) {
        writeNode(
          home_page +
            "feeds/posts/summary" +
            labelpath +
            "?start-index=" +
            nextstart +
            "&max-results=1&alt=json-in-script&callback=" +
            thatName +
            ".newer" +
            type
        );
      }
      if (nextstart == 0) {
        if (type == "label") {
          that.newerlabel(
            home_page +
              "search/label/" +
              lblname1 +
              "?&max-results=" +
              postsPerPage
          );
        } else {
          that.newerpage(home_page);
        }
      }
      if (
        rightnum >= 0 ||
        (rightnum == undefined && maximum == 2 && maximum == n)
      ) {
        writeNode(
          home_page +
            "feeds/posts/summary" +
            labelpath +
            "?start-index=" +
            prevstart +
            "&max-results=1&alt=json-in-script&callback=" +
            thatName +
            ".older" +
            type
        );
      }
    }

    /* b:comment: numbered pagination callback does not honor additional fetching of data-rel links. related modules have to rely on proper call order of DOMContentLoaded before load */
    that.render();
  }

  this.render = function () {
    callback();
  };

  this.paginationall = function (a) {
    var e = a.feed,
      s = parseInt(e.openSearch$totalResults.$t, 10);
    pagination(s);
  };

  function bloggerpage() {
    var a = urlactivepage;
    -1 != a.indexOf("/search/label/") &&
      (lblname1 =
        -1 != a.indexOf("?updated-max")
          ? a.substring(
              a.indexOf("/search/label/") + 14,
              a.indexOf("?updated-max")
            )
          : a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?&max"))),
      -1 == a.indexOf("?q=") &&
        -1 == a.indexOf(".html") &&
        (-1 == a.indexOf("/search/label/")
          ? ((type = "page"),
            (postnumber =
              -1 != urlactivepage.indexOf("#PageNo=")
                ? urlactivepage.substring(
                    urlactivepage.indexOf("#PageNo=") + 8,
                    urlactivepage.length
                  )
                : 1),
            writeNode(
              home_page +
                "feeds/posts/summary?max-results=1&alt=json-in-script&callback=" +
                thatName +
                ".paginationall"
            ))
          : ((type = "label"),
            -1 == a.indexOf("&max-results=") && (postsPerPage = 20),
            (postnumber =
              -1 != urlactivepage.indexOf("#PageNo=")
                ? urlactivepage.substring(
                    urlactivepage.indexOf("#PageNo=") + 8,
                    urlactivepage.length
                  )
                : 1),
            writeNode(
              home_page +
                "feeds/posts/summary/-/" +
                lblname1 +
                "?alt=json-in-script&callback=" +
                thatName +
                ".paginationall&max-results=1"
            )));
  }

  this.newerpage = function (a) {
    var r;

    if (a === Object(a)) {
      var post;

      post = a.feed.entry[0];
      var e =
          post.published.$t.substring(0, 19) +
          post.published.$t.substring(23, 29),
        s = encodeURIComponent(e);
      if ("page" == type)
        r =
          "/search?updated-max=" +
          s +
          "&max-results=" +
          postsPerPage +
          "#PageNo=" +
          nextnumber;
      else
        r =
          "/search/label/" +
          lblname1 +
          "?updated-max=" +
          s +
          "&max-results=" +
          postsPerPage +
          "#PageNo=" +
          nextnumber;
    } else {
      r = a;
    }

    var linkElm = document.getElementById(linkName + "newer-link");
    if (linkElm) {
      linkElm.dataset.rel = r;
    }
  };
  this.newerlabel = this.newerpage;

  this.olderpage = function (a) {
    var r;
    var post;

    post = a.feed.entry[0];
    var e =
        post.published.$t.substring(0, 19) +
        post.published.$t.substring(23, 29),
      s = encodeURIComponent(e);
    if ("page" == type)
      r =
        "/search?updated-max=" +
        s +
        "&max-results=" +
        postsPerPage +
        "#PageNo=" +
        prevnumber;
    else
      r =
        "/search/label/" +
        lblname1 +
        "?updated-max=" +
        s +
        "&max-results=" +
        postsPerPage +
        "#PageNo=" +
        prevnumber;

    var linkElm = document.getElementById(linkName + "older-link");
    if (linkElm) {
      linkElm.dataset.rel = r;
    }
  };
  this.olderlabel = this.olderpage;

  this.redirectpage = function (a) {
    var currstart;

    (currstart = (a - 1) * postsPerPage), (currnumber = a);
    var e = document.getElementsByTagName("head")[0],
      s = document.createElement("script");
    (s.type = "text/javascript"),
      s.setAttribute(
        "src",
        home_page +
          "feeds/posts/summary?start-index=" +
          currstart +
          "&max-results=1&alt=json-in-script&callback=" +
          thatName +
          ".finddatepost"
      ),
      e.appendChild(s);
  };

  this.redirectlabel = function (a) {
    var currstart;

    (currstart = (a - 1) * postsPerPage), (currnumber = a);
    var e = document.getElementsByTagName("head")[0],
      s = document.createElement("script");
    (s.type = "text/javascript"),
      s.setAttribute(
        "src",
        home_page +
          "feeds/posts/summary/-/" +
          lblname1 +
          "?start-index=" +
          currstart +
          "&max-results=1&alt=json-in-script&callback=" +
          thatName +
          ".finddatepost"
      ),
      e.appendChild(s);
  };

  this.finddatepost = function (a) {
    var r;
    var post;

    post = a.feed.entry[0];
    var e =
        post.published.$t.substring(0, 19) +
        post.published.$t.substring(23, 29),
      s = encodeURIComponent(e);
    if ("page" == type)
      r =
        "/search?updated-max=" +
        s +
        "&max-results=" +
        postsPerPage +
        "#PageNo=" +
        currnumber;
    else
      r =
        "/search/label/" +
        lblname1 +
        "?updated-max=" +
        s +
        "&max-results=" +
        postsPerPage +
        "#PageNo=" +
        currnumber;
    location.href = r;
  };

  this.init = function () {
    if (where) {
      bloggerpage();
    }
  };

  function writeNode(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    where.parentNode.insertBefore(script, where.nextSibling);
  }
}
