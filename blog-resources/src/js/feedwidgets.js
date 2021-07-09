/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */

/* https://codepen.io/thenutz/pen/VwYeYEE */
function DragScroll(sliderSel, minItemsNum) {
  var isDown = false;
  var startX;
  var scrollLeft;

  this.init = function () {
    var sliderElm = document.querySelector(sliderSel);
    var debounceTimer;

    function checkBounds(delayed) {
      var delta = 3;

      if (sliderElm.scrollLeft < delta) {
        sliderElm.classList.remove("has-left");
      } else {
        sliderElm.classList.add("has-left");
      }
      if (
        sliderElm.scrollWidth - sliderElm.scrollLeft - sliderElm.clientWidth <
        delta
      ) {
        sliderElm.classList.remove("has-right");
      } else {
        sliderElm.classList.add("has-right");
      }
    }

    sliderElm.classList.add("widget-item-slider");
    if (sliderElm.childElementCount < minItemsNum) {
      sliderElm.classList.add("min-items");
    }
    if (sliderElm.childElementCount > 1) {
      sliderElm.classList.add("has-right");
    }

    sliderElm.addEventListener("mousedown", function (e) {
      isDown = true;
      sliderElm.classList.add("active");
      startX = e.pageX - sliderElm.offsetLeft;
      scrollLeft = sliderElm.scrollLeft;
    });
    sliderElm.addEventListener("mouseleave", function () {
      isDown = false;
      sliderElm.classList.remove("active");
      sliderElm.classList.remove("is-active");
    });
    sliderElm.addEventListener("mouseup", function () {
      isDown = false;
      sliderElm.classList.remove("active");
      sliderElm.classList.remove("is-active");
    });
    sliderElm.addEventListener("mousemove", function (e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - sliderElm.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      sliderElm.scrollLeft = scrollLeft - walk;
      //console.log(walk);
      sliderElm.classList.add("is-active");
    });

    sliderElm.addEventListener("scroll", function (e) {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(function () {
        checkBounds();
      }, 250);
    });
  };
}

function FeedSlider(
  mbtObjName,
  sliderInitFunc,
  blogLabel,
  blogDefaultImageArr,
  mbtItemsNum,
  monthsAbbrArr
) {
  var ListBlogLink = "";
  var TitleCount = 66;
  var ImageW = 800;
  var ImageH = 400;
  var ImageAltW = 400;
  var ImageAltH = 200;
  // var FeaturedImageMatch = "/w800-h400-p-k-no-nu/";
  var FeaturedImageMatch = "/s72-w800-h400-c-p-k-no-nu/";

  var thatName = mbtObjName;
  var where = document.getElementById(thatName + "_script");
  var ListCount = parseInt(mbtItemsNum) ? mbtItemsNum : 4;
  var callback = sliderInitFunc;
  var ListLabel = blogLabel ? blogLabel : "";
  blogDefaultImageArr =
    blogDefaultImageArr instanceof Array && blogDefaultImageArr.length == 2
      ? blogDefaultImageArr
      : [
          "https://3.bp.blogspot.com/-un-Bu-kCQTs/XvRhwcHqyHI/AAAAAAAAWY0/TUqqdICkpI42LUIkW8sDXIAT4p1RZyC4QCPcBGAYYCw",
          "default.png",
        ];
  var ListMonth =
    monthsAbbrArr instanceof Array && monthsAbbrArr.length == 12
      ? monthsAbbrArr
      : [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

  this.render = function () {
    callback();
  };

  this.mbtslide = function (json) {
    var listing = [];

    if (json.feed.entry instanceof Array && json.feed.entry.length) {
      ListCount =
        ListCount > json.feed.entry.length ? json.feed.entry.length : ListCount;
    } else {
      ListCount = 0;
      listing[ListCount] = "<li><div>" + "" + "</div></li>";
    }

    for (var i = 0; i < ListCount; i++) {
      // Variables Declared
      var ListImage = "";
      var ListImageAltSQ = "";
      var ListImageHTML = "";
      var ListUrl = "";
      var ListTitle = "";
      var ListAuthor = "";
      var ListTag = "";
      var ListDate = "";
      var ListUpdate = "";
      var ListComments = "";
      var thumbUrl = "";
      var TotalPosts = "";
      var sk = "";
      var AuthorPic = "";
      var Y = "";
      var D = "";
      var M = "";
      var m = "";
      var YY = "";
      var DD = "";
      var MM = "";
      var mm = "";
      var TT = "";
      var blogDefaultImageClass = "";
      // Category
      if (json.feed.entry[i].category != null) {
        for (var k = 0; k < json.feed.entry[i].category.length; k++) {
          ListTag +=
            "<a href='" +
            ListBlogLink +
            "/search/label/" +
            json.feed.entry[i].category[k].term +
            "'>" +
            json.feed.entry[i].category[k].term +
            "</a>";
          if (k < json.feed.entry[i].category.length - 1) {
            ListTag += " ";
          }
        }
      }
      // URL
      for (var j = 0; j < json.feed.entry[i].link.length; j++) {
        if (json.feed.entry[i].link[j].rel == "alternate") {
          break;
        }
      }
      ListUrl = "'" + json.feed.entry[i].link[j].href + "'";
      // Info
      TotalPosts = json.feed.openSearch$totalResults.$t;
      if (json.feed.entry[i].title != null) {
        ListTitle = json.feed.entry[i].title.$t.substr(0, TitleCount);
      }
      if (json.feed.entry[i].thr$total) {
        ListComments =
          "<a class='icomments comment-item meta-item' href='" +
          json.feed.entry[i].link[j].href +
          "#comment-form'><i class='font-icon fa-fw fas fa-comments'></i> <span class='counter-item'>" +
          json.feed.entry[i].thr$total.$t +
          "</span></a>";
      }
      ListAuthor = json.feed.entry[i].author[0].name.$t.split(" ");
      ListAuthor = ListAuthor.slice(0, 2).join(" ");
      AuthorPic = json.feed.entry[i].author[0].gd$image.src;
      ListDate = json.feed.entry[i].published.$t.substring(0, 10);
      Y = ListDate.substring(0, 4);
      m = ListDate.substring(5, 7);
      D = ListDate.substring(8, 10);
      M = ListMonth[parseInt(m - 1)];
      ListUpdate = json.feed.entry[i].updated.$t.substring(0, 16);
      YY = ListUpdate.substring(0, 4);
      mm = ListUpdate.substring(5, 7);
      DD = ListUpdate.substring(8, 10);
      TT = ListUpdate.substring(11, 16);
      MM = ListMonth[parseInt(mm - 1)];
      // Thumbnail Check
      if (json.feed.entry[i].media$thumbnail) {
        thumbUrl = json.feed.entry[i].media$thumbnail.url;
        if (thumbUrl.replace("/s72-c/", "/w" + ImageW + "-h" + ImageH + "-c/")) {
          sk = thumbUrl.replace("/s72-c/", "/w" + ImageW + "-h" + ImageH + "-c/");
        }
        if (thumbUrl.replace("/s72-w800-h400-c-p-k-no-nu/", "/w" + ImageW + "-h" + ImageH + "-c/")) {
          sk = thumbUrl.replace("/s72-w800-h400-c-p-k-no-nu/", "/w" + ImageW + "-h" + ImageH + "-c/");
        }
        ListImage = "'" + sk.replace("?imgmax=800", "") + "'";

        /* b:comment: */
        if (
          json.feed.entry[i].content.$t.match(
            /youtube\.com.*(\?v=|\/embed\/)(.{11})/
          ) != null
        ) {
          var youtube_id = json.feed.entry[i].content.$t
            .match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)
            .pop();
          if (youtube_id.length == 11) {
            ListImage =
              "'//img.youtube.com/vi/" + youtube_id + "/hqdefault.jpg'";

            var ListImageAltYTUrl =
              "//img.youtube.com/vi/" + youtube_id + "/maxresdefault.jpg";
            var ListImageAltYT = new Image();
            ListImageAltYT.onload = (function (i, id, url) {
              return function (e) {
                if (e.target.height != 90 && e.target.width != 120) {
                  document.getElementById(mbtObjName + "-yt-" + i).src = url;
                }
              };
            })(i, youtube_id, ListImageAltYTUrl);
            ListImageAltYT.src = ListImageAltYTUrl;
          }
        }
      }
      /* b:comment: */
      // YouTube scan
      /*
      else if (json.feed.entry[i].content.$t.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/) != null) 
      { 
      var youtube_id = json.feed.entry[i].content.$t.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop(); 
      
      if (youtube_id.length == 11) { 
      var ListImage = "'//img.youtube.com/vi/"+youtube_id+"/0.jpg'"; 
      } 
      }
      */
      else if (
        json.feed.entry[i].content.$t.match(
          /src=(.+?[\.jpg|\.gif|\.png|\.webp]")/
        ) != null
      ) {
        // Support For 3rd Party Images
        ListImage = json.feed.entry[i].content.$t.match(
          /src=(.+?[\.jpg|\.gif|\.png|\.webp]")/
        )[1];
        /* b:comment: */
        if (FeaturedImageMatch) {
          if (ListImage.indexOf(FeaturedImageMatch) != -1) {
            ListImageAltSQ = ListImage.replace(
              FeaturedImageMatch,
              "/w" + ImageAltW + "-h" + ImageAltH + "-c/"
            );
          }
          ListImage = ListImage.replace(
            FeaturedImageMatch,
            "/w" + ImageW + "-h" + ImageH + "-c/"
          );
        }
      } else {
        ListImage =
          "'" +
          blogDefaultImageArr[0] +
          "/w" +
          ImageW +
          "-h" +
          ImageH +
          "-c/" +
          blogDefaultImageArr[1] +
          "'";
        ListImageAltSQ =
          "'" +
          blogDefaultImageArr[0] +
          "/w" +
          ImageAltW +
          "-h" +
          ImageAltH +
          "-c/" +
          blogDefaultImageArr[1] +
          "'";
        blogDefaultImageClass = " none-cover";
      }
      if (ListImageAltSQ) {
        ListImageHTML =
          "<a class='ns-img' data-screen='480-max' onclick='window.location.href=&#39;" +
          ListUrl.slice(1, -1) +
          "&#39;' href=" +
          ListImage +
          "></a>";
        ListImageHTML +=
          "<a class='ns-img' data-screen='0-479' onclick='window.location.href=&#39;" +
          ListUrl.slice(1, -1) +
          "&#39;' href=" +
          ListImageAltSQ +
          "></a>";
      } else {
        ListImageHTML =
          "<a href=" +
          ListUrl +
          "><img alt='' src=" +
          ListImage +
          "id='" +
          mbtObjName +
          "-yt-" +
          i +
          "'" +
          "/></a>";
      }
      //  Printing List
      listing[i] =
        "<li class='teaser-item'><div>" +
        "<div class='iFeatured teaser-header" +
        blogDefaultImageClass +
        "'>" +
        ListImageHTML +
        "</div>" +
        "<div class='icontainer teaser-body section-container'>" +
        "<div class='iline section-item meta-container teaser-meta'>" +
        "<span class='idate date-item meta-item'><i class='font-icon fa-fw fas fa-calendar-alt'></i><span> " +
        D +
        " " +
        M +
        "</span></span> " +
        ListComments +
        " <span class='iauthor author-item meta-item'><i class='font-icon fa-fw fab fa-blogger'></i><span> " +
        ListAuthor +
        "</span></span>" +
        "</div>" +
        "<div class='mbttitle teaser-title'><a href=" +
        ListUrl +
        "class='section-item title-item' target='_blank'><span>" +
        ListTitle +
        "</span></a></div>" +
        "</div>" +
        "</div></li>";
    }

    var content =
      '<ul class="teaser-container mbtlist mbtslider">' +
      listing.join("") +
      "</ul>";
    writeHtml(content);

    /* Invoking the Callback Function */
    this.render();
  };

  this.init = function () {
    /* Invoking the Callback Function */

    if (where) {
      var labelUrl = ListLabel ? "/-/" + ListLabel : "";
      writeNode(
        ListBlogLink +
          "/feeds/posts/default" +
          labelUrl +
          "?alt=json-in-script&callback=" +
          thatName +
          ".mbtslide"
      );
    }
  };

  function writeHtml(content) {
    where.insertAdjacentHTML("afterend", content);
  }

  function writeNode(url) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    where.parentNode.insertBefore(script, where.nextSibling);
  }
}

function FeedRecent(
  mbtObjName,
  sliderInitFunc,
  blogLabelArr,
  blogPostsPerPage,
  blogDefaultImageArr,
  mbtItemsNum,
  monthsAbbrArr,
  totalText,
  labelExclude
) {
  // Default Settings
  var ListBlogLink = "";
  var ChrCount = 45;
  var TitleCount = 66;
  var ImageW = 300;
  var ImageH = 150;
  // var FeaturedImageMatch = "/w800-h400-p-k-no-nu/";
  var FeaturedImageMatch = "/s72-w800-h400-c-p-k-no-nu/";
  var showcomments = "on";
  var showdate = "on";
  var showauthor = "on";
  var showthumbnail = "on";
  var showlabel = "on";
  var showcontent = "on";
  var showTotal = "on";

  var that = this;
  var thatName = mbtObjName;
  var where = document.getElementById(thatName + "_script");
  var ListCount = parseInt(mbtItemsNum) ? mbtItemsNum : 4;
  var callback = sliderInitFunc;
  blogPostsPerPage = parseInt(blogPostsPerPage) ? blogPostsPerPage : 6;
  blogDefaultImageArr =
    blogDefaultImageArr instanceof Array && blogDefaultImageArr.length == 2
      ? blogDefaultImageArr
      : [
          "https://3.bp.blogspot.com/-un-Bu-kCQTs/XvRhwcHqyHI/AAAAAAAAWY0/TUqqdICkpI42LUIkW8sDXIAT4p1RZyC4QCPcBGAYYCw",
          "default.png",
        ];
  var ListMonth =
    monthsAbbrArr instanceof Array && monthsAbbrArr.length == 12
      ? monthsAbbrArr
      : [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
  var AppendLabelLink = "?&max-results=" + blogPostsPerPage;
  totalText = totalText ? totalText : "View all posts in";
  labelExclude = labelExclude ? labelExclude : "";

  this.render = function () {
    callback();
  };

  // Function Start
  this.mbtlist = function (json) {
    var listing = [];

    var ListCountSub =
      blogLabelArr.length == 1 && blogLabelArr[0] != "" ? ListCount : 1;
    if (json.feed.entry instanceof Array) {
      if (json.feed.entry.length <= ListCountSub) {
        ListCountSub = json.feed.entry.length;
      }
    } else {
      ListCountSub = 0;
      listing[ListCountSub] = "<li class='node0'/>";
    }

    for (var i = 0; i < ListCountSub && i < ListCount; i++) {
      // Variables Declared
      var ListImage = "";
      var ListUrl = "";
      var ListTitle = "";
      var ListContent = "";
      var ListConten = "";
      var ListAuthor = "";
      var ListTag = "";
      var ListDate = "";
      var ListUpdate = "";
      var ListComments = "";
      var thumbUrl = "";
      var TotalPosts = "";
      var sk = "";
      var AuthorPic = "";
      var Y = "";
      var D = "";
      var M = "";
      var m = "";
      var YY = "";
      var DD = "";
      var MM = "";
      var mm = "";
      var TT = "";
      var blogDefaultImageClass = "";
      var FeedLabel = "";
      // Category
      if (json.feed.entry[i].category != null) {
        for (var k = 0; k < json.feed.entry[i].category.length; k++) {
          if (json.feed.entry[i].category[k].term != labelExclude) {
            ListTag +=
              "<a class='label-item label-item-" +
              json.feed.entry[i].category[k].term.replace(/ /g, "_") +
              "' href='" +
              ListBlogLink +
              "/search/label/" +
              json.feed.entry[i].category[k].term +
              AppendLabelLink +
              "'><span>" +
              json.feed.entry[i].category[k].term +
              "</span></a>";
            if (k < json.feed.entry[i].category.length - 1) {
              ListTag += " ";
            }
          }
        }
      }
      // URL
      for (var j = 0; j < json.feed.entry[i].link.length; j++) {
        if (json.feed.entry[i].link[j].rel == "alternate") {
          break;
        }
      }
      FeedLabel = decodeURI(
        json.feed.link[2].href.substring(
          json.feed.link[2].href.lastIndexOf("/") + 1
        )
      );
      ListUrl = "'" + json.feed.entry[i].link[j].href + "'";
      // Info
      TotalPosts = json.feed.openSearch$totalResults.$t;
      if (json.feed.entry[i].title != null) {
        ListTitle = json.feed.entry[i].title.$t.substr(0, TitleCount);
      }
      if (json.feed.entry[i].thr$total) {
        ListComments =
          "<a class='icomments comment-item meta-item' href='" +
          json.feed.entry[i].link[j].href +
          "#comment-form'><i class='font-icon fa-fw fas fa-comments'></i> <span class='counter-item'>" +
          json.feed.entry[i].thr$total.$t +
          "</span></a>";
      }
      ListAuthor = json.feed.entry[i].author[0].name.$t.split(" ");
      ListAuthor = ListAuthor.slice(0, 2).join(" ");
      AuthorPic = json.feed.entry[i].author[0].gd$image.src;
      // Content Check
      ListConten = json.feed.entry[i].content.$t;
      ListConten = ListConten.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );
      ListConten = ListConten.replace(
        /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
        ""
      );
      ListContent = ListConten.replace(/(<([^>]+)>)/gi, "").substring(
        0,
        ChrCount
      );
      ListDate = json.feed.entry[i].published.$t.substring(0, 10);
      Y = ListDate.substring(0, 4);
      m = ListDate.substring(5, 7);
      D = ListDate.substring(8, 10);
      M = ListMonth[parseInt(m - 1)];
      ListUpdate = json.feed.entry[i].updated.$t.substring(0, 16);
      YY = ListUpdate.substring(0, 4);
      mm = ListUpdate.substring(5, 7);
      DD = ListUpdate.substring(8, 10);
      TT = ListUpdate.substring(11, 16);
      MM = ListMonth[parseInt(mm - 1)];
      // Thumbnail Check
      /* b:comment: */
      // YouTube scan
      /*
      if (json.feed.entry[i].content.$t.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/) != null) 
      {
      var youtube_id = json.feed.entry[i].content.$t.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop(); 
      
      if (youtube_id.length == 11) { 
      var ListImage = "'//img.youtube.com/vi/"+youtube_id+"/0.jpg'"; 
      } 
      }
      else if (json.feed.entry[i].media$thumbnail) 
      */
      if (json.feed.entry[i].media$thumbnail) {
        thumbUrl = json.feed.entry[i].media$thumbnail.url;
        if (thumbUrl.replace("/s72-c/", "/w" + ImageW + "-h" + ImageH + "-c/")) {
          sk = thumbUrl.replace("/s72-c/", "/w" + ImageW + "-h" + ImageH + "-c/");
        }
        if (thumbUrl.replace("/s72-w800-h400-c-p-k-no-nu/", "/w" + ImageW + "-h" + ImageH + "-c/")) {
          sk = thumbUrl.replace("/s72-w800-h400-c-p-k-no-nu/", "/w" + ImageW + "-h" + ImageH + "-c/");
        }
        ListImage = "'" + sk.replace("?imgmax=800", "") + "'";

        /* b:comment: */
        if (
          json.feed.entry[i].content.$t.match(
            /youtube\.com.*(\?v=|\/embed\/)(.{11})/
          ) != null
        ) {
          var youtube_id = json.feed.entry[i].content.$t
            .match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)
            .pop();
          if (youtube_id.length == 11) {
            ListImage =
              "'//img.youtube.com/vi/" + youtube_id + "/mqdefault.jpg'";
          }
        }
      } else if (
        json.feed.entry[i].content.$t.match(
          /src=(.+?[\.jpg|\.gif|\.png|\.webp]")/
        ) != null
      ) {
        // Support For 3rd Party Images
        ListImage = json.feed.entry[i].content.$t.match(
          /src=(.+?[\.jpg|\.gif|\.png|\.webp]")/
        )[1];
        /* b:comment: */
        if (FeaturedImageMatch) {
          ListImage = ListImage.replace(
            FeaturedImageMatch,
            "/w" + ImageW + "-h" + ImageH + "-c/"
          );
        }
      } else {
        ListImage =
          "'" +
          blogDefaultImageArr[0] +
          "/w" +
          ImageW +
          "-h" +
          ImageH +
          "-c/" +
          blogDefaultImageArr[1] +
          "'";
        blogDefaultImageClass = " none-cover";
      }
      // Printing List
      listing[i] = "<li class='teaser-item node" + [i] + "' >";
      if (showthumbnail == "on") {
        listing[i] +=
          "<div class='iFeatured teaser-header" +
          blogDefaultImageClass +
          "'><a  href=" +
          ListUrl +
          "><img alt='' src=" +
          ListImage +
          "/></a></div>";
      }
      if (showlabel == "on") {
        listing[i] += "<div class='label-container itag'>" + ListTag + "</div>";
      }
      listing[i] += "<div class='icontainer teaser-body section-container'>";
      listing[i] +=
        "<div class='mbttitle section-item title-item'><a href=" +
        ListUrl +
        ">" +
        ListTitle +
        "</a></div><div class='iline section-item meta-container'>";
      if (showdate == "on") {
        listing[i] +=
          "<span class='idate date-item meta-item'><i class='font-icon fa-fw fas fa-calendar-alt'></i><span> " +
          M +
          " " +
          D +
          "</span></span> ";
        if (showcomments == "on") {
          listing[i] += ListComments;
        }
        if (showauthor == "on") {
          listing[i] +=
            " <span class='iauthor author-item meta-item'><i class='font-icon fa-fw fab fa-blogger'></i><span> " +
            ListAuthor +
            "</span></span>";
        }
      }

      listing[i] += "</div>";
      if (showcontent == "on") {
        listing[i] +=
          "<div class='icontent section-item content-item'><span>" +
          ListContent +
          "</span></div>";
      }
      listing[i] += "</div>";
      listing[i] += "</li>";
    }

    var content =
      '<ul class="mbtlist widget-item-list">' + listing.join("") + "</ul>";
    if (showTotal == "on" && FeedLabel != undefined) {
      content +=
        "<div class='itotal teaser-footer button-item is-link'><a class='caption-item' href='" +
        ListBlogLink +
        "/search/label/" +
        FeedLabel +
        AppendLabelLink +
        "'><span class='label-item label-item-" +
        FeedLabel.replace(/ /g, "_") +
        "'>" +
        FeedLabel +
        "</span></a></div>";
    }
    if (FeedLabel != undefined) {
      writeHtml(content, FeedLabel);
    }
  };

  this.init = function () {
    if (where) {
      for (var i = 0; i < blogLabelArr.length; i++) {
        /* Invoking the Callback Function */
        var labelUrl = blogLabelArr[i] ? "/-/" + blogLabelArr[i] : "";
        writeNode(
          ListBlogLink +
            "/feeds/posts/default" +
            labelUrl +
            "?alt=json-in-script&callback=" +
            thatName +
            ".mbtlist",
          i,
          blogLabelArr[i]
        );
      }
    }
  };

  function writeHtml(content, label) {
    var itemElm = where.parentElement.querySelector(
      'script[data-label="' + label + '"]'
    );
    itemElm.insertAdjacentHTML("afterend", content);

    if (
      where.parentElement.querySelectorAll(".mbtlist").length ==
      blogLabelArr.length
    ) {
      that.render();
    }
  }

  function writeNode(url, count, label) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.setAttribute("id", thatName + "_script_" + count);
    script.setAttribute("data-label", label);

    var div = document.createElement("div");

    where.parentNode.insertBefore(div, where.nextSibling);
    div.appendChild(script);
  }
}

function FeedRandom(
  mbtObjName,
  mbtRandomRange,
  blogPostsPerPage,
  blogDefaultImageArr,
  mbtItemsNum,
  monthsAbbrArr,
  labelExclude
) {
  // Defaults
  var ListBlogLink = "";
  var ChrCount = 85;
  var TitleCount = 70;
  var ImageW = 200;
  var ImageH = 100;
  // var FeaturedImageMatch = "/w800-h400-p-k-no-nu/";
  var FeaturedImageMatch = "/s72-w800-h400-c-p-k-no-nu/";
  var showcomments = "on";
  var showdate = "on";
  var showauthor = "on";
  var showthumbnail = "on";
  var showlabel = "on";
  var showcontent = "on";
  var RandomArray = [];

  var thatName = mbtObjName;
  var where = document.getElementById(thatName + "_script");
  var ListCount = parseInt(mbtItemsNum) ? mbtItemsNum : 4;
  var TotalPosts = parseInt(mbtRandomRange) ? mbtRandomRange : 10;
  blogPostsPerPage = parseInt(blogPostsPerPage) ? blogPostsPerPage : 6;
  blogDefaultImageArr =
    blogDefaultImageArr instanceof Array && blogDefaultImageArr.length == 2
      ? blogDefaultImageArr
      : [
          "https://3.bp.blogspot.com/-un-Bu-kCQTs/XvRhwcHqyHI/AAAAAAAAWY0/TUqqdICkpI42LUIkW8sDXIAT4p1RZyC4QCPcBGAYYCw",
          "default.png",
        ];
  var ListMonth =
    monthsAbbrArr instanceof Array && monthsAbbrArr.length == 12
      ? monthsAbbrArr
      : [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
  var AppendLabelLink = "?&max-results=" + blogPostsPerPage;
  labelExclude = labelExclude ? labelExclude : "";

  this.TotalCount = function (json) {
    if (TotalPosts > json.feed.openSearch$totalResults.$t) {
      TotalPosts = json.feed.openSearch$totalResults.$t;
    }
    if (ListCount > TotalPosts) {
      ListCount = TotalPosts;
    }

    RandomArray = new Array(ListCount);

    GenerateNum();

    for (var i = 0; i < ListCount; i++) {
      writeNode(
        ListBlogLink +
          "/feeds/posts/default?alt=json-in-script&start-index=" +
          RandomArray[i] +
          "&max-results=1&callback=" +
          thatName +
          ".mbtrandom",
        i
      );
    }
    if (ListCount == 0) {
      var content = "<li/>";
      writeHtml(content);
    }
  };

  function GenerateNum() {
    for (var i = 0; i < ListCount; i++) {
      var RandomNum = Math.floor(Math.random() * TotalPosts + 1);
      if (RandomArray.indexOf(RandomNum) == -1) {
        RandomArray[i] = RandomNum;
      } else {
        i--;
      }
    }
  }

  // Function Start
  this.mbtrandom = function (json) {
    var listing = "";
    var i = 0;

    var ListImage = "";
    var ListUrl = "";
    var ListTitle = "";
    var ListContent = "";
    var ListConten = "";
    var ListAuthor = "";
    var ListTag = "";
    var ListDate = "";
    var ListUpdate = "";
    var ListComments = "";
    var thumbUrl = "";
    var TotalPosts = "";
    var sk = "";
    var AuthorPic = "";
    var Y = "";
    var D = "";
    var M = "";
    var m = "";
    var YY = "";
    var DD = "";
    var MM = "";
    var mm = "";
    var TT = "";
    var blogDefaultImageClass = "";
    // Category
    if (json.feed.entry[i].category != null) {
      for (var k = 0; k < json.feed.entry[i].category.length; k++) {
        if (json.feed.entry[i].category[k].term != labelExclude) {
          ListTag +=
            "<a class='label-item label-item-" +
            json.feed.entry[i].category[k].term.replace(/ /g, "_") +
            "' href='" +
            ListBlogLink +
            "/search/label/" +
            json.feed.entry[i].category[k].term +
            AppendLabelLink +
            "'><span>" +
            json.feed.entry[i].category[k].term +
            "</span></a>";

          if (k < json.feed.entry[i].category.length - 1) {
            ListTag += " ";
          }
        }
      }
    }
    // URL
    for (var j = 0; j < json.feed.entry[i].link.length; j++) {
      if (json.feed.entry[i].link[j].rel == "alternate") {
        break;
      }
    }
    ListUrl = "'" + json.feed.entry[i].link[j].href + "'";
    // Info
    TotalPosts = json.feed.openSearch$totalResults.$t;
    if (json.feed.entry[i].title != null) {
      ListTitle = json.feed.entry[i].title.$t.substr(0, TitleCount);
    }
    if (json.feed.entry[i].thr$total) {
      ListComments =
        "<a class='icomments comment-item meta-item' href='" +
        json.feed.entry[i].link[j].href +
        "#comment-form'><i class='font-icon fa-fw fas fa-comments'></i> <span class='counter-item'>" +
        json.feed.entry[i].thr$total.$t +
        "</span></a>";
    }
    ListAuthor = json.feed.entry[i].author[0].name.$t.split(" ");
    ListAuthor = ListAuthor.slice(0, 2).join(" ");
    AuthorPic = json.feed.entry[i].author[0].gd$image.src;
    // Content Check
    ListConten = json.feed.entry[i].content.$t;
    ListConten = ListConten.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
    ListConten = ListConten.replace(
      /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
      ""
    );
    ListContent = ListConten.replace(/(<([^>]+)>)/gi, "").substring(
      0,
      ChrCount
    );
    ListDate = json.feed.entry[i].published.$t.substring(0, 10);
    Y = ListDate.substring(0, 4);
    m = ListDate.substring(5, 7);
    D = ListDate.substring(8, 10);
    M = ListMonth[parseInt(m - 1)];
    ListUpdate = json.feed.entry[i].updated.$t.substring(0, 16);
    YY = ListUpdate.substring(0, 4);
    mm = ListUpdate.substring(5, 7);
    DD = ListUpdate.substring(8, 10);
    TT = ListUpdate.substring(11, 16);
    MM = ListMonth[parseInt(mm - 1)];
    // Thumbnail Check
    /* b:comment: */
    // YouTube scan
    /*
    if (json.feed.entry[i].content.$t.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/) != null) 
    {
    var youtube_id = json.feed.entry[i].content.$t.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/).pop(); 
    
    if (youtube_id.length == 11) { 
    var ListImage = "'//img.youtube.com/vi/"+youtube_id+"/0.jpg'"; 
    } 
    }
    else if (json.feed.entry[i].media$thumbnail) 
    */
    if (json.feed.entry[i].media$thumbnail) {
      thumbUrl = json.feed.entry[i].media$thumbnail.url;
      if (thumbUrl.replace("/s72-c/", "/w" + ImageW + "-h" + ImageH + "-c/")) {
        sk = thumbUrl.replace("/s72-c/", "/w" + ImageW + "-h" + ImageH + "-c/");
      }
      if (thumbUrl.replace("/s72-w800-h400-c-p-k-no-nu/", "/w" + ImageW + "-h" + ImageH + "-c/")) {
        sk = thumbUrl.replace("/s72-w800-h400-c-p-k-no-nu/", "/w" + ImageW + "-h" + ImageH + "-c/");
      }
      ListImage = "'" + sk.replace("?imgmax=800", "") + "'";

      /* b:comment: */
      if (
        json.feed.entry[i].content.$t.match(
          /youtube\.com.*(\?v=|\/embed\/)(.{11})/
        ) != null
      ) {
        var youtube_id = json.feed.entry[i].content.$t
          .match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)
          .pop();
        if (youtube_id.length == 11) {
          ListImage = "'//img.youtube.com/vi/" + youtube_id + "/mqdefault.jpg'";
        }
      }
    } else if (
      json.feed.entry[i].content.$t.match(
        /src=(.+?[\.jpg|\.gif|\.png|\.webp]")/
      ) != null
    ) {
      // Support For 3rd Party Images
      ListImage = json.feed.entry[i].content.$t.match(
        /src=(.+?[\.jpg|\.gif|\.png|\.webp]")/
      )[1];
      /* b:comment: */
      if (FeaturedImageMatch) {
        ListImage = ListImage.replace(
          FeaturedImageMatch,
          "/w" + ImageW + "-h" + ImageH + "-c/"
        );
      }
    } else {
      ListImage =
        "'" +
        blogDefaultImageArr[0] +
        "/w" +
        ImageW +
        "-h" +
        ImageH +
        "-c/" +
        blogDefaultImageArr[1] +
        "'";
      blogDefaultImageClass = " none-cover";
    }
    // Printing List
    listing = "<li class='teaser-item node" + [i] + "' >";
    if (showthumbnail == "on") {
      listing +=
        "<div class='iFeatured teaser-header" +
        blogDefaultImageClass +
        "'><a  href=" +
        ListUrl +
        "><img alt='' src=" +
        ListImage +
        "/></a></div>";
    }
    listing += "<div class='icontainer teaser-body section-container'>";
    if (showlabel == "on") {
      listing +=
        "<div class='label-container section-item itag'>" + ListTag + "</div>";
    }
    listing +=
      "<div class='mbttitle section-item title-item'><a href=" +
      ListUrl +
      ">" +
      ListTitle +
      "</a></div><div class='iline section-item meta-container'>";
    if (showdate == "on") {
      listing +=
        "<span class='idate date-item meta-item'><i class='font-icon fa-fw fas fa-calendar-alt'></i><span> " +
        M +
        " " +
        D +
        "</span></span> ";
      if (showcomments == "on") {
        listing += ListComments;
      }
      if (showauthor == "on") {
        listing +=
          " <span class='iauthor author-item meta-item'><i class='font-icon fa-fw fab fa-blogger'></i><span> " +
          ListAuthor +
          "</span></span>";
      }
    }

    listing += "</div>";
    if (showcontent == "on") {
      listing +=
        "<div class='icontent section-item content-item'><span>" +
        ListContent +
        "</span></div>";
    }
    listing += "</div>";
    listing += "</li>";

    var content = listing;
    writeHtml(content);
  };

  this.init = function () {
    /* Invoking the Callback Function */

    if (where) {
      writeNode(
        ListBlogLink +
          "/feeds/posts/default?alt=json-in-script&callback=" +
          thatName +
          ".TotalCount",
        null
      );
    }
  };

  function writeHtml(content) {
    var ulElm = where.parentElement.getElementsByTagName("ul")[0];
    ulElm.insertAdjacentHTML("beforeend", content);
  }

  function writeNode(url, count) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    if (count === null) {
      var ul = document.createElement("ul");
      ul.setAttribute("class", "teaser-container mbtlist");

      where.parentNode.insertBefore(ul, where.nextSibling);
      where.parentNode.insertBefore(script, where.nextSibling);
    } else {
      script.setAttribute("id", thatName + "_script_" + count);
      var ulElm = where.parentElement.getElementsByTagName("ul")[0];

      ulElm.appendChild(script);
    }
  }
}
