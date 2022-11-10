import json

def reduce(arr, func, init):
  acc = init
  for elem in arr:
    acc = func(acc, elem)
  return acc

def reduceind(arr, func, init):
  acc = init
  for ind, elem in enumerate(arr):
    acc = func(acc, elem, ind)
  return acc
  
def map(arr, func):
  ret = []
  for elem in arr:
    ret.append(func(elem))
  return ret

def mapind(arr, func):
  ret = []
  for ind, elem in enumerate(arr):
    ret.append(func(elem, ind))
  return ret

def filter(arr, func):
  ret = []
  for elem in arr:
    if func(elem):
      ret.append(elem)
  return ret

def every(arr, func):
  for elem in arr:
    if not func(elem):
      return False
  return True

def some(arr, func):
  for elem in arr:
    if func(elem):
      return True
  return False

def forEach(arr, func):
  for elem in arr:
    func(elem)

# the file to be converted
filename = 'C:/Users/ibzim/OneDrive - University of Massachusetts/Computer Science/Python/Courses Project/Courses List.txt'

# fields in the sample file
fields = ['req', 'major', 'courses']

majors = [[], [], [], []]

with open(filename, 'r') as f:
  lines = f.readlines()
  m=-1
  for i in lines:
    if (i[len(i)-6:len(i)-1:1] == "Major"):
      m+=1
    else :
      majors[m].append(i)

majors = map(majors, lambda m: filter(map(m, lambda str: str.split()), lambda arr: len(arr) > 0 ) )
dict = []
c = -1

for maj in majors:
  c += 1
  for req in maj:
    majorobj = {
      "majornum": c,
      "req": req[1], 
      "major": req[2],
      "credits": req[0],
      "courses": filter(req[3:], lambda x: not x.__eq__("or"))
    }
    dict.append(majorobj)

out_file = open("test2.json", "w")
json.dump(dict, out_file, indent = 4)
out_file.close()