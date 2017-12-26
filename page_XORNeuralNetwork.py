from flask import jsonify, request
from functions import *
import numpy as np

def slope(x):
    return x * (1 - x)


def sigmoid(x):
    return 1 / (1 + np.exp(-x))


def error(y, f):
    return (1 / 2) * (y - f) ** 2


class XORNeuralNetwork:

    def __init__(self, INPUTS, OUTPUTS, weights1=None, weights2=None, weights=True):
        self.INPUTS = INPUTS
        self.OUTPUTS = OUTPUTS
        self.bias_term = 1
        self.bias_append()
        self.final_error = 0

        if weights == True:
            self.weights1 = weights1
            self.weights2 = weights2
        else:
            self.weights1 = np.random.rand(2, 3)
            self.weights2 = np.random.rand(1, 3)

        self.H = np.array([0.5, 0.5, 0.5])

        self.output = 0
        self.f = []

    def getWeights(self):
        W1 = self.weights1.tolist()
        W1json = []
        for row in W1:
            for j in row:
                W1json.append(round(j, 3))

        W2 = self.weights2.tolist()
        W2json = []
        for row in W2:
            for j in row:
                W2json.append(round(j, 3))

        return W1json, W2json

    # Append bias term, 1, to inputs
    def bias_append(self):
        bias_array = np.ones((self.INPUTS.shape[0], 1))
        self.INPUTS = np.c_[self.INPUTS, bias_array]

    def feed_forward(self, i):
        h = sigmoid(np.dot(self.weights1, self.INPUTS[i].T))
        self.H = np.append(h, self.bias_term)
        self.output = sigmoid(np.dot(self.weights2, self.H.T))
        self.f.append(round(float(self.output), 5))
        self.final_error += float(error(self.output, self.OUTPUTS[i]))

    def feed_forward_all(self):
        for i in range(len(self.INPUTS)):
            self.feed_forward(i)

    def feed_this(self, INPUT):
        h = sigmoid(np.dot(self.weights1, INPUT.T))
        self.H = np.append(h, self.bias_term)
        print(sigmoid(np.dot(self.weights2, self.H.T)))

    def getF(self):
        return self.f

    def getError(self):
        return round(self.final_error/4, 5);

    def back_propagation(self, i):
        delta = (self.output - self.OUTPUTS[i]) * slope(self.output)

        newWeights2 = self.weights2 - delta * self.H

        Wtilda = delta * self.weights2
        Htilda = self.H * (1 - self.H)

        HW = Wtilda * Htilda
        newWeights1 = np.outer(HW.T, self.INPUTS[i])

        self.weights1 = self.weights1 - newWeights1[:-1]
        self.weights2 = newWeights2

    def train(self, loop=1, print_number=0):
        for counter in range(loop+1):
            if print_number != 0 and (counter % print_number == 0 or counter == 0):
                print("Iteration %d:" % counter)
                self.feed_forward_all()
                print("")
            for i in range(len(self.INPUTS)):
                self.feed_forward(i)
                self.back_propagation(i)


def main():

    xor_inputs = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
    xor_outputs = np.array([[0], [1], [1], [0]])

    w1 = request.form["w1"]
    w2 = request.form["w2"]
    w3 = request.form["w3"]
    w4 = request.form["w4"]
    w5 = request.form["w5"]
    w6 = request.form["w6"]
    w7 = request.form["w7"]
    w8 = request.form["w8"]
    w9 = request.form["w9"]
    if "w1" in w1:
        NN = XORNeuralNetwork(xor_inputs, xor_outputs, weights=False)
        NN.feed_forward_all()
    else:
        weights1 = np.asarray([[float(w1), float(w2), float(w3)], [float(w4), float(w5), float(w6)]])
        weights2 = np.asarray([[float(w7), float(w8), float(w9)]])

        NN = XORNeuralNetwork(xor_inputs, xor_outputs, weights1, weights2, weights=True)
        NN.train()

    W1, W2 = NN.getWeights()
    F = NN.getF()
    final_error = NN.getError()

    return jsonify(weights1 = W1, weights2 = W2, f = F, error=final_error)
