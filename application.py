from flask import Flask, render_template, jsonify
import page_gradientdescent, page_normalize, page_polynomial_normalization
import page_XORNeuralNetwork

application = Flask(__name__)


@application.route('/')
@application.route('/index')
def index():
    return render_template('index.html')


@application.route('/GradientDescent')
def gradient_descent():
    return render_template('GradientDescent.html')

@application.route('/run_iteration', methods=["POST"])
def run_iteration():
    return page_gradientdescent.main()


@application.route('/polynomial_normalization')
def polynomial_normalization():
    return render_template('PolynomialNormalization.html')

@application.route('/run_polynomial_normalize', methods=["POST"])
def run_polynomial_normalize():
    return page_polynomial_normalization.main()




@application.route('/Normalization')
def normalization():
    return render_template('Normalization.html')

@application.route('/run_normalize', methods=["POST"])
def run_normalize():
    return page_normalize.main();



@application.route('/XORNeuralNetwork')
def XORNeuralNetwork():
    return render_template('XORNeuralNetwork.html')

@application.route('/run_XORNeuralNetwork', methods=["POST"])
def run_XORNeuralNetwork():
    return page_XORNeuralNetwork.main()



if __name__ == '__main__':
    application.debug = True
    application.run()
