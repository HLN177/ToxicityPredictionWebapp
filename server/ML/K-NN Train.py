import numpy as np
from scipy import stats


def Manhattandis(p1, p2):
    return np.sum(np.abs(p1 - p2))

train = np.load("./data/dataset/dict_train.npy", allow_pickle=True).item()
test = np.load("./data/dataset/dict_test.npy", allow_pickle=True).item()


cfmartix = np.zeros([2,2], dtype = int) # True Negative, False Positive / False Negative, True Positive

result = []
for k in [1, 3, 5, 7, 9, 11]:
    for test_key, test_values in test.items():
        len_values = len(test_values)
        for index, test_value in enumerate(test_values):        
            distance = []    
            print("k:{}, {} {}/{}".format(k, test_key, index, len_values))
            for train_key, train_values in train.items():            
                
                for train_value in train_values:         
                    
                    distance.append([Manhattandis(test_value, train_value), train_key])
                
            list.sort(distance)            
            k_key  = str(stats.mode(distance[:k])[0][0][1])
            
            if k_key == test_key:
                if test_key == "toxicity": cfmartix[0, 0] = cfmartix[0, 0] + 1 # True Negative
                if test_key == "non_toxicity": cfmartix[1, 1] = cfmartix[1, 1] + 1 # True Positive
            else:
                if test_key == "toxicity": cfmartix[0, 1] = cfmartix[0, 1] + 1 # False Positive
                if test_key == "non_toxicity": cfmartix[1, 0] = cfmartix[1, 0] + 1 # False Negative
    
    n_sample = np.sum(cfmartix)

    Accuracy = (cfmartix[1,1] + cfmartix[0,0]) / n_sample #(TP+TN)/Sum
    Precision = cfmartix[1,1] / (cfmartix[1,1] + cfmartix[0,1]) #TP/(TP+FP)
    if cfmartix[1,1] == 0 or cfmartix[1,0] == 0:
        Recall = 0
    else:
        Recall = cfmartix[1,1] / (cfmartix[1,1] + cfmartix[1,0]) #TP/(TP+FN)
    if Recall == 0:
        F1_Score = 0
    else:                
        F1_Score = 2 * Precision * Recall /  (Precision + Recall)
                
        
    result.append([Accuracy, Precision, Recall, F1_Score])

np.save("./result/result.npy", result)


         