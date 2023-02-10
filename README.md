# nodejs-stack
## Project Scope
The goal of this project is to create a Node.js/Express.js project sample/starter integrated with different components: 
<img width="595" alt="image" src="https://user-images.githubusercontent.com/22165556/216602367-8bc84804-4227-431d-b25f-76ad61614fec.png">

## Branches
all Branches include Dockerfile/dependencies for Nodejs/Express.js, base code and ,Telemetry metrics to Prometheus,  Health probes, K8s YAMLs (deployment, service, configmap , secret) <br />

1) Branch: main (Base Image for Nodejs):  <br />
2) Branch: nodejs-postgres (Nodejs integrated with Postgres/SQL):  <br />
3) Branch: nodejs-rabbitmq (Nodejs integrated with Rabbitmq): <br />

## Helm charts for rabbitmq and postgress
helm repo add bitnami https://charts.bitnami.com/bitnami  <br />
helm install my-release bitnami/rabbitmq  <br />

helm repo add bitnami https://charts.bitnami.com/bitnami  <br />
helm install my-release bitnami/postgresql  <br />
 
