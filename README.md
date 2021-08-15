# Neopost UI

### Reference Documentation

* Running locally from source code -
    * Clone the source code.
    * Run npm install.
    * Install serve/http-server globally. e.g. npm install serve -g.
    * Run npm run serve for starting local dev server.
    * Run npm run build to build production ready server and then run serve -s build.
* Running using Docker and deploy to a Kubernetes cluster -
    * Clone the source code.
    * Build the Docker image using the dockerfile - "Dockerfile-UI".
    * Apply the Kubernetes deployment and service from infra/k8s/ceaa-ui-depl.yaml
* Running from pre-compiled Docker image -
    * Pull the pre-compiled Docker image from Dockerhub - "anshumanc6/ceaa-ui".
    * Deploy it to a Kubernetes cluster or run locally using Docker.


#### Notes
* This application uses service worker and runs as PWA.
* Service worker registration is only supported in https environment, except localhost.