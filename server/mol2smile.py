import subprocess
from rdkit import DataStructs
from rdkit import Chem
from rdkit.Chem import Draw
import sys
import os
import numpy as np

import argparse

def argdet():
    if len(sys.argv) == 1:
        print('Need input file!')
        exit()
    if len(sys.argv) == 3:
        args = myargs()
        return args
    #if len(sys.argv) == 5:
    #    args = myargs()
    #    return args
    else:
        print('Cannot recognize the inputs!')
        exit()
    
def myargs():
    parser = argparse.ArgumentParser()                                              
    parser.add_argument('--input', '-i', required = True, help = 'input filename')
    #parser.add_argument('--output', '-o', required = False, help = 'output filename')
    args = parser.parse_args()
    return args


if __name__ == "__main__":
    args = argdet()
    file_obj = open("./public/result.txt", "w")
    m = Chem.MolFromMolFile(args.input)
    file_obj.write(str(Chem.MolToSmiles(m)))    
    # file_obj.write("\n")
    print('CHEM1:' + Chem.MolToSmiles(m))
    file_obj.close()
