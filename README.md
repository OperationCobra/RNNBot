# Random text generator bot

## Description
This is not your average ‘artificially intelligent’ chat bot. RNNBot uses a Recurrent Neural Network (RNN) to generate text that will look like the data it was trained on. RNNBot has been trained on a dataset of the complete works of William Shakespeare. Ask it for a ‘Quote’ and it will respond with sample content inspired by the greatest!

Demo it at http://RNNbot.azurewebsites.net. (This is using a free tier of websites hosted in Microsoft's cloud platform, Azure. You can host up to 10 websites for free with the same [Azure subscription](http://azure.microsoft.com) we used.)

## About 
This bot was built on 9/19/2017. **Sarah Sexton**, a Technical Evangelist at Microsoft, created an [Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/) (ACR) to store a [Docker container image](https://docs.docker.com/engine/installation/) of [**Cristian Baldi’s Docker-torch-rnn**](https://github.com/crisbal/docker-torch-rnn) (which uses [**Justin Johnson’s “torch-rnn”**](https://github.com/jcjohnson/torch-rnn/blob/master/doc/flags.md#training) project, a refactoring of [**Andrej Karpathy’s “char-rnn.”**](https://github.com/karpathy/char-rnn)) An ACR allows for the use of open-source Docker command line interface (CLI) tools, and keeps container images near deployments to reduce latency and costs. **This completed Docker image has been preprocessed and trained for over 8 hours already.**