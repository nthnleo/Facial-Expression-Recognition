import os.path

TRAIN_DATA_SAMPLE_DIR = 'data_files/train_sample/'
VALIDATION_DATA_SAMPLE_DIR = 'data_files/validation_sample/'

TRAIN_DATA_DIR = 'data_files/train/'
VALIDATION_DATA_DIR = 'data_files/validation/'

TRAIN_DATA_DIR = TRAIN_DATA_SAMPLE_DIR
VALIDATION_DATA_DIR = VALIDATION_DATA_SAMPLE_DIR

my_path = os.path.abspath(os.path.dirname(__file__))
path = os.path.join(my_path, "model/fermodel.pkl")
TRAINED_MODEL_PATH = path


BATCH_SIZE = 128
IMAGE_SIZE = 48


#EMOTIONS_LIST = ["Angry", "Happy", "Neutral", "Sad","Surprise"]
EMOTIONS_LIST = ["Angry", "Happy", "Sad"]
NUM_OF_CLASS = len(EMOTIONS_LIST)
EPOCHS = 10

IS_ANALYSIS = False
