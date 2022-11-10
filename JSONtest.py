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
fields = ['requirment', 'major', 'courses'] 

majorsList = [[], [], [], []] 

with open(filename, 'r') as f:
  lines = f.readlines() # all the lines of the file 
  majorIndex = -1 # count for the number (index) of majors 
  for line in lines: 
    if ( line[len(line)-6:len(line)-1:1] == "Major"): # The chars from length - 6 to length - 1 (exclusive), i.e. last word 
      majorIndex += 1 
    else :
      majorsList[majorIndex].append(line)

# putting each entry as an array element (excluding unnecesasary chars)
majorsList = map(majorsList, lambda m: filter( map(m, lambda str: str.split()), lambda arr: len(arr) > 0 ) )
dict = [] 
c = -1

for major in majorsList:
  c += 1
  for req in major:
    def course_object():
      # removes the word "or", and the non-course entries
      nums = filter(req[3:], lambda x: not x.__eq__("or"))

      # removes any commas
      nums = map(nums, lambda x: x.replace(',', ''))

      # makes the courses object
      nums = map(nums, lambda x: 
        {"field": req[2], "number":x, "plus": False}
      )

      # deals with edge cases 
      nums = map(nums, lambda x: edge_cases(x))

      return nums

    def edge_cases(course): 
      f = course['field']
      n = course['number']
      p = course['plus']
      
      # if the last char is a "+"
      if ( n[len(n)-1] == "+" ):
        n = n[:len(n) - 1]
        p = True

      if ( n[0] == "S" ):
        n = n[1:] # remove the 'S'
        f = "Stats" # change the field to stats

      if ( n == "CS" ):
        f = "CS"
        n = "400" 
        p = True

      return {"field": f, "number":n, "plus": p}

    # making the object to put into the dictionary
    majorobj = {
      "major_num": c,
      "requirments": req[1], 
      "credits": int(req[0]),
      "courses": course_object()
    }
    dict.append(majorobj)

out_file = open("test2.json", "w")
json.dump(dict, out_file, indent = 4)
out_file.close()