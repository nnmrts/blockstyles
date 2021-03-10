/* eslint no-undef: "off" */
import _chromaJs from "chroma-js";
import _propTypes from "prop-types";
import _reactP from "react-p5";
import _react, {Component} from "react";
var $6afc9e565c712c39cf8c426ad4b812a5$export$default = (array, chunkSize) => array.reduce((all, one, index) => {
  var ch = Math.floor(index / chunkSize);
  var newAll = [...all];
  newAll[ch] = [].concat(all[ch] || [], one);
  return newAll;
}, []);
var $3196575a9ceb865bbce8672422146e24$export$default = {
  block: _propTypes.shape({
    difficulty: _propTypes.number.isRequired,
    extraData: _propTypes.string.isRequired,
    gasLimit: _propTypes.shape({
      hex: _propTypes.string.isRequired,
      type: _propTypes.string.isRequired
    }).isRequired,
    gasUsed: _propTypes.shape({
      hex: _propTypes.string.isRequired,
      type: _propTypes.string.isRequired
    }).isRequired,
    hash: _propTypes.string.isRequired,
    miner: _propTypes.string.isRequired,
    nonce: _propTypes.string.isRequired,
    number: _propTypes.number.isRequired,
    parentHash: _propTypes.string.isRequired,
    timestamp: _propTypes.number.isRequired,
    transactions: _propTypes.arrayOf(_propTypes.shape({
      blockHash: _propTypes.string.isRequired,
      blockNumber: _propTypes.number.isRequired,
      chainId: _propTypes.number.isRequired,
      confirmations: _propTypes.number.isRequired,
      creates: null,
      data: _propTypes.string.isRequired,
      from: _propTypes.string.isRequired,
      gasLimit: _propTypes.shape({
        hex: _propTypes.string.isRequired,
        type: _propTypes.string.isRequired
      }).isRequired,
      gasPrice: _propTypes.shape({
        hex: _propTypes.string.isRequired,
        type: _propTypes.string.isRequired
      }).isRequired,
      hash: _propTypes.string.isRequired,
      nonce: _propTypes.number.isRequired,
      r: _propTypes.string.isRequired,
      s: _propTypes.string.isRequired,
      to: _propTypes.string.isRequired,
      transactionIndex: _propTypes.number.isRequired,
      v: _propTypes.number.isRequired,
      value: _propTypes.shape({
        hex: _propTypes.string.isRequired,
        type: _propTypes.string.isRequired
      }).isRequired
    })).isRequired
  }).isRequired
};
function $c14159e54347ea898666118d4ae3b73d$var$ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function $c14159e54347ea898666118d4ae3b73d$var$_objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      $c14159e54347ea898666118d4ae3b73d$var$ownKeys(Object(source), true).forEach(function (key) {
        $c14159e54347ea898666118d4ae3b73d$var$_defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      $c14159e54347ea898666118d4ae3b73d$var$ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function $c14159e54347ea898666118d4ae3b73d$var$_defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var $c14159e54347ea898666118d4ae3b73d$var$eightBitChannelSize = 256;
var $c14159e54347ea898666118d4ae3b73d$var$numberOfChannels = 3;
var $c14159e54347ea898666118d4ae3b73d$var$colorSpaceSize = $c14159e54347ea898666118d4ae3b73d$var$eightBitChannelSize ** $c14159e54347ea898666118d4ae3b73d$var$numberOfChannels - 1;
var $c14159e54347ea898666118d4ae3b73d$var$hexaDecimalSize = 16;
var $c14159e54347ea898666118d4ae3b73d$var$hexColorLength = 6;
var $c14159e54347ea898666118d4ae3b73d$var$wrapAround = (value, boundary) => (value % boundary + boundary) % boundary;
var $c14159e54347ea898666118d4ae3b73d$var$moveForward = (_ref, orientation, width, height) => {
  var [x, y] = _ref;
  switch (orientation) {
    case "up":
      return [x, $c14159e54347ea898666118d4ae3b73d$var$wrapAround(y - 1, height)];
    case "right":
      return [$c14159e54347ea898666118d4ae3b73d$var$wrapAround(x + 1, width), y];
    case "down":
      return [x, $c14159e54347ea898666118d4ae3b73d$var$wrapAround(y + 1, height)];
    case "left":
      return [$c14159e54347ea898666118d4ae3b73d$var$wrapAround(x - 1, width), y];
  }
};
var $c14159e54347ea898666118d4ae3b73d$var$colorCell = (x, y, size, color, p5) => {
  p5.fill(color);
  p5.square(x * size, y * size, size);
};
var $c14159e54347ea898666118d4ae3b73d$var$turn = (direction, orientation) => {
  switch (direction) {
    case "right":
      switch (orientation) {
        case "up":
          return "right";
        case "right":
          return "down";
        case "down":
          return "left";
        case "left":
          return "up";
      }
      break;
    case "left":
      switch (orientation) {
        case "up":
          return "left";
        case "right":
          return "up";
        case "down":
          return "right";
        case "left":
          return "down";
      }
      // no default
      break;
  }
};
/**
*
*/
var $c14159e54347ea898666118d4ae3b73d$export$default = class {
  /**
  * @param grid
  * @param position
  * @param position.0
  * @param position.1
  * @param seed
  * @param cellSize
  * @param color
  * @param scale
  * @example
  */
  constructor(grid, _ref2, seed, cellSize, color) {
    var [x, y] = _ref2;
    var scale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    this.grid = grid;
    this.position = [x, y];
    var colorScale = Array.isArray(color) ? _chromaJs.scale(color) : _chromaJs.scale(["white", color, "black"]);
    this.states = seed.split("").map((letter, index) => {
      var cellColor = color;
      if (cellColor && scale) {
        cellColor = colorScale(index / (seed.length - 1)).hex();
      } else if (!cellColor) {
        cellColor = ("#").concat(Math.round($c14159e54347ea898666118d4ae3b73d$var$colorSpaceSize - $c14159e54347ea898666118d4ae3b73d$var$colorSpaceSize * index / (seed.length - 1)).toString($c14159e54347ea898666118d4ae3b73d$var$hexaDecimalSize).slice(0, $c14159e54347ea898666118d4ae3b73d$var$hexColorLength).padEnd($c14159e54347ea898666118d4ae3b73d$var$hexColorLength, "0"));
      }
      return {
        color: cellColor,
        direction: letter === "R" ? "right" : "left",
        index
      };
    });
    var {states: [firstState]} = this;
    if (grid.get([0, 0]) === 0) {
      grid.setAll(firstState);
    }
    this.cellSize = cellSize;
    this.orientation = "up";
  }
  /**
  * @param p5
  * @example
  */
  step(p5) {
    var {cellSize, orientation, position, position: [x, y], states, grid, grid: {width, height}} = this;
    var state = grid.get([x, y]);
    var {direction, index} = state;
    this.orientation = $c14159e54347ea898666118d4ae3b73d$var$turn(direction, orientation);
    var newState = $c14159e54347ea898666118d4ae3b73d$var$_objectSpread({}, states[$c14159e54347ea898666118d4ae3b73d$var$wrapAround(index + 1, states.length)]);
    grid.set([x, y], $c14159e54347ea898666118d4ae3b73d$var$_objectSpread({}, newState));
    var {color: newColor} = newState;
    $c14159e54347ea898666118d4ae3b73d$var$colorCell(x, y, cellSize, newColor, p5);
    this.position = $c14159e54347ea898666118d4ae3b73d$var$moveForward(position, this.orientation, width, height);
  }
};
var $7991449fd760632383dba4b45cccaa6b$export$default = class {
  get(_ref) {
    var [x, y] = _ref;
    return this.rows[x][y];
  }
  set(_ref2, value) {
    var [x, y] = _ref2;
    this.rows[x][y] = value;
  }
  setAll(value) {
    var {rows} = this;
    this.rows = rows.map(row => {
      return row.map(cell => {
        return value;
      });
    });
  }
  constructor(width) {
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width;
    var initialValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    this.rows = Array(height).fill().map(() => Array(width).fill().map(() => initialValue));
    this.width = width;
    this.height = height;
  }
};
var $164f0489a3651b1b53a2ecb8027f4e0b$var$_class, $164f0489a3651b1b53a2ecb8027f4e0b$var$_temp;
function $164f0489a3651b1b53a2ecb8027f4e0b$var$_defineProperty(obj, key, value) {
  if ((key in obj)) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
// console.log(grid);
var $164f0489a3651b1b53a2ecb8027f4e0b$var$currentHash = "";
var $164f0489a3651b1b53a2ecb8027f4e0b$var$ants = [];
var $164f0489a3651b1b53a2ecb8027f4e0b$var$calledStep = 0;
var $164f0489a3651b1b53a2ecb8027f4e0b$var$calledDraw = 0;
var $164f0489a3651b1b53a2ecb8027f4e0b$var$hexPrefix = "0x";
var $164f0489a3651b1b53a2ecb8027f4e0b$var$hexColorLength = 6;
var $164f0489a3651b1b53a2ecb8027f4e0b$var$numberOfColors = 3;
var $164f0489a3651b1b53a2ecb8027f4e0b$var$stepsPerBlock = 10000;
var $164f0489a3651b1b53a2ecb8027f4e0b$var$stepsPerLoop = 10000;
var $164f0489a3651b1b53a2ecb8027f4e0b$var$extraStepsPerTransaction = 10000;
var $164f0489a3651b1b53a2ecb8027f4e0b$var$frameRate = 60;
/**
*
*/
var _default = ($164f0489a3651b1b53a2ecb8027f4e0b$var$_temp = $164f0489a3651b1b53a2ecb8027f4e0b$var$_class = class Langton extends Component {
  /**
  * @example
  */
  render() {
    var {props: {block: {number, transactions, hash}, canvasRef, attributesRef, width, height, hidden, handleResize}} = this;
    var gridSize = 250;
    var grid = new $7991449fd760632383dba4b45cccaa6b$export$default(gridSize);
    var cellSize = width / gridSize;
    // setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
    var setup = (p5, canvasParentRef) => {
      // Keep reference of canvas element for snapshots
      p5.createCanvas(width, height).parent(canvasParentRef);
      canvasRef.current = p5;
      attributesRef.current = () => ({
        attributes: [{
          display_type: "number",
          trait_type: "your trait here number",
          value: hoistedValue.current
        }, {
          trait_type: "your trait here text",
          value: "replace me"
        }]
      });
      p5.background("white");
      p5.noStroke();
      p5.frameRate($164f0489a3651b1b53a2ecb8027f4e0b$var$frameRate);
    };
    var draw = p5 => {
      if (hash !== $164f0489a3651b1b53a2ecb8027f4e0b$var$currentHash) {
        p5.background("white");
        $164f0489a3651b1b53a2ecb8027f4e0b$var$ants = [];
        grid = new $7991449fd760632383dba4b45cccaa6b$export$default(gridSize);
        $164f0489a3651b1b53a2ecb8027f4e0b$var$calledStep = 0;
        $164f0489a3651b1b53a2ecb8027f4e0b$var$calledDraw = 0;
        $164f0489a3651b1b53a2ecb8027f4e0b$var$currentHash = hash;
        var seeds = [number].map(value => BigInt(value).toString(2).replaceAll("0", "R").replaceAll("1", "L"));
        for (var [index, seed] of seeds.entries()) {
          var x = gridSize / seeds.length * index + gridSize / seeds.length / 2;
          var y = gridSize / 2;
          var colors = $6afc9e565c712c39cf8c426ad4b812a5$export$default(hash.split("").slice($164f0489a3651b1b53a2ecb8027f4e0b$var$hexPrefix.length), $164f0489a3651b1b53a2ecb8027f4e0b$var$hexColorLength).slice(0, $164f0489a3651b1b53a2ecb8027f4e0b$var$numberOfColors).map(characters => characters.join(""));
          $164f0489a3651b1b53a2ecb8027f4e0b$var$ants.push(new $c14159e54347ea898666118d4ae3b73d$export$default(grid, [x, y].map(Math.round), seed, cellSize, colors, true));
        }
      }
      var maxNumberOfSteps = transactions.length * $164f0489a3651b1b53a2ecb8027f4e0b$var$extraStepsPerTransaction + $164f0489a3651b1b53a2ecb8027f4e0b$var$stepsPerBlock;
      for (var _index = 0; _index < Math.min($164f0489a3651b1b53a2ecb8027f4e0b$var$calledDraw, $164f0489a3651b1b53a2ecb8027f4e0b$var$stepsPerLoop); _index++) {
        for (var ant of $164f0489a3651b1b53a2ecb8027f4e0b$var$ants) {
          if ($164f0489a3651b1b53a2ecb8027f4e0b$var$calledStep <= maxNumberOfSteps) {
            ant.step(p5);
            $164f0489a3651b1b53a2ecb8027f4e0b$var$calledStep += 1;
          }
        }
      }
      $164f0489a3651b1b53a2ecb8027f4e0b$var$calledDraw += 1;
    };
    return (
      /*#__PURE__*/_react.createElement(_reactP, {
        setup: setup,
        draw: hidden ? () => {} : draw,
        windowResized: handleResize
      })
    );
  }
}, $164f0489a3651b1b53a2ecb8027f4e0b$var$_defineProperty($164f0489a3651b1b53a2ecb8027f4e0b$var$_class, "propTypes", $3196575a9ceb865bbce8672422146e24$export$default), $164f0489a3651b1b53a2ecb8027f4e0b$var$_temp);
export default _default;
export var styleMetadata = {
  creator_name: "",
  description: "",
  image: "",
  name: "",
  options: {}
};

//# sourceMappingURL=langton.js.map
