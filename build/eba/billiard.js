/* eslint no-undef: "off" */
import _reactP from "react-p5";
import _react, {Component} from "react";
var $6afc9e565c712c39cf8c426ad4b812a5$export$default = (array, chunkSize) => array.reduce((all, one, index) => {
  var ch = Math.floor(index / chunkSize);
  var newAll = [...all];
  newAll[ch] = [].concat(all[ch] || [], one);
  return newAll;
}, []);
var $f51af341330cb7fa84545d2bcb032707$var$counterclockwise = (_ref, _ref2, _ref3) => {
  var {x: x1, y: y1} = _ref;
  var {x: x2, y: y2} = _ref2;
  var {x: x3, y: y3} = _ref3;
  return (y3 - y1) * (x2 - x1) > (y2 - y1) * (x3 - x1);
};
/**
* @private
*/
var $f51af341330cb7fa84545d2bcb032707$export$default = class extends Array {
  /**
  * @param start
  * @param end
  * @example
  */
  constructor(start, end) {
    super(start, end);
    Object.seal(this);
  }
  /**
  * @param edge
  * @param edge.0
  * @param edge.1
  * @example
  */
  intersects(_ref4) {
    var [withStart, withEnd] = _ref4;
    var [start, end] = this;
    return $f51af341330cb7fa84545d2bcb032707$var$counterclockwise(start, withStart, withEnd) !== $f51af341330cb7fa84545d2bcb032707$var$counterclockwise(end, withStart, withEnd) && $f51af341330cb7fa84545d2bcb032707$var$counterclockwise(start, end, withStart) !== $f51af341330cb7fa84545d2bcb032707$var$counterclockwise(start, end, withEnd);
  }
};
/**
* @private
*/
var $d95183f50704ece79d603511283cbe3b$export$default = class {
  /**
  * @param x - X.
  * @param y - Y.
  * @example
  */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
  * @param edges
  * @example
  */
  inside(edges) {
    var {x} = this;
    var ray = new $f51af341330cb7fa84545d2bcb032707$export$default(this, new $d95183f50704ece79d603511283cbe3b$export$default(x, 10000));
    var intersections = edges.map(edge => ray.intersects(edge)).filter(boolean => boolean);
    return intersections.length % 2 !== 0;
  }
};
/**
* Ball class.
* @private
*/
var $2a4f73ea41166c75519b6bc2e934ccef$export$default = class {
  /**
  * Ball constructor.
  *
  * @param {Function} p5  - P5.
  * @param {object} position - Position.
  * @param {number} position.x - X.
  * @param {number} position.y - Y.
  * @param {number} size - Size.
  * @example
  * const ball = new Ball(p5, {
  * 	x: 0,
  * 	y: 0
  * }, 10);
  */
  constructor(p5, _ref, size) {
    var {x, y} = _ref;
    this.p5 = p5;
    this.size = size;
    this.radius = size / 2;
    this.position = p5.createVector(x, y);
    this.velocity = p5.createVector(0.1, 0.2);
  }
  /**
  * @private
  */
  update() {
    var {velocity, position, p5, size} = this;
    var {x, y} = position.add(velocity);
    this.position = p5.createVector(x, y);
    var {position: {x: newX, y: newY}} = this;
  }
  /**
  * @param base
  * @param vec
  * @param myColor
  * @example
  */
  drawArrow(base, vec, myColor) {
    var {p5} = this;
    p5.push();
    p5.stroke(myColor);
    p5.strokeWeight(3);
    p5.fill(myColor);
    p5.translate(base.x, base.y);
    p5.line(0, 0, vec.x, vec.y);
    p5.rotate(vec.heading());
    var arrowSize = 7;
    p5.translate(vec.mag() - arrowSize, 0);
    p5.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    p5.pop();
  }
  /**
  * @param to
  * @example
  */
  dist(to) {
    var {position, p5} = this;
    if (to instanceof $f51af341330cb7fa84545d2bcb032707$export$default) {
      var [{x: startX, y: startY}, {x: endX, y: endY}] = to;
      var startVector = p5.createVector(startX, startY);
      var endVector = p5.createVector(endX, endY);
      var edgeVector = endVector.sub(startVector);
      var distanceVector = position.copy().sub(startVector);
      var edgeLength = edgeVector.mag();
      var scalar = p5.constrain(distanceVector.dot(edgeVector.normalize()), 0, edgeLength);
      var orthogonalPointOnEdge = startVector.add(edgeVector.mult(scalar));
      var distance = position.dist(orthogonalPointOnEdge);
      return distance;
    }
  }
  /**
  * @param edges
  * @example
  */
  collide(edges) {
    var {position: {x, y}, radius, p5} = this;
    var distancesToEdges = edges.map(edge => this.dist(edge));
    // console.log(distancesToEdges.map(Math.round));
    for (var [index, distance] of distancesToEdges.entries()) {
      var center = new $d95183f50704ece79d603511283cbe3b$export$default(x, y);
      var inside = center.inside(edges);
      // console.log([inside,Math.round(distance),radius*20])
      if (distance <= radius) {
        var [{x: startX, y: startY}, {x: endX, y: endY}] = edges[index];
        var startVector = p5.createVector(startX, startY);
        var endVector = p5.createVector(endX, endY);
        var edgeVector = startVector.copy().sub(endVector);
        var normal = edgeVector.copy().rotate(-p5.HALF_PI);
        this.velocity = this.velocity.copy().reflect(normal);
        break;
      }
    }
  }
  /**
  * @private
  */
  show() {
    var {p5, position, position: {x, y}, size, velocity} = this;
    p5.fill(255, 0, 0);
    p5.noStroke();
    p5.circle(x, y, size);
  }
};
var $ac1b737d704ea3b6fa6b72285af9c5ce$var$currentHash = "";
/**
*
*/
var _default = class extends Component {
  /**
  * @example
  */
  render() {
    var {props: {block, block: {hash, transactions}, canvasRef, attributesRef, width, height, color1, color2, color3, color4, background, hidden, handleResize}} = this;
    console.log(hash);
    var slicedHash = hash.slice(2);
    var chunkSize = 4;
    var parts = $6afc9e565c712c39cf8c426ad4b812a5$export$default(slicedHash.split(""), chunkSize * 2).map(digits => $6afc9e565c712c39cf8c426ad4b812a5$export$default(digits, chunkSize).map(innerDigits => innerDigits.join("")));
    console.log(parts);
    var hexadecimal = 16;
    var maximum = hexadecimal ** chunkSize - 1;
    var points = parts.map(_ref => {
      var [x, y] = _ref;
      return new $d95183f50704ece79d603511283cbe3b$export$default(...[hexadecimal ** -chunkSize * width * Number(("0x").concat(x)), hexadecimal ** -chunkSize * height * Number(("0x").concat(y))].map(Math.round));
    });
    var centroid = new $d95183f50704ece79d603511283cbe3b$export$default(0, 0);
    for (var {x, y} of points) {
      centroid.x += x;
      centroid.y += y;
    }
    centroid.x /= points.length;
    centroid.y /= points.length;
    console.log(centroid);
    var {x: centroidX, y: centroidY} = centroid;
    var vertices = [...points].sort((_ref2, _ref3) => {
      var {x: aX, y: aY} = _ref2;
      var {x: bX, y: bY} = _ref3;
      var angleA = Math.atan2(aY - centroidY, aX - centroidX);
      var angleB = Math.atan2(bY - centroidY, bX - centroidX);
      return angleA - angleB;
    });
    console.log(vertices);
    var edges = vertices.map((_ref4, index, array) => {
      var {x, y} = _ref4;
      var {x: nextX, y: nextY} = array[index + 1] || array[0];
      return new $f51af341330cb7fa84545d2bcb032707$export$default(new $d95183f50704ece79d603511283cbe3b$export$default(x, y), new $d95183f50704ece79d603511283cbe3b$export$default(nextX, nextY));
    });
    console.log(edges);
    var canvasEdges = [new $d95183f50704ece79d603511283cbe3b$export$default(0, 0), new $d95183f50704ece79d603511283cbe3b$export$default(0, width), new $d95183f50704ece79d603511283cbe3b$export$default(height, width), new $d95183f50704ece79d603511283cbe3b$export$default(height, 0)].map((_ref5, index, array) => {
      var {x, y} = _ref5;
      var {x: nextX, y: nextY} = array[index + 1] || array[0];
      return new $f51af341330cb7fa84545d2bcb032707$export$default(new $d95183f50704ece79d603511283cbe3b$export$default(x, y), new $d95183f50704ece79d603511283cbe3b$export$default(nextX, nextY));
    });
    var ball;
    // setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
    var setup = function setup(p5, canvasParentRef) {
      var fresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      // Keep reference of canvas element for snapshots
      if (fresh) {
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
        p5.frameRate(60);
      }
      p5.background("white");
      ball = new $2a4f73ea41166c75519b6bc2e934ccef$export$default(p5, {
        x: 400,
        y: 400
      }, 10);
    };
    var draw = p5 => {
      if (hash !== $ac1b737d704ea3b6fa6b72285af9c5ce$var$currentHash) {
        $ac1b737d704ea3b6fa6b72285af9c5ce$var$currentHash = hash;
        setup(p5, null, false);
      }
      p5.fill(255, 12);
      p5.noStroke();
      p5.rect(0, 0, width, height);
      // p5.background(background);
      p5.noFill();
      p5.stroke(color1);
      p5.strokeWeight(4);
      // p5.noLoop();
      // p5.noStroke();
      var center = [width / 2, height / 2];
      p5.beginShape();
      for (var {x: _x, y: _y} of vertices) {
        p5.vertex(_x, _y);
      }
      p5.endShape(p5.CLOSE);
      if (ball) {
        for (var index = 0; index < 1000; index++) {
          ball.collide(edges);
          ball.collide(canvasEdges);
          ball.update();
          ball.show();
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
    background: "white",
    color1: "red",
    color2: "red",
    color3: "#00ff00",
    color4: "blue",
    mod1: 0.01,
    mod2: 0.25
  }
};

//# sourceMappingURL=billiard.js.map
