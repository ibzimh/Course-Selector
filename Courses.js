class FluentCourses {
  // constructor(data: object[])
  constructor(data, done) {
    this.data = data;
    this.done = done;
  }

  filter(func) {
    return new FluentCourses(this.data.filter(func), this.done);
  }

  map(func) {
    return new FluentCourses(this.data.map(func));
  }

  // exists(prop: string): FluentBusinesses
  exists(prop) {
    return this.filter((obj) => prop in obj);
  }

  apply(f, cat) {
    return this.exists(cat).filter(f);
  }

  major(m) {
    return this.filter((obj) => obj.majornum === m);
  }

  req(requirment) {
    return this.apply((obj) => obj.req === requirment, "req");
  }

  something() {
    return this.filter((obj) =>
      obj.courses.filter((x) => x.charAt(x.length - 1) === "+")
    );
  }

  course(major, num) {
    let info = {
      major: major,
      courses: num,
    };
    return data.filter((obj) => obj.major === major && obj.courses.some((x) => x === num)).map((obj) => info)[0];
  }

  courseDone(major, num) {
    return new FluentCourses(this.data, this.done.concat([this.course(major, num)]));
  }

  getDone() {
    return this.done;
  }

  getLeft() {
    return this.filter((obj) => !obj.courses.some(c => this.checkDone(obj.major, c)));
  }

  checkDone(major, num) {
    return data.some((obj) => obj.major === major && obj.courses.some((x) => x === num));
  }
}

const data = require("./test2.json");
const done = require("./coursesdone.json");
const courses = new FluentCourses(data, done)
.major(1).getLeft()
.data;  

console.log(JSON.stringify(courses));

// savedonein("thing.json");

function savedonein(file) {
  let fs = require("fs");
  fs.writeFile(file, JSON.stringify(courses), function (err, result) {
    if (err) console.log("error", err);
  });
}
