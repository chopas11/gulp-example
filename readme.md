Gulp frontend template
======================

Latest version: 2.3

The template uses the folder for the source code (/src) and the folder for production files (/build),
in /build folder files are automatically compiled.

Installation
------------

1. Download repository [gulp-example](https://github.com/Chopas11/gulp-example.git) or clone by command below:
      
        $ git clone https://github.com/Chopas11/gulp-example.git
    
2. Install or update NodeJS 14.x on your computer;
3. Install all npm packages:
      
        $ npm i

4. Install the desired font in the `src/fonts/yourfont-webfont` folder in **woff2** format and write it in the "Fonts Including" in the `src/sass/_config.sass`;

5. Set up the necessary project variables in the `src/sass/_config.sass`

6. Install the necessary libraries through npm:
      
        $ npm install i --save-dev library_name
      
Tnen, include css library in the "Libraries Including" in the `src/sass/_config.sass` file, and JS library in the **gulpfile.js**;

7. Insert info about server to deploy in function deploy() in file **gulpfile.js**;

8. Start template:
      
        $ gulp

9. To deploy finished files on server, run command:
      
        $ gulp deploy

