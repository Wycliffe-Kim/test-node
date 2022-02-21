'use strict'

function doPromise() {
  return new Promise((resolve) => {
    resolve("test");
  });
}

const obj1 = {
  methods: {
    func: function() {
      doPromise().then(function(message) {
        this.message = message;
        console.log(this);
      })
    },
    func2: function() {
      this.message = "test";
      console.log(this);
    }
  }
}

const obj2 = {
  methods: {
    func: function()  {
      doPromise().then((message) => {
        this.message = message;
        console.log(this);
      });
    },
    func2: () => {
      this.message = "test";
      console.log(this);
    }
  }
}

obj1.methods.func();
obj2.methods.func();
// obj1.methods.func2();
// obj2.methods.func2();