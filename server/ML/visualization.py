import matplotlib.pyplot as plt
import matplotlib.ticker as ticker 
import numpy as np

result = np.load("./result/result.npy", allow_pickle=True)
k = [1, 3, 5, 7, 9, 11]

plt.figure(figsize=(6, 4))        
plt.title("Model Evaluation")
plt.xlabel("K's Value")
plt.ylabel("Precent")

Accuracy, = plt.plot(k, result[:, 0])
Precision, = plt.plot(k, result[:, 1])
Recall, = plt.plot(k, result[:, 2])
F1_Score, = plt.plot(k, result[:, 3])

def to_percent(temp, position):
    return '%1.0f'%(100*temp) + '%'
        
plt.gca().yaxis.set_major_formatter(ticker.FuncFormatter(to_percent))
# plt.gca().xaxis.set_major_locator(MaxNLocator(integer=True))
        
plt.xticks(k)
plt.legend([Accuracy ,Precision, Recall, F1_Score], \
           ['Accuracy', 'Precision', 'Recall', 'F1-Score'])

plt.savefig("./images/Model_Evaluation.png", dpi = 600)       