from rdkit import Chem
from rdkit.Chem import Draw
import sys
import os


with open("./public/result.txt", "r") as f:
    data = f.readline()
    print(data)
    m = Chem.MolFromSmiles(data) #get mol from smile
    Draw.MolToFile(m,"./public/newpng.png",size=(500, 500)) #draw molecular image
    print("smile2png success!")