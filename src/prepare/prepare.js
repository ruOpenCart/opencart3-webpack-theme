require('dotenv').config();

const fs     = require("fs");
const fse    = require('fs-extra')
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');

const THEME_NAME            = process.env.MIX_THEME_NAME;
const THEME_NAME_EN         = process.env.MIX_THEME_NAME_EN;
const THEME_NAME_RU         = process.env.MIX_THEME_NAME_RU;
const THEME_NAME_CONTROLLER = process.env.MIX_THEME_NAME_CONTROLLER;
const THEME_NAME_PHP        = THEME_NAME + '.php';
const THEME_NAME_TWIG       = THEME_NAME + '.twig';

const PATH_ADMIN_CONTROLLER  = 'src/admin/controller/extension/theme/';
const PATH_ADMIN_LANGUAGE_EN = 'src/admin/language/en-gb/extension/theme/';
const PATH_ADMIN_LANGUAGE_RU = 'src/admin/language/ru-ru/extension/theme/';
const PATH_ADMIN_VIEW        = 'src/admin/view/template/extension/theme/';
const PATH_TEMPLATE_DEFAULT  = 'src/prepare/default/template';
const PATH_TEMPLATE_SOURCE   = 'src/twig';
const PATH_IMG_DEFAULT       = 'src/prepare/default/img';
const PATH_IMG_SOURCE        = 'src/img';

const FILE_ADMIN_CONTROLLER_DEFAULT  = 'src/prepare/default/admin/controller/extension/theme/default.php';
const FILE_ADMIN_LANGUAGE_EN_DEFAULT = 'src/prepare/default/admin/language/en-gb/extension/theme/default.php';
const FILE_ADMIN_LANGUAGE_RU_DEFAULT = 'src/prepare/default/admin/language/ru-ru/extension/theme/default.php';
const FILE_ADMIN_VIEW_DEFAULT        = 'src/prepare/default/admin/view/template/extension/theme/default.twig';

const FILE_TEMPLATE_HEADER_DEFAULT   = 'src/twig/common/header.twig';

const FILE_ADMIN_CONTROLLER_SOURCE  = PATH_ADMIN_CONTROLLER + THEME_NAME_PHP;
const FILE_ADMIN_LANGUAGE_EN_SOURCE = PATH_ADMIN_LANGUAGE_EN + THEME_NAME_PHP;
const FILE_ADMIN_LANGUAGE_RU_SOURCE = PATH_ADMIN_LANGUAGE_RU + THEME_NAME_PHP;
const FILE_ADMIN_VIEW_SOURCE        = PATH_ADMIN_VIEW + THEME_NAME_TWIG;


fs.stat('src/admin/', function (err, stats) {
  if (err === null) {
    rimraf.sync('src/admin');
  }
  createAdmin()
});

fs.stat('src/twig/', function (err, stats) {
  if (err === null) {
    rimraf.sync('src/twig');
  }
  copyTemplate()
});

fs.stat('src/img/', function (err, stats) {
  if (err === null) {
    rimraf.sync('src/img');
  }
  copyImg()
});


function replaceFileControllerData() {
  let fileData = fs.readFileSync(FILE_ADMIN_CONTROLLER_DEFAULT, 'utf8');
  fileData = fileData.replace('ControllerExtensionThemeDefault', THEME_NAME_CONTROLLER);
  fileData = fileData.replace(/default/gm, THEME_NAME);
  fs.writeFileSync(FILE_ADMIN_CONTROLLER_SOURCE, fileData);
}

function replaceFileLanguageData() {
  let fileDataEn = fs.readFileSync(FILE_ADMIN_LANGUAGE_EN_DEFAULT, 'utf8');
  fileDataEn = fileDataEn.replace('Default Store Theme', THEME_NAME_EN);
  fs.writeFileSync(FILE_ADMIN_LANGUAGE_EN_SOURCE, fileDataEn);

  let fileDataRu = fs.readFileSync(FILE_ADMIN_LANGUAGE_RU_DEFAULT, 'utf8');
  fileDataRu = fileDataRu.replace('Тема магазина по умолчанию', THEME_NAME_RU);
  fs.writeFileSync(FILE_ADMIN_LANGUAGE_RU_SOURCE, fileDataRu);
}

function replaceFileViewData() {
  let fileData = fs.readFileSync(FILE_ADMIN_VIEW_DEFAULT, 'utf8');
  fileData = fileData.replace(/_default/gm, '_' + THEME_NAME);
  fs.writeFileSync(FILE_ADMIN_VIEW_SOURCE, fileData);
}

function createAdmin() {
  mkdirp.sync(PATH_ADMIN_CONTROLLER);
  mkdirp.sync(PATH_ADMIN_LANGUAGE_EN);
  mkdirp.sync(PATH_ADMIN_LANGUAGE_RU);
  mkdirp.sync(PATH_ADMIN_VIEW);
  replaceFileControllerData()
  replaceFileLanguageData()
  replaceFileViewData()
}

function copyTemplate() {
  fse.copySync(PATH_TEMPLATE_DEFAULT, PATH_TEMPLATE_SOURCE)
  replaceTemplateHeader()
}

function copyImg() {
  fse.copySync(PATH_IMG_DEFAULT, PATH_IMG_SOURCE)
  fs.renameSync(PATH_IMG_SOURCE + '/default.png', PATH_IMG_SOURCE + '/' + THEME_NAME + '.png');
}

function replaceTemplateHeader() {
  let fileData = fs.readFileSync(FILE_TEMPLATE_HEADER_DEFAULT, 'utf8');
  const search = '<script src="catalog/view/javascript/jquery/jquery-2.1.1.min.js" type="text/javascript"></script>\r\n<link href="catalog/view/javascript/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen" />\r\n<script src="catalog/view/javascript/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>\r\n<link href="catalog/view/javascript/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />\r\n<link href="//fonts.googleapis.com/css?family=Open+Sans:400,400i,300,700" rel="stylesheet" type="text/css" />\r\n<link href="catalog/view/theme/default/stylesheet/stylesheet.css" rel="stylesheet">';

  const replaceWith = '{# Styles #}\r\n<link href="catalog/view/theme/' + THEME_NAME + '/css/bootstrap.min.css" rel="stylesheet">\r\n<link href="catalog/view/theme/' + THEME_NAME + '/css/fontawesome.min.css" rel="stylesheet">\r\n<link href="catalog/view/theme/' + THEME_NAME + '/css/main.css" rel="stylesheet">\r\n<link href="catalog/view/theme/' + THEME_NAME + '/css/custom.css" rel="stylesheet">\r\n{# Scripts #}\r\n<script src="catalog/view/theme/' + THEME_NAME + '/js/jquery.min.js"></script>\r\n<script src="catalog/view/theme/' + THEME_NAME + '/js/popper.min.js"></script>\r\n<script src="catalog/view/theme/' + THEME_NAME + '/js/bootstrap.min.js"></script>';

  fileData = fileData.replace(search, replaceWith);
  fs.writeFileSync(FILE_TEMPLATE_HEADER_DEFAULT, fileData);
}
