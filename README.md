# Gelati Sugarfree

A+ Retrofitted Blogger v2 Template

- [Gelati Sugarfree Demo](https://gelati.sugar3.io/)
- [Documentation](https://gelati.sugar3.io/p/docs.html)
- [About](https://gelati.sugar3.io/p/about.html)

![https://www.flaticon.com/authors/smalllikeart/](blog-resources/dist/images/icon.png)

> To start, please consult the Documention, referenced above. In case you encounter build-related problems or want to run the build process in special environments - e.g. managed Node.js hosting - see the following, detailed instructions:

# cPanel example

## Get Gelati Sugarfree 

### Terminal
```
cd ~/workspace
git clone... (or git pull)
cd gelati-sugarfree
```

<br>

## Build Blog-Resources

### Node.js App
* Start the application
> Example settings: example.com/blogresources /home/examplecom/workspace/gelati-sugarfree/blog-resources

### Terminal
```
source /home/examplecom/nodevenv/workspace/gelati-sugarfree/blog-resources/10/bin/activate && cd /home/examplecom/workspace/gelati-sugarfree/blog-resources

npm install

npm run build:js
npm run build:images
npm run build:css

deactivate
```
### Node.js App
* Stop the application

<br>

## Build Blogpost-Style 

### Node.js App
* Start the application
> Example settings: example.com/blogpoststyle /home/examplecom/workspace/gelati-sugarfree/blogpost-style

### Terminal
```
source /home/examplecom/nodevenv/workspace/gelati-sugarfree/blogpost-style/10/bin/activate && cd /home/examplecom/workspace/gelati-sugarfree/blogpost-style

npm install

npm run rultor

deactivate
```

### Node.js App
* Stop the application

<br>

## Compare local built /dist/ against cloned (or pulled) /dist/

### Terminal
```
cd ~/workspace/gelati-sugarfree

git status

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