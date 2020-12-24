import numpy as np 
from sklearn.cluster import KMeans


def Manhattan(p1, p2):
    return np.sum(np.abs(p1 - p2))

train = np.load("./data/dataset/dict_train.npy", allow_pickle=True).item()

dataset = []
for data in  train["non_toxicity"]:
    dataset.append(data)
for data in  train["toxicity"]:
    dataset.append(data)
    
dataset = np.asarray(dataset)

K_Means = KMeans(n_clusters=2)    #set the number of cluster centers
K_Means.fit_predict(dataset)      #start cluster


cluster_centers = K_Means.cluster_centers_ #extract cluster centers

# set label
if np.sum(cluster_centers[0]) > np.sum(cluster_centers[1]):
    K_Means_Dataset = {
        "non_toxicity": cluster_centers[0],
        "toxicity":cluster_centers[1]
        }
elif np.sum(cluster_centers[0]) < np.sum(cluster_centers[1]):
    K_Means_Dataset = {
        "non_toxicity": cluster_centers[1],
        "toxicity":cluster_centers[0]
        }

np.save("./data/dataset/K_Means_Dataset.npy", K_Means_Dataset)


test = np.load("./data/dataset/dict_test.npy", allow_pickle=True).item()

cfmartix = np.zeros([2,2], dtype = int) # True Negative, False Positive / False Negative, True Positive
for test_key, test_values in test.items():
    len_values = len(test_values)
    for index, test_value in enumerate(test_values):        
        distance = []            
        for train_key, train_values in K_Means_Dataset.items():                        
            distance.append([Manhattan(test_value, train_values), train_key])
            
        list.sort(distance)            
        k_key  = str(distance[0][1])
        
        if k_key == test_key:
            if test_key == "toxicity": cfmartix[0, 0] = cfmartix[0, 0] + 1 # True Negative
            if test_key == "non_toxicity": cfmartix[1, 1] = cfmartix[1, 1] + 1 # True Positive
        else:
            if test_key == "toxicity": cfmartix[0, 1] = cfmartix[0, 1] + 1 # False Positive
            if test_key == "non_toxicity": cfmartix[1, 0] = cfmartix[1, 0] + 1 # False Negative
n_sample = np.sum(cfmartix)

Accuracy = (cfmartix[1,1] + cfmartix[0,0]) / n_sample  #(TP+TN)/Sum
Precision = cfmartix[1,1] / (cfmartix[1,1] + cfmartix[0,1]) #TP/(TP+FP)
if cfmartix[1,1] == 0 or cfmartix[1,0] == 0:
    Recall = 0
else:
    Recall = cfmartix[1,1] / (cfmartix[1,1] + cfmartix[1,0]) #TP/(TP+FN)
if Recall == 0:
    F1_Score = 0
else:                
    F1_Score = 2 * Precision * Recall /  (Precision + Recall)