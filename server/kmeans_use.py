# -*- coding: utf-8 -*-


import sys
import numpy as np
from rdkit import Chem

import time

#distance
def Manhattan(p1, p2):
    return np.sum(np.abs(p1 - p2))

def calculate(molecular: str):
    #get mol data
    mol=Chem.MolFromSmiles(molecular) # NOTE:
    if mol != None:
        dataset = np.load("./ML/result/K_Means_Dataset.npy", allow_pickle=True).item()
        features = Chem.RDKFingerprint(mol).ToBitString() #get features of mol
        
        data = []
        #get 256 feature points
        for index in range(0, 2048, 8):
            data.append(np.uint8(features[index:index+8]))
        data = np.asarray((data)).astype(int)
            
        result = []
        for key, value in dataset.items():
            result.append([Manhattan(data, value), key]) #distance calculation
                
        list.sort(result)   #sort order          
        print(result)
        return result[0][1] #get the closest one
    else:
        return "Wrong molecular"
        

if __name__ == "__main__":
    start = time.time()
    user_input = sys.argv #set parameter for calling
    print(user_input)
    molecular = user_input[1]
    key = calculate(molecular)
    print("{}, {}".format(key, round(time.time() - start, 3)))
    file_obj = open("./kmeansResult.txt","w")#save data into txt
    file_obj.write(str(key)+"\n"+str(round(time.time() - start, 3)))
    file_obj.close()