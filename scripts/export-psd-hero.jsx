#target photoshop

app.displayDialogs = DialogModes.NO;

var sourceFile = new File('C:/Users/CS-PC-0830/Documents/WXWork/1688855450799056/Cache/File/2026-10/梦幻诛仙五周年版本-PC-1.psd');
var outputFolder = new Folder('C:/Users/CS-PC-0830/Desktop/梦幻诛仙/src/assets/images/hero-native');
var layerExports = [
  ['背景 拷贝', 'hero-background.png'],
  ['组 1', 'hero-characters.png'],
  ['文案', 'hero-copy.png'],
  ['枫叶', 'hero-leaves.png'],
  ['按钮 拷贝 2', 'hero-entry-button.png'],
  ['梦幻logo7.7版', 'hero-logo.png']
];

if (!sourceFile.exists) {
  throw new Error('PSD source file was not found.');
}

if (!outputFolder.exists) {
  outputFolder.create();
}

var document = app.open(sourceFile);

function findTopLevelLayer(layerName) {
  for (var index = 0; index < document.layers.length; index += 1) {
    if (document.layers[index].name === layerName) {
      return document.layers[index];
    }
  }

  throw new Error('Top-level layer not found: ' + layerName);
}

function hideTopLevelLayers() {
  for (var index = 0; index < document.layers.length; index += 1) {
    document.layers[index].visible = false;
  }
}

function exportLayer(layerName, fileName) {
  hideTopLevelLayers();
  findTopLevelLayer(layerName).visible = true;

  var options = new ExportOptionsSaveForWeb();
  options.format = SaveDocumentType.PNG;
  options.PNG8 = false;
  options.transparency = true;
  options.interlaced = false;
  options.quality = 100;

  document.exportDocument(new File(outputFolder.fsName + '/' + fileName), ExportType.SAVEFORWEB, options);
}

for (var exportIndex = 0; exportIndex < layerExports.length; exportIndex += 1) {
  exportLayer(layerExports[exportIndex][0], layerExports[exportIndex][1]);
}

document.close(SaveOptions.DONOTSAVECHANGES);
