# https://fck-nat.dev/
# https://registry.terraform.io/modules/RaJiska/fck-nat/aws/latest

module "fck-nat" {
  source = "RaJiska/fck-nat/aws"

  name          = "nat-gw-${var.project}-${var.environment}"
  instance_type = "t4g.nano"

  vpc_id    = var.vpc_id
  subnet_id = var.public_subnet_1a_id

  attach_ssm_policy = true
}

resource "aws_security_group_rule" "rds_ingress_from_fck_nat" {
  type                     = "ingress"
  from_port                = 5432
  to_port                  = 5432
  protocol                 = "tcp"
  security_group_id        = aws_security_group.rds.id
  source_security_group_id = module.fck-nat.security_group_id
}