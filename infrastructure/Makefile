prod-init:
	terraform init -reconfigure

prod-plan: prod-init
	terraform plan -var-file=prod.tfvars

prod-apply: prod-plan
	terraform apply -var-file=prod.tfvars