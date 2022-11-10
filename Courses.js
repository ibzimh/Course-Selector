class FluentCourses {
  // constructor(data: object[])
  constructor(data, done) {
    this.data = data; // list of course requirments 
    this.done = done; // list of courses completed 
  }

  // filter<T>(func: T => boolean): FluentCourses
  filter(func) {
    return new FluentCourses(this.data.filter(func), this.done);
  }

  // map<W, T>(func: W => T): FluentCourses
  map(func) {
    return new FluentCourses(this.data.map(func));
  }

  // exists(prop: string): FluentCourses
  // class with data where the property exists in each object
  exists(prop) {
    return this.filter((obj) => prop in obj);
  }

  // filter<T>(func: T => boolean, prop: string): FluentCourses
  // exists + filter
  apply(f, prop) {
    return this.exists(prop).filter(f);
  }

  // filter(num: number): FluentCourses
  // all requirments of the major 
  major(bun) {
    return this.filter((obj) => obj["major_num"] === num);
  }

  // req(requirment: string): FluentCourses
  // all courses with this requirment 
  req(requirment) {
    return this.apply((obj) => obj.requirments === requirment, "requirments");
  }

  // something() {
  //   return this.filter((obj) =>
  //     obj.courses.filter((x) => x.charAt(x.length - 1) === "+")
  //   );
  // }

  course(major, num) {
    let course = {
      field: major,
      number: num,
    };
    return data.filter((obj) => obj.major === major && obj.courses.some((x) => x === num)).map((obj) => info)[0];
  }

  courseDone(major, num) {
    return new FluentCourses(this.data, this.done.concat([this.course(major, num)]));
  }

  // getDone() {
  //   return this.done;
  // }

  // getLeft() {
  //   return this.filter((obj) => !obj.courses.some(c => this.checkDone(obj.major, c)));
  // }

  // checkDone(major, num) {
  //   return data.some((obj) => obj.major === major && obj.courses.some((x) => x === num));
  // }
}

const data = require("./test2.json");
const done = require("./coursesdone.json");
const courses = new FluentCourses(data, done)
.major(1)//.getLeft()
// .data;  

// console.log(JSON.stringify(courses));

// savedonein("thing.json");
function savedonein(file) {
  let fs = require("fs");
  fs.writeFile(file, JSON.stringify(courses), function (err, result) {
    if (err) console.log("error", err);
  });
}
