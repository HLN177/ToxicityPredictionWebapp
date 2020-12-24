# -*- coding: utf-8 -*-


import sys
import numpy as np
from rdkit import Chem
from scipy import stats

import time

#distance
def Manhattan(p1, p2):
    return np.sum(np.abs(p1 - p2))

def calculate(molecular: str, k: int):
    #get mol data
    mol=Chem.MolFromSmiles(molecular) # NOTE:
    if mol != None:
        dataset = np.load("./ML/data/dataset/dict_train.npy", allow_pickle=True).item()
        features = Chem.RDKFingerprint(mol).ToBitString() #get features of mol
        
        data = []
        #get 256 feature points
        for index in range(0, 2048, 8):
            data.append(np.uint8(features[index:index+8]))
            
        distance = []
        for key, values in dataset.items():                            
            for value in values:         
                distance.append([Manhattan(np.asarray(data).astype(int), value), key]) #distance calculation
                
        list.sort(distance) #sort order           
        return str(stats.mode(distance[:int(k)])[0][0][1]) #get mode
    else:
        return "Wrong molecular"
        

if __name__ == "__main__":
    start = time.time()
    user_input = sys.argv #set parameter for calling
    print(user_input)
    molecular = user_input[1]
    k =  user_input[2]
    key = calculate(molecular, k)
    print("{}, {}".format(key, round(time.time() - start, 3)))
    file_obj = open("./knnResult.txt","w") #save data into txt
    file_obj.write(str(key)+"\n"+str(round(time.time() - start, 3))) 
    file_obj.close()