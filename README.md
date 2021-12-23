# Gelati Sugarfree

A+ Retrofitted Blogger/Blogspot v2 Template

- Gelati Sugarfree Demos: [Default Theme](https://gelati.sugar3.io/) / [Customized Theme](https://www.glitch.at/)
- Further Infos: [Documentation](https://gelati.sugar3.io/p/docs.html) and [About](https://gelati.sugar3.io/p/about.html)

<br>

![https://www.flaticon.com/authors/smalllikeart/](blog-resources/dist/images/icon.png)
![https://www.glitch.at](blog-resources/dist/images/customized_icon.png)

<br>

## Getting Started

Please see [Documentation](https://gelati.sugar3.io/p/docs.html) before importing one of the available [Blog-Themes](blog-theme) for Gelati Sugarfree.

Although optional, you might also consider to import some [Demo-Content](demo-content) to gain better understanding of its internal mechanisms with the provided examples. Feel free to delete/unplublish unnecessary Posts, Pages and Labels afterwards.

> Some of the Posts contain <i>Jump-Breaks</i>, a feature of Blogger/Blogpost represented by the following expression: <pre><i>&lt;!--more--&gt;</i></pre> 
> When exporting content in Blogger/Blogspot these expressions get converted to plain &lt;a&gt;-Tags: <pre><i>&lt;a name='more'&gt;</i> resp. <i>&amp;lt;a name='more'&amp;gt;</i></pre>
> Unfortunately, after importing such content you have to manual replace all occurences of "ill-converted" <i>Jump-Breaks</i> to their correct expression with the help of Post-Editor.

<br>

## Final Notes

As stated in [Advanced Setup Guide](https://gelati.sugar3.io/p/docs.html#advanced_setup) for most use-cases like

* custom domain usage 
* self-hosting

you should be fine with pre-built [Blog-Resources](blog-resources) provided for <i>Download</i> here on GitHub.

In case you don't want to (or simply don't have the capabilitites to do so) use Gelati Sugarfree's <i>hosted Assets</i>, as referenced in Blog-Themes.

If you have followed [Quick Setup Guide](https://gelati.sugar3.io/p/docs.html#quick_installation) and everything worked well you might already have a working setup of Gelati Sugarfree 🎉.

<br>
<hr>
<br>

Just in case you want to build Blog-Resources on your own, e.g.

* check local built-code against Gelati Sugarfree's provided or hosted Blog-Resources
* employ the provided blogpost-style toolchain

see the following <i>cPanel</i> based examples:

<br>

## Get Gelati Sugarfree 
> Terminal
```
$ cd ~/workspace
$ git clone... (or git pull)
$ cd gelati-sugarfree
```

<br>

## Build Blog-Resources
> Start Node.js App
* Example settings:<br>
example.com/blogresources /home/examplecom/workspace/gelati-sugarfree/blog-resources
> Terminal
```
$ source /home/examplecom/nodevenv/workspace/gelati-sugarfree/blog-resources/10/bin/activate && cd /home/examplecom/workspace/gelati-sugarfree/blog-resources

$ npm install

$ npm run build:js
$ npm run build:images
$ npm run build:css

$ deactivate
```
> Stop Node.js App

<br>

## Build Blogpost-Style 
> Start Node.js App
* Example settings:<br>
example.com/blogpoststyle /home/examplecom/workspace/gelati-sugarfree/blogpost-style
> Terminal
```
$ source /home/examplecom/nodevenv/workspace/gelati-sugarfree/blogpost-style/10/bin/activate && cd /home/examplecom/workspace/gelati-sugarfree/blogpost-style

$ npm install

$ npm run rultor

$ deactivate
```
> Stop Node.js App

<br>

## Check local-built /dist/ against cloned /dist/
> Terminal
```
$ cd ~/workspace/gelati-sugarfree

$ git status

    On branch master
    Your branch is up to date with 'origin/master'.

    Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
            modified:   blog-resources/dist/images/icon.png

    Untracked files:
    (use "git add <file>..." to include in what will be committed)
            blog-resources/tmp/
            blogpost-style/tmp/

    no changes added to commit (use "git add" and/or "git commit -a")
```