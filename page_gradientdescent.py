from flask import jsonify, request
from functions import *
import numpy as np

def main():
    w = request.form["W"]
    X = request.form["X"]
    y = request.form["Y"]
    alpha = request.form["A"]


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

    # Add bias term
    bias = np.ones(X.shape[0])
    X = np.array([bias, X])
    X = X.transpose()

    # Define learning rate
    alpha = float(alpha)
    w  = descent(X, y, w, alpha)

    f = np.dot(X,w)
    f_display = [f[0],  f[len(f)-1]]

    error = error_function(y, f)
    answer = jsonify(F = f_display, weights = w.tolist(), error = error)
    return answer
