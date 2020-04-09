(() => {
  // Globals
  const SPRITE_SIZE = 26;
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  class Animation {
    constructor(frame_set, delay) {
      this.count = 0;
      this.delay = delay;
      this.frame = 0;
      this.frame_index = 0;
      this.frame_set = frame_set;
    }
    change(frame_set, delay = 15) {
      if (this.frame_set != frame_set) {
        this.count = 0;
        this.delay = delay;
        this.frame_index = 0;
        this.frame_set = frame_set;
        this.frame = this.frame_set[this.frame_index];
      }
    }
    update() {
      this.count++;
      if (this.count >= this.delay) {
        this.count = 0;
        this.frame_index =
          this.frame_index == this.frame_set.length - 1
            ? 0
            : this.frame_index + 1;
        this.frame = this.frame_set[this.frame_index];
      }
    }
  }
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');
  let mage = {
    animation: new Animation(),
    height: 26,
    width: 26,
    x: 0,
    y: 13,
  };
  let fireball = {
    animation: new Animation(),
    height: 26,
    width: 26,
    x: SPRITE_SIZE,
    y: mage.y,
    x_velocity: 4,
  };
  let fireblast = {
    animation: new Animation(),
    height: 26,
    width: 26,
    x: SPRITE_SIZE,
    y: mage.y,
  };
  const mage_sprite_sheet = {
    frame_sets: [[0], [1, 2], [3]],
    image: new Image(),
  };
  //   const fireball_sprite_sheet = {
  //     frame_sets: [[0]],
  //     image: new Image(),
  //   };
  const fireblast_sprite_sheet = {
    frame_sets: [[0, 2, 3]],
    image: new Image(),
  };
  const controller = {
    down: { active: false },
    up: { active: false },

    keyDownUp: function (event) {
      controller.down.active =
        event.type == 'keydown' && event.keyCode == 81 ? true : false;
      controller.up.active =
        event.type == 'keyup' && event.keyCode == 81 ? true : false;
    },
  };
  // let fireball_cast = false;
  let fireblast_cast = false;
  const loop = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // idle
    if (!controller.down.active && !controller.up.active) {
      mage.animation.change(mage_sprite_sheet.frame_sets[0]);
    }
    // charge spell
    if (controller.down.active && !controller.up.active) {
      mage.animation.change(mage_sprite_sheet.frame_sets[1], 20);
    }
    // cast then sleep for .5sec and idle + FIREBLAST !
    if (!controller.down.active && controller.up.active) {
      mage.animation.change(mage_sprite_sheet.frame_sets[2]);
      // fireball.animation.change(fireball_sprite_sheet.frame_sets[0]);
      fireblast.animation.change(fireblast_sprite_sheet.frame_sets[0], 20);
      // fireball_cast = true;
      fireblast_cast = true;
      (async () => {
        await sleep(500);
        controller.up.active = false;
      })();
    }
    mage.animation.update();
    if (fireblast_cast) {
      // fireball.x += fireball.x_velocity;
      // if (fireball.x > canvas.width * 0.5) {
      //   fireball_cast = false;
      //   fireball.x = SPRITE_SIZE;
      // }
      // fireball.animation.update();
      // render_fireball();
      fireblast.animation.update();
      render_fireblast();
      (async () => {
        await sleep(900);
        fireblast_cast = false;
      })();
    }
    render();
    window.requestAnimationFrame(loop);
  };
  const render = function () {
    context.drawImage(
      mage_sprite_sheet.image,
      mage.animation.frame * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE,
      Math.floor(mage.x),
      Math.floor(mage.y),
      SPRITE_SIZE,
      SPRITE_SIZE
    );
  };
  //   const render_fireball = function () {
  //     context.drawImage(
  //       fireball_sprite_sheet.image,
  //       fireball.animation.frame * SPRITE_SIZE,
  //       0,
  //       SPRITE_SIZE,
  //       SPRITE_SIZE,
  //       Math.floor(fireball.x),
  //       Math.floor(fireball.y),
  //       SPRITE_SIZE,
  //       SPRITE_SIZE
  //     );
  //   };
  const render_fireblast = function () {
    context.drawImage(
      fireblast_sprite_sheet.image,
      fireblast.animation.frame * SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE,
      Math.floor(fireball.x),
      Math.floor(fireball.y),
      SPRITE_SIZE,
      SPRITE_SIZE
    );
  };
  const resize = function () {
    canvas.width = document.documentElement.clientWidth * 0.6;
    if (canvas.width > document.documentElement.clientHeight) {
      canvas.width = document.documentElement.clientHeight;
    }
    canvas.height = SPRITE_SIZE * 2;
    context.imageSmoothingEnabled = false;
  };
  // INITIALIZATION
  window.addEventListener('resize', resize);
  window.addEventListener('keydown', controller.keyDownUp);
  window.addEventListener('keyup', controller.keyDownUp);
  resize();
  mage_sprite_sheet.image.addEventListener('load', function (event) {
    window.requestAnimationFrame(loop);
  });
  mage_sprite_sheet.image.src = './src/images/mage.png';
  //   fireball_sprite_sheet.image.src = './src/images/fireball.png';
  fireblast_sprite_sheet.image.src = './src/images/fireblast.png';
})();
