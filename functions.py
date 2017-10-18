import numpy as np
from numpy.linalg import inv

def descent(X, y, w, alpha):
    # Compute f(x)
    f = np.dot(X, w)

    # Calculate error function
    E = error_function(y, f)

    # Compute gradient descent
    w = w - alpha * np.dot(-X.transpose(), (y - f))
    return w


# The error function computes the sum of the squared error
# Multiplied by a half
def error_function(y, f):
    E = 0.5 * np.sum(np.square((y - f)))
    if E < (1/10**21): return 0
    return E


def cycle(input_data, output_data, min_delta = 0, max_iteration = 0, alpha=0.05):
    X = input_data
    y = output_data

    # WEIGHTS
    w = np.array([1, 1])
    w_temp = np.array([0, 0])

    # Append bias term to input data
    bias = np.ones(X.shape[0])
    X = np.array([bias, X])
    X = X.transpose()

    if min_delta == 0:
        min_delta = 1/(10**10)

    if max_iteration != 0:
        for i in range(0, max_iteration):
            w_temp = w
            w = descent(X, y, w, alpha)
            print(w)
            if np.linalg.norm((w_temp - w)) <= min_delta:
                break
    else:
        while np.linalg.norm((w_temp - w)) > min_delta:
            w_temp = w
            w = descent(X, y, w, alpha)
            print(w)


def normalize(X, y):
    XtX = np.dot(X.transpose(), X)
    inverse = inv(XtX)
    w = np.dot(inverse, X.transpose())
    w = np.dot(w, y)
    return w

# INPUT DATA
#X = np.array([0, 1, 2, 3, 4, 5, 6, 7, 8])

# OUTPUT DATA
#y = np.array([4, 7, 10, 13, 16, 19, 22, 25, 28])


#cycle(X, y, min_delta=0, max_iteration=500, alpha=0.005)
