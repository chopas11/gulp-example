Gulp frontend template v2.2
===========================

This template is needed to create front-end of sites using Gulp 4, Sass, Font-awesome, jQuery and Bootstrap.
The template uses the folder for the source code (/src) and the folder for production files (/build),
in /build folder files are automatically compiled.

Implemented Rsync plugin, which allows you to quickly deploy finished filesv from /build to the server.

INSTALLATION
------------

1. You can download repository [from GitHub](https://github.com/) or clone, if you use git an your computer:

      $ git clone https://github.com/
    
2. Install NodeJS 12.x on your computer, if you 've not done it before.
3. Install all npm packages:

      $ npm install


4. Customize the template according to the Customize instructions below.
5. Start template:

      $ gulp


6. To deploy finished files on server, follow 5 step of Customize Instruction and run command:

      $ gulp deploy


Customize Instruction:
----------------------

1. Install the desired font in the src/fonts/yourfont-webfont folder in woff2 format and write it in the "Fonts Including" section in the src/sass/_config.sass file (FontAwesome is already installed in the template)

2. Set up the necessary project variables in the app/sass/_config.sass file

3. Install the necessary libraries through npm: 
      
        $ npm install i --save-dev library_name
      
Tnen, include css library in the "Libraries Including" section in the src/sass/_config.sass file (By default, jQuery and Bootstrap are already in the project, both are turned off), and JS library in the gulpfile.js file

4. You can find the layout of src/index.html, Styles in the file src/sass/main.sass

5. Insert info about server to deploy in function deploy() in file gulpfile.js
