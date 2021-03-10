/* eslint no-undef: "off" */
import _reactP from "react-p5";
import _react, {Component} from "react";
var $6afc9e565c712c39cf8c426ad4b812a5$export$default = (array, chunkSize) => array.reduce((all, one, index) => {
  var ch = Math.floor(index / chunkSize);
  var newAll = [...all];
  newAll[ch] = [].concat(all[ch] || [], one);
  return newAll;
}, []);
var $00dedbde5d77130bd380afb6541f8893$var$ternaryToEth = string => string.replaceAll("0", "E").replaceAll("1", "T").replaceAll("2", "H");
var $00dedbde5d77130bd380afb6541f8893$var$drawE = (x, y, size, p5) => {
  var blockSize = size / 5;
  p5.rect(x, y, size, blockSize);
  p5.rect(x, y + blockSize * 2, size, blockSize);
  p5.rect(x, y + blockSize * 4, size, blockSize);
  p5.rect(x, y, blockSize, size);
};
var $00dedbde5d77130bd380afb6541f8893$var$drawT = (x, y, size, p5) => {
  var blockSize = size / 5;
  p5.rect(x, y, size, blockSize);
  p5.rect(x + blockSize * 2, y, blockSize, size);
};
var $00dedbde5d77130bd380afb6541f8893$var$drawH = (x, y, size, p5) => {
  var blockSize = size / 5;
  p5.rect(x, y, blockSize, size);
  p5.rect(x + blockSize * 4, y, blockSize, size);
  p5.rect(x, y + blockSize * 2, size, blockSize);
};
var $00dedbde5d77130bd380afb6541f8893$var$drawLetter = function drawLetter(letter) {
  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }
  switch (letter) {
    case "E":
      $00dedbde5d77130bd380afb6541f8893$var$drawE(...rest);
      break;
    case "T":
      $00dedbde5d77130bd380afb6541f8893$var$drawT(...rest);
      break;
    case "H":
      $00dedbde5d77130bd380afb6541f8893$var$drawH(...rest);
      break;
    default:
      break;
  }
};
/**
*
*/
var _default = class extends Component {
  /**
  * @example
  */
  render() {
    var {props: {block, block: {hash: blockHash, transactions}, canvasRef, attributesRef, width, height, color1, color2, color3, color4, background, hidden, handleResize}} = this;
    var ternaryHashes = [block, ...transactions].map(_ref => {
      var {hash} = _ref;
      return BigInt(BigInt(hash).toString(3));
    });
    var gridSize = ternaryHashes.map(hash => String(hash).length).reduce((hash1Length, hash2Length) => hash1Length + hash2Length, 0);
    var gridSideLength = Math.sqrt(Math.ceil(Math.sqrt(gridSize)) ** 2);
    var oneDimensionalGrid = [];
    for (var [index, hash] of ternaryHashes.entries()) {
      oneDimensionalGrid.push(...[...$00dedbde5d77130bd380afb6541f8893$var$ternaryToEth(String(hash))]);
    }
    var annotatedOneDimensionalGrid = oneDimensionalGrid.map((letter, index, array) => {
      var lettersBefore = [array[index - 2], array[index - 1]].join("");
      var lettersAfter = [array[index + 1], array[index + 2]].join("");
      var inHorizontalEth = false;
      if (letter === "E" && lettersAfter === "TH" || letter === "T" && lettersBefore.endsWith("E") && lettersAfter.startsWith("H") || letter === "H" && lettersBefore === "ET") {
        inHorizontalEth = true;
      }
      return {
        inHorizontalEth,
        letter
      };
    });
    var grid = $6afc9e565c712c39cf8c426ad4b812a5$export$default(annotatedOneDimensionalGrid, gridSideLength);
    var annotatedGrid = grid.map((row, rowIndex, array) => {
      var rowsAbove = [array[rowIndex - 2], array[rowIndex - 1]];
      var rowsBelow = [array[rowIndex + 1], array[rowIndex + 2]];
      return row.map((_ref2, letterIndex, letterArray) => {
        var {inHorizontalEth, letter} = _ref2;
        var lettersAbove = rowsAbove.map(rowAbove => {
          var _rowAbove$letterIndex;
          return rowAbove === null || rowAbove === void 0 ? void 0 : (_rowAbove$letterIndex = rowAbove[letterIndex]) === null || _rowAbove$letterIndex === void 0 ? void 0 : _rowAbove$letterIndex.letter;
        }).join("");
        var lettersBelow = rowsBelow.map(rowBelow => {
          var _rowBelow$letterIndex;
          return rowBelow === null || rowBelow === void 0 ? void 0 : (_rowBelow$letterIndex = rowBelow[letterIndex]) === null || _rowBelow$letterIndex === void 0 ? void 0 : _rowBelow$letterIndex.letter;
        }).join("");
        var inVerticalEth = false;
        if (letter === "E" && lettersBelow === "TH" || letter === "T" && lettersAbove.endsWith("E") && lettersBelow.startsWith("H") || letter === "H" && lettersAbove === "ET") {
          inVerticalEth = true;
        }
        return {
          inHorizontalEth,
          inVerticalEth,
          letter
        };
      });
    });
    var letterSize = width / grid[0].length;
    // setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
    var setup = (p5, canvasParentRef) => {
      // Keep reference of canvas element for snapshots
      p5.createCanvas(width, height).parent(canvasParentRef);
      canvasRef.current = p5;
      attributesRef.current = () => ({
        // This is called when the final image is generated, when creator opens the Mint NFT modal.
        // should return an object structured following opensea/enjin metadata spec for attributes/properties
        // https://docs.opensea.io/docs/metadata-standards
        // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
        attributes: [{
          display_type: "number",
          trait_type: "your trait here number",
          value: hoistedValue.current
        }, {
          trait_type: "your trait here text",
          value: "replace me"
        }]
      });
      p5.frameRate(30);
    };
    var draw = p5 => {
      p5.background(background);
      p5.fill("black");
      // p5.noLoop();
      p5.noStroke();
      for (var [rowIndex, row] of annotatedGrid.entries()) {
        for (var [letterIndex, {inHorizontalEth, inVerticalEth, letter}] of row.entries()) {
          var x = letterIndex * letterSize;
          var y = rowIndex * letterSize;
          if (inHorizontalEth && inVerticalEth) {
            p5.fill(color4);
            p5.stroke(color4);
          } else if (inVerticalEth) {
            p5.fill(color3);
            p5.stroke(color3);
          } else if (inHorizontalEth) {
            p5.fill(color2);
            p5.stroke(color2);
          } else {
            p5.fill(color1);
            p5.stroke(color1);
          }
          // drawLetter(letter, x, y, letterSize, p5);
          p5.rect(x, y, letterSize, letterSize);
        }
      }
    };
    return (
      /*#__PURE__*/_react.createElement(_reactP, {
        setup: setup,
        draw: hidden ? () => {} : draw,
        windowResized: handleResize
      })
    );
  }
};
export default _default;
export var styleMetadata = {
  creator_name: "",
  description: "",
  image: "",
  name: "",
  options: {
    background: "black",
    color1: "white",
    color2: "red",
    color3: "#00ff00",
    color4: "blue",
    mod1: 0.01,
    mod2: 0.25
  }
};

//# sourceMappingURL=eth.js.map
