from flask import Flask, render_template, jsonify
import page_gradientdescent, page_normalize

application = Flask(__name__)


@application.route('/')
def index():
    return render_template('index.html')


@application.route('/GradientDescent')
def gradient_descent():
    return render_template('GradientDescent.html')


@application.route('/run_iteration', methods=["POST"])
def run_iteration():
    return page_gradientdescent.main()


@application.route('/run_normalize', methods=["POST"])
def run_normalize():
    return page_normalize.main();

@application.route('/Normalization')
def normalization():
    return render_template('Normalization.html')


if __name__ == '__main__':
    application.debug = True
    application.run()
