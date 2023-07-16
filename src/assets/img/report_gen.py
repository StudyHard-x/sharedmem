import pandas as pd
import json
import matplotlib.pyplot as plt

def read_json(path):
    file = open(json_path, "r")
    res = json.loads(file.read())
    return pd.DataFrame(res)

json_path = r"D:\rentalcar\src\assets\img\saam.json"
print("Reading JSON file: " + json_path)
df = read_json(json_path)
print(df)

df.plot.bar(x='vehicleId', y='fee')
plt.savefig(r"D:\rentalcar\src\assets\img\Report.pdf", format="pdf")
