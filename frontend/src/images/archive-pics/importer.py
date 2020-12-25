import os

ext = ["jpeg", "png", "jpg"]

files = os.listdir()
for f in files:
    if f[-3:] in ext or f[-4:] in ext:
        path = "../images/archive-pics/" + f
        hypen = f.find("-")
        varName = f[:hypen] + "Logo"
        print("import " + varName + " from \"" + path + "\";")
