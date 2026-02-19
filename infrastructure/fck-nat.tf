# https://fck-nat.dev/
# https://registry.terraform.io/modules/RaJiska/fck-nat/aws/latest

module "fck-nat" {
  source = "RaJiska/fck-nat/aws"

  name                 = "nat-gw-${var.project}-${var.environment}"
  instance_type = "t4g.nano"
  
  vpc_id               = var.vpc_id
  subnet_id            = aws_subnet.private_1a.id
}