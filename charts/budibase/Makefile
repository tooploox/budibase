.DEFAULT_GOAL := push
REPO="europe-central2-docker.pkg.dev/tooploox-app-deployer/tplx-helm-repo"
repo-login:
	@export HELM_EXPERIMENTAL_OCI=1 ; gcloud auth application-default print-access-token | helm registry login -u oauth2accesstoken --password-stdin https://$(REPO)

repo-check:
	@export HELM_EXPERIMENTAL_OCI=1 ; helm show readme oci://$(REPO)/$${PWD##*/} --version $$(grep version Chart.yaml | cut -f 2 -d ' ') 2>/dev/null \
	&& echo "Version already exist!" && exit 1 || echo "Repo ready to push!"
push: clean repo-login repo-check
	@helm package . --version v$$(grep version Chart.yaml | cut -f 2 -d ' ')
	@export HELM_EXPERIMENTAL_OCI=1 ; helm push $${PWD##*/}-v$$(grep version Chart.yaml | cut -f 2 -d ' ').tgz oci://$(REPO)
	@rm -f *.tgz
clean:
	@rm -f *.tgz
