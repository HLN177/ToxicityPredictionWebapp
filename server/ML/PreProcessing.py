# -*- coding: utf-8 -*-


import numpy as np
from rdkit import Chem

len_split = 0.9

# Clean file
fileobj = open("./data/train_Tox_data.smi", "r")
datas = fileobj.readlines()
fileobj.close()


for index in range(len(datas)):
    datas[index] = datas[index].replace("\n", "")
    datas[index] = datas[index].split("\t")

list_toxicity = []
list_non_toxicity = []

for data in datas:
    #get mol data
    mol=Chem.MolFromSmiles(data[0])
    if mol != None:
        features = Chem.RDKFingerprint(mol).ToBitString() #get features of mol
        
        buffer = []
        #get 256 feature points
        for index in range(0, 2048, 8):
            buffer.append(np.uint8(features[index:index+8]))
        
        if int(data[2]) == 0:
            list_non_toxicity.append(buffer)
        elif int(data[2]) == 1:
            list_toxicity.append(buffer)

# 90% of data would be saved as training set 
train = {
    "toxicity": np.asarray(list_toxicity[:int(len(list_toxicity)*0.9)]),
    "non_toxicity": np.asarray(list_non_toxicity[:int(len(list_non_toxicity)*0.9)])
    }

# 10% of data would be saved as test set
test = {
    "toxicity": np.asarray(list_toxicity[int(len(list_toxicity)*0.9):]),
    "non_toxicity": np.asarray(list_non_toxicity[int(len(list_non_toxicity)*0.9):])
    }

np.save("./data/dataset/dict_train.npy", train)
np.save("./data/dataset/dict_test.npy", test)



