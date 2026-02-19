resource "aws_subnet" "private_1a" {
  vpc_id            = var.vpc_id
  cidr_block        = "172.31.48.0/20"
  availability_zone = "eu-north-1a"

  tags = {
    Name = "private-1a"
  }
}

resource "aws_subnet" "private_1b" {
  vpc_id            = var.vpc_id
  cidr_block        = "172.31.64.0/20"
  availability_zone = "eu-north-1b"

  tags = {
    Name = "private-1b"
  }
}

resource "aws_route_table" "private" {
  vpc_id = var.vpc_id

  route {
    cidr_block = "172.31.0.0/16"
    gateway_id = "local"
  }

  tags = {
    Name = "private"
  }
}

resource "aws_route" "private_nat" {
  route_table_id         = aws_route_table.private.id
  destination_cidr_block = "0.0.0.0/0"
  network_interface_id = module.fck-nat.eni_id
}

resource "aws_route_table_association" "private_1a" {
  subnet_id      = aws_subnet.private_1a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_1b" {
  subnet_id      = aws_subnet.private_1b.id
  route_table_id = aws_route_table.private.id
}

data "aws_subnet" "public_1a" {
  vpc_id            = var.vpc_id
  availability_zone = "eu-north-1a"
  default_for_az    = true
}

data "aws_subnet" "public_1b" {
  vpc_id            = var.vpc_id
  availability_zone = "eu-north-1b"
  default_for_az    = true
}


resource "aws_vpc_endpoint" "s3" {
  vpc_id            = var.vpc_id
  service_name      = "com.amazonaws.${var.aws_region}.s3"
  vpc_endpoint_type = "Gateway"
  route_table_ids   = [aws_route_table.private.id]
}

data "aws_ec2_managed_prefix_list" "cloudfront" {
  name = "com.amazonaws.global.cloudfront.origin-facing"
}