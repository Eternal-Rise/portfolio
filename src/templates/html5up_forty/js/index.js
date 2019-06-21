'use strict';

// IE fix for use xlink:href
import svgxuse from './svgxuse';

// toggle nav
import nav from '../blocks/nav/nav';

// scroll, parallax, enterence
import header from '../blocks/+header/header';

// object-fit for IE
import objectFitImages from 'object-fit-images';

header();
nav();
objectFitImages();
svgxuse();