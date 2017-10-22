from flask import jsonify, request
from functions import *
import numpy as np

def main():
    w = request.form["W"]
    X = request.form["X"]
    y = request.form["Y"]


    # INPUT DATA
    X = X.split(",")
    X = [float(number) for number in X]
    X = np.asarray(X)

    # OUTPUT DATA
    y = y.split(",")
    y = [float(number) for number in y]
    y = np.asarray(y)

    # WEIGHTS
    w = w.split(",")
    w = [float(number) for number in w]
    w = np.asarray(w)

    X = add_weights(X, w.shape[0])

    # Compute w = (Xt.X)-1
    w = normalize(X, y)

    f = np.dot(X,w)

    error = error_function(y, f)
    answer = jsonify(F = f.tolist(), weights = w.tolist(), error = error)
    return answer
