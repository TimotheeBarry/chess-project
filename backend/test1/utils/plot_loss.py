import matplotlib.pyplot as plt

def plot_loss(epochs, training_loss, validation_loss):
    plt.figure()
    plt.plot(epochs, training_loss, "r", label="Training loss")
    plt.plot(epochs, validation_loss, "b", label="Validation loss")
    plt.title("Training and Validation Loss")
    plt.xlabel("Epoch")
    plt.ylabel("Loss Value")
    plt.legend()
    plt.show()