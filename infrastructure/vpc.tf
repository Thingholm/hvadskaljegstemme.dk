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

resource "aws_route_table_association" "private_1a" {
  subnet_id      = aws_subnet.private_1a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_1b" {
  subnet_id      = aws_subnet.private_1b.id
  route_table_id = aws_route_table.private.id
}