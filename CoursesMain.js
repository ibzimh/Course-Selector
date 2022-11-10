// Important type signatures: 

// doneCourseObject: {
//   field: string,
//   number: string,
//   credits: number
// }

// courseObject: {
//   field: string,
//   number: string,
//   plus: boolean
// }

// requirmentsObject: {
//   major_num: number,
//   requirments: string,
//   credits: number,
//   courses: [
//       {
//           field: string,
//           number: string,
//           plus: boolean
//       }
//   ]
// }

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
    return this.filter(obj => prop in obj);
  }

  // filter<T>(func: T => boolean, prop: string): FluentCourses
  // exists + filter
  apply(f, prop) {
    return this.exists(prop).filter(f);
  }

  // filter(num: number): FluentCourses
  // all requirments of the major 
  major(num) {
    return this.filter(obj => obj["major_num"] === num);
  }

  // filter(num: number): FluentCourses
  // all requirments of the major 
  notMajor(num) {
    return this.filter(obj => obj["major_num"] !== num);
  }

  // req(requirment: string): FluentCourses
  // all courses with this requirment 
  req(requirment) {
    return this.apply(obj => obj.requirments === requirment, "requirments");
  }

  // course(field: string, num: string) => doneCourseObject
  course(field, num) {
    return {
      field: field,
      number: num
    }
  }

  // coursDone(field: string, num: string) => FluentCourses
  courseDone(field, num) {
    return new FluentCourses(this.data, this.done.concat([this.course(field, num)]));
  }

  // getDone() => doneCourseObject[]
  getDone() {
    return this.done;
  }

  // doneRequirment(field: string, number: number, obj: requirmentsObject) => boolean
  doneRequirment(field, number, obj) {
    return obj["courses"].some(course => course["field"] === field && course["number"] === number);
  }

  // getLeftRequirments(): FluentCourses
  getLeftRequirments() {
    return this.filter(obj => !this.done.some(done => this.doneRequirment(done.field, done.number, obj)) )
  }

  // flattenData(): FluentCourses
  flattenData() {
    let arr = []
    this.data.map(obj => arr = arr.concat(obj["courses"]));
    return new FluentCourses(arr, done);
  }

  // printData(): void
  printData() {
    this.data.forEach(x => console.log(x.field + " " + x.number));
  }
}

// Example Run: 

const data = require("./test2.json");
const done = require("./coursesdone.json");
const course = new FluentCourses(data, done)
.getLeftRequirments()
.filter(obj => obj.courses.some(x => x["field"] === "Math" || x["field"] === "CS"))
.flattenData().printData();

// Saving Done Courses:

// savedonein("coursesdone.json");
function savedonein(file) {
  let fs = require("fs");
  fs.writeFile(file, JSON.stringify(courses), function (err, result) {
    if (err) console.log("error", err);
  });
}
