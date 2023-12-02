// Define a Quadtree class
class Quadtree {
  constructor(bounds, capacity = 4) {
    this.bounds = bounds; // The boundary of the quadtree
    this.capacity = capacity; // Maximum number of objects in a node before splitting
    this.objects = []; // Array to hold objects (balls in this case)
    this.nodes = []; // Array to hold child nodes
  }

  // Clear the quadtree
  clear() {
    this.objects = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i]) {
        this.nodes[i].clear();
        this.nodes[i] = null;
      }
    }
    this.nodes = [];
  }

  // Split the quadtree into four child nodes
  split() {
    const subWidth = this.bounds.width / 2;
    const subHeight = this.bounds.height / 2;
    const x = this.bounds.x;
    const y = this.bounds.y;

    this.nodes[0] = new Quadtree({
      x: x + subWidth,
      y: y,
      width: subWidth,
      height: subHeight,
    });
    this.nodes[1] = new Quadtree({
      x: x,
      y: y,
      width: subWidth,
      height: subHeight,
    });
    this.nodes[2] = new Quadtree({
      x: x,
      y: y + subHeight,
      width: subWidth,
      height: subHeight,
    });
    this.nodes[3] = new Quadtree({
      x: x + subWidth,
      y: y + subHeight,
      width: subWidth,
      height: subHeight,
    });
  }

  // Determine which node the object belongs to
  getIndex(object) {
    const verticalMidpoint = this.bounds.x + this.bounds.width / 2;
    const horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

    const topQuadrant = object.y + object.r < horizontalMidpoint;
    const bottomQuadrant = object.y - object.r >= horizontalMidpoint;

    let index = -1;

    if (object.x + object.r < verticalMidpoint) {
      if (topQuadrant) {
        index = 1;
      } else if (bottomQuadrant) {
        index = 2;
      }
    } else if (object.x - object.r >= verticalMidpoint) {
      if (topQuadrant) {
        index = 0;
      } else if (bottomQuadrant) {
        index = 3;
      }
    }

    return index;
  }

  // Insert object into the quadtree
  insert(object) {
    if (this.nodes[0]) {
      const index = this.getIndex(object);
      if (index !== -1) {
        this.nodes[index].insert(object);
        return;
      }
    }

    this.objects.push(object);

    if (this.objects.length > this.capacity && this.nodes[0] === undefined) {
      this.split();
      let i = 0;
      while (i < this.objects.length) {
        const index = this.getIndex(this.objects[i]);
        if (index !== -1) {
          this.nodes[index].insert(this.objects.splice(i, 1)[0]);
        } else {
          i++;
        }
      }
    }
  }

  // Retrieve potential collisions for a given object
  retrieve(object) {
    const index = this.getIndex(object);
    const foundObjects = this.objects.slice();

    if (this.nodes[0]) {
      if (index !== -1) {
        foundObjects.push(...this.nodes[index].retrieve(object));
      } else {
        for (let i = 0; i < this.nodes.length; i++) {
          foundObjects.push(...this.nodes[i].retrieve(object));
        }
      }
    }

    return foundObjects;
  }
}
